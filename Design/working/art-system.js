(()=>{
const kit=window.MMTArt;if(!kit)return;
document.querySelectorAll('[data-art-icon]').forEach(c=>kit.icon(c,c.dataset.artIcon));
document.querySelectorAll('[data-art-sprite]').forEach(c=>kit.specimen(c,c.dataset.artSprite));
document.querySelectorAll('[data-art-scene="assembly"]').forEach(c=>kit.scene(c));
const cover=document.querySelector('[data-art-scene="cover"]'),heroButton=document.querySelector('[data-hero-motion]');let heroTime=0,heroRunning=!matchMedia('(prefers-reduced-motion: reduce)').matches,heroVisible=false,heroLast=0,heroPaint=0;
if(cover){kit.hero(cover,0);new IntersectionObserver(es=>{heroVisible=es[0].isIntersecting;heroLast=0;}).observe(cover);const label=()=>{heroButton.textContent=heroRunning?'Pause scene':'Play scene';heroButton.setAttribute('aria-pressed',heroRunning)};label();heroButton.addEventListener('click',()=>{heroRunning=!heroRunning;heroLast=0;label()});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches){heroRunning=false;label()}});function heroTick(now){if(heroRunning&&heroVisible&&!document.hidden){if(heroLast)heroTime+=(now-heroLast)/1000;heroLast=now;if(now-heroPaint>100){kit.hero(cover,heroTime);heroPaint=now;}}else heroLast=0;requestAnimationFrame(heroTick)}requestAnimationFrame(heroTick);window.MMTHero={pause:()=>{heroRunning=false;label()},render:t=>{heroTime=t;kit.hero(cover,t)},get time(){return heroTime},get playing(){return heroRunning}};}
const state={selected:'B-03',roof:false,motion:false,time:0,record:false,landmark:null,court:'party',circuit:false,delivery:true,deliveryStart:0};
const scene=document.querySelector('[data-art-scene="interactive"]'),workbench=document.querySelector('.art-workbench');if(!scene||!workbench)return;
const body=workbench.querySelector('.art-inspector-body');
const siteDetails={
 'B-01':{photo:'assets/office-references/boerum-user-street-view.png',observed:'Three joined brick-and-glass bays with pale window frames.',invented:'One park building. Its unseen interior and roof are interpretations.'},
 'B-02':{photo:'assets/office-references/porter-hall.jpg',observed:'An industrial hall with glazed rooms, shared worktables and sculptural objects.',invented:'A compact shell and removable roof collect selected interior details.'},
 'B-03':{photo:'assets/office-references/johnson-street-2017.png',observed:'Yellow brick, broad dark fascia and a gridded loading door in the supplied street view.',invented:'A compressed hall with orange stairs, a central white birch and the cat. The unseen roof and floor plan are interpreted.'}
};
let lastSelected;
function centerScene(){const map=workbench.querySelector('.art-map-scroll');if(map.clientWidth===0)return;const b=kit.buildings.find(b=>b.id===state.selected),l=kit.landmarks.find(l=>l.id===state.landmark);const at=l?.id==='L-05'?kit.components.deliveryPose(state.time-state.deliveryStart,state.delivery):null;const x=304+(l?(at?at.x-at.y:l.at[0]-l.at[1]):(b.x+b.w/2)-(b.y+b.d/2))*16;map.scrollLeft=Math.max(0,x*(scene.clientWidth/640)-map.clientWidth/2);}
new ResizeObserver(()=>requestAnimationFrame(centerScene)).observe(workbench.querySelector('.art-map-scroll'));
function render(){
 kit.scene(scene,state);const selection=state.selected+state.landmark;if(lastSelected!==selection){lastSelected=selection;requestAnimationFrame(centerScene);}
 const b=kit.buildings.find(b=>b.id===state.selected),l=kit.landmarks.find(l=>l.id===state.landmark),item=l||b,details=l||siteDetails[b.id];
 if(!l&&b.id==='B-03'&&!state.roof){details.photo='assets/office-references/johnson-mezzanine.jpg';details.observed='Orange mezzanine, workstations and an indoor tree; identified as a white birch in supplied context.';}else if(!l&&b.id==='B-03'){details.photo='assets/office-references/johnson-street-2017.png';details.observed='Yellow brick, broad dark fascia and a gridded loading door in the supplied street view.';}
 const stateName=l?(l.id==='L-05'?'DELIVERY NPC':'SCENERY'):state.roof?'EXTERIOR':'INTERIOR';
 workbench.querySelector('[data-art-selection-id]').textContent=item.id;
 workbench.querySelector('[data-art-selection-name]').textContent=item.name;
 workbench.querySelector('[data-art-selection-kind]').textContent=stateName;
 workbench.querySelectorAll('[data-art-building]').forEach(btn=>btn.setAttribute('aria-pressed',!l&&btn.dataset.artBuilding===b.id&&(btn.dataset.artState==='roof-on')===state.roof));
 workbench.querySelectorAll('[data-art-landmark]').forEach(btn=>btn.setAttribute('aria-pressed',btn.dataset.artLandmark===state.landmark));
 workbench.querySelectorAll('[data-park-court]').forEach(btn=>btn.setAttribute('aria-pressed',btn.dataset.parkCourt===state.court));
 workbench.querySelectorAll('[data-park-circuit]').forEach(btn=>{btn.textContent=state.circuit?'Park the Chrysler':'Run Chrysler circuit';btn.setAttribute('aria-pressed',state.circuit)});
 workbench.querySelectorAll('[data-park-delivery]').forEach(btn=>{btn.textContent=state.delivery?'Park Voila truck':'Run Voila delivery';btn.setAttribute('aria-pressed',state.delivery)});
 const motion=workbench.querySelector('[data-art-motion]');motion.textContent=state.motion?'Pause motion':'Play motion';motion.setAttribute('aria-pressed',state.motion);
 const key=l?(['L-01','L-05'].includes(l.id)?'heading-0':l.id==='L-06'?'tail-0':'default'):(state.roof?'roof-on':'roof-off');
 const sprite='assets/sprite-catalogue/objects/'+item.id+'/'+key+'.png';
 body.innerHTML=`<a class="park-selected-sprite" href="assets/sprite-catalogue/index.html#${item.id}"><img src="${sprite}" alt="${item.name}, ${stateName.toLowerCase()}"><span>Object sheet & GIF downloads ↗</span></a><a class="park-source-thumb" href="${details.photo}" target="_blank" rel="noopener"><img src="${details.photo}" alt="Source photograph for ${item.name}"><span>Source photograph ↗</span></a><dl><dt>Source</dt><dd>${details.observed}</dd><dt>Park interpretation</dt><dd>${details.invented}</dd></dl>${l&&l.id==='L-05'?'<a href="previews/voila-delivery.gif" download>Download delivery loop GIF ↓</a>':''}<a class="park-source-link" href="${item.source}" ${item.source.startsWith('http')?'target="_blank" rel="noopener"':''}>${l?(l.id==='L-05'?'Bakery reference →':'Source project ↗'):'Architecture references →'}</a>`;
 workbench.querySelector('.art-scene-caption').textContent=item.name+' · '+(l?(l.id==='L-05'?'Delivery NPC': 'Scenery'):state.roof?'Exterior':'Interior');
}
workbench.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.artBuilding){state.selected=b.dataset.artBuilding;state.landmark=null;state.roof=b.dataset.artState==='roof-on';render();}
 if(b.dataset.artLandmark){state.landmark=b.dataset.artLandmark;if(state.landmark==='L-08')state.court='party';render();}
 if(b.dataset.parkCourt){state.court=b.dataset.parkCourt;if(state.landmark==='L-08'&&state.court!=='party')state.landmark=null;render();}
 if(b.hasAttribute('data-park-circuit')){state.circuit=!state.circuit;if(state.circuit&&!matchMedia('(prefers-reduced-motion: reduce)').matches)state.motion=true;render();}
 if(b.hasAttribute('data-park-delivery')){state.delivery=!state.delivery;if(state.delivery){state.deliveryStart=state.time;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)state.motion=true;}render();}
 if(b.hasAttribute('data-art-motion')){state.motion=!state.motion;render();}
 if(b.hasAttribute('data-art-open-record')){
  state.record=true;state.motion=false;state.beforeRead={page:window.scrollY,panel:workbench.scrollTop,focus:document.activeElement};
  workbench.querySelector('.art-exploration').hidden=true;workbench.classList.add('is-reading');workbench.querySelector('.art-record').hidden=false;
  const h=workbench.querySelector('.art-record h4');h.tabIndex=-1;h.focus({preventScroll:true});h.scrollIntoView({block:'nearest'});
 }
 if(b.hasAttribute('data-art-close-record')){
  state.record=false;workbench.querySelector('.art-exploration').hidden=false;workbench.classList.remove('is-reading');workbench.querySelector('.art-record').hidden=true;render();
  state.beforeRead?.focus?.focus({preventScroll:true});if(state.beforeRead){window.scrollTo(0,state.beforeRead.page);workbench.scrollTop=state.beforeRead.panel;}
 }
});
function insidePolygon(x,y,polygon){let c=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if(((a[1]>y)!==(b[1]>y))&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c;}return c;}
scene.addEventListener('click',e=>{const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*scene.width,y=(e.clientY-r.top)/r.height*scene.height;const hits=kit.scene(scene,state);const object=hits.filter(h=>h.kind==='landmark'&&Math.hypot(h.p[0]-x,h.p[1]-y)<=h.radius).sort((a,b)=>Math.hypot(a.p[0]-x,a.p[1]-y)-Math.hypot(b.p[0]-x,b.p[1]-y))[0];if(object){state.landmark=object.id;render();return;}const site=hits.filter(h=>h.kind==='building'&&insidePolygon(x,y,h.polygon)).at(-1);if(site){state.selected=site.id;state.landmark=null;render();}});
document.querySelectorAll('[data-art-layer]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-art-layer]').forEach(x=>x.setAttribute('aria-pressed',x===b));kit.scene(document.querySelector('[data-art-scene="assembly"]'),{layer:Number(b.dataset.artLayer)})}));
const expand=document.querySelector('[data-art-expand]');const close=document.createElement('button');close.className='art-close-expanded';close.textContent='Close expanded view';close.hidden=true;workbench.querySelector('.art-app-bar').append(close);
let lastFocus;
function endExpand(){workbench.classList.remove('is-expanded');close.hidden=true;document.body.style.overflow='';lastFocus?.focus({preventScroll:true});}
expand?.addEventListener('click',()=>{lastFocus=document.activeElement;workbench.classList.add('is-expanded');close.hidden=false;document.body.style.overflow='hidden';close.focus();});close.addEventListener('click',endExpand);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.record){workbench.querySelector('[data-art-close-record]').click();return;}if(e.key==='Escape'&&workbench.classList.contains('is-expanded'))endExpand();if(e.key==='Tab'&&workbench.classList.contains('is-expanded')){const f=[...workbench.querySelectorAll('button,a,[tabindex="0"]')].filter(x=>!x.hidden&&!x.disabled&&!x.closest('[inert]')&&x.getClientRects().length);if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===f.at(-1)){e.preventDefault();f[0].focus()}}});
let last=0;function tick(t){if(t-last>125&&state.motion&&!state.record&&!document.hidden&&!document.querySelector('#page-art').hidden){state.time+=.125;kit.scene(scene,state);last=t}requestAnimationFrame(tick)}render();requestAnimationFrame(tick);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches){state.motion=false;const b=workbench.querySelector('[data-art-motion]');b.textContent='Play motion';b.setAttribute('aria-pressed',false);}});
window.MMTArtStudy={state,render};
})();
