/* Shared visible-preview playback. Still frames and state comparisons never autoplay. */
(()=>{
 const media=matchMedia('(prefers-reduced-motion: reduce)'),players=new Map();let enabled=!media.matches;
 const update=image=>{const p=players.get(image);if(!p)return;const playing=enabled&&p.visible&&!document.hidden&&image.getClientRects().length>0;const src=playing?image.dataset.motionSrc:image.dataset.motionPoster;if(image.getAttribute('src')!==src)image.src=src;image.dataset.motionPlaying=String(playing)};
 const label=()=>document.querySelectorAll('[data-preview-motion]').forEach(b=>{const text=enabled?'Pause previews':'Play previews';if(b.textContent!==text)b.textContent=text;b.setAttribute('aria-pressed',String(enabled))});
 const refresh=()=>{players.forEach((_,im)=>{if(!im.isConnected){observer.unobserve(im);players.delete(im)}else update(im)});label()};
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{const p=players.get(e.target);if(p){p.visible=e.isIntersecting;update(e.target)}}));
 const scan=()=>{document.querySelectorAll('img[data-motion-src]').forEach(im=>{if(players.has(im))return;im.dataset.motionPoster=im.dataset.motionPoster||im.getAttribute('src');players.set(im,{visible:false});observer.observe(im)});label()};
 document.addEventListener('click',e=>{if(e.target.closest('[data-preview-motion]')){enabled=!enabled;refresh()}});
 media.addEventListener('change',e=>{if(e.matches){enabled=false;refresh()}});document.addEventListener('visibilitychange',refresh);
 new MutationObserver(changes=>{if(changes.some(c=>c.type==='childList'))scan();if(changes.some(c=>c.type==='attributes'))refresh()}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
 window.MMTPreviewMotion={refresh,scan,get playing(){return enabled}};scan();
})();
