"""Add GIFs to an already-rendered sprite catalogue; never rebuild its PNGs/previews.

Run after export-sprite-catalogue.cjs (and the existing Boerum preview exporter),
then run package-sprite-catalogue.py. Uses the manifest as the frame authority.
"""
from pathlib import Path
import hashlib
import json
import math
from PIL import Image, GifImagePlugin

ROOT = Path(__file__).resolve().parent.parent / 'assets/sprite-catalogue'
MANIFEST = ROOT / 'manifest.json'
original_manifest = MANIFEST.read_bytes()
manifest = json.loads(original_manifest)
outputs = []
still_cache = {}
validation = {'errors': [], 'files': 0, 'decodedFrames': 0, 'transparentFiles': 0,
              'rgbaRoundTrips': 0, 'timingChecks': 0, 'preservedPreviews': []}


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def safe_path(relative):
    p = (ROOT / relative).resolve()
    if not p.is_relative_to(ROOT.resolve()):
        raise ValueError(f'Path leaves catalogue: {relative}')
    return p


def quantized_frames(images):
    """One stable 255-colour palette; index zero is reserved for transparency."""
    colours = set()
    exact = True
    for im in images:
        values = im.getcolors(257)
        if values is None:
            exact = False
            break
        colours.update((r, g, b) for _, (r, g, b, a) in values if a >= 128)
        if len(colours) > 255:
            exact = False
            break
    if exact:
        rgb_colours = sorted(colours) or [(0, 0, 0)]
        rgb_colours += [rgb_colours[-1]] * (256 - len(rgb_colours))
        base_palette = [v for rgb in rgb_colours for v in rgb]
    else:
        atlas = Image.new('RGB', (max(im.width for im in images), sum(im.height for im in images)))
        y = 0
        for im in images:
            atlas.paste(im.convert('RGB'), (0, y))
            y += im.height
        base_palette = atlas.quantize(colors=255, method=Image.Quantize.MEDIANCUT,
                                      dither=Image.Dither.NONE).getpalette()[:765]
        base_palette += base_palette[-3:]
    palette = Image.new('P', (1, 1))
    palette.putpalette(base_palette)
    final_palette = [0, 0, 0] + base_palette[:765]
    result = []
    for im in images:
        indexed = im.convert('RGB').quantize(palette=palette, dither=Image.Dither.NONE)
        indexed = indexed.point([min(i, 254) + 1 for i in range(256)])
        indexed.putpalette(final_palette)
        indexed.paste(0, mask=im.getchannel('A').point(lambda a: 255 if a < 128 else 0))
        indexed.info['transparency'] = 0
        result.append(indexed)
    return result, not exact


def encode(relative, sources, *, label, kind, durations=None, timing_basis=None, source_root=None):
    images = []
    for source in sources:
        with Image.open((source_root / source) if source_root else safe_path(source)) as image:
            images.append(image.convert('RGBA'))
    assert len({im.size for im in images}) == 1, relative
    frames, reduced = quantized_frames(images)
    animated = len(frames) > 1
    if animated:
        assert durations and len(durations) == len(frames)
        assert all(d >= 20 and d % 10 == 0 for d in durations)
    else:
        durations = [0]
    path = safe_path(relative)
    path.parent.mkdir(parents=True, exist_ok=True)
    # Full frames deliberately retain duplicate poses and use disposal 2. This
    # avoids both transparent trails and Pillow's identical-frame coalescing.
    info = {'transparency': 0, 'background': 0, 'optimize': False,
            'comment': f'{label}. {timing_basis or "Still image; no playback timing."}'.encode()}
    if animated:
        info['loop'] = 0
    with path.open('wb') as out:
        for part in GifImagePlugin.getheader(frames[0], info=info)[0]:
            out.write(part)
        for frame, duration in zip(frames, durations):
            for part in GifImagePlugin.getdata(frame, duration=duration,
                                               transparency=0, disposal=2):
                out.write(part)
        out.write(b';')
    has_transparency = any(im.getchannel('A').getextrema()[0] < 128 for im in images)
    partial_alpha = any(any(0 < value < 255 for _, value in im.getchannel('A').getcolors(256)) for im in images)
    with Image.open(path) as decoded:
        assert decoded.size == images[0].size, relative
        assert decoded.n_frames == len(frames), (relative, decoded.n_frames, len(frames))
        if animated:
            assert decoded.info.get('loop') == 0, relative
        for i, (source, expected, duration) in enumerate(zip(images, frames, durations)):
            decoded.seek(i)
            actual = decoded.convert('RGBA')
            assert actual.tobytes() == expected.convert('RGBA').tobytes(), (relative, i, 'RGBA round trip')
            assert actual.getchannel('A').tobytes() == source.getchannel('A').point(lambda a: 255 if a >= 128 else 0).tobytes(), (relative, i, 'alpha mask')
            assert decoded.info.get('duration', 0) == duration, (relative, i, 'duration')
            if animated:
                assert decoded.disposal_method == 2, (relative, i, 'disposal')
            validation['decodedFrames'] += 1
            validation['rgbaRoundTrips'] += 1
            validation['timingChecks'] += int(animated)
    meta = {'file': relative, 'label': label, 'kind': kind,
            'width': images[0].width, 'height': images[0].height,
            'frames': len(frames), 'transparent': has_transparency,
            'paletteReduced': reduced,
            'alpha': 'threshold at 128' if partial_alpha else 'original binary alpha',
            'sourcePngs': [] if source_root else sources, 'sha256': sha(path)}
    if animated:
        meta.update(durationsMs=durations, durationMs=sum(durations), loop=0,
                    timingBasis=timing_basis)
    outputs.append(meta)
    validation['files'] += 1
    validation['transparentFiles'] += int(has_transparency)
    return meta


def still(source, label):
    if source not in still_cache:
        target = str(Path(source).with_suffix('.gif'))
        still_cache[source] = encode(target, [source], label=label, kind='still')
    return still_cache[source]


def centisecond_durations(count, fps):
    # Round cumulative timestamps, not individual intervals; 7/8 fps need a
    # mixture of adjacent centisecond durations. Actual values are published.
    boundaries = [math.floor(i * 100 / fps + .5) for i in range(count + 1)]
    return [(b - a) * 10 for a, b in zip(boundaries, boundaries[1:])]


def sequence(obj, key, variants, label, kind, durations, timing_basis):
    meta = encode(f'objects/{obj["id"]}/sequences/{key}.gif',
                  [v['file'] for v in variants], label=label, kind=kind,
                  durations=durations, timing_basis=timing_basis)
    meta['variantKeys'] = [v['key'] for v in variants]
    obj['gifSequences'].append(meta)
    return meta


# Hash and decode the two existing choreography GIFs without rewriting them.
for preview in manifest['previews']:
    p = safe_path(preview['file'])
    entry = {'file': preview['file'], 'sha256': sha(p)}
    with Image.open(p) as im:
        assert im.size == (preview['width'], preview['height'])
        total = 0
        for i in range(im.n_frames):
            im.seek(i)
            im.load()
            total += im.info.get('duration', 0)
        assert total == round(preview['seconds'] * 1000), preview['file']
        entry.update(frames=im.n_frames, durationMs=total)
    validation['preservedPreviews'].append(entry)

for obj in manifest['objects']:
    for variant in obj['variants']:
        variant['gif'] = still(variant['file'], f'{obj["name"]} / {variant["label"]} — still')
    obj['sheet']['gif'] = still(obj['sheet']['file'], f'{obj["name"]} / all frames — still sheet')
    obj['gifSequences'] = []
    variants = obj['variants']
    if obj.get('cycles'):
        for cycle in obj['cycles']:
            frames = [v for v in variants if v.get('cycle') == cycle['key']]
            assert len(frames) == cycle['frames'], (obj['id'], cycle['key'])
            if cycle['fps'] > 0 and len(frames) > 1:
                meta = sequence(obj, cycle['key'], frames, cycle['label'] + ' — gait loop',
                                'gait-loop', centisecond_durations(len(frames), cycle['fps']),
                                f'Registered {cycle["fps"]} poses/second; GIF centisecond rounding. Fixed anchor; no scene translation.')
                meta['registeredFps'] = cycle['fps']
                meta['travel'] = cycle['travel']
                meta['facing'] = cycle['facing']
    elif obj['id'] in ('L-01', 'L-05') and len(variants) > 1:
        sequence(obj, 'orientation-study', variants, 'Turntable — orientation study',
                 'orientation-study', [200] * len(variants),
                 'Presentation timing: 200 ms per registered orientation. Not driving motion.')
    elif obj['id'] in ('L-06', 'L-09') and len(variants) > 1:
        meta = sequence(obj, 'sampled-poses', variants, 'Sampled poses — preview sequence',
                        'sampled-poses', [500] * len(variants),
                        'Presentation timing: 500 ms per saved sample. No interpolation; loop reset is a sample review, not source-continuous motion.')
        meta['sourceSampleTimesSeconds'] = [v.get('time') for v in variants]
    elif obj['group'] == 'People' and len(variants) > 1:
        sequence(obj, 'pose-preview', variants, 'Walking poses — preview sequence',
                 'pose-preview', [250] * len(variants),
                 'Presentation timing: 250 ms per registered pose. This registry does not specify an FPS for this actor.')
    elif len(variants) > 1:
        sequence(obj, 'state-comparison', variants, 'States — comparison, not animation',
                 'state-comparison', [1000] * len(variants),
                 'Comparison timing: 1000 ms per state. These are alternatives, not a continuous animation.')

# Continuous isolated motion uses the same render functions and periods as the scene.
render_input = json.loads((Path(__file__).parent / 'sprite-render-input.json').read_text())
for m in render_input.get('isolated', []):
    obj = next(o for o in manifest['objects'] if o['id'] == m['id'])
    source_root = Path(m['dir'])
    sources = [p.name for p in sorted(source_root.glob('*.png'))]
    assert len(sources) == m['frames']
    meta = encode(m['file'], sources, label=m['label'], kind='scene-motion',
                  durations=[m['delayMs']] * m['frames'], source_root=source_root,
                  timing_basis=f"Shared scene renderer, sampled over {m['sourcePeriodSeconds']:.6f} seconds. GIF duration rounded to whole 100 ms frames.")
    obj['motionPreview'].update(meta)
    obj['motionPreview']['bounds'] = m['bounds']
    obj['motionPreview']['poster'] = m['poster']
    still(m['poster'], obj['name'] + ' / motion poster — still')

# One display choice drives the reader, library and catalogue. State alternatives never autoplay.
for obj in manifest['objects']:
    variant = obj['variants'][0]
    motion = obj.get('motionPreview')
    gait = next((g for g in obj['gifSequences'] if g['kind'] in ('gait-loop', 'pose-preview')), None)
    seq = motion or gait
    bounds = motion['bounds'] if motion else variant['bounds']
    if gait:
        frames = [v for v in obj['variants'] if v['key'] in gait['variantKeys']]
        x, y = min(v['bounds']['x'] for v in frames), min(v['bounds']['y'] for v in frames)
        bounds = dict(x=x, y=y, width=max(v['bounds']['x']+v['bounds']['width'] for v in frames)-x, height=max(v['bounds']['y']+v['bounds']['height'] for v in frames)-y)
    obj['display'] = dict(poster=motion['poster'] if motion else variant['file'],
                          gif=seq['file'] if seq else variant['gif']['file'],
                          animated=bool(seq), bounds=bounds,
                          width=motion['width'] if motion else obj['size'][0],
                          height=motion['height'] if motion else obj['size'][1],
                          label=seq['label'] if seq else ('Exterior + interior' if obj['group']=='Buildings' else 'Static component'))

for group in manifest['groupSheets']:
    group['gif'] = still(group['file'], group['name'] + ' / transparent atlas — still sheet')
    group['previewGif'] = still(group['preview'], group['name'] + ' / labelled overview — still sheet')
for preview in manifest['previews']:
    preview['posterGif'] = still(preview['poster'], preview['title'] + ' / poster — still')

supplementary = []
for source, label in [('sheets/catalogue-overview.png', 'Full object sheet — still'),
                      ('sheets/refinement-comparison.png', 'Before / after — still comparison sheet'),
                      ('sheets/boerum-animation-labelled.png', 'Labelled fedora motion sheet — still')]:
    if safe_path(source).exists():
        supplementary.append(still(source, label))

for entry in validation['preservedPreviews']:
    assert sha(safe_path(entry['file'])) == entry['sha256'], entry['file']
assert MANIFEST.read_bytes() == original_manifest, 'Manifest changed during GIF export; rerun against the new PNG set.'
manifest['gifDownloads'] = {
    'version': 1, 'exporter': {'file': '../../working/export-catalogue-gifs.py', 'sha256': sha(Path(__file__))},
    'stillCount': sum(o['kind'] == 'still' for o in outputs),
    'sequenceCount': sum(o['kind'] != 'still' for o in outputs),
    'files': outputs, 'supplementary': supplementary,
    'preservedPreviews': validation['preservedPreviews'],
    'validationFile': 'gif-validation.json',
    'notes': 'Native-size GIFs preserve frame dimensions and binary transparency. GIF palettes are limited to 255 visible colours plus transparency; large sheets may be quantized. Sequence types and actual millisecond delays are explicit; no motion is invented for still objects.'
}
MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
(ROOT / 'catalogue-data.js').write_text('window.MMT_SPRITE_CATALOGUE=' + json.dumps(manifest, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c') + ';\n')
(ROOT / 'gif-validation.json').write_text(json.dumps(validation, indent=2) + '\n')
print(json.dumps({'objects': len(manifest['objects']), 'stillGifs': manifest['gifDownloads']['stillCount'],
                  'sequenceGifs': manifest['gifDownloads']['sequenceCount'], **validation}))
