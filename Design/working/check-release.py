"""Validate the published reader, libraries and asset manifests as one static project."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from collections import Counter
import re,json,hashlib,zipfile
root=Path(__file__).resolve().parents[2]
project=json.loads((root/'Design/project.json').read_text())
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
files=[root/'index.html',root/'Design/design-review.html',root/'Design/previews/index.html',root/'Design/episode-01/index.html',root/'Design/archive/index.html',root/'Design/assets/sprite-catalogue/index.html']
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
  if re.search(r'\bP-08\b',text):errors.append('Stale supplier ID')
  if re.search(r'(?:from|in|used in) the park inspector',text):errors.append('Retired document entry point')
  if 'Five inspector views preserve' in text:errors.append('Architectural explorer incorrectly claims operational views')
  if 'STUDY 02' in text:errors.append('Stale art study numbering')
# Check authored documents as well as their compiled HTML routes.
markdown_files=[root/'README.md',root/'ATTRIBUTION.md',root/'Design/RELEASE-REVIEW.md',root/'Design/qa/README.md',root/'Refs/README.md',root/'Design/GDD.md',root/'Design/episode-01/README.md',root/'Design/evidence-map.md',*sorted((root/'Design/research').glob('*.md')),*sorted((root/'Design/binding').glob('*.md'))]
markdown_checked=0
reader=root/'Design/design-review.html'
reader_map=json.loads((root/'Design/working/reader-map.json').read_text())
reader_ids=set(pages[reader].ids)
route_by_file={entry['file']:entry['id'] for entry in reader_map}
for file in markdown_files:
 for ref in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)',file.read_text()):
  u=urlsplit(ref.strip('<>'))
  if u.scheme in ['http','https','mailto']:continue
  target=(file.parent/unquote(u.path)).resolve() if u.path else file
  if not target.is_relative_to(root) or not target.exists():errors.append(f'Missing authored link {file.relative_to(root)} → {ref}')
  if u.fragment:
   frag=unquote(u.fragment)
   if target in pages:
    valid=frag in pages[target].ids or 'page-'+frag in pages[target].ids or (target.name=='index.html' and frag in object_ids)
   elif target.suffix=='.md' and target.is_relative_to(root/'Design'):
    relative=target.relative_to(root/'Design').as_posix();route=route_by_file.get(relative)
    valid=frag in reader_ids or 'page-'+frag in reader_ids or (route and route+'/'+frag in reader_ids)
    if relative=='GDD.md':valid=valid or any(h['id'].endswith('/'+frag) for entry in reader_map if entry['file']=='GDD.md' for h in entry['headings'])
   else:valid=True # PDF page locators and external formats retain their own fragments.
   if not valid:errors.append(f'Missing authored anchor {file.relative_to(root)} → {ref}')
  markdown_checked+=1
# Current release metadata must agree; archived releases are deliberately excluded.
assert manifest['revision']==project['artRevision']
preview_manifest=json.loads((root/'Design/previews/manifest.json').read_text())
assert preview_manifest['artRevision']==project['artRevision']
for filename in ['package.json','package-lock.json']:
 assert json.loads((root/filename).read_text())['version']==project['designRevision']+'.0'
assert 'Revision '+project['designRevision']+' ·' in (root/'Design/GDD.md').read_text()
assert 'Reviewed for edition '+project['designRevision']+' ·' in (root/'Design/evidence-map.md').read_text()
assert project['status']['historicalInteractionEnabled'] is False
plan=json.loads((root/'Design/working/production-plan.json').read_text())
assert plan['designRevision']==project['designRevision']
phase_table=re.search(r'<!-- production:table -->([\s\S]*?)<!-- /production:table -->',(root/'Design/GDD.md').read_text()).group(1)
source_phases=[]
for row in phase_table.strip().splitlines()[2:]:
 phase,status,output,gate=[cell.strip() for cell in row.split('|')[1:-1]]
 id,title=phase.split(' · ')
 source_phases.append(dict(id=id,title=title,status=status,output=output,gate=gate))
assert plan['phases']==source_phases,'Rebuild the reader after changing the GDD production table'
assert [p['id'] for p in plan['phases']]==['P'+str(i) for i in range(8)]
assert next(p for p in plan['phases'] if p['id']==project['focus']['phase'])['status']=='Ready for playtest'
assert 'parallel' in next(p for p in plan['phases'] if p['id']==project['focus']['parallelPhase'])['status']
assert project['focus']['route'] in reader_ids
published_text=' '.join(pages[reader].text)
for phase in plan['phases']:
 assert 'production/phase-'+phase['id'].lower() in reader_ids
 for key in ['title','status','output','gate']:
  assert phase[key] in published_text,(phase['id'],key,'missing from published plan')
assert {entry['title'] for entry in preview_manifest['entries'] if entry['id'] in ['art-system-stage0','art-system-stage1','art-system-stage2','art-system-stage4']}=={'Porter / footprint','Porter / shell','Porter / contents','Porter / roof'}
for o in manifest['objects']:
 for item in [o['sheet'],*o['variants'],*o.get('gifSequences',[])]:
  if not (root/'Design/assets/sprite-catalogue'/item['file']).exists():errors.append('Missing object export '+item['file'])
 assert all(v.get('gif') for v in o['variants']),o['id']+' missing GIFs'
 assert o['sheet'].get('gif'),o['id']+' missing sheet GIF'
binding=json.loads((root/'Design/binding/episode-01.bindings.json').read_text())
assert binding['historicalInteractionEnabled'] is False
assert binding['readinessDecision']=='episode-01-draft.md#8-readiness-decision'
assert 'binding/8-readiness-decision' in reader_ids
assert 'S-08' in binding['practiceBoundary']['fixtureIDs']
case=(root/'Design/binding'/binding['caseSource']['file']).resolve()
assert hashlib.sha256(case.read_bytes()).hexdigest()==binding['caseSource']['sha256']
assert len(object_ids)==44 and sum(len(o['variants']) for o in manifest['objects'])==136
for source in manifest['sources']:
 file=(root/'Design/assets/sprite-catalogue'/source['file']).resolve()
 assert hashlib.sha256(file.read_bytes()).hexdigest()==source['sha256'],source['file']+' stale export'
for e in json.loads((root/'Design/previews/manifest.json').read_text())['entries']:
 for key in ['png','gif']:
  if not (root/'Design/previews'/e[key]).exists():errors.append('Missing preview '+e[key])
# Captures must identify the current executable model and shared scene sources.
capture=json.loads((root/'Design/previews/episode/manifest.json').read_text())
for directory,data in [(root/'Design/previews/episode',capture),(root/'Design/previews',preview_manifest)]:
 for source in data['sources']:
  file=(directory/source['file']).resolve()
  assert file.is_relative_to(root) and file.is_file(),source['file']
  assert hashlib.sha256(file.read_bytes()).hexdigest()==source['sha256'],source['file']+' capture source changed; recapture or rebuild'
assert len(capture['entries'])==14
assert sum(e['kind']=='animation' for e in capture['entries'])==5
assert project['current']['episode']=='episode-01/index.html'
assert 'not implemented' not in project['status']['practiceEpisode']
for name in ['episode-engine-checks.json','episode-browser-checks.json']:
 assert json.loads((root/'Design/qa'/name).read_text())['passed'] is True
with zipfile.ZipFile(root/'Design/assets/sprite-catalogue/mad-money-sprite-catalogue.zip') as z:
 assert z.testzip() is None
 names=z.namelist();assert any(x.endswith('fonts/OFL.txt') for x in names),'Font licence missing in ZIP'
 for name in names:
  member=(root/'Design/assets/sprite-catalogue'/name.split('/',1)[1]).resolve()
  assert member.is_relative_to(root/'Design/assets/sprite-catalogue') and member.is_file(),name
  assert z.read(name)==member.read_bytes(),'Stale ZIP member: '+name
zip_members_checked=len(names)
report={'designRevision':json.loads((root/'Design/project.json').read_text())['designRevision'],'artRevision':manifest['revision'],'phaseRecordsChecked':len(plan['phases']),'zipMembersByteMatched':zip_members_checked,'htmlPagesChecked':len(pages),'internalReferencesChecked':checked,'authoredReferencesChecked':markdown_checked,'externalReferenceURLs':len(external),'readerPages':len(json.loads((root/'Design/working/reader-map.json').read_text())),'objects':len(object_ids),'frames':sum(len(o['variants']) for o in manifest['objects']),'historicalInteractionEnabled':False,'sourcePdfHashMatches':True,'spriteSourceHashesMatch':True,'episodeCaptureSourceHashesMatch':True,'episodeCaptures':len(capture['entries']),'errors':errors}
(root/'Design/qa').mkdir(exist_ok=True);(root/'Design/qa/release-checks.json').write_text(json.dumps(report,indent=2)+'\n')
(root/'Design/qa/external-links.json').write_text(json.dumps(sorted(external),indent=2)+'\n')
print(json.dumps(report,indent=2))
if errors:raise SystemExit(1)
