/* Original office-derived park assemblage. Layout and attractions are design inventions.
   Shared 32×16 raster projection, same actors and UI as the component system. */
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
  put(-2,-15,5,1,'#283943');put(-4,-14,9,1,'#2a3c43');put(-1,-17,2,1,'#85918f');put(-2,-16,2,1,'#647883');put(-3,-14,4,1,'#7b8b90');
  put(-2,-10,5,5,'#6593b1');put(-2,-10,3,4,'#8bb0c3');put(1,-9,1,3,'#d0d2c0');put(-1,-9,1,3,'#aec6cb');put(-1,-13,1,2,'#ecc499');
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
const old=window.MMTArt,D=old.drawing,P=old.P;
const {pt,rect,line,poly,outline,plane,box,rnd,tile,tree,shrub,planter,lamp,bench,crate,person,pixelText,sign,van,selection,setup}=D;
P.roof=['#202b31','#343f43','#55625f','#8c9a91'];
P.grass=['#244b2d','#3b7032','#58923c','#7ab549','#acd26a'];
P.brick=['#683c36','#9c5543','#c4825c','#e6b08a'];
P.orange=['#82322a','#c34325','#f16a36','#ffad62'];
const white=['#758b89','#a4b5b2','#d5dfd9','#f7faf0'],charcoal=['#202b31','#374449','#536262','#89958c'],glass=['#243c45','#4e7781','#94c3ce','#d7edf0'],timber=['#775132','#9c7143','#c5a064','#ecd198'],copper=['#63362d','#984b39','#c87b58','#eebc88'];
const buildings=[
 {id:'B-01',name:'Boerum frontage',type:'boerum',x:1.3,y:2.5,w:4.7,d:2.2,h:48,occupants:'Creative · accounts · shared work',source:'#art/boerum-street-study'},
 {id:'B-02',name:'Porter hall',type:'porter',x:8.5,y:1.35,w:5.7,d:3.65,h:30,occupants:'Creative · production · shared rooms',source:'#art/office-architecture'},
 {id:'B-03',name:'Johnson workshop',type:'johnson',x:10.1,y:10.2,w:4.6,d:3.5,h:29,occupants:'Production · fabrication · shared work',source:'#art/office-architecture'}
];
const landmarks=[
 {id:'L-01',name:'Chrysler circuit',x:3.7,y:12.4,w:4.1,d:3.5,at:[4.05,12.25,9],site:'B-03',photo:'assets/office-references/johnson-mezzanine.jpg',observed:'The white Chrysler parked inside Johnson, beside the workstations.',invented:'A miniature oval circuit and boarding platform. The photographed car is stationary.',source:'https://mattfryed.com/266-johnson'},
 {id:'L-02',name:'Antler display',x:6.0,y:8.55,w:.9,d:.8,at:[6.3,8.9,18],site:'B-02',photo:'assets/office-references/porter-hall.jpg',observed:'A black stag sculpture with reflective antlers among Porter’s workstations.',invented:'A larger silhouette on a park plinth. No artist or symbolic meaning is assigned.',source:'https://www.psfprojects.com/workplace/madwell-creative-agency'},
 {id:'L-03',name:'Supernova pavilion',x:2.3,y:7.3,w:2.7,d:2.25,at:[3.65,8.5,20],site:'B-02',photo:'assets/office-references/porter-supernova.jpg',observed:'SUPERNOVA appears on a conference room at Porter.',invented:'The room becomes a small planetarium-like pavilion with an orbital roof sign.',source:'https://mattfryed.com/65porter'},
 {id:'L-04',name:'Solarium',x:13.25,y:6.2,w:2.4,d:2.4,at:[14.45,7.4,24],site:'B-02',photo:'assets/office-references/porter-gathering.jpg',observed:'Porter’s indoor garden sits beside its kitchen and gathering area.',invented:'A freestanding glass garden gives the park a tall, transparent landmark.',source:'https://www.psfprojects.com/workplace/madwell-creative-agency'},
 {id:'L-05',name:'Orange overlook',x:8.1,y:9.35,w:2.0,d:.8,at:[9.1,9.7,25],site:'B-03',photo:'assets/office-references/johnson-mezzanine.jpg',observed:'Johnson’s orange stair and mezzanine frame the open hall.',invented:'The circulation is pulled outside as a raised viewing platform.',source:'https://mattfryed.com/266-johnson'},
 {id:'L-06',name:'Office cat',x:10.25,y:14.3,w:.5,d:.3,at:[10.5,14.45,4],site:'B-03',photo:'assets/office-references/johnson-cat.jpg',observed:'A tabby with a purple collar, photographed in a sun patch by Johnson’s stair.',invented:'A small resting sprite beside the workshop. No name or schedule has been inferred.',source:'https://mattfryed.com/266-johnson'},
 {id:'L-07',name:'Sculpted reception',x:6.2,y:15.45,w:2.15,d:.7,at:[7.25,15.8,10],site:'B-02',photo:'assets/office-references/porter-reception.jpg',observed:'Porter’s large white reception counter has curved lobes, concave hollows and a flecked surface.',invented:'It becomes the park’s open-air arrival desk. The material and maker are not assigned.',source:'https://mattfryed.com/65porter'},
 {id:'L-08',name:'Inflatable courtyard',x:8.05,y:6.5,w:3.3,d:2.25,at:[9.7,7.7,21],site:'B-03',photo:'assets/office-references/johnson-inflatable.jpg',observed:'An inflatable castle and suspended shark appear behind the indoor Chrysler in a Johnson photograph.',invented:'The temporary objects become an optional courtyard configuration. The photograph does not establish a permanent installation.',source:'https://mattfryed.com/266-johnson'}
];
function featureRaster(faces){
 const pixels=new Map(),put=(x,y,d,c)=>{x=Math.round(x);y=Math.round(y);const k=x+','+y,a=pixels.get(k);if(!a||d>=a.d-.001)pixels.set(k,{x,y,d,c});};
 for(const f of faces){const ps=f.p;if(f.edge){const a=ps[0],b=ps[1],n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]));for(let i=0;i<=Math.ceil(n);i++){let t=n?Math.min(1,i/n):0;put(a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1]),a[2]+t*(b[2]-a[2])+.008,f.edge);}continue;}
  let a=ps[0],b=ps[1],c=ps[2],det=0;for(let k=2;k<ps.length;k++){c=ps[k];det=(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);if(Math.abs(det)>.0001)break;}if(Math.abs(det)<.0001)continue;
  const dx=((b[2]-a[2])*(c[1]-a[1])-(c[2]-a[2])*(b[1]-a[1]))/det,dy=((b[0]-a[0])*(c[2]-a[2])-(c[0]-a[0])*(b[2]-a[2]))/det;
  for(let y=Math.ceil(Math.min(...ps.map(a=>a[1])));y<=Math.floor(Math.max(...ps.map(a=>a[1])));y++){const intersections=[];for(let i=0,j=ps.length-1;i<ps.length;j=i++){let p=ps[j],q=ps[i];if((p[1]<=y&&q[1]>y)||(q[1]<=y&&p[1]>y))intersections.push(p[0]+(y-p[1])*(q[0]-p[0])/(q[1]-p[1]));}intersections.sort((a,b)=>a-b);for(let i=0;i+1<intersections.length;i+=2)for(let x=Math.ceil(intersections[i]);x<=Math.floor(intersections[i+1]);x++)put(x,y,a[2]+(x-a[0])*dx+(y-a[1])*dy,f.color);}
 }
 for(const p of pixels.values())rect(p.x,p.y,1,1,p.c);
}
function featureTone(hex,k){const n=parseInt(hex.slice(1),16);return '#'+[n>>16,n>>8&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*k))).toString(16).padStart(2,'0')).join('');}
function lmEllipse(cx,cy,rx,ry,c){
 for(let dy=-Math.ceil(ry);dy<=Math.ceil(ry);dy++){
  const q=1-dy*dy/(ry*ry);if(q<0)continue;
  const half=Math.floor(rx*Math.sqrt(q));rect(cx-half,cy+dy,half*2+1,1,c);
 }
}
function lmPath(points,c){for(let i=1;i<points.length;i++)line(...points[i-1],...points[i],c);}
function lmColumn(x,y,z,h,radius,r){
 const [a,b]=pt(x,y,z),top=b-h,rx=Math.round(radius*22.6),ry=Math.max(2,Math.round(radius*11.3));
 lmEllipse(a,b,rx,ry,r[0]);rect(a-rx,top,rx*2+1,h,r[1]);
 rect(a-rx+1,top+1,Math.max(1,rx),h-1,r[2]);
 rect(a-rx+2,top+2,Math.max(1,Math.round(rx*.35)),h-3,r[3]);
 lmEllipse(a,top,rx,ry,r[2]);line(a-rx+2,top-1,a,top-ry+1,r[3]);
 lmEllipse(a,b,rx,ry,r[1]);line(a-rx+1,b,a,b+ry-1,r[2]);
}
function lmCap(x,y,z,h,radius,r){
 const [a,b]=pt(x,y,z),rx=radius*22.6;
 for(let yy=0;yy<h;yy++){
  const t=yy/(h-1),rr=Math.max(0,Math.round(rx*Math.pow(t,.82)*(1-.16*Math.pow(t,7))));
  rect(a-rr,b-h+yy,rr*2+1,1,r[1]);
  if(rr>1){rect(a-rr+1,b-h+yy,rr,1,r[2]);rect(a-Math.floor(rr*.5),b-h+yy,Math.max(1,Math.floor(rr*.35)),1,r[3]);}
 }
 lmEllipse(a,b,Math.round(rx*.84),2,r[1]);line(a-Math.round(rx*.75),b,a,b+1,r[2]);
}
function archMix(a,b,t){const n=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));const aa=n(a),bb=n(b);return '#'+aa.map((v,i)=>Math.round(v+(bb[i]-v)*t).toString(16).padStart(2,'0')).join('');}
function archFront(x,y,z,w,h,c){if(w<=0||h<=0)return;poly([pt(x,y,z),pt(x+w,y,z),pt(x+w,y,z-h),pt(x,y,z-h)],c);}
function archSide(x,y,z,d,h,c){if(d<=0||h<=0)return;poly([pt(x,y,z),pt(x,y+d,z),pt(x,y+d,z-h),pt(x,y,z-h)],c);}
function archFrontTone(x,y,z,w,h,top,bottom){const bands=Math.max(2,Math.ceil(h/3));for(let i=0;i<bands;i++)archFront(x,y,z-i*h/bands,w,h/bands+.4,archMix(top,bottom,i/(bands-1)));}
function archSideTone(x,y,z,d,h,top,bottom){const bands=Math.max(2,Math.ceil(h/3));for(let i=0;i<bands;i++)archSide(x,y,z-i*h/bands,d,h/bands+.4,archMix(top,bottom,i/(bands-1)));}
function archCurtain(x,y,z,w,h){archFront(x,y,z,w,h,'#c4b48d');for(let u=.04;u<w;u+=.16){archFront(x+u,y+.006,z,w-u<.07?w-u:.07,h,'#d6c49b');line(...pt(x+u+.07,y+.013,z-.6),...pt(x+u+.07,y+.013,z-h),'#b29e79');}archFront(x,y+.02,z-h*.56,w,h*.12,'#b5a584');}
function archGlass(x,y,z,w,h,frame=charcoal,curtain=false){
 const dark=frame===white?'#657273':'#202728',mid=frame===white?'#c3cdc7':'#41494a',lit=frame===white?'#eef0e4':'#69716b';
 archFront(x,y,z,w,h,dark);archFrontTone(x+.055,y+.012,z-1,w-.1,h-2,'#738c8e','#445b60');
 if(curtain)archCurtain(x+.08,y+.025,z-2,w-.16,h-3);
 else{archFront(x+.07,y+.018,z-2,w-.14,Math.max(1,h*.19),'#879b98');archFront(x+.07,y+.02,z-h*.7,w-.14,Math.max(1,h*.15),'#5b7273');}
 // Recess and sill are attached to the opening; no diagonal glass slash.
 line(...pt(x,y+.026,z),...pt(x+w,y+.026,z),dark);line(...pt(x+.04,y+.027,z-1),...pt(x+.04,y+.027,z-h+1),mid);
 line(...pt(x,y+.045,z-h),...pt(x+w,y+.045,z-h),lit);
 const panes=Math.max(1,Math.round(w/.56));for(let i=1;i<panes;i++){let u=w*i/panes;line(...pt(x+u,y+.04,z-1),...pt(x+u,y+.04,z-h),mid);}
 if(h>11){let q=z-h*.61;line(...pt(x+.025,y+.045,q),...pt(x+w-.025,y+.045,q),dark);line(...pt(x+.025,y+.048,q+.8),...pt(x+w-.025,y+.048,q+.8),mid);}
}
function archSideMasonry(x,y,d,h,z,ramp){
 archSideTone(x,y,z+h,d,h,ramp[1],archMix(ramp[1],ramp[0],.12));
 const mortar=archMix(ramp[1],ramp[2],.18);
 for(let zz=2,row=0;zz<h;zz+=3,row++)for(let v=-(row%2)*.18;v<d;v+=.37){const a=Math.max(0,v),b=Math.min(d,v+.32);line(...pt(x+.012,y+a,z+zz),...pt(x+.012,y+b,z+zz),mortar);if(v>0)line(...pt(x+.014,y+v,z+zz),...pt(x+.014,y+v,z+zz+2),mortar);}
}
function archMezzanine(x,y,w,d){
 const mw=w*.4,md=Math.min(.8,d*.25);box(x+.12,y+.12,mw,md,15,2,white,false);for(const u of [.12,mw+.05])box(x+u,y+.15,.07,md,3,12,white,false);
 const railY=y+.12+md;line(...pt(x+.12,railY,24),...pt(x+.12+mw,railY,24),'#e75e31');
 for(let u=.14;u<mw+.12;u+=.17)line(...pt(x+u,railY,17),...pt(x+u,railY,24),'#bc4526');
 for(let i=0;i<6;i++)box(x+mw+.2+i*.11,y+.15,.11,.62,3+i*2,1.5,['#89361f','#b44125','#e2703d','#f3a471'],false);
 line(...pt(x+mw+.2,y+.79,10),...pt(x+mw+.86,y+.79,22),'#ec7142');
}

function frontWindow(x,y,z,w,h,frame=charcoal){archGlass(x,y,z,w,h,frame,false);}
function sideWindow(x,y,z,w,h,frame=charcoal){
 const light=frame===white?'#c0cac2':'#505b57',dark=frame===white?'#677875':'#202a2b';
 archSide(x,y,z,w,h,dark);archSideTone(x+.014,y+.055,z-1,w-.11,h-2,'#657b7b','#354f56');
 archSide(x+.02,y+.06,z-2,w-.12,Math.max(1,h*.2),'#7e9290');
 line(...pt(x+.027,y+.035,z-1),...pt(x+.027,y+.035,z-h),light);
 line(...pt(x+.035,y,z-h),...pt(x+.035,y+w,z-h),light);
 const panes=Math.max(1,Math.round(w/.55));for(let i=1;i<panes;i++)line(...pt(x+.04,y+w*i/panes,z),...pt(x+.04,y+w*i/panes,z-h),light);
 if(h>11)line(...pt(x+.04,y,z-h*.61),...pt(x+.04,y+w,z-h*.61),light);
}
function masonry(x,y,w,h,z,ramp){
 const front=archMix(ramp[2],ramp[1],.18),mortar=archMix(front,ramp[3],.23),shade=archMix(front,ramp[0],.23);
 archFrontTone(x,y,z+h,w,h,archMix(front,ramp[3],.07),archMix(front,ramp[0],.1));
 for(let row=0,zz=1;zz<h-1;row++,zz+=3){
  for(let u=-(row%2)*.18;u<w;u+=.37){const start=Math.max(0,u),end=Math.min(w,u+.32);if(end-start<.06)continue;
   const q=rnd(row*73+Math.floor(u*100)+81);if(q>.57)archFront(x+start,y+.012,z+zz+2,end-start,1,q>.79?archMix(front,ramp[3],.12):shade);
   line(...pt(x+start,y+.015,z+zz),...pt(x+end,y+.015,z+zz),mortar);
   if(u>0&&u<w-.03)line(...pt(x+u,y+.02,z+zz),...pt(x+u,y+.02,z+zz+2),mortar);
  }
 }
}
function whiteDesk(x,y,w=1.6){
 const desk=['#767d73','#b7bcad','#e0e2d6','#f7f4e7'],leg=['#375f62','#60868a','#84acad','#c0d4c8'];
 plane(x+.07,y+.12,w+.03,.82,3,'#969d91');
 for(const u of [.09,w-.17]){box(x+u,y+.04,.055,.47,3,6,leg,false);line(...pt(x+u,y+.06,4),...pt(x+u,y+.5,4),leg[0]);}
 box(x,y,w,.56,8,1.2,desk,false);archFront(x,y+.565,9.2,w,1,'#bba681');line(...pt(x,y+.58,9.3),...pt(x+w,y+.58,9.3),desk[3]);
 const stations=Math.max(1,Math.round(w/.8));
 for(let i=0;i<stations;i++){
  const u=(i+.5)*w/stations;
  box(x+u-.08,y+.16,.12,.11,9.3,2,leg,false);
  archFront(x+u-.2,y+.17,16,.41,5.8,'#3b4747');archFrontTone(x+u-.16,y+.184,15.4,.33,4.4,'#789292','#4e676d');
  line(...pt(x+u-.17,y+.188,10.5),...pt(x+u+.17,y+.188,10.5),'#182d32');
  plane(x+u-.16,y+.36,.31,.14,9.4,'#abb4ab');line(...pt(x+u-.11,y+.43,9.6),...pt(x+u+.11,y+.43,9.6),'#dfe1d5');
  box(x+u+.23,y+.29,.07,.065,9.4,2,['#936d3c','#b99e64','#d7c48e','#ece4c0'],false);
  // Low mesh chair, seat, pedestal and castors; the back is separate from the desk.
  const cy=y+.82;box(x+u-.13,cy-.13,.28,.24,5,1.5,desk,false);archFront(x+u-.12,cy+.11,10,.27,3.2,'#a4b2a8');
  for(let k=0;k<3;k++)line(...pt(x+u-.09+k*.09,cy+.12,9.5),...pt(x+u-.09+k*.09,cy+.12,7.2),'#d3d9cb');
  line(...pt(x+u,cy,5),...pt(x+u,cy,3),'#6c7772');line(...pt(x+u-.22,cy,3),...pt(x+u+.22,cy,3),'#7b8379');line(...pt(x+u,cy-.2,3),...pt(x+u,cy+.2,3),'#7b8379');
 }
}
function timberPod(x,y,w,d,z=3){
 const ply=['#806746','#b99a69','#d0b786','#e7d5aa'];
 box(x,y,w,d,z,19,ply,false);archFrontTone(x,y+d+.007,z+19,w,19,'#d7bf91','#bea071');archSideTone(x+w+.007,y,z+19,d,19,'#bba070','#9f865e');
 for(let i=1;i<Math.ceil(w/.48);i++){const u=w*i/Math.ceil(w/.48);line(...pt(x+u,y+d+.012,z+1),...pt(x+u,y+d+.012,z+18),'#b59a6e');line(...pt(x+u+.025,y+d+.014,z+2),...pt(x+u+.025,y+d+.014,z+17),'#e1cba0');}
 for(let i=0;i<Math.ceil(w*5);i++){const u=.08+rnd(i*19+5)*(w-.16),zz=z+3+rnd(i*31+4)*12;line(...pt(x+u,y+d+.02,zz),...pt(x+u+.015,y+d+.02,zz+2),'#c7ac7a');}
 plane(x+.06,y+.06,w-.12,d-.12,z+19,'#dbc79f');line(...pt(x,y+d,z+19),...pt(x+w,y+d,z+19),'#ecdcba');
 const opening=Math.min(w*.55,1.15);archFront(x+.1,y+d+.025,z+14,opening,10,'#574e3a');frontWindow(x+.14,y+d+.035,z+13,Math.max(.15,opening-.08),8.5);
 if(w>.95){const door=Math.min(.46,w*.26),dx=x+w-door-.09;archFront(dx,y+d+.03,z+13,door,12.5,'#a13e25');archFrontTone(dx+.04,y+d+.046,z+12.5,door-.08,12,'#d36437','#b64626');line(...pt(dx+door-.06,y+d+.05,z+4),...pt(dx+door-.06,y+d+.05,z+8),'#72321f');plane(dx,y+d+.03,door,.28,z+.4,'#e89a63');}
}
function booth(x,y){
 const coral=['#8b4b39','#ba7158','#dd9679','#f0b697'],seat=['#793b27','#aa4c2b','#dc6c35','#f49352'];
 const tileWhite=['#929b8f','#b6bbae','#dce0cf','#f4f4e7'];
 // A tall tiled divider in a coral frame, with two upholstered seats and a table.
 box(x-.08,y,.09,1.25,3,20,coral,false);
 box(x+.013,y+.07,.014,1.1,8,14,tileWhite,false);
 for(let v=.16;v<1.12;v+=.2)line(...pt(x+.03,y+v,8.5),...pt(x+.03,y+v,21.5),tileWhite[1]);
 for(let z=10;z<22;z+=3)line(...pt(x+.03,y+.08,z),...pt(x+.03,y+1.17,z),tileWhite[3]);
 box(x-.08,y, .09,1.25,22,1,coral,false);
 // Far bench: the seat and back use one upholstery family, not pink/grey blocks.
 for(const u of [.08,1.03])box(x+u,y+.06,.07,.39,3,3,coral,false);
 box(x+.03,y+.02,1.12,.12,6,7,seat,false);
 box(x+.03,y+.14,1.12,.28,6,2,seat,false);
 line(...pt(x+.06,y+.42,8),...pt(x+1.12,y+.42,8),seat[3]);
 for(let u=.22;u<1.05;u+=.23)line(...pt(x+u,y+.145,8),...pt(x+u,y+.145,12),seat[1]);
 // Twin slim table supports keep the central pale slab visibly a table.
 for(const u of [.23,.94])box(x+u,y+.58,.045,.12,3,7,coral,false);
 box(x+.09,y+.48,1.03,.36,10,1.7,tileWhite,false);
 line(...pt(x+.09,y+.84,11.7),...pt(x+1.12,y+.84,11.7),timber[2]);
 // Near bench sits below the table, with a visible cushion and supporting frame.
 for(const u of [.08,1.03])box(x+u,y+.91,.07,.32,3,3,coral,false);
 box(x+.03,y+.89,1.12,.28,6,2,seat,false);
 box(x+.03,y+1.15,1.12,.1,6,6,seat,false);
 for(let u=.22;u<1.05;u+=.23)line(...pt(x+u,y+1.255,7),...pt(x+u,y+1.255,11),seat[1]);
 line(...pt(x+.04,y+1.25,12),...pt(x+1.14,y+1.25,12),seat[3]);
}
function skylight(x,y,w,d,z){
 const rim=['#4a5550','#838e80','#b2bba8','#e5e4ce'];
 box(x,y,w,d,z,2.5,rim,false);plane(x+.04,y+.04,w-.08,d-.08,z+2.5,'#3e514d');
 const q=(u,v,h)=>pt(x+u,y+v,z+h),rise=6;
 poly([q(.035,.035,3),q(w-.035,.035,3),q(w-.1,d*.5,rise),q(.1,d*.5,rise)],'#c2d2ca');
 poly([q(.1,d*.5,rise),q(w-.1,d*.5,rise),q(w-.035,d-.035,3),q(.035,d-.035,3)],'#8baba6');
 line(...q(.05,.045,3),...q(w-.05,.045,3),'#e0e8d7');
 const n=Math.max(2,Math.round(w/.42));for(let i=0;i<=n;i++){let u=.06+(w-.12)*i/n;line(...q(u,.04,3),...q(u,d*.5,rise),'#edf0dd');line(...q(u,d*.5,rise),...q(u,d-.04,3),'#b7c9bb');}
 line(...q(.08,d*.5,rise),...q(w-.08,d*.5,rise),'#f2f1dc');line(...q(.04,d-.02,3),...q(w-.04,d-.02,3),'#627d73');
}
function flatRoof(b){
 const{x,y,w,d,h,type}=b,roof=['#4d5048','#73766a','#96998a','#b6b8a5'];
 box(x-.035,y-.035,w+.07,d+.07,h+3,1.7,roof,false);plane(x+.08,y+.08,w-.16,d-.16,h+4.8,'#8b8e80');
 // Broad membrane tone and sparse seams, not a noisy tile texture.
 plane(x+.11,y+.12,w*.48,d-.24,h+4.9,'#96998a');
 for(let v=.55;v<d-.18;v+=.65)line(...pt(x+.13,y+v,h+4.9),...pt(x+w-.13,y+v,h+4.9),'#818676');
 for(let i=0;i<Math.round(w*d*4);i++){const u=.16+rnd(i*37+9)*(w-.32),v=.16+rnd(i*53+13)*(d-.32);const a=pt(x+u,y+v,h+5);rect(a[0],a[1],1,1,i%3?'#9b9d8c':'#777d6e');}
 const coping=type==='porter'?['#333b39','#4d5751','#778077','#9ba295']:type==='boerum'?white:['#777f70','#a8afa0','#ccd0bf','#ecebdb'];
 box(x,y,w,.075,h+4.8,2.1,coping,false);box(x,y,.075,d,h+4.8,2.1,coping,false);
 if(type!=='boerum'){
  skylight(x+.3,y+.25,w*.34,Math.min(.8,d*.29),h+5);
  skylight(x+w*.57,y+d*.52,w*.28,Math.min(.75,d*.28),h+5);
  const vx=x+w-.65,vy=y+.22;box(vx,vy,.37,.44,h+5,4,['#5e695c','#8e9987','#b4bfaa','#d3d7c0'],false);
  for(let k=0;k<3;k++)line(...pt(vx+.06+k*.09,vy+.07,h+9),...pt(vx+.06+k*.09,vy+.35,h+9),'#626f61');
 }else{
  // Observed light metal roof railing, at the silhouette, without an invented roof pavilion.
  for(let u=.05;u<w;u+=.24)line(...pt(x+u,y+d-.02,h+6),...pt(x+u,y+d-.02,h+11),'#b9c6bb');
  line(...pt(x,y+d-.02,h+11),...pt(x+w,y+d-.02,h+11),'#e7ece0');
 }
 box(x,y+d-.065,w,.065,h+4.8,2.1,coping,false);box(x+w-.065,y,.065,d,h+4.8,2.1,coping,false);
}
function building(b,roof=true,stage=4){
 if(!building.painting)return D.cacheDraw('building:'+b.type+':'+b.w+':'+b.d+':'+b.h+':'+roof+':'+stage,b.x,b.y,()=>{building.painting=true;try{building(b,roof,stage)}finally{building.painting=false}});
 const{x,y,w,d,h,type}=b;
 const brick=['#634d41','#8b6751','#b28d72','#d5b99b'],porter=['#343c3b','#495451','#606b64','#8a9386'],plaster=['#7c887c','#a6b0a1','#d1d4c3','#eee9d5'];
 const r=type==='porter'?porter:type==='boerum'?brick:plaster;
 plane(x+.17,y+.22,w+.12,d+.13,1,'#758570');box(x-.08,y-.08,w+.16,d+.16,0,3,['#747e73','#9da595','#c2c7b5','#e1dfcd'],false);if(stage===0)return;
 plane(x+.06,y+.06,w-.12,d-.12,3,'#c4c7b9');plane(x+.12,y+.14,w-.24,d*.42,3.1,'#ced0c1');
 for(let u=.6;u<w;u+=.85)line(...pt(x+u,y+.1,3.2),...pt(x+u,y+d-.1,3.2),'#b9bdaf');
 // Cutaways expose white interior faces, not the exterior paint on every surface.
 box(x,y,w,.07,3,h,plaster,false);box(x,y,.07,d,3,h,plaster,false);
 for(let u=.6;u<w;u+=1.4)box(x+u,y+.075,.08,.085,3,h-1,white,false);
 line(...pt(x+.1,y+.11,h),...pt(x+w-.1,y+.11,h),'#d1d5c6');
 if(stage>=2){
  if(type==='porter'){
   timberPod(x+.17,y+.18,w*.32,d*.53);whiteDesk(x+w*.48,y+.35,Math.min(1.9,w*.43));whiteDesk(x+w*.48,y+d*.53,Math.min(1.9,w*.43));
   booth(x+.2,y+d-1.4);person(x+w*.7,y+d*.42,P.pink,0,false,3);
  }else if(type==='johnson'){
   archMezzanine(x,y,w,d);whiteDesk(x+.28,y+d*.47,Math.min(2.2,w*.51));whiteDesk(x+w*.58,y+d*.57,Math.min(1.55,w*.35));
   box(x+w-.85,y+.32,.64,.6,3,5,white,false);tree(x+w-.54,y+.64,.49,{z:8,receivers:[{x:x+w-.85,y:y+.32,w:.64,d:.6,z:8,risers:[{side:'x+',bottom:3},{side:'y+',bottom:3}]},{x:x+w-.21,y:y+.32,w:.13,d:.6,z:3},{x:x+w-.85,y:y+.92,w:.77,d:.65,z:3}]});person(x+w*.46,y+d*.48,P.blue,1,false,3);
  }else{
   whiteDesk(x+.22,y+.26,Math.min(1.65,w*.36));whiteDesk(x+w*.57,y+.26,Math.min(1.65,w*.36));timberPod(x+w*.43,y+.13,.6,.68);person(x+w*.24,y+d*.68,P.pink,0,false,3);
  }
 }
 if(stage>=3){
  if(!roof){box(x,y+d-.075,w,.075,3,4,r,false);box(x+w-.075,y,.075,d,3,4,r,false);return;}
  box(x,y+d-.075,w,.075,3,h,r,false);box(x+w-.075,y,.075,d,3,h,r,false);
  const fy=y+d+.018,sx=x+w+.022;
  if(type==='boerum'){
   const lower=h*.53,middle=h*.23,upper=h*.43;
   masonry(x,fy,w,lower,3,brick);archSideMasonry(sx,y,d,h,3,brick);
   // The upper storey is a continuous curtain wall above the brick base.
   archFront(x+.025,fy+.016,h+2,w-.05,upper,'#c6cfc5');
   frontWindow(x+.08,fy+.035,h+.8,w-.16,upper-2.7,white);
   archFront(x+.08,fy+.053,h+1,w-.16,2.3,'#adbdb6');
   box(x-.015,y+d-.04,w+.03,.12,h+2-upper,1.6,white,false);
   const bays=3,bay=w/bays;
   for(let j=0;j<bays;j++){
    const xx=x+j*bay+.12;
    frontWindow(xx,fy+.04,3+lower,bay-.24,middle,white);
    if(j===0||j===2){frontWindow(xx+.02,fy+.045,14,Math.min(.65,bay*.48),11,white);line(...pt(xx+.3,fy+.06,6),...pt(xx+.3,fy+.06,9),'#5f7775');}
    frontWindow(xx+bay*.55,fy+.042,13,Math.max(.23,bay*.29),8,white);
   }
   for(let v=.24;v<d-.38;v+=.8)sideWindow(sx+.016,y+v,h-1,Math.min(.55,d-v-.1),Math.min(18,h*.36),white);
  }else if(type==='porter'){
   masonry(x,fy,w,h,3,porter);archSideMasonry(sx,y,d,h,3,porter);
   // Raised casements to the left, solid masonry below; entrance occupies a distinct smooth bay.
   const left=w*.55,entry=x+w*.66;archFront(x+.09,fy+.021,h+1,left,Math.max(2,h*.09),'#3b4440');
   archGlass(x+.14,fy+.035,h-2,left-.1,h*.49,charcoal,true);
   archFrontTone(x+w*.64,fy+.028,h+1,w*.35,h-1,'#6d746a','#565e57');
   archFront(entry,fy+.04,18,w*.19,15,'#28312f');archGlass(entry+.045,fy+.054,17,w*.19-.09,13.8,charcoal,false);
   const handle=entry+w*.1;line(...pt(handle,fy+.07,7),...pt(handle,fy+.07,12),'#273532');
   sideWindow(sx+.025,y+d*.25,h-3,d*.5,h*.64,charcoal);
   archFront(x+.22,fy+.055,8,.23,3,'#364039');for(let i=0;i<2;i++)line(...pt(x+.24,fy+.06,6+i),...pt(x+.43,fy+.06,6+i),'#929889');
  }else{
   masonry(x,fy,w,h,3,plaster);archSideMasonry(sx,y,d,h,3,plaster);
   frontWindow(x+.18,fy+.03,h-3,w*.42,h*.57,charcoal);frontWindow(x+w*.64,fy+.03,h-3,w*.25,h*.57,charcoal);
   archFront(x+w*.48,fy+.035,18,w*.13,15,'#4a5b55');frontWindow(x+w*.49,fy+.05,17,w*.11,13,charcoal);
   for(let v=.25;v<d-.6;v+=1.1)sideWindow(sx+.03,y+v,h-3,.68,h*.55,charcoal);
  }
  // Visible sill and corner receive different values; a black outline would flatten the mass.
  line(...pt(x,fy+.06,3),...pt(x+w,fy+.06,3),r[0]);line(...pt(sx+.04,y+d,4),...pt(sx+.04,y+d,h+2),archMix(r[1],r[2],.2));
 }
 if(stage>=4&&roof)flatRoof(b);
}
function car(x,y,heading=0,z=3){
 if(!car.painting)return D.cacheDraw('car:'+heading+':'+z,x,y,()=>{car.painting=true;try{car(x,y,heading,z)}finally{car.painting=false}});
 const angle=heading*Math.PI/2,c=Math.cos(angle),s=Math.sin(angle),faces=[];
 const world=(u,v,h)=>[x+u*c-v*s,y+u*s+v*c,z+h];
 const q=(u,v,h)=>pt(...world(u,v,h));
 const face=(points,color,edge=null)=>{const w=points.map(a=>world(...a));faces.push({p:w.map(a=>{const o=pt(0,0);return [o[0]+(a[0]-a[1])*16,o[1]+(a[0]+a[1])*8-a[2],a[0]+a[1]+a[2]/16]}),color,edge,depth:w.reduce((s,a)=>s+a[0]+a[1]+a[2]/16,0)/w.length});};
 const segment=(a,b,col)=>face([a,b,b],col,col);
 const surface=(u,v,w,d,h,col)=>face([[u,v,h],[u+w,v,h],[u+w,v+d,h],[u,v+d,h]],col);
 const sideVisible=v=>((v>0?1:-1)*(-s+c))>-.001;
 const endVisible=u=>((u>0?1:-1)*(c+s))>-.001;
 // A low, long four-door body; wheel cutouts are part of the sill silhouette.
 const rear=-1.58,front=1.62,half=.59;
 const body=[[rear,10],[-1.48,12],[1.48,11.5],[front,9],[front,3],[1.36,3],[1.30,6],[1.16,8],[.96,8],[.80,6],[.77,3],[-.79,3],[-.82,6],[-.98,8],[-1.18,8],[-1.33,6],[-1.36,3],[rear,3]];
 // Contact shadow follows the vehicle footprint, never the screen axes.
 poly([q(-1.65,-.6,-2),q(1.78,-.6,-2),q(1.78,.7,-2),q(-1.65,.7,-2)],'#657565');
 // Wheel discs lie in the two side planes, with dark tyre / whitewall / wire hub.
 for(const v of [-.61,.61])if(sideVisible(v))for(const u of [-1.08,1.07]){
  for(const [r,col] of [[4.9,'#252b2d'],[4,'#4b5050'],[3.3,'#dedfd5'],[2.5,'#414c50'],[1.8,'#9daeb1']]){const pts=[];for(let i=0;i<16;i++){let t=i*Math.PI/8;pts.push([u+Math.cos(t)*r/16,v+(v>0?.012:-.012),4.2+Math.sin(t)*r]);}face(pts,col);}
  for(let i=0;i<6;i++){let t=i*Math.PI/3;segment([u,v*1.025,4.2],[u+Math.cos(t)*2.1/16,v*1.025,4.2+Math.sin(t)*2.1],'#d2dcda');}
 }
 for(const v of [-half,half])if(sideVisible(v)){
  const shade=(v>0?c-s:s-c)>0.6?'#cbd4d1':'#a4b6b8';
  face(body.map(([u,h])=>[u,v,h]),shade);
  face([[rear,v,10],[-1.48,v,12],[1.48,v,11.5],[front,v,9],[front,v,8.5],[rear,v,9]],'#f1f5ed');
  // Recessed rocker, double chrome belt, four door seams and fine handles.
  segment([rear,v*1.005,9.1],[front,v*1.005,8.7],'#65777e');
  segment([rear,v*1.008,10.1],[front,v*1.008,9.7],'#fffef4');
  segment([-.78,v*1.005,3.4],[.76,v*1.005,3.4],'#e4eeed');
  for(const u of [-.62,.14,.83])segment([u,v*1.007,9.5],[u-.05,v*1.007,4.1],'#8f9fa1');
  for(const u of [-.49,.32])segment([u,v*1.012,8.8],[u+.15,v*1.012,8.8],'#fffef7');
 }
 // Hood and rear deck are broad sheet metal, with restrained ridge highlights.
 face([[rear,-half,10],[-1.48,-.52,12],[-.75,-.52,12.4],[-.75,.52,12.4],[-1.48,.52,12],[rear,half,10]],'#e1e9e4');
 face([[.81,-.52,12.4],[1.48,-.52,11.5],[front,-half,9],[front,half,9],[1.48,.52,11.5],[.81,.52,12.4]],'#e9eee8');
 segment([.91,0,12.7],[1.48,0,12.1],'#fffef5');
 // Sloped glazing and a thin pale roof; cabin visibly contains warm upholstery.
 const cab=[[-.78,11.7],[-.5,20],[.42,20],[.91,12.1]];
 for(const v of [-.48,.48])if(sideVisible(v)){
  face(cab.map(([u,h])=>[u,v,h]),'#344d55');
  face([[-.68,v,12.3],[-.46,v,18.8],[-.1,v,18.8],[-.1,v,12.3]],'#6b898e');
  face([[-.02,v,12.3],[-.02,v,18.8],[.38,v,18.8],[.78,v,12.3]],'#829b9e');
  segment([-.5,v*1.008,20],[.42,v*1.008,20],'#f9fcf3');
  segment([-.73,v*1.009,12],[.86,v*1.009,12],'#dfe8e5');
  segment([-.08,v*1.015,12],[ -.08,v*1.015,19.4],'#bdc8c3');
  // Small quarter light at the front and a side mirror.
  segment([.53,v*1.01,12.3],[.36,v*1.01,18.4],'#bdc8c3');
  face([[.78,v,12],[.93,v*1.3,12],[.93,v*1.3,14],[.79,v,14]],'#cadcdd');
 }
 if(endVisible(1)){
  face([[.42,-.48,20],[.42,.48,20],[.91,.48,12.1],[.91,-.48,12.1]],'#466c78');
  face([[.51,-.40,19],[.51,.37,19],[.88,.37,13.2],[.88,-.40,13.2]],'#a1b9ba');
  segment([.86,-.40,12.9],[.86,.40,12.9],'#b8bbb1');
  face([[front,-half,9],[front,half,9],[front,half,3],[front,-half,3]],'#64767a');
  face([[front+.012,-.52,8.7],[front+.012,.52,8.7],[front+.012,.52,5],[front+.012,-.52,5]],'#263c43');
  for(const h of [5.3,6.3,7.3,8.3])segment([front+.022,-.33,h],[front+.022,.33,h],'#708385');
  // Four round headlamps, thin rectangular grille and central badge.
  for(const v of [-.45,-.3,.3,.45]){const pts=[];for(let i=0;i<8;i++){let t=i*Math.PI/4;pts.push([front+.028,v+Math.cos(t)*.07,6.9+Math.sin(t)*1.5]);}face(pts,'#eef2d7');}
  segment([front+.04,0,5.5],[front+.04,0,8.2],'#c4b893');
  segment([front+.07,-.62,3.7],[front+.07,.62,3.7],'#f6faf6');
 }else{
  face([[-.78,-.48,11.7],[-.78,.48,11.7],[-.5,.48,20],[-.5,-.48,20]],'#739398');
  face([[-.74,-.40,12.5],[-.74,.40,12.5],[-.53,.40,19],[-.53,-.40,19]],'#a6b9b4');
 }
 if(endVisible(-1)){
  face([[rear,-half,10],[rear,half,10],[rear,half,3],[rear,-half,3]],'#adbfc1');
  face([[rear-.012,-.54,9.3],[rear-.012,.54,9.3],[rear-.012,.54,5.4],[rear-.012,-.54,5.4]],'#75868c');
  for(const v of [-.5,.29])face([[rear-.02,v,8.7],[rear-.02,v+.21,8.7],[rear-.02,v+.21,6],[rear-.02,v,6]],'#a83435');
  face([[rear-.03,-.22,8.5],[rear-.03,.22,8.5],[rear-.03,.22,6],[rear-.03,-.22,6]],'#e2e8db');
  segment([rear-.04,-.60,4.3],[rear-.04,.60,4.3],'#f7fdf9');
 }
 surface(-.5,-.50,.92,1,20.1,'#fbfcf1');
 segment([-.50,.50,20.1],[.42,.50,20.1],'#bdcfcb');
 featureRaster(faces);
}
function circuit(time=0,run=false){
 const cx=4.2,cy=12.1,rx=2,ry=1.55;
 const oval=(xx,yy,z=1)=>Array.from({length:96},(_,i)=>{const t=i*Math.PI/48;return pt(cx+xx*Math.cos(t),cy+yy*Math.sin(t),z)});
 // Broad paved driving ribbon with a kerbed planted infield; not a railway loop.
 poly(oval(rx+.63,ry+.63), '#849378');poly(oval(rx+.58,ry+.58,2),'#dadbc5');poly(oval(rx+.48,ry+.48,2),'#6b7775');
 poly(oval(rx-.48,ry-.48,2),'#d6d6bb');poly(oval(rx-.58,ry-.58,3),'#71984a');
 for(let i=0;i<32;i++){const t=i*Math.PI/16;for(const k of [-.54,.54])line(...pt(cx+(rx+k-.03)*Math.cos(t),cy+(ry+k-.03)*Math.sin(t),3),...pt(cx+(rx+k+.035)*Math.cos(t),cy+(ry+k+.035)*Math.sin(t),3),'#a4a994');}
 // Low art-deco display plinth in the island, with an illuminated trim line.
 box(cx-.63,cy-.29,1.26,.58,3,2,white,false);box(cx-.5,cy-.21,1,.42,5,1,charcoal,false);
 for(let u=-.4;u<.5;u+=.18){const a=pt(cx+u,cy+.22,5);rect(a[0],a[1],1,1,'#fff2b4');}
 // Boarding apron, segmented edge and paired gates.
 box(2.8,13.96,2.6,.58,0,3,white,false);
 for(let u=0;u<2.6;u+=.26)line(...pt(2.8+u,13.97,3),...pt(2.8+u,14.52,3),'#b0baad');
 for(let u=0;u<4;u++)for(let v=0;v<2;v++)plane(3.08+u*.16,13.65+v*.12,.16,.12,3,(u+v)%2?'#e2e7d8':'#344c4b');
 for(const u of [2.88,3.15,4.55,5.3]){line(...pt(u,14.42,3),...pt(u,14.42,10),'#657a74');rect(...pt(u,14.42,11),1,1,'#fff9d4');}
 line(...pt(3.15,14.42,10),...pt(4.55,14.42,10),'#c7d6c9');
 sign(1.83,11.7,'CHRYSLER',P.pink);
 const t=run?time*.28:1.12;
 const tangent=Math.atan2(ry*Math.cos(t),-rx*Math.sin(t));
 const heading=Math.round(tangent/(Math.PI/8))/4;
 return {x:cx+rx*Math.cos(t),y:cy+ry*Math.sin(t),heading};
}
function stag(x,y){
 if(!stag.painting)return D.cacheDraw('stag',x,y,()=>{stag.painting=true;try{stag(x,y)}finally{stag.painting=false}});
 const ink=['#17282b','#25393b','#385055','#617477'],silver=['#657f7e','#a4b9b0','#d7dfca','#f1f2da'];
 box(x-.32,y-.23,.8,.7,0,7,charcoal,false);
 plane(x-.26,y-.18,.68,.59,7,'#687d73');
 const [a,b]=pt(x,y,7),p=points=>points.map(([u,v])=>[a+u,b+v]);
 // Near-frontal glossy sculpture, with four separate legs and a lifted head.
 poly(p([[-5,-15],[-3,-11],[-4,-2],[-3,0],[-6,0],[-6,-8],[-7,-13]]),ink[0]);
 poly(p([[4,-15],[7,-13],[7,-5],[9,-1],[6,0],[5,-3],[4,-9]]),ink[0]);
 poly(p([[-5,-22],[-1,-25],[4,-24],[7,-18],[7,-12],[4,-8],[-3,-8],[-7,-13],[-7,-18]]),ink[1]);
 poly(p([[-5,-20],[-2,-23],[1,-23],[0,-10],[-3,-9],[-5,-13]]),ink[2]);
 poly(p([[2,-23],[5,-21],[6,-15],[4,-10],[2,-11]]),ink[0]);
 poly(p([[-4,-10],[-1,-10],[-1,-4],[-2,2],[-4,2],[-3,-5]]),ink[1]);
 poly(p([[3,-10],[5,-11],[5,-4],[6,1],[3,1],[2,-5]]),ink[0]);
 line(a-3,b-9,a-3,b-2,ink[3]);rect(a-4,b+1,3,1,silver[1]);rect(a+3,b,3,1,silver[0]);
 poly(p([[-3,-28],[2,-29],[5,-26],[3,-20],[1,-18],[-2,-20],[-4,-24]]),ink[0]);
 poly(p([[-3,-27],[0,-28],[1,-24],[-1,-21],[-2,-23]]),ink[2]);
 poly(p([[-3,-27],[-9,-30],[-10,-28],[-6,-25],[-3,-25]]),ink[1]);
 poly(p([[3,-27],[9,-30],[10,-29],[7,-25],[3,-25]]),ink[0]);
 line(a-7,b-28,a-4,b-26,ink[3]);rect(a-1,b-25,1,1,silver[1]);rect(a+3,b-25,1,1,silver[0]);
 // Swept metallic antlers: thick branching roots, narrow illuminated tips.
 for(const s of [-1,1]){
  const chain=[ [s*2,-29],[s*4,-32],[s*9,-34],[s*13,-37],[s*16,-41],[s*17,-45] ];
  lmPath(p(chain),silver[0]);lmPath(p(chain.map(([u,v])=>[u+(s<0?1:-1),v])),silver[2]);
  const branches=[[[s*4,-32],[s*4,-37],[s*3,-40]],[[s*8,-34],[s*7,-38],[s*8,-41]],[[s*12,-36],[s*12,-41],[s*14,-44]],[[s*15,-40],[s*20,-42],[s*21,-45]]];
  branches.forEach((q,i)=>lmPath(p(q),silver[i%2?1:3]));
 }
}
function supernova(x,y){
 if(!supernova.painting)return D.cacheDraw('supernova',x,y,()=>{supernova.painting=true;try{supernova(x,y)}finally{supernova.painting=false}});
 const w=2.7,d=2.25,roof=['#5b6257','#8d9382','#b5bba5','#d8d9bf'];
 box(x,y,w,d,0,3.5,white,false);box(x+.1,y+.1,w-.2,d-.2,3.5,21,['#343f3c','#65736a','#959c86','#c5c9ae'],false);
 archCurtain(x+.17,y+d-.08,22,w-.34,17.5);
 // A dark-framed, warm conference-room pavilion. The flat canopy remains a park adaptation.
 const bays=4;for(let j=0;j<bays;j++){
  const xx=x+.15+j*(w-.3)/bays;archFrontTone(xx+.045,y+d-.053,21.5,(w-.3)/bays-.1,16.5,'#b8b697','#8c9988');
  archCurtain(xx+.085,y+d-.035,21,(w-.3)/bays-.18,14.5);
  line(...pt(xx,y+d-.02,23),...pt(xx,y+d-.02,4),'#344340');
 }
 line(...pt(x+w-.15,y+d-.02,23),...pt(x+w-.15,y+d-.02,4),'#344340');
 sideWindow(x+w-.08,y+.18,22,d-.36,17,charcoal);
 archFront(x+.17,y+d-.004,24,w-.34,2,'#36433d');archFront(x+.17,y+d-.004,4.5,w-.34,1,'#6a7768');
 const door=x+1.35;line(...pt(door,y+d+.012,7),...pt(door,y+d+.012,15),'#273a33');
 box(x+.035,y+.035,w-.07,d-.07,24.5,2.2,roof,false);plane(x+.15,y+.15,w-.3,d-.3,26.7,'#b1b6a0');
 skylight(x+.56,y+.38,1.5,.68,26.8);
 // The invented planetarium sign is a mounted copper orbit, with a luminous
 // shaded sphere. Its rear / centre / front draw order gives the armature depth.
 const a=pt(x+1.38,y+1.19,44),base=pt(x+1.38,y+1.19,27),tilt=-.32;
 plane(x+1.24,y+1.06,.29,.26,27.1,'#726c50');
 line(base[0],base[1],a[0],a[1]+3,'#816443');line(base[0]+1,base[1]-1,a[0]+1,a[1]+4,'#c19d65');
 const orbit=t=>{const u=16*Math.cos(t),v=6.5*Math.sin(t);return[a[0]+u*Math.cos(tilt)-v*Math.sin(tilt),a[1]+u*Math.sin(tilt)+v*Math.cos(tilt)];};
 const arc=(from,to,front)=>{for(let i=from;i<to;i++){const t=i*Math.PI/36,hi=front&&i<18;line(...orbit(t),...orbit(t+Math.PI/36),hi?'#e8bf81':front?'#b77e4c':'#876344');}};
 arc(36,72,false);
 poly([[a[0]-2,a[1]-5],[a[0]+2,a[1]-5],[a[0]+5,a[1]-2],[a[0]+5,a[1]+2],[a[0]+2,a[1]+5],[a[0]-2,a[1]+5],[a[0]-5,a[1]+2],[a[0]-5,a[1]-2]],'#c78d48');
 poly([[a[0]-2,a[1]-4],[a[0]+2,a[1]-4],[a[0]+4,a[1]-1],[a[0]+3,a[1]+2],[a[0],a[1]+4],[a[0]-3,a[1]+3],[a[0]-4,a[1]]],'#eed393');
 poly([[a[0]-2,a[1]-4],[a[0]+1,a[1]-4],[a[0]+2,a[1]-2],[a[0],a[1]+1],[a[0]-3,a[1]]],'#fff4c9');
 rect(a[0]-2,a[1]-3,2,2,'#fffdec');
 arc(0,36,true);
 sign(x+.1,y+2.4,'SUPERNOVA',P.pink);
}
function solarium(x,y){
 if(!solarium.painting)return D.cacheDraw('solarium',x,y,()=>{solarium.painting=true;try{solarium(x,y)}finally{solarium.painting=false}});
 const frame=['#648483','#93aaa6','#c5d8cb','#eff3df'];
 box(x,y,2.4,2.4,0,4,frame,false);
 // Rear panes are quiet coloured planes; the visible front stays genuinely open.
 poly([pt(x,y,4),pt(x+2.4,y,4),pt(x+2.4,y,42),pt(x,y,42)],'#9db9ad');
 poly([pt(x,y,4),pt(x,y+2.4,4),pt(x,y+2.4,42),pt(x,y,42)],'#b8cdbb');
 const apex=pt(x+1.2,y+1.2,54);
 poly([pt(x,y,42),pt(x+2.4,y,42),apex],'#b4cfbe');
 poly([pt(x,y,42),apex,pt(x,y+2.4,42)],'#d3dfc5');
 for(const [u,v] of [[0,0],[2.4,0],[0,2.4]]){
  line(...pt(x+u,y+v,4),...pt(x+u,y+v,42),frame[1]);
  line(...pt(x+u,y+v,42),...apex,frame[2]);
 }
 for(const u of [.8,1.6])line(...pt(x+u,y,4),...pt(x+u,y,42),frame[2]);
 for(const v of [.8,1.6])line(...pt(x,y+v,4),...pt(x,y+v,42),frame[2]);
 plane(x+.13,y+.13,2.14,2.14,4,'#bec8a9');
 box(x+.5,y+.5,1.35,1.3,4,4,white,false);
 tree(x+1.12,y+1.08,.82,{z:8,receivers:[{x:x+.5,y:y+.5,w:1.35,d:1.3,z:8,risers:[{side:'x+',bottom:4},{side:'y+',bottom:4}]},{x:x+1.85,y:y+.5,w:.43,d:1.3,z:4},{x:x+.5,y:y+1.8,w:1.78,d:.47,z:4}]});
 for(const [u,v] of [[.35,1.6],[1.65,.3],[1.78,1.6]]){
  box(x+u,y+v,.38,.37,4,4,white,false);
  const [a,b]=pt(x+u+.18,y+v+.18,8);
  poly([[a,b],[a-6,b-6],[a-5,b-11],[a-1,b-7],[a,b-1]],'#528541');
  poly([[a,b],[a+1,b-12],[a+4,b-16],[a+4,b-6]],'#396940');
  poly([[a,b-1],[a+5,b-9],[a+7,b-8],[a+3,b-2]],'#83ab55');
 }
 // Front frame, two lower rails, and roof ribs. No unbounded reflection slashes.
 for(const [u,v] of [[0,2.4],[2.4,0],[2.4,2.4]]){
  line(...pt(x+u,y+v,4),...pt(x+u,y+v,42),frame[0]);
  const p0=pt(x+u,y+v,4),p1=pt(x+u,y+v,42);line(p0[0]+1,p0[1],p1[0]+1,p1[1],frame[3]);
  line(...pt(x+u,y+v,42),...apex,frame[2]);
 }
 for(const z of [5,19,42]){
  line(...pt(x,y+2.4,z),...pt(x+2.4,y+2.4,z),frame[2]);
  line(...pt(x+2.4,y,z),...pt(x+2.4,y+2.4,z),frame[1]);
 }
 for(const u of [.8,1.6])line(...pt(x+u,y+2.4,4),...pt(x+u,y+2.4,42),frame[2]);
 for(const v of [.8,1.6])line(...pt(x+2.4,y+v,4),...pt(x+2.4,y+v,42),frame[1]);
 line(...pt(x,y,42),...pt(x+2.4,y,42),frame[2]);
 line(...pt(x,y,42),...pt(x,y+2.4,42),frame[3]);
 // Very short pane glints terminate within their own upper corners.
 for(const [u,v] of [[.1,2.4],[.9,2.4]]){
  line(...pt(x+u,y+v,37),...pt(x+u+.16,y+v,36),frame[3]);
 }
}
function overlook(x,y){
 const iron=['#732c1f','#ad4226','#e7662b','#ff9d53'];
 const stairRun=1.35,treadRun=stairRun/8,foot=x-stairRun,deckZ=26;
 // The open deck is supported separately from its stair; entry edge stays open.
 for(const u of [.13,1.97])for(const v of [.12,.63])box(x+u,y+v,.065,.065,0,24,charcoal,false);
 box(x,y,2.2,.8,24,2,white,false);
 for(let u=.17;u<2.15;u+=.2)line(...pt(x+u,y+.02,26),...pt(x+u,y+.77,26),white[1]);
 for(const v of [0,.8]){
  poly([pt(foot,y+v,1),pt(x,y+v,24),pt(x,y+v,21),pt(foot,y+v,0)],iron[v===0?1:2]);
 }
 // Far balustrades precede treads and occupant in the painter order.
 for(const i of [0,2,4,6,7]){const xx=foot+i*treadRun,zz=(i+1)*deckZ/8;line(...pt(xx,y,zz),...pt(xx,y,zz+8),iron[1]);}
 lmPath([pt(foot,y,deckZ/8+8),pt(foot+7*treadRun,y,34),pt(x,y,34)],iron[1]);
 for(let u=0;u<=2.2;u+=.275)line(...pt(x+u,y,26),...pt(x+u,y,34),iron[1]);
 line(...pt(x,y,34),...pt(x+2.2,y,34),iron[2]);
 // Rise increases toward x. Tread 8 meets the deck exactly at z=26.
 for(let i=0;i<8;i++){
  const xx=foot+i*treadRun,top=(i+1)*deckZ/8;
  box(xx,y,treadRun,.8,top-1.25,1.25,white,false);
  line(...pt(xx,y+.8,top),...pt(xx+treadRun,y+.8,top),white[3]);
 }
 person(x+1.2,y+.4,P.orange,0,false,26);
 for(const i of [0,2,4,6,7]){const xx=foot+i*treadRun,zz=(i+1)*deckZ/8;line(...pt(xx,y+.8,zz),...pt(xx,y+.8,zz+8),iron[2]);}
 lmPath([pt(foot,y+.8,deckZ/8+8),pt(foot+7*treadRun,y+.8,34),pt(x,y+.8,34)],iron[3]);
 for(let u=0;u<=2.2;u+=.275)line(...pt(x+u,y+.8,26),...pt(x+u,y+.8,34),iron[2]);
 line(...pt(x,y+.8,34),...pt(x+2.2,y+.8,34),iron[3]);
 for(const v of [.2,.4,.6])line(...pt(x+2.2,y+v,26),...pt(x+2.2,y+v,34),iron[2]);
 line(...pt(x+2.2,y,34),...pt(x+2.2,y+.8,34),iron[2]);
}
function inflatable(x,y){
 if(!inflatable.painting)return D.cacheDraw('inflatable',x,y,()=>{inflatable.painting=true;try{inflatable(x,y)}finally{inflatable.painting=false}});
 const yellow=['#ad781a','#d7a42c','#f8ca46','#fff19b'],red=['#9b2925','#c84529','#ed643c','#ffab65'],blue=['#15516a','#1b7890','#279eaf','#80d0cc'],teal=['#175d60','#1d9190','#38b8ac','#94e0c0'];
 box(x,y,3,2.1,0,4,teal,false);
 plane(x+.12,y+.1,2.75,1.85,4,teal[2]);
 // Soft bounce floor with long stitched inflated ribs.
 box(x+.26,y+.25,2.47,1.48,4,3,yellow,false);
 for(let u=.36;u<2.65;u+=.24){line(...pt(x+u,y+.3,7),...pt(x+u,y+1.65,7),yellow[1]);line(...pt(x+u+.05,y+.3,7),...pt(x+u+.05,y+1.65,7),yellow[3]);}
 // Rear net and supporting wall, seen through the entrance.
 poly([pt(x+.4,y+.16,8),pt(x+2.6,y+.16,8),pt(x+2.6,y+.16,25),pt(x+.4,y+.16,25)],'#8c7148');
 for(let u=.5;u<2.6;u+=.2)line(...pt(x+u,y+.17,8),...pt(x+u,y+.17,24),'#a89565');
 for(let z=10;z<25;z+=3)line(...pt(x+.4,y+.17,z),...pt(x+2.6,y+.17,z),'#b7a77c');
 box(x+.35,y+.02,2.3,.2,24,4,red,false);
 for(let u=.42;u<2.6;u+=.42)box(x+u,y+.025,.22,.2,28,3,yellow,false);
 for(const [u,v,r,cap] of [[.2,.2,blue,red],[2.8,.2,red,teal]]){
  lmColumn(x+u,y+v,4,25,.22,r);lmColumn(x+u,y+v,28,3,.25,yellow);lmCap(x+u,y+v,31,13,.28,cap);
 }
 // The side net is a separate dark, recessed panel, not a row of fence bars.
 poly([pt(x+2.82,y+.4,8),pt(x+2.82,y+1.7,8),pt(x+2.82,y+1.7,25),pt(x+2.82,y+.4,25)],'#465c53');
 for(let v=.5;v<1.7;v+=.2)line(...pt(x+2.825,y+v,9),...pt(x+2.825,y+v,24),'#7c8b65');
 for(let z=10;z<25;z+=3)line(...pt(x+2.825,y+.4,z),...pt(x+2.825,y+1.7,z),'#718163');
 // Broad yellow entrance frame and red inflated crossbar.
 box(x+.42,y+1.88,.18,.18,7,19,yellow,false);
 box(x+2.4,y+1.88,.18,.18,7,19,yellow,false);
 box(x+.42,y+1.88,2.16,.18,24,3,yellow,false);
 box(x+.37,y+1.85,2.26,.24,27,3,red,false);
 line(...pt(x+.43,y+2.1,30),...pt(x+2.57,y+2.1,30),red[3]);
 for(let u=.45;u<2.6;u+=.42)box(x+u,y+1.88,.23,.2,30,3,yellow,false);
 // Front towers retain the source's blue/orange and red/teal pairing.
 for(const [u,r,cap] of [[.2,blue,P.orange],[2.8,red,teal]]){
  lmColumn(x+u,y+1.9,4,25,.23,r);lmColumn(x+u,y+1.9,28,3,.26,yellow);lmCap(x+u,y+1.9,31,13,.28,cap);
 }
 box(x+.63,y+1.83,1.74,.27,4,2,yellow,false);
 line(...pt(x+.65,y+2.1,6),...pt(x+2.35,y+2.1,6),yellow[3]);
}
function shark(x,y,time){
 const [a,b]=pt(x,y,62+Math.sin(time)*2),p=points=>points.map(([u,v])=>[a+u,b+v]);
 // Suspended balloon: short ceiling filaments, never a ground/payment tether.
 line(a-9,b-19,a-9,b-9,'#b4bfb0');line(a+8,b-18,a+8,b-8,'#bbc5b5');
 poly(p([[-17,-2],[-27,-14],[-26,-6],[-22,0],[-27,11],[-24,12],[-16,4]]),'#259eac');
 poly(p([[-18,-1],[-26,-11],[-24,-3],[-21,1],[-25,9],[-17,3]]),'#6cced2');
 poly(p([[-17,-3],[-13,-9],[-5,-12],[3,-11],[10,-7],[15,-2],[18,4],[15,7],[7,8],[-4,5],[-13,1]]),'#234e5d');
 poly(p([[-14,-5],[-8,-9],[-1,-10],[7,-7],[12,-3],[3,-5],[-7,-5]]),'#366d78');
 poly(p([[-13,0],[-3,2],[7,3],[16,3],[17,5],[12,7],[4,6],[-5,3]]),'#80aeb2');
 poly(p([[0,4],[1,11],[4,8],[7,4]]),'#46b4bd');
 poly(p([[-9,-7],[-7,-13],[-3,-9]]),'#315f68');
 poly(p([[-7,2],[-10,7],[-5,6],[-1,3]]),'#318c9b');
 line(a+8,b+4,a+15,b+4,'#3e5c62');rect(a+11,b-1,1,1,'#112e39');
 for(const u of [3,5,7])line(a+u,b,a+u-1,b+2,'#527f8a');
}
function reception(x,y){
 if(!reception.painting)return D.cacheDraw('reception',x,y,()=>{reception.painting=true;try{reception(x,y)}finally{reception.painting=false}});
 const width=3.05,faces=[];
 const point=(u,t)=>{
  const cap=u<.3?Math.sqrt(Math.max(.001,1-Math.pow((u-.3)/.3,2))):u>width-.38?Math.sqrt(Math.max(.001,1-Math.pow((u-width+.38)/.38,2))):1;
  const upper=14+8/(1+Math.exp(-(u-1.55)*6)),hc=upper/2;
  let v=.46+.49*cap*Math.cos(t),h=hc+(hc-1)*cap*Math.sin(t);
  // The high right lobe is hollowed from above; front hollows cut under the lip.
  h-=5.9*Math.exp(-Math.pow((u-2.32)/.46,2)-Math.pow((v-.46)/.28,2))*Math.pow(Math.max(0,Math.sin(t)),3);
  v-=.24*Math.exp(-Math.pow((u-.75)/.34,2)-Math.pow((h-6.5)/3.2,2))*Math.max(0,Math.cos(t));
  v-=.20*Math.exp(-Math.pow((u-1.86)/.32,2)-Math.pow((h-8.5)/4,2))*Math.max(0,Math.cos(t));
  v+=.06*Math.sin(u*7)*cap;
  return[u,v,h];
 };
 const project=p=>{const w=[x+p[0],y+p[1],p[2]],o=pt(0,0);return[o[0]+16*(w[0]-w[1]),o[1]+8*(w[0]+w[1])-w[2],w[0]+w[1]+w[2]/16]};
 for(let i=0;i<64;i++)for(let j=0;j<36;j++){
  const u=.002+i*(width-.004)/64,t=j*Math.PI/18,du=(width-.004)/64,dt=Math.PI/18;
  const a=point(u,t),b=point(u+du,t),c=point(u+du,t+dt),d=point(u,t+dt),U=[(b[0]-a[0])*16,(b[1]-a[1])*16,b[2]-a[2]],V=[(d[0]-a[0])*16,(d[1]-a[1])*16,d[2]-a[2]];
  const n=[V[1]*U[2]-V[2]*U[1],V[2]*U[0]-V[0]*U[2],V[0]*U[1]-V[1]*U[0]],len=Math.hypot(...n)||1;
  const light=Math.max(0,(-.24*n[0]+.4*n[1]+.88*n[2])/len),tone=.74+.28*light;
  const col=featureTone('#f1f4ec',Math.round(tone*30)/30);
  faces.push({p:[a,b,c,d].map(project),color:col});
 }
 poly([pt(x+.12,y+.2,0),pt(x+width+.11,y+.2,0),pt(x+width+.11,y+1.01,0),pt(x+.12,y+1.01,0)],'#7c8775');
 featureRaster(faces);
 // A few embedded flecks; most of the reading is the changing surface normal.
 for(let i=0;i<14;i++){let u=.2+rnd(i*31)*2.65,t=.9+rnd(i*17)*1.3;rect(...pt(x+u,y+point(u,t)[1],point(u,t)[2]+.2),1,1,'#c2cdc2');}
 const a=pt(x+.55,y+.12,20);poly([[a[0]-3,a[1]-4],[a[0]+3,a[1]-1],[a[0]+3,a[1]+3],[a[0]-3,a[1]]],'#485a5d');line(a[0]-2,a[1]-3,a[0]+2,a[1]-1,'#9cb9b6');line(a[0],a[1]+2,a[0],a[1]+5,'#6d7c78');
 for(const [u,v,z0] of [[2.82,.96,0],[3.07,.55,0],[1.79,.08,18]]){let p=pt(x+u,y+v,z0);poly([[p[0]-3,p[1]-4],[p[0]+3,p[1]-4],[p[0]+2,p[1]],[p[0]-2,p[1]]],'#d4dfd4');for(let i=0;i<5;i++){let ex=p[0]+(i-2)*3,ey=p[1]-8-((i*3)%5);line(p[0],p[1]-3,ex,ey,'#44694a');poly([[ex,ey],[ex-2,ey-3],[ex+1,ey-2],[ex+2,ey+1]],i%2?'#6f8f48':'#244e37');}}
}
function cat(x,y,time=0){
 const [a,b]=pt(x,y,2), R=(dx,dy,w,h,c)=>rect(a+dx,b+dy,w,h,c), F=(points,c)=>poly(points.map(([dx,dy])=>[a+dx,b+dy]),c);
 // Resting profile from the Johnson photograph: haunch left, lowered head over paws.
 plane(x-.75,y-.26,1.75,.72,0,'#ddd2a0');
 F([[-14,1],[-9,-2],[9,-1],[14,2],[10,4],[-10,4]],'#a99a75');
 F([[-13,0],[-13,-4],[-10,-8],[-5,-10],[1,-9],[6,-6],[8,-1],[4,2],[-7,2]],'#69675b');
 F([[-12,-4],[-9,-8],[-4,-9],[2,-7],[5,-3],[1,0],[-9,0]],'#a6a187');
 F([[-11,-5],[-8,-8],[-3,-8],[1,-6],[-3,-5],[-7,-5]],'#c6ba97');
 F([[-10,0],[-5,-3],[1,-3],[7,0],[10,1],[9,3],[-7,2]],'#bab293');
 // Tail lies against the haunch with a restrained tip flick.
 const flick=Math.round(Math.sin(time*.7));
 F([[-12,-1],[-16,-1],[-17,1+flick],[-15,3+flick],[-8,3],[-6,2],[-14,1]],'#656659');
 R(-15,1,2,1,'#b3a989');
 // Forepaws and chest remain distinct from the head silhouette.
 F([[2,-2],[5,-3],[10,0],[14,1],[14,3],[6,3],[2,1]],'#c6b792');
 line(a+8,b+1,a+12,b+2,'#8d8267');R(12,1,1,1,'#e1d4ad');
 F([[3,-7],[5,-11],[9,-10],[12,-7],[12,-3],[9,0],[5,-2]],'#b19b74');
 F([[4,-8],[3,-13],[7,-11],[8,-8]],'#80775e');
 F([[8,-9],[10,-13],[13,-11],[12,-6]],'#c6af88');
 F([[10,-11],[11,-12],[12,-10],[11,-8]],'#c69b87');
 F([[5,-6],[8,-4],[11,-4],[12,-2],[9,0],[6,-2]],'#d1c09c');
 // A handful of broken tabby bands turn around the back and shoulder.
 for(const p of [[[-8,-8],[-6,-6],[-7,-3]],[[-3,-8],[-1,-5],[-2,-2]],[[1,-7],[3,-5],[2,-3]]])for(let i=0;i<p.length-1;i++)line(a+p[i][0],b+p[i][1],a+p[i+1][0],b+p[i+1][1],'#5a5a4d');
 line(a+7,b-8,a+9,b-6,'#5b5748');line(a+10,b-7,a+11,b-5,'#665f4d');
 R(10,-3,2,1,'#5b4e45');R(11,-2,1,1,'#9b7969');
 // Purple collar is the one identifying colour detail; no tag text.
 line(a+3,b-6,a+5,b-2,'#805695');R(4,-4,1,2,'#c092c9');R(5,-1,1,1,'#7fbb9d');
}
function court(kind){plane(8.05,6.5,3.3,2.25,1,'#d4c8ae');if(kind==='party'){inflatable(8.2,6.55);}else if(kind==='garden'){for(const [x,y] of [[8.4,6.8],[10.5,7],[8.6,8.2]]){box(x,y,.7,.7,0,5,white);shrub(x+.1,y+.1,.5);}bench(9.35,7.7);tree(10.65,8.25,.65);}else{booth(8.3,6.7);booth(10,6.7);person(9.4,7.9,P.pink,0);}}
function pennant(x,y,tone){const [a,b]=pt(x,y);line(a,b,a+7,b+3,'#5e7357');rect(a-1,b-30,2,30,'#445654');rect(a,b-30,1,30,'#a8bbb1');rect(a-2,b,5,2,'#72877b');poly([[a+1,b-29],[a+12,b-25],[a+2,b-20]],featureTone(tone,.82));poly([[a+1,b-29],[a+8,b-26],[a+1,b-22]],tone);line(a+1,b-29,a+8,b-27,featureTone(tone,1.14));}
function fedora(x,y,state){boerumMotion.paint(rect,...pt(x,y),state);}
function scene(canvas,{roof=true,selected='B-02',time=0,layer=5,landmark=null,court:courtKind='party',circuit:runCircuit=false}={}){
 setup(canvas,canvas.width/2,52);rect(0,0,canvas.width,canvas.height,'#cae0ba');const n=17;box(0,0,n,n,-6,6,P.soil);
 for(let s=0;s<34;s++)for(let x=0;x<n;x++){const y=s-x;if(y<0||y>=n)continue;const paved=x===6||x===7||y===6||y===7||(y===5&&x>0&&x<15)||(y===14&&x>8&&x<16)||(x===12&&y>5&&y<10);tile(x,y,paved?'pave':'grass');if(paved&&((x===6&&y>6)||(y===6&&x<6)))plane(x+.05,y+.05,.12,.9,.2,P.brick[2]);}
 // Concrete service yards keep industry distinct from the planted park paths.
 plane(8.3,1.2,6.2,4.8,.3,'#aeb9ae');plane(9.9,10,5,4.2,.3,'#bec8ba');plane(1.1,2.3,5.1,3.4,.3,'#b9c5b9');
 if(layer===0)return[];let items=[],hits=[];const add=(x,y,fn)=>items.push({key:x+y,fn});
 buildings.forEach(b=>{add(b.x+b.w,b.y+b.d,()=>building(b,b.id===selected?roof:true));hits.push({id:b.id,kind:'building',p:pt(b.x+b.w/2,b.y+b.d/2,b.h/2),polygon:[pt(b.x,b.y,b.h+8),pt(b.x+b.w,b.y,b.h+8),pt(b.x+b.w,b.y+b.d),pt(b.x,b.y+b.d)]});});
 if(layer>=2){let ride=circuit(time,runCircuit);add(ride.x,ride.y,()=>car(ride.x,ride.y,ride.heading,4));add(2.9,8.4,()=>supernova(2.3,7.3));add(6.4,8.95,()=>stag(6.3,8.9));add(14.45,7.4,()=>solarium(13.25,6.2));add(9.4,9.8,()=>overlook(8.1,9.35));add(10.4,8.3,()=>court(courtKind));add(10.5,14.45,()=>cat(10.5,14.45,time));add(7.6,16.1,()=>reception(6.2,15.45));if(courtKind==='party')add(10.3,8.4,()=>shark(9.7,7.6,time));
 for(const [x,y,s] of [[.5,1.1,.9],[1.6,.65,.8],[5.8,.8,.95],[15.4,1.5,1.1],[15.5,4.4,.8],[.5,6.5,1.15],[.9,10.3,1],[8.4,15.4,.85],[14.7,15.4,1.1],[16,12.4,.85],[1,15.2,.8]])add(x,y,()=>tree(x,y,s));
 for(const [x,y] of [[6.05,1.2],[7.7,5.7],[12.25,8.8],[8.2,13.8],[1.3,6.2]])add(x,y,()=>lamp(x,y));for(const [x,y] of [[5.5,10.2],[12.9,14.5],[.9,9.2]])add(x,y,()=>bench(x,y));for(let i=0;i<4;i++){add(15.1,8+i*.5,()=>shrub(15.1,8+i*.5,.6));}add(15.1,4.6,()=>van(15.1,4.6));add(14.5,4.5,()=>crate(14.5,4.5));add(14.75,13.1,()=>crate(14.75,13.1));add(14.75,13.1,()=>crate(14.75,13.1,7));
 for(const [x,y,tone] of [[6.2,15.6,P.pink[2]],[7.7,15.6,P.orange[2]],[7.7,.5,P.pink[2]],[12.2,6.3,P.orange[2]]])add(x,y,()=>pennant(x,y,tone));
 landmarks.filter(l=>l.id!=='L-08'||courtKind==='party').forEach(l=>hits.push({id:l.id,kind:'landmark',p:pt(...l.at),radius:l.id==='L-01'?30:l.id==='L-06'?9:l.id==='L-07'?19:25}));}
 if(layer>=3){const walk=[{x:6.5,y:1.5+(time*.52)%13},{x:1.3+(time*.41+2)%13,y:6.5},{x:7.2,y:2+(time*.35+5)%13},{x:10+(time*.22)%3,y:14.4},{x:6.45,y:10+(time*.27)%4},{x:9.5,y:5.5},{x:11.5,y:5.5},{x:2.1,y:13.9}];walk.forEach((p,i)=>add(p.x,p.y,()=>person(p.x,p.y,P[['pink','blue','orange','green'][i%4]],time*4+i,i===5)));const pace=boerumMotion.sample(time);/* Entire pacing path is in front of Boerum's facade. */add(6,5.02,()=>fedora(1.7+pace.u*3.9,5.02,pace));}
 items.sort((a,b)=>a.key-b.key).forEach(i=>i.fn());
 if(layer>=4){sign(1.25,5.65,'BOERUM',P.pink);sign(9.1,5.25,'PORTER',P.orange);sign(10.05,14.18,'JOHNSON',P.green);sign(8.9,16.2,'MAD MONEY',P.pink);}
 if(layer>=5){if(landmark){const l=landmarks.find(l=>l.id===landmark);if(l){const [x,y]=pt(...l.at);line(x-13,y+10,x+13,y+10,P.green[2]);rect(x-15,y-12,2,24,P.green[2]);rect(x+14,y-12,2,24,P.green[2]);}}else selection(buildings.find(b=>b.id===selected)||buildings[1]);}
 return hits;
}
function specimen(canvas,kind){const alias={creative:'boerum',production:'porter',accounts:'johnson'};if(!alias[kind]&&!['cutaway','stage0','stage1','stage2','stage4','car','stag','supernova','solarium','overlook','props','signs','reception','inflatable','cat','shark'].includes(kind)){old.specimen(canvas,kind);return;}
 setup(canvas,canvas.width/2,canvas.height*.66);
 if(kind==='car'){car(0,0,0);return;}if(kind==='stag'){stag(0,0);return;}if(kind==='supernova'){supernova(-1.35,-1);return;}if(kind==='solarium'){solarium(-1.2,-1.2);return;}if(kind==='overlook'){overlook(-.6,-.3);return;}if(kind==='reception'){reception(-1,-.3);return;}if(kind==='inflatable'){inflatable(-1.5,-1);return;}if(kind==='cat'){cat(0,0,0);return;}if(kind==='shark'){shark(0,0,0);return;}if(kind==='props'){whiteDesk(-2,-1,2);booth(.6,-1);crate(-.6,1);return;}if(kind==='signs'){sign(-2,-.5,'BOERUM',P.pink);sign(.8,-.5,'PORTER',P.orange);return;}
 const type=alias[kind]||'porter',b={x:-1.75,y:-1.2,w:3.5,d:2.3,h:type==='boerum'?39:24,type};building(b,kind!=='cutaway'&&!['stage0','stage1','stage2'].includes(kind),kind.startsWith('stage')?Number(kind.at(-1)):4);
}
window.MMTArt={...old,scene,specimen,buildings,landmarks,boerumMotion,components:{circuit,building,whiteDesk,timberPod,booth,skylight,car,stag,supernova,solarium,overlook,inflatable,shark,reception,cat,pennant},sceneSize:{width:640,height:360},version:'0.8'};
})();
