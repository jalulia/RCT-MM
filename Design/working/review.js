const REVIEW=__REVIEW_DATA__;
const pages=REVIEW.pages;
const valid=new Set(['contents',...pages.map(p=>p.id)]);
const alias={'art/production-and-next-proof':'art/implementation-scope','art/voila-delivery':'art/kit-L-05',overview:'contents',paths:'episode',views:'interface/five-views',directions:'art',process:'production',manual:'game',research:'research-systems'};
const dialog=document.querySelector('#search-dialog');
const searchInput=document.querySelector('#search-input');
const safe=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let activePage='contents';
history.scrollRestoration='manual';
function normalize(route){route=decodeURIComponent(route||'contents');route=alias[route]||route;const page=route.split('/')[0];if(!valid.has(page))return 'contents';if(route.includes('/')&&!document.getElementById(route))return page;return route}
function render(route,scroll,focus=false){
 route=normalize(route);activePage=route.split('/')[0];
 document.querySelectorAll('.reader-page,.contents-page').forEach(s=>s.hidden=s.id!=='page-'+activePage);
 document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===activePage)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 const pos=pages.findIndex(p=>p.id===activePage);
 document.querySelector('#current-chapter').textContent=pos<0?'Contents':pages[pos].title;
 document.querySelector('#current-number').textContent=pos<0?'':pages[pos].number||String(pos+1).padStart(2,'0');
 document.querySelector('#header-position').textContent=pos<0?'00 / 08':pos<8?String(pos+1).padStart(2,'0')+' / 08':pages[pos].number+' / REF';
 document.querySelector('#header-prev').href='#'+(pos<=0?'contents':pages[pos-1].id);
 document.querySelector('#header-next').href='#'+(pos<0?'game':pos===pages.length-1?'contents':pages[pos+1].id);
 const p=pages.find(p=>p.id===activePage);
 document.title=(p?p.title:'Contents')+' — Mad Money Tycoon';
 const origin=document.querySelector('#return-to-origin');origin.hidden=!history.state?.fromTitle;origin.querySelector('span').textContent=history.state?.fromTitle||'Return';origin.setAttribute('aria-label','Return to '+(history.state?.fromTitle||'previous section'));
 const back=document.querySelector('#page-'+activePage+' [data-back]');
 if(back){back.hidden=!history.state?.fromTitle;back.textContent='← '+(history.state?.fromTitle||'Return');back.href='#'+(history.state?.fromRoute||'contents')}
 requestAnimationFrame(()=>{
  if(typeof scroll==='number')window.scrollTo(0,scroll);
  else if(route.includes('/')){const target=document.getElementById(route);if(target)window.scrollTo(0,window.scrollY+target.getBoundingClientRect().top-document.querySelector('.masthead').offsetHeight-24);}
  else window.scrollTo(0,0);
  if(typeof markSection==='function')markSection();
  if(focus){const target=document.getElementById(route)||document.querySelector('#page-'+activePage+' h1');if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true})}}
 });
}
function navigate(route,{cross=false,focus=true}={}){
 route=normalize(route);if(route===history.state?.route){render(route,undefined,focus);return}
 const fromRoute=history.state?.route||activePage;
 history.replaceState({...history.state,route:fromRoute,scroll:window.scrollY},'',location.href);
 const fromTitle=pages.find(p=>p.id===activePage)?.title;
 const samePage=route.split('/')[0]===activePage;const inherited=samePage&&history.state?.fromTitle?{fromRoute:history.state.fromRoute,fromTitle:history.state.fromTitle,fromIndex:history.state.fromIndex}:{};
 const index=(history.state?.index||0)+1;
 history.pushState({route,scroll:0,index,...inherited,...(cross?{fromRoute,fromTitle,fromIndex:index-1}:{})},'','#'+route);
 render(route,undefined,focus);
}
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#"]');if(!a)return;
 if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const route=a.getAttribute('href').slice(1);if(route==='main')return;
 e.preventDefault();if(a.hasAttribute('data-back')&&history.state?.fromRoute){returnToOrigin();return}
 const cross=(!!a.closest('.article-body')||dialog.open)&&route.split('/')[0]!==activePage&&activePage!=='contents';
 if(dialog.open)dialog.close();navigate(route,{cross});
});
window.addEventListener('popstate',()=>render(history.state?.route||location.hash.slice(1),history.state?.scroll));
window.addEventListener('hashchange',()=>{const route=normalize(location.hash.slice(1));if(route!==history.state?.route){history.replaceState({route,scroll:0},'','#'+route);render(route)}});
function returnToOrigin(){const state=history.state;if(state?.fromIndex!==undefined)history.go(state.fromIndex-state.index);else if(state?.fromRoute)navigate(state.fromRoute);else history.back()}
document.querySelector('#return-to-origin').addEventListener('click',returnToOrigin);

const indexed=[];
for(const page of pages){
 const section=document.getElementById('page-'+page.id);
 for(const heading of page.headings.filter(h=>h.level===2||h.level===3)){
  const h=document.getElementById(heading.id);const figure=h.closest('figure');let n=(figure||h).nextElementSibling;let text=figure?figure.textContent:'';
  while(n&&!/^H[23]$/.test(n.tagName)){text+=' '+n.textContent;n=n.nextElementSibling}
  indexed.push({route:heading.id,page:page.title,title:heading.title,text:text.replace(/\s+/g,' ').trim()});
 }
 indexed.push({route:page.id,page:'Chapter',title:page.title,text:section.querySelector('.chapter-intro,.source-preface')?.textContent.trim()||''});
}
function search(){
 const q=searchInput.value.trim().toLowerCase();
 const idQuery=/^[a-z]+-?\d+$/i.test(q);const matches=text=>idQuery?new RegExp('(?:^|[^a-z0-9])'+q+'(?=$|[^a-z0-9])','i').test(text):text.toLowerCase().includes(q);
 const results=q?indexed.filter(x=>matches(x.title+' '+x.text+' '+x.page)).sort((a,b)=>Number(b.title.toLowerCase().includes(q))-Number(a.title.toLowerCase().includes(q))).slice(0,30):pages.slice(0,8).map(x=>({route:x.id,page:'Chapter '+x.id,title:x.title,text:''}));
 document.querySelector('#search-results').innerHTML=results.length?results.map(r=>{let t=r.text;const at=t.toLowerCase().indexOf(q);if(at>80)t='…'+t.slice(at-60);t=t.slice(0,190)+(t.length>190?'…':'');return '<a href="#'+safe(r.route)+'"><small>'+safe(r.page)+'</small>'+safe(r.title)+(q&&t?'<p>'+safe(t)+'</p>':'')+'</a>'}).join(''):'<p class="search-empty">No matching section. Try a shorter phrase or a source ID.</p>';
}
function openSearch(){dialog.showModal();search();searchInput.focus()}
document.querySelector('#open-search').addEventListener('click',openSearch);
document.querySelector('#close-search').addEventListener('click',()=>dialog.close());
searchInput.addEventListener('input',search);
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close()}});
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
 const v=REVIEW.views[Number(button.dataset.view)];
 document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b===button));
 for(const [id,value] of [['view-kind',v[0]+' / O-19'],['view-title',v[1]],['view-rel',v[2]],['view-a',v[3]],['view-b',v[4]]])document.getElementById(id).textContent=value;
 document.querySelector('#view-edge').setAttribute('d',v[6]);
 ['left','right','top','bottom'].forEach((position,i)=>{const labels=document.querySelectorAll('#view-node-'+position+' text');labels[0].textContent=v[7][i][0];labels[1].textContent=v[7][i][1]});
}));
const initial=normalize(location.hash.slice(1));history.replaceState({route:initial,scroll:undefined,index:0},'','#'+initial);render(initial);

let tocPending=false;
function markSection(){const panel=document.getElementById('page-'+activePage);if(!panel||activePage==='contents')return;const headings=[...panel.querySelectorAll('.article-body h2')];let chosen=headings[0];for(const h of headings){if(h.getBoundingClientRect().top<=180)chosen=h;else break}if(document.documentElement.scrollHeight-innerHeight-scrollY<24)chosen=headings.at(-1)||chosen;panel.querySelectorAll('.page-links a').forEach(a=>{a.classList.toggle('is-current',a.hash.slice(1)===chosen?.id)});tocPending=false}
addEventListener('scroll',()=>{if(!tocPending){tocPending=true;requestAnimationFrame(markSection)}},{passive:true});
requestAnimationFrame(markSection);

// Restore the requested section after the browser has completed native fragment scrolling.
addEventListener('load',()=>{if(history.state?.index===0&&initial.includes('/'))requestAnimationFrame(()=>render(initial,undefined,false))},{once:true});
