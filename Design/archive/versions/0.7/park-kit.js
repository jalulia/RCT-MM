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
function frontWindow(x,y,z,w,h,frame=charcoal){poly([pt(x,y,z),pt(x+w,y,z),pt(x+w,y,z-h),pt(x,y,z-h)],frame[0]);poly([pt(x+.05,y+.012,z-1),pt(x+w-.05,y+.012,z-1),pt(x+w-.05,y+.012,z-h+1),pt(x+.05,y+.012,z-h+1)],glass[2]);line(...pt(x+.07,y+.02,z-2),...pt(x+w-.08,y+.02,z-h*.5),glass[3]);line(...pt(x+w/2,y+.03,z),...pt(x+w/2,y+.03,z-h),frame[2]);line(...pt(x,y+.03,z-h*.6),...pt(x+w,y+.03,z-h*.6),frame[2]);}
function sideWindow(x,y,z,w,h,frame=charcoal){poly([pt(x,y,z),pt(x,y+w,z),pt(x,y+w,z-h),pt(x,y,z-h)],frame[0]);poly([pt(x+.015,y+.05,z-1),pt(x+.015,y+w-.05,z-1),pt(x+.015,y+w-.05,z-h+1),pt(x+.015,y+.05,z-h+1)],glass[1]);line(...pt(x+.02,y+w/2,z),...pt(x+.02,y+w/2,z-h),frame[2]);line(...pt(x+.02,y,z-h*.55),...pt(x+.02,y+w,z-h*.55),frame[2]);}
function masonry(x,y,w,h,z,ramp){for(let zz=3;zz<h;zz+=4){line(...pt(x,y,z+zz),...pt(x+w,y,z+zz),ramp[1]);for(let u=(zz%8===3?.12:.36);u<w;u+=.48)line(...pt(x+u,y+.01,z+zz),...pt(x+u,y+.01,z+zz+3),ramp[1]);}}
function whiteDesk(x,y,w=1.6){for(const u of [.1,w-.18])box(x+u,y,.07,.47,3,6,charcoal);box(x,y,w,.55,8,2,white);for(let u=.2;u<w-.1;u+=.7){const a=pt(x+u,y+.1,16);rect(a[0]-3,a[1]-4,7,6,charcoal[0]);rect(a[0]-2,a[1]-3,5,3,glass[2]);plane(x+u+.24,y+.28,.25,.17,11,P.pink[2]);box(x+u+.12,y+.65,.3,.25,3,4,charcoal);}}
function timberPod(x,y,w,d,z=3){box(x,y,w,d,z,19,timber);plane(x+.08,y+.08,w-.16,d-.16,z+19,timber[1]);for(let u=.13;u<w;u+=.18)line(...pt(x+u,y+d+.01,z+1),...pt(x+u,y+d+.01,z+18),timber[0]);frontWindow(x+.18,y+d+.025,z+15,w*.45,10);box(x+w-.5,y+d-.14,.44,.15,z,14,P.orange);plane(x+w-.52,y+d,.48,.4,z+1,P.orange[2]);}
function booth(x,y){box(x,y,1.2,.38,3,9,P.orange);box(x,y+.37,1.2,.27,3,4,P.pink);box(x,y+.9,1.2,.35,3,4,P.orange);box(x+.17,y+.62,.82,.08,3,6,charcoal);box(x+.06,y+.49,1.08,.36,9,2,white);box(x-.08,y,.08,1.22,3,14,white);}
function skylight(x,y,w,d,z){box(x,y,w,d,z,3,charcoal);poly([pt(x,y,z+3),pt(x+w,y,z+3),pt(x+w,y+d*.55,z+9),pt(x,y+d*.55,z+9)],glass[2]);poly([pt(x,y+d*.55,z+9),pt(x+w,y+d*.55,z+9),pt(x+w,y+d,z+3),pt(x,y+d,z+3)],glass[1]);for(let u=0;u<=w;u+=.45){line(...pt(x+u,y,z+3),...pt(x+u,y+d*.55,z+9),white[2]);line(...pt(x+u,y+d*.55,z+9),...pt(x+u,y+d,z+3),white[1]);}line(...pt(x,y+d*.55,z+9),...pt(x+w,y+d*.55,z+9),white[3]);}
function flatRoof(b){const{x,y,w,d,h}=b;box(x-.06,y-.06,w+.12,d+.12,h+3,2,charcoal);plane(x+.09,y+.09,w-.18,d-.18,h+5,charcoal[1]);for(let v=.4;v<d;v+=.65)line(...pt(x+.1,y+v,h+5),...pt(x+w-.1,y+v,h+5),charcoal[0]);for(const [u,v] of [[0,0],[0,d-.06]])box(x+u,y+v,w,.06,h+5,2,charcoal);box(x+w-.06,y,.06,d,h+5,2,charcoal);if(b.type!=='boerum'){skylight(x+.4,y+.35,w*.36,.8,h+6);skylight(x+w*.56,y+1.7,w*.3,.75,h+6);box(x+w-.85,y+.35,.5,.65,h+6,6,white);for(let k=0;k<4;k++)line(...pt(x+w-.8+k*.08,y+.4,h+12),...pt(x+w-.8+k*.08,y+.89,h+12),charcoal[1]);}else{for(let u=0;u<=w;u+=.3)line(...pt(x+u,y+d,h+5),...pt(x+u,y+d,h+10),white[2]);line(...pt(x,y+d,h+10),...pt(x+w,y+d,h+10),white[3]);}}
function building(b,roof=true,stage=4){const{x,y,w,d,h,type}=b,r=type==='porter'?charcoal:type==='johnson'?white:copper;
 plane(x+.2,y+.3,w+.2,d+.25,1,'#537043');box(x-.1,y-.1,w+.2,d+.2,0,3,white);if(stage===0)return;
 plane(x+.08,y+.08,w-.16,d-.16,3,'#b4c0b3');box(x,y,w,.07,3,h,r);box(x,y,.07,d,3,h,r);
 if(stage>=2){if(type==='porter'){timberPod(x+.2,y+.2,w*.32,d*.55);whiteDesk(x+w*.48,y+.45,1.9);whiteDesk(x+w*.48,y+1.8,1.9);booth(x+.3,y+d-1.4);person(x+3.4,y+1.2,P.pink,0,false,3);}else if(type==='johnson'){whiteDesk(x+.3,y+.3,2.2);whiteDesk(x+.3,y+1.65,2.2);tree(x+w-.7,y+d-1,.62);box(x+w-1.2,y+.2,1,.65,3,17,P.orange);person(x+1.8,y+1.3,P.blue,1,false,3);}else{whiteDesk(x+.25,y+.2,1.65);whiteDesk(x+2.65,y+.2,1.65);timberPod(x+1.9,y+.13,.7,.7);person(x+1.1,y+1.35,P.pink,0,false,3);}}
 if(stage>=3){box(x,y+d-.075,w,.075,3,roof?h:5,r);box(x+w-.075,y,.075,d,3,roof?h:5,r);
 if(roof){masonry(x,y+d+.004,w,type==='boerum'?23:h,3,r);const count=type==='boerum'?3:Math.floor(w/1.2);for(let j=0;j<count;j++){const u=j*w/count+.13,ww=w/count-.25;if(type==='boerum'){frontWindow(x+u,y+d+.02,h+1,ww,22,white);frontWindow(x+u,y+d+.025,25,ww,11,white);frontWindow(x+u+.04,y+d+.03,13,.44,11,white);frontWindow(x+u+.67,y+d+.03,12,ww-.8,9,white);}else{frontWindow(x+u,y+d+.025,h,ww,h-9);}}
 for(let v=.18;v<d-.5;v+=1.15)sideWindow(x+w+.02,y+v,h-1,.75,type==='boerum'?20:h-9,type==='boerum'?white:charcoal);
 if(type!=='boerum'){const doorx=x+w*.54;poly([pt(doorx,y+d+.06,17),pt(doorx+.52,y+d+.06,17),pt(doorx+.52,y+d+.06,3),pt(doorx,y+d+.06,3)],charcoal[0]);line(...pt(doorx+.26,y+d+.075,16),...pt(doorx+.26,y+d+.075,4),white[2]);box(doorx-.08,y+d+.02,.68,.18,18,1,white);}}}
 if(stage>=4&&roof)flatRoof(b);
}
function car(x,y,heading=0,z=3){
 const a=heading*Math.PI/2,c=Math.cos(a),s=Math.sin(a),q=(u,v,h)=>pt(x+u*c-v*s,y+u*s+v*c,z+h);
 const slab=(u,v,w,d,base,h,r)=>{const top=[q(u,v,base+h),q(u+w,v,base+h),q(u+w,v+d,base+h),q(u,v+d,base+h)],bottom=[q(u,v,base),q(u+w,v,base),q(u+w,v+d,base),q(u,v+d,base)];let faces=[];for(let i=0;i<4;i++){let k=(i+1)%4;faces.push({p:[top[i],top[k],bottom[k],bottom[i]],key:(bottom[i][1]+bottom[k][1])/2,i});}faces.sort((a,b)=>a.key-b.key).slice(2).forEach(f=>poly(f.p,r[f.i%2+1]));poly(top,r[3]);outline(top,r[0]);};
 for(const u of [-.64,.67])for(const v of [-.34,.34]){let p=q(u,v,2);rect(p[0]-2,p[1]-2,5,5,charcoal[0]);rect(p[0],p[1],2,2,white[1]);}
 slab(-1,-.34,2,.68,3,4,white);slab(-.35,-.28,.84,.56,7,5,glass);slab(-.3,-.29,.68,.58,12,1,white);
 for(const u of [-1.02,1.02]){line(...q(u,-.35,5),...q(u,.35,5),white[3]);for(const v of [-.25,.2]){let p=q(u,v,6);rect(p[0],p[1],2,2,u<0?'#e84434':'#ffec9b');}}
}
function circuit(time,run){const cx=4.2,cy=12.1,rx=2,ry=1.55;plane(1.7,10.05,5.1,4.25,1,'#8fbd56');const oval=(xx,yy)=>{const p=[];for(let i=0;i<64;i++){const t=i*Math.PI/32;p.push(pt(cx+xx*Math.cos(t),cy+yy*Math.sin(t),3));}return p;};for(const [xx,yy,c] of [[rx+.16,ry+.16,copper[0]],[rx+.08,ry+.08,white[2]],[rx,ry,charcoal[1]],[rx-.08,ry-.08,white[2]]])outline(oval(xx,yy),c);
 for(let i=0;i<24;i++){const t=i*Math.PI/12;line(...pt(cx+(rx-.17)*Math.cos(t),cy+(ry-.17)*Math.sin(t),2),...pt(cx+(rx+.18)*Math.cos(t),cy+(ry+.18)*Math.sin(t),2),timber[1]);}
 box(cx-1,cy-.5,2,1,0,4,white);plane(cx-.85,cy-.35,1.7,.7,4,P.pink[2]);for(let i=0;i<5;i++){const p=pt(cx-.7+i*.3,cy-.4,5);rect(p[0],p[1],2,2,((i+Math.floor(time*3))%3===0&&run)?'#fff1b0':P.orange[1]);}
 box(1.8,12.95,1.1,.8,0,3,timber);sign(1.8,13,'CHRYSLER',P.pink);
 const t=run?time*.4:1.1;return {x:cx+rx*Math.cos(t),y:cy+ry*Math.sin(t),heading:(Math.round(t/(Math.PI/2))+1)%4};}
function stag(x,y){box(x-.32,y-.23,.8,.7,0,7,charcoal);const [a,b]=pt(x,y,7);poly([[a-9,b-13],[a-7,b-17],[a+5,b-16],[a+9,b-25],[a+13,b-25],[a+12,b-14],[a+6,b-9],[a-7,b-9]],'#202830');for(const dx of [-6,-2,5,8]){line(a+dx,b-11,a+dx-1,b,charcoal[0]);rect(a+dx-2,b,3,1,charcoal[1]);}line(a+9,b-25,a+5,b-37,'#dce8ae');line(a+11,b-25,a+15,b-38,'#c0d6ae');for(const [x1,y1,x2,y2] of [[5,-34,0,-37],[6,-31,1,-31],[14,-34,19,-38],[13,-31,19,-32]])line(a+x1,b+y1,a+x2,b+y2,'#eef5c6');}
function supernova(x,y){box(x,y,2.7,2.25,0,4,white);box(x+.12,y+.12,2.46,2.01,4,18,charcoal);for(let u=.3;u<2.3;u+=.6)frontWindow(x+u,y+2.15,20,.48,14);box(x+.05,y+.05,2.6,2.15,22,3,P.pink);poly([pt(x+.05,y+.05,25),pt(x+2.65,y+.05,25),pt(x+2.28,y+1.5,38),pt(x+.4,y+1.5,38)],charcoal[1]);poly([pt(x+.4,y+1.5,38),pt(x+2.28,y+1.5,38),pt(x+2.65,y+2.2,25),pt(x+.05,y+2.2,25)],charcoal[0]);
 const [a,b]=pt(x+1.35,y+1.1,47);for(let i=0;i<28;i++){let t=i*Math.PI/14;rect(a+Math.cos(t)*13,b+Math.sin(t)*5,1,1,P.pink[2]);}poly([[a,b-10],[a+2,b-3],[a+8,b],[a+2,b+2],[a,b+9],[a-2,b+2],[a-8,b],[a-2,b-3]],P.orange[3]);sign(x+.1,y+2.4,'SUPERNOVA',P.pink);}
function solarium(x,y){box(x,y,2.4,2.4,0,4,white);box(x+.45,y+.45,1.5,1.5,4,5,white);tree(x+1.2,y+1.2,1.05);for(const [u,v] of [[0,0],[2.4,0],[0,2.4],[2.4,2.4]]){line(...pt(x+u,y+v,4),...pt(x+u,y+v,42),white[3]);line(...pt(x+u,y+v,42),...pt(x+1.2,y+1.2,54),glass[2]);}outline([pt(x,y,42),pt(x+2.4,y,42),pt(x+2.4,y+2.4,42),pt(x,y+2.4,42)],white[2]);line(...pt(x+.15,y+2.4,12),...pt(x+.85,y+2.4,30),glass[3]);line(...pt(x+2.4,y+.3,14),...pt(x+2.4,y+1.2,34),glass[2]);}
function overlook(x,y){for(let u=0;u<1.8;u+=.6)box(x+u,y+.12,.08,.6,0,24,charcoal);box(x,y,2.2,.8,24,2,white);for(const v of [0,.8]){line(...pt(x,y+v,34),...pt(x+2.2,y+v,34),P.orange[2]);for(let u=0;u<=2.2;u+=.22)line(...pt(x+u,y+v,26),...pt(x+u,y+v,34),P.orange[2]);}for(let i=0;i<8;i++)box(x-.2-i*.15,y,.15,.8,i*3,3,white);line(...pt(x-1.3,y,8),...pt(x,y,32),P.orange[2]);line(...pt(x-1.3,y+.8,8),...pt(x,y+.8,32),P.orange[2]);person(x+1.2,y+.4,P.orange,0,false,26);}
function inflatable(x,y){const yellow=['#b57818','#e1a823','#ffd143','#fff09b'],red=['#a92e32','#d54632','#f0603d','#ffaf61'],blue=['#174f69','#177d99','#24a9c2','#79d3d8'];box(x,y,3,2.1,0,4,blue);box(x+.1,y+.15,2.8,1.8,4,4,yellow);for(const [u,v,r] of [[0,0,blue],[2.6,0,red],[0,1.7,red],[2.6,1.7,blue]]){box(x+u,y+v,.4,.4,4,25,r);poly([pt(x+u-.08,y+v+.5,29),pt(x+u+.5,y+v+.5,29),pt(x+u+.22,y+v+.22,44)],v===0?P.orange:yellow);}box(x+.4,y,2.2,.15,8,17,red);box(x+.4,y+1.95,2.2,.15,24,3,yellow);for(let u=.5;u<2.6;u+=.38)box(x+u,y,.2,.2,25,4,yellow);for(let u=.5;u<2.6;u+=.28)line(...pt(x+u,y+2,8),...pt(x+u,y+2,24),charcoal[2]);}
function shark(x,y,time){const [a,b]=pt(x,y,62+Math.sin(time)*2);line(a,b+4,...pt(x+.1,y+.2,10),white[1]);poly([[a-16,b],[a-9,b-7],[a+6,b-8],[a+16,b-2],[a+17,b+2],[a+8,b+7],[a-8,b+5]],'#286a82');poly([[a-16,b],[a-24,b-9],[a-21,b+7]],'#28b6c7');poly([[a-3,b-6],[a+1,b-15],[a+6,b-7]],'#3d92a1');poly([[a-8,b+4],[a+12,b+1],[a+10,b+5],[a-3,b+8]],'#b8dae0');rect(a+10,b-2,2,2,charcoal[0]);}
function reception(x,y){const points=[[0,.1],[.25,-.03],[.75,.1],[1.05,-.08],[1.5,.02],[2,.0],[2.25,.3],[2.12,.72],[1.6,.76],[1.25,.6],[.85,.78],[.45,.65],[.08,.7],[-.1,.42]],top=points.map(([u,v])=>pt(x+u,y+v,12)),bottom=points.map(([u,v])=>pt(x+u,y+v,2));for(let i=0;i<points.length;i++){let j=(i+1)%points.length;if(points[i][1]+points[j][1]>.55)poly([top[i],top[j],bottom[j],bottom[i]],white[2]);}poly(top,white[3]);for(let i=0;i<18;i++){let a=pt(x+.1+rnd(i*3)*1.9,y+.15+rnd(i*9)*.4,12);rect(...a,1,1,white[1]);}let a=pt(x+.45,y+.18,18);rect(a[0],a[1],5,4,charcoal[0]);planter(x+2.15,y+.6);}
function cat(x,y,time){const [a,b]=pt(x,y,3);plane(x-.1,y-.15,.85,.55,1,'#e1d79d');poly([[a-6,b-4],[a-3,b-7],[a+4,b-6],[a+7,b-2],[a+6,b+1],[a-6,b+1]],timber[2]);rect(a+4,b-7,5,6,timber[1]);rect(a+4,b-9,1,3,timber[0]);rect(a+8,b-9,1,3,timber[0]);rect(a+3,b-5,2,4,'#9863ad');for(let i=0;i<3;i++)rect(a-4+i*3,b-5,1,3,timber[0]);line(a-5,b,a-10,b+Math.round(Math.sin(time*.7)),timber[0]);}
function court(kind){plane(8.05,6.5,3.3,2.25,1,'#d4c8ae');if(kind==='party'){inflatable(8.2,6.55);}else if(kind==='garden'){for(const [x,y] of [[8.4,6.8],[10.5,7],[8.6,8.2]]){box(x,y,.7,.7,0,5,white);shrub(x+.1,y+.1,.5);}bench(9.35,7.7);tree(10.65,8.25,.65);}else{booth(8.3,6.7);booth(10,6.7);person(9.4,7.9,P.pink,0);}}
function pennant(x,y,tone){const [a,b]=pt(x,y);rect(a,b-28,1,28,charcoal[0]);poly([[a+1,b-28],[a+11,b-25],[a+1,b-20]],tone);}
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
window.MMTArt={...old,scene,specimen,buildings,landmarks,boerumMotion,components:{building,whiteDesk,timberPod,booth,skylight,car,stag,supernova,solarium,overlook,inflatable,shark,reception,cat,pennant},sceneSize:{width:640,height:360},version:'0.7'};
})();
