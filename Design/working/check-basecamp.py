"""Check catalogue relationships, exports and portable publication content."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
from html.parser import HTMLParser
import json,re
from PIL import Image
from xml.etree import ElementTree
root=Path(__file__).resolve().parents[2];base=root/'Design/basecamp';d=json.loads((base/'catalogue.json').read_text());errors=[]
ids={e['id'] for e in d['entries']};sources={s['id'] for s in d['sources']}
assert len(ids)==len(d['entries'])==15
assert len(sources)==len(d['sources'])
for e in d['entries']:
 assert e['type'] in d['types'],e['id']
 assert e['implementation'] in d['implementationStates'],e['id']
 assert set(e['sources'])<=sources,e['id']
 assert all(k in e for k in ['scope','availability','limit','question']),e['id']
 if e.get('image'):assert (base/e['image']).is_file(),e['id']
 assert e.get('media'),e['id']+' missing preview'
 for media in e['media']:
  assert media['kind'] and media['caption']
  assert (base/media['poster']).is_file()
  if media['poster'].endswith('.svg'):ElementTree.parse(base/media['poster'])
  if media.get('motion'):
   with Image.open(base/media['motion']) as im:assert im.n_frames>1,(e['id'],'GIF must contain animation')
for r in d['relations']:
 assert r['from'] in ids and r['to'] in ids
 assert r['type'] in d['relationTypes']
 if r['type']=='tests':
  assert next(e for e in d['entries'] if e['id']==r['from'])['type']=='playables'
  assert next(e for e in d['entries'] if e['id']==r['to'])['type']=='concepts'
for m in d['mechanisms']:assert set(m['sources'])<=sources
for b in d['branches']:assert set(b['entries'])<=ids
assert next(e for e in d['entries'] if e['id']=='e13')['loop']==[]
assert all(x['state']=='open' for x in d['decisions'])
assert len({tuple(e['facts'].items()) for e in d['entries'] if e['type']=='playables'})==3
js=(base/'catalogue-data.js').read_text();prefix='window.BASECAMP = ';middle=';\nwindow.BASECAMP_MARKDOWN = '
a,b=js[len(prefix):].split(middle,1);assert json.loads(a)==d
assert json.loads(b.removesuffix(';\n'))==(base/'catalogue.md').read_text()
class Page(HTMLParser):
 def __init__(self,text):super().__init__();self.refs=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for k in ['href','src']:
   if k in a:self.refs.append(a[k])
checked=0
for p in base.rglob('*'):
 if not p.is_file() or p.suffix not in ['.html','.json','.md','.js','.svg']:continue
 text=p.read_text()
 assert not re.search(r'\b(?:julia|brittany|chris|sam|matt|user|assistant|chatgpt)\b|file:///|/Users/|user-supplied|this pass|in this conversation',text,re.I),p
 if p.suffix=='.html':
  for ref in Page(text).refs:
   u=urlsplit(ref)
   if u.scheme:
    assert u.scheme in ['https','http'],(p,ref)
   elif u.path:assert (p.parent/unquote(u.path)).exists(),(p,ref)
   checked+=1
for s in d['sources']:assert (base/s['excerpt']).exists()
assert 'basecamp/index.html' in (root/'Design/working/build-review.mjs').read_text()
assert 'basecamp/index.html' in (root/'Design/design-review.html').read_text()
assert '../basecamp/index.html' in (root/'Design/whiteboard/index.html').read_text()
print(f'basecamp: {len(ids)} records, {len(d["relations"])} relationships, {checked} HTML references, portable content and matching exports')
