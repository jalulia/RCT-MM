(()=>{
 if(!window.MMTOffice)return;
 document.querySelectorAll('[data-office-study]').forEach(c=>MMTOffice.draw(c,c.dataset.officeStudy,0));
 document.querySelectorAll('.office-canvas').forEach(el=>new ResizeObserver(()=>{const c=el.querySelector('canvas');if(!c)return;const scale=el.clientWidth-10>=640?2:1;c.style.width=(320*scale)+'px';c.style.height=(180*scale)+'px';}).observe(el));
 const canvas=document.querySelector('[data-office-study="boerum"]'),button=document.getElementById('boerum-motion');
 if(!canvas||!button)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let playing=!preference.matches,visible=false,frame=0,last=0,paint=0,elapsed=0;
 const label=()=>{button.textContent=playing?'Pause loop':'Play loop';button.setAttribute('aria-pressed',String(playing));};
 const tick=now=>{frame=0;if(!playing||!visible||document.hidden){last=0;return;}if(last)elapsed+=Math.min((now-last)/1000,.1);last=now;if(now-paint>1000/12){MMTOffice.draw(canvas,'boerum',elapsed);paint=now;}frame=requestAnimationFrame(tick);};
 const sync=()=>{label();if(frame){cancelAnimationFrame(frame);frame=0;}last=0;if(playing&&visible&&!document.hidden)frame=requestAnimationFrame(tick);};
 new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();},{threshold:.1}).observe(canvas);
 button.addEventListener('click',()=>{playing=!playing;sync();});
 preference.addEventListener('change',()=>{if(preference.matches)playing=false;sync();});
 document.addEventListener('visibilitychange',sync);label();
})();
