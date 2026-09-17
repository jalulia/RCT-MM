import fs from 'node:fs';
export const catalogue=JSON.parse(fs.readFileSync(new URL('../assets/sprite-catalogue/manifest.json',import.meta.url)));
export const assetBase='assets/sprite-catalogue/';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function objectMedia(id,{title,width=220,height=155,variant=null}={}){
 const o=catalogue.objects.find(o=>o.id===id);if(!o)throw Error('Unknown art object '+id);
 const v=variant&&o.variants.find(v=>v.key===variant),d=v?{poster:v.file,bounds:v.bounds,width:o.size[0],height:o.size[1],animated:false}:o.display;
 if(!d)throw Error('Rebuild catalogue display metadata for '+id);
 const b=d.bounds,k=Math.max(1,Math.min(6,Math.floor(width/b.width),Math.floor(height/b.height)));
 return `<img src="${assetBase}${d.poster}" ${d.animated?`data-motion-src="${assetBase}${d.gif}"`:''} alt="${esc(title||o.name)}${d.animated?' · '+esc(d.label):''}" class="pixel-preview" loading="lazy" style="position:absolute;width:${d.width*k}px;height:${d.height*k}px;max-width:none;max-height:none;left:calc(50% - ${(b.x+b.width/2)*k}px);top:calc(50% - ${(b.y+b.height/2)*k}px)">`;
}
export const playbackButton='<button type="button" data-preview-motion aria-pressed="true">Pause previews</button>';
export function componentKit(){
 return `<div class="kit-tools"><span>${catalogue.counts.objects} objects · ${catalogue.counts.groups} categories</span>${playbackButton}<a href="${assetBase}mad-money-sprite-catalogue.zip" download>Download kit ↓</a></div><nav class="kit-index" aria-label="Component categories">${catalogue.groupSheets.map(g=>`<a href="#art/kit-${g.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}">${esc(g.name)} <span>${catalogue.objects.filter(o=>o.group===g.name).length}</span></a>`).join('')}</nav>${catalogue.groupSheets.map(g=>`<section class="kit-group" id="art/kit-${g.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}"><div class="kit-group-heading"><h4>${esc(g.name)}</h4><a href="${assetBase}sheets/${g.file.split('/').at(-1)}" download>Category sheet ↓</a></div><div class="art-kit">${catalogue.objects.filter(o=>o.group===g.name).map(o=>`<div class="art-kit-item" id="art/kit-${o.id}"><a class="art-kit-object" href="${assetBase}index.html#${o.id}"><span class="art-kit-image ${o.group==='Buildings'?'kit-building-pair':''}">${o.group==='Buildings'?o.variants.map(v=>`<span>${objectMedia(o.id,{variant:v.key,width:120,height:110})}<small>${v.label==='Roof on'?'Exterior':'Interior'}</small></span>`).join(''):objectMedia(o.id)}</span><span class="art-kit-top">${o.id} <span>${o.display.animated?'ANIMATED':'COMPONENT'}</span></span><h5>${esc(o.name)} <span>↗</span></h5></a>${o.display.animated?`<a class="kit-download" href="${assetBase}${o.display.gif}" download>${esc(o.display.label)} · GIF ↓</a>`:`<span class="kit-download">${o.variants.length} ${o.variants.length===1?'frame':'states'} · PNG / GIF</span>`}</div>`).join('')}</div></section>`).join('')}`;
}
