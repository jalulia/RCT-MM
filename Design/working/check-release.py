"""Validate the published reader, libraries and asset manifests as one static project."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from collections import Counter
import re,json,hashlib,zipfile
root=Path(__file__).resolve().parents[2]
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.refs=[];self.text=[];self.ignore=0;self.feed(text)
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if d.get('id'):self.ids.append(d['id'])
  for key in ['href','src']:
   if d.get(key):self.refs.append((tag,key,d[key]))
  if tag in ['script','style']:self.ignore+=1
 def handle_endtag(self,tag):
  if tag in ['script','style']:self.ignore=max(0,self.ignore-1)
 def handle_data(self,data):
  if not self.ignore:self.text.append(data)
files=[root/'index.html',root/'Design/design-review.html',root/'Design/previews/index.html',root/'Design/archive/index.html',root/'Design/assets/sprite-catalogue/index.html']
if (root/'Refs/index.html').exists():files.append(root/'Refs/index.html')
pages={f:Page(f.read_text()) for f in files};errors=[];checked=0;external=set()
manifest=json.loads((root/'Design/assets/sprite-catalogue/manifest.json').read_text());object_ids={o['id'] for o in manifest['objects']}
for file,page in pages.items():
 for id,n in Counter(page.ids).items():
  if n>1:errors.append(f'Duplicate ID {file.relative_to(root)} #{id}')
 for tag,key,ref in page.refs:
  u=urlsplit(ref)
  if u.scheme in ['http','https','mailto','data','blob']:
   if u.scheme in ['http','https']:external.add(ref)
   continue
  if u.scheme=='file' or u.path.startswith('/'):
   errors.append(f'Nonportable link: {ref}');continue
  target=(file.parent/unquote(u.path)).resolve() if u.path else file
  if not target.is_relative_to(root):errors.append('Escapes project: '+ref);continue
  if not target.exists():errors.append(f'Missing {file.relative_to(root)} → {ref}');continue
  checked+=1
  if u.fragment and target in pages:
   ids=pages[target].ids;frag=unquote(u.fragment)
   valid=frag in ids or ('page-'+frag in ids and target.name=='design-review.html') or (target==root/'Design/assets/sprite-catalogue/index.html' and frag in object_ids)
   if not valid:errors.append(f'Missing anchor {file.relative_to(root)} → {ref}')
 # CSS URLs have the HTML page as their base in these compiled files.
 for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)',file.read_text()):
  if ref.startswith(('#','data:','https:')) or '${' in ref:continue
  target=(file.parent/unquote(ref)).resolve()
  if not target.exists():errors.append(f'Missing CSS asset: {file.relative_to(root)} → {ref}')
 if file.name=='design-review.html':
  text=' '.join(page.text)
  if re.search(r'\bJulia\b',text):errors.append('Personal callout in published reader')
  if 'four coordinated views' in text:errors.append('Stale four-view model')
  if 'P-08 / supplier' in text:errors.append('Stale supplier ID')
  if 'STUDY 02' in text:errors.append('Stale art study numbering')
# Check authored documents as well as their compiled HTML routes.
markdown_files=[root/'README.md',root/'ATTRIBUTION.md',root/'Design/RELEASE-REVIEW.md',root/'Design/qa/README.md',root/'Refs/README.md',root/'Design/GDD.md',root/'Design/evidence-map.md',*sorted((root/'Design/research').glob('*.md')),*sorted((root/'Design/binding').glob('*.md'))]
markdown_checked=0
for file in markdown_files:
 for ref in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)',file.read_text()):
  u=urlsplit(ref.strip('<>'))
  if u.scheme in ['http','https','mailto'] or not u.path:continue
  target=(file.parent/unquote(u.path)).resolve()
  if not target.is_relative_to(root) or not target.exists():errors.append(f'Missing authored link {file.relative_to(root)} → {ref}')
  markdown_checked+=1
for o in manifest['objects']:
 for item in [o['sheet'],*o['variants'],*o.get('gifSequences',[])]:
  if not (root/'Design/assets/sprite-catalogue'/item['file']).exists():errors.append('Missing object export '+item['file'])
 assert all(v.get('gif') for v in o['variants']),o['id']+' missing GIFs'
 assert o['sheet'].get('gif'),o['id']+' missing sheet GIF'
binding=json.loads((root/'Design/binding/episode-01.bindings.json').read_text())
assert binding['historicalInteractionEnabled'] is False
case=(root/'Design/binding'/binding['caseSource']['file']).resolve()
assert hashlib.sha256(case.read_bytes()).hexdigest()==binding['caseSource']['sha256']
assert len(object_ids)==44 and sum(len(o['variants']) for o in manifest['objects'])==121
for source in manifest['sources']:
 file=(root/'Design/assets/sprite-catalogue'/source['file']).resolve()
 assert hashlib.sha256(file.read_bytes()).hexdigest()==source['sha256'],source['file']+' stale export'
for e in json.loads((root/'Design/previews/manifest.json').read_text())['entries']:
 for key in ['png','gif']:
  if not (root/'Design/previews'/e[key]).exists():errors.append('Missing preview '+e[key])
with zipfile.ZipFile(root/'Design/assets/sprite-catalogue/mad-money-sprite-catalogue.zip') as z:
 assert z.testzip() is None
 names=z.namelist();assert any(x.endswith('fonts/OFL.txt') for x in names),'Font licence missing in ZIP'
report={'designRevision':'0.9','artRevision':manifest['revision'],'htmlPagesChecked':len(pages),'internalReferencesChecked':checked,'authoredReferencesChecked':markdown_checked,'externalReferenceURLs':len(external),'readerPages':len(json.loads((root/'Design/working/reader-map.json').read_text())),'objects':len(object_ids),'frames':sum(len(o['variants']) for o in manifest['objects']),'historicalInteractionEnabled':False,'sourcePdfHashMatches':True,'spriteSourceHashesMatch':True,'errors':errors}
(root/'Design/qa').mkdir(exist_ok=True);(root/'Design/qa/release-checks.json').write_text(json.dumps(report,indent=2)+'\n')
(root/'Design/qa/external-links.json').write_text(json.dumps(sorted(external),indent=2)+'\n')
print(json.dumps(report,indent=2))
if errors:raise SystemExit(1)
