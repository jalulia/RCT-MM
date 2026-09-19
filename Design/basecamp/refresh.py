"""Build the portable catalogue and source extracts from catalogue.json."""
from pathlib import Path
import json,html
p=Path(__file__).parent
d=json.loads((p/'catalogue.json').read_text());E=html.escape
out=['# '+d['title']+' · wip','','## record types','']
for t in d['types'].values():out+=['- '+t['label']+': '+t['definition']]
out+=['','## implementation stages','']+['- '+k+': '+v for k,v in d['implementationStates'].items()]
out+=['','## design foundations','']
for x in d['decisions']:out+=['### '+x['title']+' · '+x['state'],'',x['definition'],'',x['question'],'']
for e in d['entries']:
 out+=['## '+e['id']+' · '+e['title'],'',d['types'][e['type']]['label']+' / '+e['implementation'],'',e['lead'],'','activity: '+e['verb'],'','scope: '+e['scope'],'','availability: '+e['availability'],'','test question: '+e['question'],'','unresolved scope: '+e['limit'],'','revision: '+e['revision'],'']
 if e['loop']:out+=['sequence: '+' → '.join(e['loop']),'']
 if e.get('facts'):out += ['- '+k+': '+v for k,v in e['facts'].items()]+['']
 out+=['sources: '+', '.join(e['sources']),'']
 for media in e.get('media',[]):out+=['preview: '+media['kind']+' · '+media['caption']+' · '+(media.get('motion') or media['poster']),'']
out+=['## relationships','']
entries={e['id']:e for e in d['entries']}
for r in d['relations']:out+=['- '+entries[r['from']]['title']+' '+r['type']+' '+entries[r['to']]['title']+': '+r['label']]
out+=['','## interaction studies','']
for m in d['mechanisms']:out+=['### '+m['title'],'']+['- '+x for x in m['alternatives']]+['',m['scope'],'','sources: '+', '.join(m['sources']),'']
out+=['## sources','']
for s in d['sources']:out+=['### '+s['id']+' · '+s['title'],'',s['revision'],'']+['- '+x for x in s['points']]+['',s['url'] or s['excerpt'],'']
out+=['## unresolved scope','']+['- '+g['title']+': '+g['basis'] for g in d['gaps']]
md='\n'.join(out)+'\n';(p/'catalogue.md').write_text(md)
(p/'catalogue-data.js').write_text('window.BASECAMP = '+json.dumps(d,ensure_ascii=False)+';\nwindow.BASECAMP_MARKDOWN = '+json.dumps(md,ensure_ascii=False)+';\n')
def page(title,body):return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+E(title)+' · basecamp wip</title><link rel="stylesheet" href="../basecamp.css"></head><body><main class="source-body"><a href="../index.html#sources">← basecamp</a><h1>'+E(title)+'</h1>'+body+'</main></body></html>'
for s in d['sources']:
 body='<p class="mono">'+E(s['id']+' / '+s['revision'])+'</p><ul>'+''.join('<li>'+E(x)+'</li>' for x in s['points'])+'</ul>'
 if s['url']:body+='<p class="source-origin"><a target="_blank" rel="noopener" href="'+E(s['url'],quote=True)+'">original specification or implementation ↗</a></p>'
 (p/s['excerpt']).write_text(page(s['title'],body))
body='<p>purpose and audience determine the intended experience. format provides the medium. role and agency define the available actions. session outcomes define completion.</p>'
for x in d['decisions']:body+='<h2>'+E(x['title'])+'</h2><p>'+E(x['definition'])+'</p><p><span class="state outlined">open</span> '+E(x['question'])+'</p>'
body+='<p class="source-origin"><a href="../index.html#structure">concepts, scenarios and relationships →</a></p>'
(p/'sources/discussion.html').write_text(page('game structure',body))
(p/'sources/discussion.md').write_text('# game structure\n\n'+'\n\n'.join('## '+x['title']+'\n\n'+x['definition']+'\n\nopen: '+x['question'] for x in d['decisions'])+'\n')
print(f"{len(d['entries'])} records, {len(d['relations'])} relationships, {len(d['sources'])} source extracts")
