from pathlib import Path
import json,html,os
from PIL import Image
root=Path(__file__).resolve().parent.parent
project=json.loads((root/'project.json').read_text())
esc=lambda s:html.escape(str(s),quote=True)
def rel(p,base):return os.path.relpath(p,base).replace(os.sep,'/')
css='''@font-face{font-family:Geist;src:url(../assets/fonts/Geist-Regular.otf)}@font-face{font-family:GeistMono;src:url(../assets/fonts/GeistMono-Regular.otf)}*{box-sizing:border-box}body{margin:0;color:#17191e;background:#fff;font:15px/1.55 Geist,sans-serif}a{color:inherit;text-underline-offset:4px}button{font:inherit;border:1px solid #191b20;padding:8px 14px;background:#fff;cursor:pointer}button[aria-pressed=true]{background:#4fea79}:focus-visible{outline:3px solid #126b3c;outline-offset:5px}header{display:flex;justify-content:space-between;gap:24px;padding:22px 32px;border-bottom:1px solid #17191e}header>a{text-decoration:none;font-size:19px;letter-spacing:-.04em}nav{display:flex;gap:24px;font-size:12px;align-items:center}main{max-width:1480px;padding:44px 32px 80px;margin:auto}h1{font-size:clamp(38px,5vw,66px);font-weight:400;letter-spacing:-.055em;line-height:1.02;margin:0 0 20px}h2{font-size:26px;font-weight:400;letter-spacing:-.03em;border-top:1px solid #17191e;padding-top:24px;margin:52px 0 24px}h3{font-size:20px;font-weight:400;margin:0 0 8px;letter-spacing:-.025em}p{max-width:76ch;margin:0 0 18px}small,.meta{font:10px/1.65 GeistMono,monospace}.meta{display:block;margin-bottom:10px}.intro{display:grid;grid-template-columns:1.3fr 1fr;gap:60px}.intro aside{border-left:1px solid #17191e;padding-left:24px;font-size:13px}.intro aside b{font-size:18px;font-weight:400}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.card{border:1px solid #17191e;min-width:0;margin:0;background:#fff}.image{height:310px;display:flex;align-items:center;justify-content:center;background-image:radial-gradient(#29323b22 .45px,transparent .6px);background-size:4px 4px;overflow:hidden;border-bottom:1px solid #bfc6cf;padding:20px}.image img{max-width:100%;max-height:100%;object-fit:contain;image-rendering:pixelated}.card.photo img{image-rendering:auto}.copy{padding:20px}.copy p{font-size:13px;margin-bottom:14px}.links{display:flex;gap:12px 18px;flex-wrap:wrap;align-items:center;font-size:11px}.links a{padding:5px 0}.links button{font-size:11px}.archive-notice{border:1px solid #17191e;background:#f3bfd4;padding:20px;margin:20px 0 30px;font-size:14px}.archive-notice p:last-child{margin:0}.file-list{border-top:1px solid #bfc6cf;margin-top:20px;display:grid;gap:0}.file-list a{padding:11px 0;border-bottom:1px solid #dde0e5;font:11px/1.5 GeistMono,monospace;overflow-wrap:anywhere}.file-list span{float:right;color:#67727e;font-size:10px}details{border-top:1px solid #bfc6cf;padding:16px 0;font-size:13px}summary{cursor:pointer}.small-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.small-grid .image{height:220px}.foot{border-top:1px solid #17191e;padding-top:20px;margin-top:42px;font-size:12px}.jump{display:flex;gap:14px;flex-wrap:wrap;margin:32px 0;font:11px GeistMono,monospace}.jump a{border:1px solid #9ba6b1;padding:8px 12px;text-decoration:none}.status{font:10px GeistMono,monospace;background:#4fea79;color:#17191e;padding:4px 7px;display:inline-block;margin-bottom:14px}.status.archive{background:#f3bfd4}.empty{padding:22px;border:1px dotted #7b8792}@media(max-width:760px){header{padding:18px;flex-direction:column;gap:14px}nav{gap:18px;flex-wrap:wrap}main{padding:28px 18px 50px}.intro{grid-template-columns:1fr;gap:16px}.intro aside{padding:16px 0 0;border-left:0;border-top:1px solid #bfc6cf}.grid,.small-grid{grid-template-columns:1fr}.image{height:240px}.file-list span{float:none;display:block}}'''
def shell(title,body,location):
 nav='<nav aria-label="Project navigation"><a href="../design-review.html">Design document</a><a href="../assets/sprite-catalogue/index.html">Objects</a><a href="../previews/index.html">Previews</a><a href="../archive/index.html">Archive</a></nav>'
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' — Mad Money Tycoon</title><style>'+css+'</style></head><body><header><a href="../design-review.html">Mad Money Tycoon</a>'+nav+'</header><main>'+body+'</main><script>'+'''document.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>{const im=b.closest('.card').querySelector('img'),on=b.getAttribute('aria-pressed')==='true';im.src=on?b.dataset.poster:b.dataset.play;b.setAttribute('aria-pressed',String(!on));b.textContent=on?'Play GIF':'Stop GIF'}));matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',e=>{if(e.matches)document.querySelectorAll('[data-play][aria-pressed=true]').forEach(b=>b.click())});'''+'</script></body></html>'
def still_gif(file):
 dest=file.with_suffix('.gif')
 with Image.open(file) as im:im.convert('RGB').quantize(colors=256,method=Image.Quantize.MEDIANCUT).save(dest)
 return dest
preview=root/'previews';preview.mkdir(exist_ok=True)
manifest=json.loads((preview/'manifest.json').read_text());entries=[e for e in manifest['entries'] if e['id'] in {'park-party','park-social','park-garden','boerum-cutaway','porter-cutaway','johnson-cutaway','chrysler-circuit'}]
# Add all current standalone office and component-board outputs. Sprite objects have their own complete catalogue.
for directory,group in [('office-study','Architecture'),('art-system','Components')]:
 for f in sorted((root/'assets'/directory).glob('*.png')):
  if '-4x' in f.stem or f.stem.startswith('campus'):continue
  target=preview/(directory+'-'+f.stem+'.gif')
  with Image.open(f) as im:
   im.convert('RGB').quantize(colors=256,method=Image.Quantize.MEDIANCUT).save(target)
   size=list(im.size)
  names={'creative':'Boerum frontage','production':'Porter hall','accounts':'266 Johnson','sprite-atlas':'Component overview','stage0':'Porter / structure','stage1':'Porter / floors','stage2':'Porter / fit-out','stage4':'Porter / roof','cutaway':'Porter / interior','car':'Chrysler / vehicle','stag':'Antler display','supernova':'Supernova pavilion','solarium':'Glass garden pavilion','overlook':'Orange stair overlook','reception':'Sculpted reception','cat':'Office cat','inflatable':'Inflatable castle','shark':'Shark balloon'}
  entries.append({'id':directory+'-'+f.stem,'title':names.get(f.stem,f.stem.replace('-',' ').capitalize()),'png':rel(f,preview),'gif':target.name,'kind':'still','group':group,'size':size,'route':'#art/architecture-study' if group=='Architecture' else '#art/component-kit','caption':'Current renderer output. Individual sprites and transparent GIFs are in the object catalogue.'})
# Browser-rendered document specimens are retained previews; the live DOM reader is canonical.
for f in sorted((preview/'documents').glob('*.png')):
 gif=still_gif(f);entries.append({'id':f.stem,'title':f.stem.replace('-',' ').capitalize(),'png':rel(f,preview),'gif':rel(gif,preview),'kind':'still','group':'Documents','size':list(Image.open(f).size),'route':'#art/interface-materials','caption':'Rendered fictional interface specimen. Open the live study for selectable text and controls.'})
cat=json.loads((root/'assets/sprite-catalogue/manifest.json').read_text())
for e in cat['previews']:
 entries.append({'id':Path(e['file']).stem,'title':e['title'],'png':'../assets/sprite-catalogue/'+e['poster'],'gif':'../assets/sprite-catalogue/'+e['file'],'kind':'animation','group':'Motion','size':[e['width'],e['height']],'route':'#art/boerum-street-study','caption':'36 seconds. Left, right, moonwalk left, right, left, moonwalk right.'})
# Each entry is regenerated from source lists; avoid duplicating appended entries on repeated builds.
entries=list({e['id']:e for e in entries}.values());manifest['entries']=entries;(preview/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
def preview_card(e):
 links=f'<a href="{esc(e["png"])}" download>PNG ↓</a><a href="{esc(e["gif"])}" download>{"Animation" if e["kind"]=="animation" else "Still"} GIF ↓</a><a href="../design-review.html{esc(e["route"])}">Live context →</a>'
 if e['kind']=='animation':links=f'<button data-play="{esc(e["gif"])}" data-poster="{esc(e["png"])}" aria-pressed="false">Play GIF</button>'+links
 return f'<figure class="card {"photo" if e.get("group")=="Documents" else ""}"><div class="image"><img src="{esc(e["png"])}" alt="{esc(e["title"])}" loading="lazy"></div><figcaption class="copy"><span class="meta">{e["size"][0]} × {e["size"][1]} / {esc(e["kind"].upper())}</span><h3>{esc(e["title"])}</h3><p>{esc(e["caption"])}</p><div class="links">{links}</div></figcaption></figure>'
body='<div class="intro"><div><span class="status">CURRENT / ART '+project['artRevision']+'</span><h1>Preview library</h1><p>Scenes, motion, architecture and document materials. Every preview has a GIF download; static views are labelled as stills.</p></div><aside><b>Need an individual object?</b><p>The sprite catalogue contains all 44 objects, 121 frame slots, transparent sheets and labelled animation sequences.</p><a href="../assets/sprite-catalogue/index.html">Open the object catalogue ↗</a></aside></div><nav class="jump">'+''.join(f'<a href="#{s.lower()}">{s}</a>' for s in ['Scenes','Motion','Architecture','Components','Documents'])+'</nav>'
for group in ['Scenes','Motion','Architecture','Components','Documents']:
 chosen=[e for e in entries if e.get('group', 'Motion' if e['kind']=='animation' else 'Scenes')==group]
 if not chosen:continue
 body+=f'<h2 id="{group.lower()}">{group}</h2><div class="grid {"small-grid" if group=="Components" else ""}">'+''.join(preview_card(e) for e in chosen)+'</div>'
body+='<p class="foot">GIF palettes can reduce colour count. PNG remains the source image. Photographic references are outside the original sprite library. <a href="../archive/index.html">Previous studies and review captures →</a></p>'
(preview/'index.html').write_text(shell('Preview library',body,preview))
# Archive: chronological only where a revision is known from content or filename.
archive=root/'archive';records=[]
for f in sorted(archive.rglob('*')):
 if f.is_file() and f.name not in ['index.html','inventory.json']:
  records.append({'file':rel(f,archive),'bytes':f.stat().st_size,'classification':f.relative_to(archive).parts[0]})
(archive/'inventory.json').write_text(json.dumps({'status':'superseded-or-quarantined','notCurrentSpecification':True,'files':records},indent=2)+'\n')
body='<div class="intro"><div><span class="status archive">SUPERSEDED / REFERENCE ONLY</span><h1>Project archive</h1><p>Previous specifications, visual studies, review captures and construction files. Current work is kept in the design reader and preview library.</p></div><aside><b>Read the status before the artifact.</b><p>Archived claims, TODOs, links and test results describe an earlier state. They are not current decisions or present verification.</p><a href="../design-review.html">Return to the current document →</a></aside></div><div class="archive-notice"><p>Older HTML is stored as source text so it cannot appear as a competing live reader. Unknown-version captures stay unversioned; file dates were not used to invent a sequence.</p></div>'
body+='<nav class="jump">'+''.join(f'<a href="#{x}">{label}</a>' for x,label in [('previews','Review captures'),('versions','Versioned source'),('superseded-art','Earlier art'),('legacy-explainer','Legacy explainer'),('quarantine','Quarantine')])+'</nav>'
body+='<h2 id="previews">Review captures</h2>'
for directory in sorted((archive/'previews').glob('*')):
 images=sorted([f for f in directory.iterdir() if f.suffix.lower() in ['.png','.jpg','.webp']]);
 if not images:continue
 body+=f'<h3>{esc(directory.name if directory.name=="unversioned" else "Revision "+directory.name)}</h3><div class="grid small-grid">'
 for f in images:
  gif=still_gif(f);name=f.stem.replace('-',' ')
  body+=f'<figure class="card photo"><a class="image" href="{esc(rel(f,archive))}"><img src="{esc(rel(f,archive))}" alt="Archived review capture: {esc(name)}" loading="lazy"></a><figcaption class="copy"><span class="meta">ARCHIVED / {esc(directory.name)}</span><h3>{esc(name)}</h3><div class="links"><a href="{esc(rel(f,archive))}" download>PNG ↓</a><a href="{esc(rel(gif,archive))}" download>Still GIF ↓</a></div></figcaption></figure>'
 body+='</div>'
for group,label,description in [('versions','Versioned source','Frozen documents and renderer baselines. Version 0.7 is retained by the sprite regression check.'),('superseded-art','Earlier art','The palette-only directions were superseded by the original component system.'),('legacy-explainer','Legacy explainer','Historical research artifact. Its withdrawn interpretations are identified in the current evidence map.'),('construction-scripts','Construction scripts','One-off patches and drawing fragments. Do not run these against current source.'),('reference-framework','Reference framework','An earlier structural reference, not the current reader implementation.'),('superseded-fonts','Superseded fonts','The current reader uses Geist and Geist Mono.'),('checks','Earlier checks','Recorded results from previous revisions; not a substitute for current QA.'),('quarantine','Quarantine','Unused third-party mod files and transient old export metadata. Not imported by the game or build.')]:
 files=[f for f in records if f['classification']==group];body+=f'<h2 id="{group}">{label}</h2><p>{description}</p>'
 if group=='superseded-art':
  body+='<div class="grid small-grid">'
  for f in sorted((archive/group).glob('*-study.png')):
   gif=still_gif(f);body+=f'<figure class="card"><a class="image" href="{rel(f,archive)}"><img src="{rel(f,archive)}" alt="Superseded {esc(f.stem)}" loading="lazy"></a><figcaption class="copy"><h3>{esc(f.stem.replace("-"," "))}</h3><div class="links"><a href="{rel(f,archive)}" download>PNG ↓</a><a href="{rel(gif,archive)}" download>Still GIF ↓</a></div></figcaption></figure>'
  body+='</div>'
 body+='<details><summary>'+str(len(files))+' retained files</summary><div class="file-list">'+''.join(f'<a href="{esc(f["file"])}" download>{esc(f["file"])}<span>{f["bytes"]:,} bytes</span></a>' for f in files)+'</div></details>'
body+='<p class="foot"><a href="inventory.json" download>Download archive inventory ↓</a> · <a href="../design-review.html#production/change-record">Current change record →</a></p>'
(archive/'index.html').write_text(shell('Project archive',body,archive))
# Include generated GIFs in the archive inventory after the conversion pass.
records=[{'file':rel(f,archive),'bytes':f.stat().st_size,'classification':f.relative_to(archive).parts[0]} for f in sorted(archive.rglob('*')) if f.is_file() and f.name not in ['index.html','inventory.json']]
(archive/'inventory.json').write_text(json.dumps({'status':'superseded-or-quarantined','notCurrentSpecification':True,'files':records},indent=2)+'\n')
print(json.dumps({'currentPreviews':len(entries),'archivedFiles':len(records)}))
