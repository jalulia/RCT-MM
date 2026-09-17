from pathlib import Path
import json,shutil
from PIL import Image,ImageOps
root=Path(__file__).resolve().parent
spec=json.loads((root/'episode-capture-input.json').read_text());out=Path(spec['output']);entries=spec['entries']
for e in entries:
 p=out/Path(e['png']).name
 with Image.open(p) as im:
  e['size']=list(im.size);im.convert('RGB').quantize(colors=256,method=Image.Quantize.MEDIANCUT).save(out/Path(e['gif']).name)
for seq in spec['sequences']:
 name=seq['id'].removeprefix('episode-');frames=[];sizes=[Image.open(f['file']).size for f in seq['frames']];w,h=max(s[0] for s in sizes),max(s[1] for s in sizes)
 # Fit differently shaped real screenshots on one white export plate, without cropping controls.
 # Native live-canvas cycles retain their exact source dimensions.
 for f in seq['frames']:
  with Image.open(f['file']) as im:
   canvas=Image.new('RGB',(w,h),'white');canvas.paste(im,((w-im.width)//2,(h-im.height)//2));frames.append(canvas)
 samples=frames[::max(1,len(frames)//12)];swatch=Image.new('RGB',(w,h*len(samples)))
 for i,im in enumerate(samples):swatch.paste(im,(0,h*i))
 palette=swatch.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
 frames[0].save(out/(name+'.png'))
 indexed=[im.quantize(palette=palette,dither=Image.Dither.NONE) for im in frames]
 durations=[f['duration'] for f in seq['frames']]
 indexed[0].save(out/(name+'.gif'),save_all=True,append_images=indexed[1:],duration=durations,loop=0,disposal=1,optimize=False)
 e={'id':seq['id'],'title':seq['title'],'png':'episode/'+name+'.png','gif':'episode/'+name+'.gif','kind':'animation','group':'Episode','route':'#narrative','caption':seq['caption'],'size':[w,h],'durationMs':sum(durations),'captureFrames':len(frames),'chapterLabels':[{k:f[k] for k in ['label','duration','turn']} for f in seq['frames']] if name!='map-cycle' else []}
 entries.append(e)
with_entries=[]
for e in entries:
 with Image.open(out/Path(e['gif']).name) as im:
  assert list(im.size)==e['size'];duration=0
  for i in range(im.n_frames):im.seek(i);im.load();duration+=im.info.get('duration',0)
  if e['kind']=='animation':assert duration==e['durationMs'];assert im.info.get('loop')==0
  e['encodedFrames']=im.n_frames
(out/'manifest.json').write_text(json.dumps({'scope':'Fictional Episode 01; UI captures are actual automated playthroughs; timing condensed where stated','sources':spec['sources'],'entries':entries},indent=2)+'\n')
shutil.rmtree(spec['temp']);(root/'episode-capture-input.json').unlink();print(json.dumps({'episodeCaptures':len(entries),'animations':len(spec['sequences'])}))
