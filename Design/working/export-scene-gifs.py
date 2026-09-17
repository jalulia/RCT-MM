from pathlib import Path
import json,shutil
from PIL import Image
root=Path(__file__).resolve().parent
spec=json.loads((root/'scene-render-input.json').read_text());out=Path(spec['output'])
for e in spec['entries']:
    if e['kind']=='still':
        with Image.open(out/e['png']) as im: im.convert('RGB').quantize(colors=256,method=Image.Quantize.MEDIANCUT).save(out/e['gif'])
    else:
        paths=sorted(Path(spec['temp']).glob('*.png'));thumbs=[]
        for p in paths[::16]:
            with Image.open(p) as im: thumbs.append(im.convert('RGB'))
        swatch=Image.new('RGB',(640,360*len(thumbs)))
        for i,im in enumerate(thumbs):swatch.paste(im,(0,i*360))
        palette=swatch.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
        frames=[]
        for p in paths:
            with Image.open(p) as im:frames.append(im.convert('RGB').quantize(palette=palette,dither=Image.Dither.NONE))
        frames[0].save(out/e['gif'],save_all=True,append_images=frames[1:],duration=100,loop=0,disposal=1,optimize=False)
    with Image.open(out/e['gif']) as gif:
        assert list(gif.size)==e['size'];duration=0
        for n in range(gif.n_frames):gif.seek(n);gif.load();duration+=gif.info.get('duration',0)
        if e['kind']=='animation':assert duration==e['durationMs'];assert gif.info.get('loop')==0
        e['encodedFrames']=gif.n_frames
(out/'manifest.json').write_text(json.dumps({'artRevision':'0.8','entries':spec['entries']},indent=2)+'\n')
shutil.rmtree(spec['temp']);(root/'scene-render-input.json').unlink()
print(json.dumps({'sceneGifs':len(spec['entries']),'loopDurationMs':22400}))
