from pathlib import Path
import json,zipfile,hashlib
root=Path(__file__).resolve().parent.parent/'assets/sprite-catalogue'
m=json.loads((root/'manifest.json').read_text())
files={'motion-player.js','index.html','catalogue-data.js','manifest.json','README.md','sheets/catalogue-overview.png','sheets/refinement-comparison.png','sheets/boerum-animation-labelled.png','fonts/Geist-Regular.otf','fonts/GeistMono-Regular.otf','fonts/OFL.txt'}
for o in m['objects']:
    files.add(o['sheet']['file']);files.update(v['file'] for v in o['variants'])
    if o.get('motionPreview'):files.add(o['motionPreview']['poster'])
for s in m['groupSheets']:files.update([s['file'],s['preview']])
for p in m['previews']:files.update([p['file'],p['poster']])
gifs=m.get('gifDownloads',{})
for g in gifs.get('files',[]):files.add(g['file'])
if gifs.get('validationFile'):files.add(gifs['validationFile'])
for f in files:
    p=(root/f).resolve()
    assert p.is_relative_to(root.resolve()) and p.is_file(),f
prefix='Mad Money Tycoon - Sprite catalogue/'
with zipfile.ZipFile(root/'mad-money-sprite-catalogue.zip','w',compression=zipfile.ZIP_DEFLATED) as z:
    for f in sorted(files):z.write(root/f,prefix+f)
with zipfile.ZipFile(root/'mad-money-sprite-catalogue.zip') as z:
    assert z.testzip() is None
    assert set(z.namelist())=={prefix+f for f in files}
    for g in gifs.get('files',[]):
        assert hashlib.sha256(z.read(prefix+g['file'])).hexdigest()==g['sha256'],g['file']
    for p in gifs.get('preservedPreviews',[]):
        assert hashlib.sha256(z.read(prefix+p['file'])).hexdigest()==p['sha256'],p['file']
print(json.dumps({'files':len(files),'archiveBytes':(root/'mad-money-sprite-catalogue.zip').stat().st_size,'objects':m['counts']['objects'],'frames':m['counts']['frames'],'newGifFiles':len(gifs.get('files',[])),'gifArchiveHashesVerified':bool(gifs),'preservedPreviewGifs':len(gifs.get('preservedPreviews',[]))}))
