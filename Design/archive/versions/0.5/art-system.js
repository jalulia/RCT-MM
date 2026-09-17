(()=>{
const kit=window.MMTArt;if(!kit)return;
document.querySelectorAll('[data-art-icon]').forEach(c=>kit.icon(c,c.dataset.artIcon));
document.querySelectorAll('[data-art-sprite]').forEach(c=>kit.specimen(c,c.dataset.artSprite));
document.querySelectorAll('[data-art-scene="cover"],[data-art-scene="assembly"]').forEach(c=>kit.scene(c));
const state={selected:'B-02',roof:true,view:'Work',motion:false,time:0,record:false};
const scene=document.querySelector('[data-art-scene="interactive"]'),workbench=document.querySelector('.art-workbench');if(!scene||!workbench)return;
const body=workbench.querySelector('.art-inspector-body');
let lastSelected;
function centerScene(){workbench.style.setProperty('--record-top',workbench.querySelector('.art-game-layout').offsetTop+'px');const map=workbench.querySelector('.art-map-scroll');if(map.clientWidth===0)return;const b=kit.buildings.find(b=>b.id===state.selected);const x=320+((b.x+b.w/2)-(b.y+b.d/2))*16;map.scrollLeft=Math.max(0,x*(scene.clientWidth/640)-map.clientWidth/2);}
new ResizeObserver(()=>requestAnimationFrame(centerScene)).observe(workbench.querySelector('.art-map-scroll'));
function render(){kit.scene(scene,state);if(lastSelected!==state.selected){lastSelected=state.selected;requestAnimationFrame(centerScene);}const b=kit.buildings.find(b=>b.id===state.selected);workbench.querySelector('[data-art-selection-id]').textContent=b.id;workbench.querySelector('[data-art-selection-name]').textContent=b.name;workbench.querySelectorAll('[data-art-building]').forEach(btn=>btn.setAttribute('aria-pressed',btn.dataset.artBuilding===b.id));
const where=state.selected==='B-02'?'Component awaiting release':state.selected==='B-01'?'Artwork ready for handoff':'Payment record available';
const base='<small>PROJECT C-07 / LINKED OBLIGATION O-19</small>';
const row=(a,b,c='')=>`<div class="art-state-row ${c}"><span>${a}</span><b>${b}</b></div>`;
if(state.view==='Work')body.innerHTML=`<small>PROJECT C-07</small><h5>${where}</h5><dl><dt>Reserved capacity</dt><dd>2 team-days</dd><dt>Target handoff</dt><dd>Thursday · week 3</dd><dt>Linked obligation</dt><dd>O-19 / Fabrication</dd></dl><button data-art-open-record>Inspect linked record ↗</button><p>Moving people show occupation and scale. They do not advance this fixture.</p>`;
if(state.view==='Cash')body.innerHTML=base+row('Bank debit / P-04','− $12,000 USD')+row('Bank return / P-04','+ $12,000 USD')+row('Platform record v2','Paid','pink')+row('Later settlement','Not supplied','unknown')+'<button data-art-open-record>Compare record and events ↗</button>';
if(state.view==='Information')body.innerHTML=base+'<h5>O-19 · Record v2</h5>'+row('Platform label','Paid','pink')+'<dl><dt>Effective time</dt><dd>W3 Tue · 10:00</dd><dt>Recorded time</dt><dd>W3 Tue · 10:02</dd><dt>Related records</dt><dd>Bill · debit · return</dd></dl><button data-art-open-record>Open record ↗</button>';
if(state.view==='People')body.innerHTML='<small>PROJECT C-07 / PEOPLE</small><h5>Internal and external work</h5><dl><dt>P-03 / employee</dt><dd>Production department</dd><dt>P-08 / external provider</dt><dd>Fabrication engagement</dd><dt>Employment basis</dt><dd>Explicit record; not shirt color</dd></dl><p>The external provider has an engagement and obligation. Their visit is not a change in employee headcount.</p>';
if(state.view==='Control')body.innerHTML='<small>PROJECT C-07 / PERMISSIONS</small><h5>Preparation ≠ approval</h5><dl><dt>Production role</dt><dd>May prepare a release request</dd><dt>Approver role</dt><dd>May authorize release</dd><dt>Action in this study</dt><dd>None executed</dd></dl><p>A title or a selected building does not establish who exercised authority.</p>';
workbench.querySelector('.art-scene-caption').textContent=state.view==='Work'?`${where} · 2 team-days reserved`:`${state.selected} stays selected · ${state.view} view`;
}
workbench.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
if(b.dataset.artBuilding){state.selected=b.dataset.artBuilding;render()}
if(b.dataset.artView){state.view=b.dataset.artView;workbench.querySelectorAll('[data-art-view]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}
if(b.hasAttribute('data-art-roof')){state.roof=!state.roof;b.textContent=state.roof?'Hide roof':'Show roof';b.setAttribute('aria-pressed',!state.roof);render()}
if(b.hasAttribute('data-art-motion')){state.motion=!state.motion;b.textContent=state.motion?'Pause motion':'Play motion';b.setAttribute('aria-pressed',state.motion)}
if(b.hasAttribute('data-art-open-record')){state.record=true;state.motion=false;state.beforeRead={page:window.scrollY,panel:workbench.scrollTop,focus:document.activeElement};workbench.classList.add('is-reading');const motion=workbench.querySelector('[data-art-motion]');motion.textContent='Play motion';motion.setAttribute('aria-pressed',false);workbench.querySelector('.art-record').hidden=false;const h=workbench.querySelector('.art-record h4');h.tabIndex=-1;h.focus({preventScroll:true});h.scrollIntoView({block:'nearest'});}
if(b.hasAttribute('data-art-close-record')){state.record=false;workbench.classList.remove('is-reading');workbench.querySelector('.art-record').hidden=true;state.beforeRead?.focus?.focus({preventScroll:true});if(state.beforeRead){window.scrollTo(0,state.beforeRead.page);workbench.scrollTop=state.beforeRead.panel;}}
});
scene.addEventListener('click',e=>{const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*scene.width,y=(e.clientY-r.top)/r.height*scene.height;let points=kit.scene(scene,state);const b=points.map(p=>({...p,d:Math.hypot(p.p[0]-x,p.p[1]-y)})).sort((a,b)=>a.d-b.d)[0];if(b.d<65){state.selected=b.id;render()}});
document.querySelectorAll('[data-art-layer]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-art-layer]').forEach(x=>x.setAttribute('aria-pressed',x===b));kit.scene(document.querySelector('[data-art-scene="assembly"]'),{layer:Number(b.dataset.artLayer)})}));
const expand=document.querySelector('[data-art-expand]');const close=document.createElement('button');close.className='art-close-expanded';close.textContent='Close expanded view';close.hidden=true;workbench.querySelector('.art-app-bar').append(close);
let lastFocus;
function endExpand(){workbench.classList.remove('is-expanded');close.hidden=true;document.body.style.overflow='';lastFocus?.focus({preventScroll:true});}
expand?.addEventListener('click',()=>{lastFocus=document.activeElement;workbench.classList.add('is-expanded');close.hidden=false;document.body.style.overflow='hidden';close.focus();});close.addEventListener('click',endExpand);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&workbench.classList.contains('is-expanded'))endExpand();if(e.key==='Tab'&&workbench.classList.contains('is-expanded')){const f=[...workbench.querySelectorAll('button,a,[tabindex="0"]')].filter(x=>!x.hidden&&x.getClientRects().length);if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===f.at(-1)){e.preventDefault();f[0].focus()}}});
let last=0;function tick(t){if(t-last>125&&state.motion&&!state.record&&!document.querySelector('#page-art').hidden){state.time+=.125;kit.scene(scene,state);last=t}requestAnimationFrame(tick)}render();requestAnimationFrame(tick);
window.MMTArtStudy={state,render};
})();
