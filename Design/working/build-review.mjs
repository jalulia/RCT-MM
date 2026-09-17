import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { figures,views } from './figures.mjs';
import { artFigures } from './art-figures.mjs';
import { officeFigures } from './office-figures.mjs';
import { bindingFigures } from './binding-figures.mjs';
import { parkFigures } from './park-figures.mjs';
import { editorialFigures, readerPreviewLinks } from './editorial-figures.mjs';
import { materialFigures } from './document-materials.mjs';
Object.assign(figures,artFigures,officeFigures,bindingFigures,parkFigures,materialFigures,editorialFigures);
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const strip=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').trim();
const slug=s=>strip(s).toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');
const names=[['game','Game','Player role and the two structures to test.'],['episode','First episode','One campaign, one payment conflict, fifteen minutes.'],['objects','Objects & systems','Relationships, operating rules and the economy.'],['narrative','Narrative','Chapter sequence, events and characters.'],['interface','Interface','Views, desk layouts and evidence displays.'],['art','Art & sound','Pixel system, component kit, assembled scene and interface.'],['production','Build & test','Architecture, source review and decision gates.']];
const chapters=read('GDD.md').split(/^## \d+\. /m).slice(1);
const pages=chapters.map((s,i)=>({id:names[i][0],title:names[i][1],summary:names[i][2],number:String(i+1).padStart(2,'0'),file:'GDD.md',markdown:s.slice(s.indexOf('\n')).trim().replace(/^### /gm,'## ')}));
pages.push({id:'evidence',title:'Evidence',summary:'Source scope, cast, corrections and all 48 techniques.',number:'08',file:'evidence-map.md',markdown:read('evidence-map.md').replace(/^# .*\n/,'').replace(/^Working revision.*\n/m,'')});
for(const [id,title,file] of [['systems','Game systems research','systems.md'],['ux','Interface research','ux.md'],['refinement','Sprite refinement','sprite-refinement-0.8.md'],['offices','Office architecture','office-art-research.md'],['discoveries','Office discoveries','campus-discoveries.md'],['park','Park interaction study','park-logic-review.md']])if(fs.existsSync(path.join(root,'research',file)))pages.push({id:'research-'+id,title,number:'R'+(pages.length-7),file:'research/'+file,markdown:read('research/'+file).replace(/^# .*\n/,'')});
for(const [id,title,file,number] of [['binding','Episode 01 binding','episode-01-draft.md','B01'],['binding-inventory','Source inventory','native-inventory.md','B02']])if(fs.existsSync(path.join(root,'binding',file)))pages.push({id,title,number,file:'binding/'+file,markdown:read('binding/'+file).replace(/^# .*\n/,'')});
const routesByFile={'GDD.md':'game','evidence-map.md':'evidence','research/systems.md':'research-systems','research/ux.md':'research-ux','research/sprite-refinement-0.8.md':'research-refinement','research/office-art-research.md':'research-offices','research/campus-discoveries.md':'research-discoveries','research/park-logic-review.md':'research-park','binding/episode-01-draft.md':'binding','binding/native-inventory.md':'binding-inventory'};
const allIds=new Set();
for(const p of pages){
 const headings=[];
 let html=marked.parse(p.markdown);
 html=html.replace(/<!-- figure:([a-z-]+) -->/g,(_,k)=>{if(!figures[k])throw new Error('Missing figure '+k);let index=0;return figures[k].replace(/<svg[\s\S]*?<\/svg>/g,s=>{const key=k+'-'+index++;return s.replaceAll('id="arrow"',`id="arrow-${key}"`).replaceAll('url(#arrow)',`url(#arrow-${key})`).replaceAll('id="hatch"',`id="hatch-${key}"`).replaceAll('url(#hatch)',`url(#hatch-${key})`)})});
 html=html.replace(/<img([^>]*?)src="([^"]+)"/g,(full,attrs,src)=>{if(/^(https?:|data:)/.test(src)||src.startsWith('assets/'))return full;const normalized=path.posix.normalize(path.posix.join(path.posix.dirname(p.file),src));return '<img'+attrs+'src="'+esc(normalized)+'"'});
 html=html.replace(/<h([23])>(.*?)<\/h\1>/gs,(full,level,t)=>{
  const base=slug(t);let id=p.id+'/'+base,inc=2;while(allIds.has(id))id=p.id+'/'+base+'-'+inc++;
  allIds.add(id);headings.push({id,title:strip(t),level:Number(level)});
  return `<h${level} id="${id}"><a class="section-anchor" href="#${id}">${t}</a></h${level}>`;
 });
 html=html.replace(/(<h2[^>]*>[^\n]*?<\/h2>)\s*(<figure class="plate(?: art-plate)?"[^>]*><figcaption><span class="figure-id">[^<]*<\/span>)<strong>[^<]*<\/strong>/g,(_,heading,figure)=>figure+heading);
 html=html.replaceAll('<table>','<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable specification table"><table>').replaceAll('</table>','</table></div>');
 html=html.replace(/href="([^"#][^"]*)"/g,(full,href)=>{
   if(/^(https?:|mailto:)/.test(href))return `href="${href}" target="_blank" rel="noopener"`;
   if(href.startsWith('/')||href.startsWith('file:'))throw new Error('Nonportable link: '+href);
   const [file,hash]=href.split('#');let normalized=path.posix.normalize(path.posix.join(path.posix.dirname(p.file),file));
   if(normalized==='design-review.html')return `href="#${esc(hash||'contents')}"`;
   const canonical=routesByFile[normalized]||routesByFile[file];
   if(canonical)return `href="#${canonical}${hash?'/'+hash:''}"`;
   return `href="${esc(normalized)}${hash?'#'+esc(hash):''}"`;
 });
 html=html.replace(/<p>(<img[^>]+>)<\/p>/g,(_,img)=>{
  const src=img.match(/src="([^"]+)"/)?.[1]||'',alt=img.match(/alt="([^"]*)"/)?.[1]||'Current art example';
  const object=src.match(/objects\/([^/]+)\//)?.[1];
  const href='assets/sprite-catalogue/index.html'+(object?'#'+object:'');
  return `<figure class="inline-example"><a href="${href}">${img}</a><figcaption>${alt}<a href="${href}">Inspect ${object||'catalogue'} ↗</a></figcaption></figure>`;
 });
 const starts=[html.indexOf('<h2'),html.indexOf('<figure')].filter(x=>x>=0);const first=starts.length?Math.min(...starts):-1;
 p.intro=first>=0?html.slice(0,first):'';p.body=first>=0?html.slice(first):html;p.headings=headings;
}
const nav=pages.slice(0,8).map(p=>`<a href="#${p.id}" data-page="${p.id}"><span>${p.number}</span>${esc(p.title)}</a>`).join('');
const refs=pages.slice(8).map(p=>`<a class="reference-link" href="#${p.id}" data-page="${p.id}"><span>${p.number}</span>${esc(p.title.replace(' research',''))}</a>`).join('');
const sourceCard=(large=false)=>`<a class="source-document ${large?'source-document-large':''}" href="../The_Zero_Machine_Specific_Story_Reconstruction%20FINAL.pdf#page=1" target="_blank" aria-label="Open The Zero Machine PDF, 58 pages"><span class="source-page"><img src="assets/zero-machine-page-01.png" alt="Actual first page of The Zero Machine, September 2, 2026" loading="lazy"></span><span class="source-description"><span class="source-code">CASE-01 · 58 PAGES</span><strong>The Zero Machine</strong><span>Specific story reconstruction</span><span class="source-open">Open document ↗</span></span></a>`;
const contents=`<section class="contents-page" id="page-contents"><aside class="chapter-notes index-notes"><span class="note-id">GDD / 16 SEPTEMBER 2026</span><h1>Design document</h1><p class="index-intro">Game structure, narrative, interface and production plan.</p>${sourceCard(true)}<p class="scope-note">The reconstruction and selected first-episode exports have been inspected. Original statements and key identity links remain open. <a href="#evidence/what-has-actually-been-read">Source scope ↗</a></p></aside><div class="contents-main">${readerPreviewLinks}<div class="index-label"><h2>Contents</h2><span>08 CHAPTERS</span></div><div class="contents-rows">${pages.slice(0,8).map(p=>`<a class="contents-row" href="#${p.id}"><span>${p.number}</span><h2>${esc(p.title)}</h2><p>${p.summary}</p><span aria-hidden="true">↗</span></a>`).join('')}</div><div class="reference-index"><div><h2>Research & source work</h2></div><ul>${pages.slice(8).map(p=>`<li><a href="#${p.id}">${p.title}<span aria-hidden="true">↗</span></a></li>`).join('')}</ul></div></div></section>`;
const sections=pages.map((p,i)=>`<section class="reader-page" id="page-${p.id}" hidden aria-labelledby="title-${p.id}"><aside class="chapter-notes"><div class="note-id">${i<8?'CHAPTER':'REFERENCE'} / ${p.number}</div><header class="chapter-heading"><h1 id="title-${p.id}" tabindex="-1">${esc(p.title)}</h1></header>${p.intro?`<div class="${i<7?'chapter-intro':'source-preface'}">${p.intro}</div>`:''}<nav class="page-links" aria-label="In ${esc(p.title)}">${p.headings.filter(x=>x.level===2).map((h,i)=>`<a href="#${h.id}"><span>${String(i+1).padStart(2,'0')}</span>${esc(h.title)}</a>`).join('')}</nav>${[1,7].includes(i)?sourceCard(i===7):`<div class="release-note">DESIGN 0.9 / ART 0.8<br><a href="previews/index.html">Current previews ↗</a><br><a href="assets/sprite-catalogue/index.html">Object catalogue ↗</a><br><a href="archive/index.html">Archive ↗</a></div>`}${i>=7?`<div class="document-tools"><a href="${p.file}">Editable source ↗</a></div>`:''}</aside><div class="chapter-main"><article class="article-body">${i>=8?'<p class="reference-status">Supporting research and binding notes. Current design decisions are maintained in the game, interface and build chapters. Source limits remain attached to each claim.</p>':''}${p.body}</article><nav class="chapter-footer" aria-label="Chapter navigation"><a href="#${i===0?'contents':pages[i-1].id}"><small>Previous</small>${i===0?'Contents':esc(pages[i-1].title)}</a><a href="#${i===pages.length-1?'contents':pages[i+1].id}"><small>${i===pages.length-1?'Return to':'Next'}</small>${i===pages.length-1?'Contents':esc(pages[i+1].title)} →</a></nav></div></section>`).join('');
const metadata=pages.map(({id,title,number,headings})=>({id,title,number,headings}));
const jsData=JSON.stringify({pages:metadata,views}).replaceAll('<','\\u003c');
const script=read('working/review.js').replace('__REVIEW_DATA__',jsData);
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mad Money Tycoon — Design document</title><style>${read('working/review.css')}\n${read('working/art-system.css')}
${read('working/office-binding.css')}
${read('working/park-system.css')}
${read('working/document-materials.css')}
${read('working/editorial.css')}</style></head><body><a class="skip" href="#main">Skip to document</a><header class="masthead"><a class="brand" href="#contents" aria-label="Mad Money Tycoon — contents"><span class="brand-name">Mad Money Tycoon</span></a><div class="header-context"><span>GAME DESIGN</span><i>/</i><b id="current-chapter">Contents</b><span id="current-number"></span></div><nav class="masthead-actions" aria-label="Reader navigation"><button id="return-to-origin" hidden aria-label="Return to previous section">← <span>Return</span></button><a href="#contents" class="header-contents">Contents</a><a href="previews/index.html" class="header-library">Library ↗</a><button class="search-button" id="open-search">Find <kbd>⌘ K</kbd></button><a id="header-prev" href="#contents" aria-label="Previous chapter">←</a><span id="header-position">00 / 08</span><a id="header-next" href="#game" aria-label="Next chapter">→</a></nav></header><div class="shell"><main id="main">${contents}${sections}</main></div><dialog class="search-dialog" id="search-dialog" aria-label="Find in document"><div class="search-top"><label for="search-input">Find in document</label><input id="search-input" type="search" placeholder="Try payment, authority, E-01…" autocomplete="off"><button class="search-close" id="close-search" aria-label="Close search">Esc</button></div><div class="search-results" id="search-results" aria-live="polite"></div></dialog><script>${script}</script><script>${read('working/pixel-kit.js')}</script><script>${read('working/park-kit.js')}</script><script>${read('working/art-system.js')}</script><script>${read('working/document-materials.js')}</script><script>${fs.existsSync(path.join(root,'working/office-pixel-study.js'))?read('working/office-pixel-study.js'):''}</script><script>${read('working/office-study-controls.js')}</script><noscript><style>.reader-page[hidden]{display:grid!important}.search-button{display:none}.reader-page{margin-top:80px}.chapter-notes{position:static}</style></noscript></body></html>`;
fs.writeFileSync(path.join(root,'design-review.html'),html);
fs.writeFileSync(path.join(root,'working/reader-map.json'),JSON.stringify(metadata,null,2));
console.log(JSON.stringify({output:'design-review.html',pages:pages.length,headings:allIds.size,bytes:Buffer.byteLength(html)}));
