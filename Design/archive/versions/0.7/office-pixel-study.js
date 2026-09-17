/* Original Porter-derived pixel studies. Proposed translation, not a measured reconstruction.
   32×16 ground tile; 14 px standing person. Original raster primitives, no imported game art.
   API: MMTOffice.draw(canvas, 'shell' | 'interior' | 'parts' | 'boerum', timeSeconds=0); native 320×180. */
(()=>{
'use strict';
// Kept in both entry points so either study can load alone; the first owns the shared sampler/painter.
const boerumMotion=window.MMTBoerumMotion||(window.MMTBoerumMotion=(()=>{
 const legSeconds=6,travelSeconds=5.4,loopSeconds=36;
 function sample(timeSeconds=0){
  const t=Number.isFinite(timeSeconds)?timeSeconds:0,q=((t%loopSeconds)+loopSeconds)%loopSeconds;
  const leg=Math.floor(q/legSeconds),local=q-leg*legSeconds,travel=leg%2===0?-1:1;
  const moonwalk=leg===2||leg===5,progress=Math.min(local/travelSeconds,1),moving=local<travelSeconds;
  return{leg,local,travel,facing:moonwalk?-travel:travel,moonwalk,moving,
   u:travel<0?1-progress:progress,frame:moving?Math.floor(local*(moonwalk?8:7))%(moonwalk?8:4):0};
 }
 function paint(rect,a,b,state){
  const {facing,moonwalk,moving,frame:f}=state;
  const put=(dx,dy,w,h,col)=>rect(a+(facing>0?dx:-dx-w+1),b+dy,w,h,col);
  rect(a-3,b+1,7,1,'#7b8880');
  put(-1,-13,3,3,'#d7aa77');put(2,-12,1,1,'#aa7757');
  // Nose and shirt profile retain facing even when travel reverses.
  put(-1,-17,3,1,'#364653');put(-2,-16,5,2,'#435461');
  put(-2,-15,5,1,'#283943');put(-4,-14,9,1,'#2a3c43');
  put(-2,-10,5,5,'#6593b1');put(-2,-10,3,4,'#8bb0c3');put(1,-9,1,3,'#d0d2c0');
  if(moonwalk&&moving){
   // Flat torso, quiet arms: one planted shoe slides while the other heel lifts.
   const slide=[-1,0,1,2,2,1,0,-1][f],heel=f<4;
   put(-3,-9,1,4,'#d7aa77');put(3,-9,1,4,'#4d7898');
   put(-2+slide,-5,2,5,'#263b42');put(2-slide,-5,2,heel?4:5,'#344950');
   put(-3+slide,0,4,1,'#263b42');put(1-slide,heel?-1:0,4,1,'#263b42');
   if(heel)put(4-slide,0,1,1,'#263b42');
  }else{
   const swing=f===1?1:f===3?-1:0;
   put(-3,-9+swing,1,4,'#d7aa77');put(3,-9-swing,1,4,'#4d7898');
   put(-1-(f===1?1:0),-5,2,5-(f===3?1:0),'#263b42');
   put(2+(f===3?1:0),-5,2,4+(f===1?1:0),'#344950');
   put(-2-(f===1?1:0),0,3,1,'#263b42');put(2+(f===3?1:0),f===3?-1:0,3,1,'#263b42');
  }
 }
 return Object.freeze({sample,paint,legSeconds,travelSeconds,loopSeconds});
})());
const SIZE={width:320,height:180};
const C={
  bg:'#e4e9df',ink:'#263b42',
  masonry:['#303e40','#465254','#606b6b','#86908a'],
  concrete:['#788784','#9ba8a2','#bcc5bb','#e3e4d4'],
  white:['#819894','#aebfba','#d1dcd1','#f5f3df'],
  timber:['#846648','#a88454','#c7a46b','#e7cb91'],
  orange:['#8d3a30','#bd4b31','#e26940','#ff9560'],
  coral:['#9d4b3f','#c45f48','#eb8d6b','#ffbe95'],
  teal:['#26575c','#3b7780','#70a2a3','#bbd2c4'],
  glass:['#253e43','#526d70','#9bb8b1','#dbebcf'],
  roof:['#394a4b','#526562','#6e7f74','#a4b2a1'],
  plant:['#294d3d','#3f6e47','#79964d','#bfd178'],
  skin:['#573f35','#aa7757','#d7aa77','#f1cf9a'],
  asphalt:['#606e6d','#77837c','#8c9589','#aeb4a2'],
  pink:['#634457','#95617b','#c694a1','#f3c8c5']
};
function painter(canvas){
  canvas.width=SIZE.width;canvas.height=SIZE.height;
  const g=canvas.getContext('2d');g.imageSmoothingEnabled=false;
  let ox=140,oy=51;
  const p=(x,y,z=0)=>[Math.round(ox+16*(x-y)),Math.round(oy+8*(x+y)-z)];
  function origin(x,y){ox=x;oy=y;}
  function r(x,y,w,h,col){g.fillStyle=col;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  function ln(x0,y0,x1,y1,col){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,e=dx+dy;for(;;){r(x0,y0,1,1,col);if(x0===x1&&y0===y1)break;let k=2*e;if(k>=dy){e+=dy;x0+=sx;}if(k<=dx){e+=dx;y0+=sy;}}}
  function poly(v,col){v=v.map(q=>q.map(Math.round));const lo=Math.min(...v.map(q=>q[1])),hi=Math.max(...v.map(q=>q[1]));for(let y=lo;y<=hi;y++){let h=[];for(let i=0,j=v.length-1;i<v.length;j=i++){let a=v[i],b=v[j];if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))h.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}h.sort((a,b)=>a-b);for(let i=0;i<h.length;i+=2)r(Math.ceil(h[i]),y,Math.floor(h[i+1])-Math.ceil(h[i])+1,1,col);}}
  function edge(v,col){v.forEach((a,i)=>ln(...a,...v[(i+1)%v.length],col));}
  function plane(x,y,w,d,z,col,stroke){let v=[p(x,y,z),p(x+w,y,z),p(x+w,y+d,z),p(x,y+d,z)];poly(v,col);if(stroke)edge(v,stroke);return v;}
  function front(x,y,w,base,h,col){let v=[p(x,y,base+h),p(x+w,y,base+h),p(x+w,y,base),p(x,y,base)];poly(v,col);return v;}
  function side(x,y,d,base,h,col){let v=[p(x,y,base+h),p(x,y+d,base+h),p(x,y+d,base),p(x,y,base)];poly(v,col);return v;}
  function box(x,y,w,d,z,h,a){front(x,y+d,w,z,h,a[2]);side(x+w,y,d,z,h,a[1]);plane(x,y,w,d,z+h,a[3]);ln(...p(x,y+d,z+h),...p(x+w,y+d,z+h),a[3]);ln(...p(x+w,y,z+h),...p(x+w,y+d,z+h),a[0]);ln(...p(x+w,y+d,z+h),...p(x+w,y+d,z),a[0]);}
  const rand=n=>{let a=Math.sin(n*127.1+11.7)*43758.5453;return a-Math.floor(a);};
  function brick(x,y,w,z,h,mode='front'){
    for(let j=0;j<h/4;j++){let zz=z+j*4+1;let vv=mode==='front'?[p(x,y,zz),p(x+w,y,zz)]:[p(x,y,zz),p(x,y+w,zz)];ln(...vv[0],...vv[1],C.masonry[1]);for(let u=.32+(j%2)*.34;u<w;u+=.68){let q=mode==='front'?p(x+u,y,zz):p(x,y+u,zz);r(q[0],q[1]-2,1,2,C.masonry[1]);}}
  }
  function glazing(x,y,w,z,h,axis='front',cols=2){
    const v=(u,zz)=>axis==='front'?p(x+u,y,zz):p(x,y+u,zz);
    poly([v(0,z+h),v(w,z+h),v(w,z),v(0,z)],C.glass[0]);
    poly([v(.07,z+h-1),v(w-.07,z+h-1),v(w-.07,z+1),v(.07,z+1)],axis==='front'?C.glass[2]:C.glass[1]);
    poly([v(.09,z+h-3),v(w-.09,z+h-3),v(w-.09,z+h*.52),v(.09,z+h*.52)],axis==='front'?C.glass[3]:C.glass[2]);
    for(let i=1;i<cols;i++)ln(...v(w*i/cols,z),...v(w*i/cols,z+h),C.glass[0]);
    ln(...v(0,z+h*.46),...v(w,z+h*.46),C.glass[0]);
    ln(...v(0,z+h),...v(w,z+h),C.masonry[0]);ln(...v(0,z),...v(w,z),C.white[1]);
  }
  function skylight(x,y,w=1.4,d=.85,z=36){
    plane(x+.18,y+.2,w+.08,d+.08,z,C.roof[0]);box(x,y,w,d,z,2,C.masonry);
    let a=p(x,y,z+3),b=p(x+w,y,z+3),c=p(x+w,y+d,z+3),e=p(x,y+d,z+3),t0=p(x,y+d/2,z+7),t1=p(x+w,y+d/2,z+7);
    poly([a,b,t1,t0],C.glass[3]);poly([t0,t1,c,e],C.glass[2]);edge([a,b,c,e],C.white[1]);ln(...t0,...t1,C.white[3]);
    for(let u=0;u<=w;u+=w/3){ln(...p(x+u,y,z+3),...p(x+u,y+d/2,z+7),C.white[2]);ln(...p(x+u,y+d/2,z+7),...p(x+u,y+d,z+3),C.glass[0]);}
  }
  function drainpipe(x,y,z=34){let a=p(x,y,z),b=p(x,y,1);ln(...a,...b,C.masonry[0]);ln(a[0]+1,a[1],b[0]+1,b[1],C.masonry[3]);r(b[0],b[1]-7,3,1,C.masonry[0]);}
  function littlePlant(x,y,z=0,large=false){
    box(x-.15,y-.15,.3,.3,z,large?6:4,C.white);let [px,py]=p(x,y,z+(large?6:4));
    ln(px,py,px-1,py-(large?12:6),C.plant[1]);
    const lobes=large?[[-6,-7,4,2],[-4,-12,3,4],[2,-14,3,5],[4,-8,4,3],[-2,-5,5,2]]:[[-4,-3,4,2],[1,-6,2,4],[1,-3,4,2]];
    for(let [dx,dy,w,h] of lobes){r(px+dx,py+dy,w,h,C.plant[1]);r(px+dx,py+dy,w-1,1,C.plant[2]);} }
  function person(x,y,shirt=C.teal,state='stand',z=0){
    let [a,b]=p(x,y,z);r(a-3,b+1,7,1,'#96a69b');
    if(state==='seat'){r(a-2,b-12,3,3,C.skin[2]);r(a-2,b-13,4,2,C.skin[0]);r(a-2,b-9,5,5,shirt[2]);r(a+2,b-7,4,1,C.skin[2]);r(a-1,b-4,4,2,C.ink);r(a+2,b-2,2,3,C.ink);r(a-3,b-5,2,4,shirt[0]);return;}
    r(a-1,b-13,3,3,C.skin[2]);r(a-2,b-14,4,2,C.skin[0]);r(a-2,b-10,5,5,shirt[1]);r(a-2,b-10,3,4,shirt[2]);r(a-3,b-9,1,4,C.skin[2]);r(a+3,b-8,1,3,C.skin[1]);r(a-1,b-5,2,5,C.ink);r(a+2,b-5,2,state==='walk'?4:5,C.ink);r(a-2,b,3,1,C.ink);r(a+2,b-(state==='walk'?1:0),3,1,C.ink);if(state==='carry'){r(a+2,b-8,5,4,C.timber[2]);r(a+2,b-8,5,1,C.timber[3]);r(a+4,b-7,1,3,C.timber[0]);}
  }
  function station(x,y,{occupied=false,tone=C.teal}={}){
    // Lightweight white desk and pedestal; screen faces the lower left.
    box(x+.08,y+.04,.12,.48,2,5,C.white);box(x+1.03,y+.05,.36,.49,2,5,C.white);
    box(x,y,1.5,.65,7,1,C.timber);plane(x+.02,y+.015,1.45,.6,8,C.white[3]);
    let q=p(x+.56,y+.14,14);r(q[0]-5,q[1]-5,10,6,C.ink);r(q[0]-4,q[1]-4,7,3,C.glass[1]);r(q[0]-3,q[1]-4,4,1,C.glass[2]);r(q[0]-1,q[1]+1,2,2,C.masonry[1]);r(q[0]-3,q[1]+3,6,1,C.white[1]);
    plane(x+.7,y+.32,.32,.18,8,C.white[1]);plane(x+1.2,y+.22,.18,.23,8,C.white[3]);
    box(x+.03,y+.045,.06,.1,8,9,tone);front(x+.07,y+.1,1.36,8,5,tone[2]);
    // Redraw the near screen over the divider so the monitor stays readable.
    r(q[0]-5,q[1]-5,10,6,C.ink);r(q[0]-4,q[1]-4,7,3,C.glass[1]);r(q[0]-3,q[1]-4,4,1,C.glass[2]);
    box(x+.48,y+.78,.36,.26,2,4,C.white);if(occupied)person(x+.67,y+.88,tone,'seat',2);
  }
  function timberRoom(x,y,w=2.5,d=1.6){
    box(x,y,w,d,2,25,C.timber);
    for(let u=.25;u<w;u+=.36){ln(...p(x+u,y+d,3),...p(x+u,y+d,27),C.timber[1]);ln(...p(x+u+.04,y+d,3),...p(x+u+.04,y+d,27),C.timber[3]);}
    for(let v=.3;v<d;v+=.36)ln(...p(x+w,y+v,3),...p(x+w,y+v,27),C.timber[0]);
    // Panel joints and short grain marks stay subordinate to the volume.
    for(let u=.4;u<w;u+=.73){let q=p(x+u,y+d+.01,22);r(q[0],q[1],1,3,C.timber[2]);}
    ln(...p(x+.06,y+d+.01,19),...p(x+w-.06,y+d+.01,19),C.timber[1]);
    // A deep orange recess is the entrance, with its own shadow and threshold.
    front(x+.22,y+d+.02,.7,2,19,C.orange[0]);front(x+.29,y+d+.025,.56,3,17,C.orange[2]);side(x+.29,y+d,.08,3,17,C.orange[1]);
    plane(x+.25,y+d,.66,.17,2,C.orange[3]);let h=p(x+.72,y+d+.03,11);r(h[0],h[1],1,2,C.ink);
    glazing(x+1.2,y+d+.03,w-1.46,9,12,'front',2);
    plane(x+.13,y+.13,w-.26,d-.26,27,C.timber[1]);ln(...p(x+.13,y+.13,27),...p(x+w-.13,y+.13,27),C.timber[3]);
    // Interior roof of the inserted room is visually separate from main structure.
    let l=p(x+.56,y+d+.045,23);r(l[0]-2,l[1],5,2,C.white[2]);
  }
  function booth(x,y){
    // Coral frame, pale high divider, upholstered bench and separate light table.
    box(x,y,1.45,.16,2,17,C.coral);front(x+.09,y+.18,1.25,7,11,C.white[2]);
    for(let u=.23;u<1.28;u+=.3)ln(...p(x+u,y+.185,8),...p(x+u,y+.185,17),C.white[1]);
    box(x+.1,y+.16,1.2,.38,2,6,C.coral);front(x+.12,y+.17,1.17,5,6,C.orange[2]);
    box(x+.65,y+.76,.09,.12,2,5,C.teal);box(x+.15,y+.62,1.1,.62,7,1,C.timber);plane(x+.17,y+.64,1.06,.58,8,C.white[3]);
    box(x+.06,y+1.05,.11,.2,2,6,C.coral);box(x+1.27,y+1.05,.11,.2,2,6,C.coral);
  }
  function bollard(x,y){let a=p(x,y);r(a[0]-1,a[1]-8,3,8,C.timber[2]);r(a[0]-1,a[1]-8,3,1,C.white[3]);r(a[0]-1,a[1]-4,2,2,C.timber[0]);}
  function hydrant(x,y){let [a,b]=p(x,y);r(a-2,b-6,4,6,C.orange[1]);r(a-3,b-2,6,2,C.orange[0]);r(a-3,b-5,7,2,C.orange[2]);r(a-1,b-8,3,2,C.timber[2]);r(a-1,b-6,1,5,C.orange[3]);}
  function ground(){
    box(-.65,-.4,8.95,6.6,-3,3,C.concrete);
    plane(-.65,5.06,8.95,1.14,0,C.asphalt[1]);
    plane(-.6,4.22,8.88,.84,0,C.concrete[2]);
    ln(...p(-.6,5.05),...p(8.28,5.05),C.concrete[3]);ln(...p(-.6,5.12),...p(8.28,5.12),C.asphalt[0]);
    for(let u=-.3;u<8.3;u+=1.35)ln(...p(u,4.23),...p(u,5.04),C.concrete[1]);
    for(let i=0;i<48;i++){let x=-.6+rand(i*13)*8.8,y=4.28+rand(i*31)*.68;let q=p(x,y);r(...q,1,1,i%3?C.concrete[1]:C.concrete[3]);}
    plane(7.41,.35,.74,4.7,0,C.asphalt[0]);
    plane(7.45,.42,.28,4.3,0,C.concrete[1]);
  }
  function shell(){
    ground();
    box(0,0,7.4,4.2,0,35,C.masonry);
    // A unifying paint coat over different masonry, not a repeating tiled wallpaper.
    brick(.06,4.205,4.35,3,32);brick(7.405,.05,4.1,3,30,'side');
    front(3.3,4.215,1.2,0,29,C.masonry[1]);for(let z=2;z<28;z+=2)ln(...p(3.33,4.22,z),...p(4.44,4.22,z),C.masonry[2]);
    front(4.51,4.21,2.89,0,34,C.masonry[2]);
    for(let i=0;i<4;i++)glazing(.28+i*.71,4.23,.61,11,21,'front',1);
    ln(...p(.2,4.24,33),...p(3.13,4.24,33),C.masonry[0]);
    ln(...p(.2,4.25,34),...p(3.13,4.25,34),C.masonry[3]);
    glazing(5.43,4.24,.99,0,21,'front',2);glazing(6.73,4.24,.43,8,25,'front',1);
    let h=p(5.91,4.26,9);r(h[0]-1,h[1],1,5,C.white[1]);r(h[0]+1,h[1]+1,1,4,C.white[1]);
    glazing(7.42,.35,1.31,12,18,'side',3);glazing(7.42,2.2,.93,12,18,'side',2);
    drainpipe(3.12,4.27,33);drainpipe(7.44,3.79,33);
    let light=p(4.78,4.26,28);r(light[0],light[1],3,2,C.white[1]);r(light[0]+1,light[1]+2,2,2,C.masonry[0]);
    // Roof and parapet retain the photographed long, shallow silhouette.
    plane(.1,.1,7.2,4,35,C.roof[1]);
    for(let y=.45;y<4;y+=.8)ln(...p(.13,y,35),...p(7.25,y,35),C.roof[0]);
    box(0,0,7.4,.13,35,3,C.masonry);box(0,0,.13,4.2,35,3,C.masonry);
    skylight(.8,.65,1.45,.86,35);skylight(3,.65,1.45,.86,35);skylight(.8,2.24,1.45,.86,35);
    plane(5.55,1.18,.95,1.02,35,C.roof[0]);box(5.35,1,.76,.8,35,6,C.white);
    for(let y=1.1;y<1.7;y+=.14)ln(...p(5.43,y,41),...p(6,y,41),C.white[0]);
    box(0,4.07,4.52,.13,35,4,C.masonry);box(4.52,4.07,2.88,.13,35,2,C.masonry);box(7.27,0,.13,4.2,35,2,C.masonry);
    // Pavement details are sparse, attached to the street-facing building.
    bollard(6.1,4.78);bollard(6.84,4.78);hydrant(6.47,4.8);
    person(4.8,4.72,C.teal,'walk');person(2.95,4.69,C.pink,'carry');
  }
  function interior(){
    ground();
    plane(0,0,7.4,4.2,1,C.white[1]);plane(.15,.15,7.1,3.9,2,C.concrete[2]);
    for(let x=.7;x<7.3;x+=1.6)ln(...p(x,.13,2),...p(x,4.1,2),C.concrete[1]);
    // Retained far walls and high windows establish a single tall warehouse.
    box(0,0,7.4,.17,1,35,C.white);box(0,0,.17,4.2,1,35,C.white);
    for(let x=.4;x<7;x+=1.7)glazing(x,.18,1.12,17,14,'front',2);
    side(.18,.4,3.45,3,29,C.white[2]);for(let z=6;z<31;z+=5){ln(...p(.185,.42,z),...p(.185,3.8,z),C.white[1]);for(let v=.6+(z%2)*.3;v<3.8;v+=.75){let q=p(.185,v,z);r(q[0],q[1]-3,1,3,C.white[1]);}}
    // Roof-off beam fragment: enough structure to explain the high shell, not a lid.
    box(.17,.15,7.08,.14,31,3,C.white);box(.18,.13,.15,.18,2,32,C.white);
    box(3.5,.13,.15,.18,2,32,C.white);box(7.09,.13,.15,.18,2,32,C.white);
    ln(...p(.36,.34,30),...p(6.97,.34,30),C.orange[0]);
    ln(...p(.36,.34,31),...p(6.97,.34,31),C.orange[2]);
    for(let x=1.2;x<7;x+=1.7){let q=p(x,.34,31);r(q[0],q[1]-1,1,4,C.masonry[1]);}
    timberRoom(4.4,.38,2.45,1.62);
    station(.65,.6,{tone:C.pink});station(2.27,.6,{occupied:true,tone:C.teal});
    station(.67,2.33,{occupied:true,tone:C.teal});station(2.29,2.33,{occupied:true,tone:C.pink});
    littlePlant(.5,1.8,2,true);littlePlant(3.73,.72,10);littlePlant(1.85,2.51,10);
    booth(5.05,2.47);person(5.67,3.47,C.orange,'seat',2);
    littlePlant(6.78,2.68,2,true);
    person(4.22,2.75,C.white,'walk',2);person(3.92,3.99,C.teal,'carry',2);
    // Near walls are cut at a common height; dark exterior, pale cut surfaces.
    box(0,4.04,5.42,.16,0,5,C.masonry);plane(0,4.04,5.42,.16,5,C.white[2]);
    box(6.46,4.04,.94,.16,0,5,C.masonry);plane(6.46,4.04,.94,.16,5,C.white[2]);
    box(7.24,0,.16,4.2,0,5,C.masonry);plane(7.24,0,.16,4.2,5,C.white[2]);
    plane(5.42,4.03,1.04,.19,1,C.glass[0]);
    bollard(6.1,4.78);bollard(6.84,4.78);hydrant(6.47,4.8);
  }

  // Boerum: user-identified three frontages in a supplied street photograph.
  // Depth, roof and the compressed three-bay arrangement are proposed translations.
  function paleGlazing(x,y,w,z,h,cols=3,rows=2){
    front(x,y,w,z,h,C.glass[0]);
    front(x+.05,y+.005,w-.1,z+1,h-2,'#7e999c');
    front(x+.07,y+.01,w-.14,z+h*.5,h*.43,'#6c8c94');
    front(x+.07,y+.015,w-.14,z+1,3,'#a3b7b2');
    // A few broad reflections carry glass, not a noise field.
    let a=p(x+w*.53,y+.02,z+4),b=p(x+w*.77,y+.02,z+h-3);
    poly([[a[0],a[1]],[a[0]+2,a[1]], [b[0]+2,b[1]],b], '#8ba4a6');
    for(let i=0;i<=cols;i++)ln(...p(x+w*i/cols,y+.04,z),...p(x+w*i/cols,y+.04,z+h),C.white[3]);
    for(let j=0;j<=rows;j++)ln(...p(x,y+.04,z+h*j/rows),...p(x+w,y+.04,z+h*j/rows),C.white[2]);
    ln(...p(x,y+.05,z+h),...p(x+w,y+.05,z+h),C.white[3]);
  }
  function streetTree(x,y){
    const [a,b]=p(x,y);
    plane(x-.4,y-.35,.8,.7,0,'#687562');
    plane(x-.27,y-.23,.54,.46,1,'#514f3b');
    for(let k=-4;k<=4;k++){let w=10-Math.abs(k);r(a+6-w,b+2+k,w*2,1,'#6b7768');}
    ln(a,b,a-1,b-36,C.timber[0]);ln(a+1,b,a,b-36,C.timber[1]);ln(a-1,b-26,a-10,b-42,C.timber[0]);ln(a,b-33,a+9,b-49,C.timber[0]);
    let lobes=[[-9,-45,9],[-1,-54,11],[11,-50,9],[-13,-57,7],[7,-62,8],[16,-40,7],[-4,-38,8]];
    for(let j=0;j<lobes.length;j++){
      let [dx,dy,n]=lobes[j],cx=a+dx,cy=b+dy;
      poly([[cx-n,cy-2],[cx-n+2,cy-n+2],[cx-3,cy-n],[cx+4,cy-n+1],[cx+n,cy-3],[cx+n-1,cy+4],[cx+3,cy+n],[cx-5,cy+n-2],[cx-n,cy+3]],C.plant[j%2]);
      poly([[cx-n+3,cy-3],[cx-n+4,cy-n+3],[cx-2,cy-n+2],[cx+4,cy-n+4],[cx+1,cy-1],[cx-5,cy+2]],C.plant[2]);
      for(let k=0;k<5;k++)r(cx-n+3+rand(j*41+k*7)*(n+3),cy-n+3+rand(j*53+k*11)*(n+3),2+(k%2),1,C.plant[k%3===0?3:1]);
    }
  }
  function fedora(x,y,state){boerumMotion.paint(r,...p(x,y),state);}
  function boerum(time=0){
    origin(139,68);
    const B=['#765747','#98705a','#ba896d','#d9b99a'];
    box(-.5,-.3,8.55,5.5,-3,3,C.concrete);plane(-.5,4.02,8.55,1.18,0,C.asphalt[1]);
    ln(...p(-.5,4.02),...p(8.05,4.02),C.concrete[3]);ln(...p(-.5,4.09),...p(8.05,4.09),C.asphalt[0]);
    for(let u=-.2;u<8;u+=1.2)ln(...p(u,2.83),...p(u,4.01),C.concrete[1]);
    box(0,0,7.5,2.8,0,64,B);
    side(7.51,0,2.8,35,29,'#9caaa3');
    for(let z=2;z<35;z+=3){
      ln(...p(0,2.81,z),...p(7.5,2.81,z),'#d2b99b');
      for(let u=.1+((z/3)%2)*.28;u<7.5;u+=.55){let v=p(u,2.82,z);r(v[0],v[1]-2,1,2,B[1]);}
    }
    for(let z=2;z<35;z+=3)ln(...p(7.51,.03,z),...p(7.51,2.75,z),B[0]);
    for(let i=0;i<3;i++){
      let x=i*2.5;
      // Two brick lower registers: doors/windows, then a broad industrial window.
      paleGlazing(x+.14,2.86,2.18,21,13,4,1);
      paleGlazing(x+.18,2.86,.68,0,18,2,1);
      paleGlazing(x+1.04,2.86,.37,5,11,1,1);
      paleGlazing(x+1.61,2.86,.67,5,11,2,1);
      let h=p(x+.48,2.89,8);r(h[0],h[1],1,3,C.white[3]);
      // Pale metal framing and two large glass rows define the upper addition.
      paleGlazing(x+.04,2.88,2.42,37,26,3,2);
      front(x,2.91,.09,35,30,C.white[2]);
      front(x+.04,2.925,.06,35,30,C.white[3]);
      front(x,2.94,2.5,35,2,C.white[1]);
      ln(...p(x,2.96,37),...p(x+2.5,2.96,37),C.white[3]);
      // Slight brick piers retain the three adjoining frontages.
      front(x+2.35,2.92,.14,0,35,B[1]);ln(...p(x+2.35,2.93,0),...p(x+2.35,2.93,35),B[3]);
    }
    // A shallow roof and fine guardrail; no pitched domestic silhouette.
    plane(.1,.1,7.3,2.58,64,C.roof[1]);
    for(let x=2.5;x<7.5;x+=2.5)ln(...p(x,.1,64),...p(x,2.68,64),C.roof[0]);
    box(0,0,7.5,.12,64,1,C.concrete);box(7.38,0,.12,2.8,64,1,C.concrete);
    ln(...p(0,2.84,69),...p(7.5,2.84,69),C.white[2]);
    for(let x=.05;x<7.5;x+=.32)ln(...p(x,2.84,65),...p(x,2.84,69),C.white[1]);
    ln(...p(0,2.84,64),...p(7.5,2.84,64),C.white[3]);
    // Narrow utility vent and a modest street pole, both taken from visible vocabulary.
    let v=p(.12,2.86,6);r(v[0]-1,v[1],4,3,C.masonry[0]);r(v[0],v[1]+1,2,1,C.masonry[2]);
    let pole=p(3.15,3.91);r(pole[0],pole[1]-36,1,37,C.masonry[2]);r(pole[0]-1,pole[1]-30,6,4,C.white[3]);r(pole[0],pole[1]-29,4,1,C.orange[1]);
    const pace=boerumMotion.sample(time);
    fedora(.45+6.45*pace.u,3.43,pace);
    streetTree(8.02,3.02);
  }
  const letters={A:['010','101','111','101','101'],B:['110','101','110','101','110'],C:['011','100','100','100','011'],D:['110','101','101','101','110'],E:['111','100','110','100','111'],F:['111','100','110','100','100'],G:['011','100','101','101','011'],H:['101','101','111','101','101'],I:['111','010','010','010','111'],K:['101','101','110','101','101'],L:['100','100','100','100','111'],M:['10101','11111','10101','10101','10101'],N:['1001','1101','1011','1001','1001'],O:['010','101','101','101','010'],P:['110','101','110','100','100'],R:['110','101','110','101','101'],S:['011','100','010','001','110'],T:['111','010','010','010','010'],U:['101','101','101','101','111'],W:['10101','10101','10101','11111','10101'],Y:['101','101','010','010','010'],Z:['111','001','010','100','111']};
  function label(s,x,y){for(let ch of s){let f=letters[ch];if(!f){x+=3;continue;}f.forEach((row,j)=>[...row].forEach((v,i)=>{if(v==='1')r(x+i,y+j,1,1,C.ink);}));x+=f[0].length+1;}}
  function parts(){
    const entries=[
      ['MASONRY',()=>{box(-.5,-.5,2,.2,0,29,C.masonry);brick(-.5,-.29,2,0,29);front(.4,-.28,.65,0,23,C.masonry[1]);for(let z=2;z<22;z+=2)ln(...p(.4,-.27,z),...p(1.05,-.27,z),C.masonry[2]);box(-.55,-.52,2.1,.26,29,2,C.masonry);}],
      ['GLAZING',()=>{box(-.65,-.5,2,.16,0,33,C.masonry);glazing(-.48,-.32,1.6,3,27,'front',3);}],
      ['SKYLIGHT',()=>{plane(-.8,-.7,2.5,1.9,0,C.roof[1]);skylight(-.55,-.45,1.8,1.1,0);}],
      ['TIMBER',()=>timberRoom(-1,-.65,2.15,1.5)],
      ['DESK ROW',()=>{station(-1.15,-.65,{occupied:true,tone:C.teal});}],
      ['BOOTH',()=>booth(-.8,-.55)],
      ['PEOPLE',()=>{person(-1,-.2,C.pink,'carry');person(.1,-.2,C.teal,'walk');person(1.2,-.2,C.orange,'seat');}],
      ['STREET',()=>{plane(-1,-.7,2.6,1.8,0,C.concrete[2]);bollard(-.6,.3);hydrant(.15,.3);bollard(.9,.3);ln(...p(-1,1.1),...p(1.6,1.1),C.concrete[3]);}]
    ];
    entries.forEach(([name,fn],i)=>{let x=(i%4)*80,y=Math.floor(i/4)*90;origin(x+39,y+43);fn();label(name,x+8,y+75);});
  }
  r(0,0,320,180,C.bg);
  return{shell,interior,parts,boerum};
}
function draw(canvas,kind='shell',timeSeconds=0){
  if(!canvas||typeof canvas.getContext!=='function')throw new TypeError('MMTOffice.draw expects a canvas');
  if(!['shell','interior','parts','boerum'].includes(kind))throw new RangeError('MMTOffice kind must be shell, interior, parts, or boerum');
  painter(canvas)[kind](Number.isFinite(timeSeconds)?timeSeconds:0);
  return{kind,...SIZE,projection:{tileWidth:32,tileHeight:16},note:kind==='boerum'?'User-identified Boerum facade translation; not a measured reconstruction':'Porter-derived proposal; not a measured reconstruction'};
}
window.MMTOffice=Object.freeze({draw,boerumMotion,size:Object.freeze(SIZE),kinds:Object.freeze(['shell','interior','parts','boerum'])});
})();
