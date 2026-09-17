/* Original pixel study. Integer raster primitives; no game assets or generated renders. */
(()=>{
'use strict';
const P={ink:'#263b42',soil:['#485f35','#61793d','#86a34b','#a3bd62'],grass:['#304f2c','#4b7835','#689542','#84b04d','#a8c965'],pave:['#858b8e','#a5afb0','#c5cecb','#e7e9dc'],brick:['#784c49','#a2695b','#c68770','#e2a78d'],pink:['#93496e','#ca729e','#eda8c5','#ffd2e5'],blue:['#354f74','#5274a0','#789cb8','#b7d6de'],paper:['#9da5a1','#c6cfca','#e7ece4','#fffef5'],roof:['#304a50','#486970','#729491','#a5bbb0'],wood:['#756145','#9c8055','#c2a271','#e1c79a'],green:['#207e52','#23b766','#4fea79','#abf6b7'],orange:['#9c533c','#cc7a47','#eea155','#ffd487']};
let ctx,ox=0,oy=0;
const pt=(x,y,z=0)=>[Math.round(ox+(x-y)*16),Math.round(oy+(x+y)*8-z)];
function refGroundShadow(points,z=0,opacity=.22,receivers=refGroundShadow.receivers){
 const ink='rgba(24,39,34,'+opacity+')';
 const clip=(input,axis,bound,greater)=>{
  const out=[];for(let i=0;i<input.length;i++){
   const a=input[i],b=input[(i+1)%input.length],ia=greater?a[axis]>=bound:a[axis]<=bound,ib=greater?b[axis]>=bound:b[axis]<=bound;
   if(ia)out.push(a);if(ia!==ib){const t=(bound-a[axis])/(b[axis]-a[axis]);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}
  }return out;
 };
 const surfaces=receivers;
 if(Array.isArray(surfaces)&&surfaces.length){
  for(const s of surfaces){
   // Intersect each exposed vertical face with the footprint, then shade that face at its own Zs.
   for(const face of s.risers||[]){
    const axis=face.side[0]==='x'?0:1,at=(axis===0?s.x:s.y)+(face.side[1]==='+'?(axis===0?s.w:s.d):0),across=1-axis,hits=[];
    for(let i=0;i<points.length;i++){
     const a=points[i],b=points[(i+1)%points.length];if(Math.abs(a[axis]-at)<1e-8)hits.push(a[across]);
     if((a[axis]<at&&b[axis]>at)||(a[axis]>at&&b[axis]<at)){const t=(at-a[axis])/(b[axis]-a[axis]);hits.push(a[across]+t*(b[across]-a[across]));}
    }
    if(hits.length>=2){
     const start=axis===0?s.y:s.x,length=axis===0?s.d:s.w,lo=Math.max(start,Math.min(...hits)),hi=Math.min(start+length,Math.max(...hits)),bottom=face.bottom??z;
     if(hi>lo&&s.z>bottom){const q=(u,h)=>axis===0?pt(at,u,h):pt(u,at,h);poly([q(lo,bottom),q(hi,bottom),q(hi,s.z),q(lo,s.z)],ink);}
    }
   }
   let p=points;for(const [axis,edge,greater] of [[0,s.x,true],[0,s.x+s.w,false],[1,s.y,true],[1,s.y+s.d,false]])p=clip(p,axis,edge,greater);
   if(p.length>=3)poly(p.map(([u,v])=>pt(u,v,s.z)),ink);
  }
 }else poly(points.map(([u,v])=>pt(u,v,z)),ink);
}
function refLeafVolume(cx,cy,r=10,light=0,joined=false){
 const c=['#263f2d','#385c36','#51773f','#74964e','#9cb65f','#c4ce82'];
 const p=pts=>pts.map(([x,y])=>[cx+Math.round(x*r/10),cy+Math.round(y*r/10)]);
 // Irregular connected leaf masses: shaded lower skirts, lit upper planes, open notches.
 poly(p([[-10,-2],[-8,-5],[-8,-8],[-4,-9],[-1,-11],[2,-9],[5,-9],[6,-6],[9,-5],[10,-1],[8,2],[9,5],[5,6],[3,9],[-1,8],[-4,9],[-6,6],[-9,5],[-8,1]]),c[joined?1:0]);
 poly(p([[-9,-3],[-6,-7],[-2,-9],[2,-8],[6,-6],[8,-3],[7,1],[8,4],[4,5],[1,7],[-3,6],[-5,4],[-8,4],[-7,0]]),c[1+light]);
 poly(p([[-9,-4],[-7,-7],[-5,-7],[-4,-9],[-1,-8],[0,-6],[3,-6],[4,-3],[1,-3],[0,-1],[-2,-2],[-3,1],[-5,0],[-7,1],[-7,-2]]),c[2+light]);
 poly(p([[-8,-5],[-6,-8],[-3,-8],[-3,-6],[0,-7],[1,-5],[-2,-4],[-3,-2],[-5,-3],[-7,-2]]),c[3+light]);
 // Short hooked leaf planes, not random square confetti.
 for(const [x,y,k] of [[-6,-3,4],[-3,-6,5],[1,-4,4],[-2,0,3],[4,1,2],[-4,4,2]]){
  const a=p([[x,y]])[0];rect(a[0],a[1],Math.max(1,Math.round(r*.23)),1,c[Math.min(5,k)]);rect(a[0]-1,a[1]+1,2,1,c[Math.max(1,k-1)]);
 }
}
function refSignText(t,x,y,z,color){
 let col=0;for(const ch of t.toUpperCase()){
  const glyph=font[ch]||font[' '];glyph.forEach((row,j)=>{for(let i=0;i<row.length;i++)if(row[i]==='1')rect(...pt(x+(col+i)/16,y,z-j),1,1,color);});
  col+=glyph[0].length+1;
 }
}
function withSurface(canvas,x,y,fn){const before=[ctx,ox,oy];ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ox=x;oy=y;try{return fn();}finally{[ctx,ox,oy]=before;}}
function cacheDraw(key,x,y,paint){
 const cache=cacheDraw.frames||(cacheDraw.frames=new Map());let frame=cache.get(key);
 if(!frame){const dest=ctx.canvas,canvas=dest.ownerDocument?dest.ownerDocument.createElement('canvas'):new dest.constructor(384,288);canvas.width=384;canvas.height=288;withSurface(canvas,192-(x-y)*16,192-(x+y)*8,paint);frame=canvas;cache.set(key,frame);}
 const p=pt(x,y);ctx.drawImage(frame,p[0]-192,p[1]-192);
}

function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function line(x0,y0,x1,y1,c){x0=Math.round(x0);x1=Math.round(x1);y0=Math.round(y0);y1=Math.round(y1);let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,e=dx+dy;for(;;){rect(x0,y0,1,1,c);if(x0===x1&&y0===y1)break;let e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}}
function poly(points,c){let p=points.map(a=>a.map(Math.round)),min=Math.min(...p.map(a=>a[1])),max=Math.max(...p.map(a=>a[1]));for(let y=min;y<=max;y++){let hits=[];for(let i=0,j=p.length-1;i<p.length;j=i++){let a=p[i],b=p[j];if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))hits.push(a[0]+(y-a[1])/(b[1]-a[1])*(b[0]-a[0]));}hits.sort((a,b)=>a-b);for(let i=0;i<hits.length;i+=2)rect(Math.ceil(hits[i]),y,Math.floor(hits[i+1])-Math.ceil(hits[i])+1,1,c)}}
function outline(points,c){for(let i=0;i<points.length;i++)line(...points[i],...points[(i+1)%points.length],c)}
function plane(x,y,w,d,z,c,stroke){const p=[pt(x,y,z),pt(x+w,y,z),pt(x+w,y+d,z),pt(x,y+d,z)];poly(p,c);if(stroke)outline(p,stroke);return p}
function box(x,y,w,d,z,h,ramp,edge=true){const a=pt(x,y,z+h),b=pt(x+w,y,z+h),c=pt(x+w,y+d,z+h),d0=pt(x,y+d,z+h),b0=pt(x+w,y,z),c0=pt(x+w,y+d,z),d1=pt(x,y+d,z);poly([d0,c,c0,d1],ramp[2]);poly([b,c,c0,b0],ramp[1]);poly([a,b,c,d0],ramp[3]);if(edge){line(...d0,...c,ramp[3]);line(...b,...c,ramp[0]);line(...c,...c0,ramp[0]);line(...c0,...d1,ramp[0]);line(...c0,...b0,ramp[0])}}
function rnd(n){let s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)}
function tile(x,y,kind='grass',variant=0){
 const r=P[kind]||P.grass;plane(x,y,1,1,0,r[2]);
 const key=((Math.floor(x)*3+Math.floor(y)*5+variant)%4+4)%4;
 if(kind==='pave'){
  // Slab joints obey the projection; one fine bright arris, one recessed joint.
  line(...pt(x,y),...pt(x+1,y),r[3]);line(...pt(x,y),...pt(x,y+1),r[3]);
  line(...pt(x+1,y),...pt(x+1,y+1),r[1]);line(...pt(x,y+1),...pt(x+1,y+1),r[1]);
  const split=key%2?.5:.625;line(...pt(x+split,y+.02),...pt(x+split,y+.98),r[1]);
  if(key===1){line(...pt(x+.08,y+.74),...pt(x+.22,y+.67),r[1]);rect(...pt(x+.2,y+.68),1,1,r[3]);}
  return;
 }
 const patches=[[[.13,.2],[.33,.16],[.46,.33],[.32,.42],[.16,.35]],[[.6,.55],[.77,.51],[.85,.69],[.73,.81],[.54,.75]],[[.28,.46],[.39,.3],[.6,.39],[.68,.57],[.48,.6]],[[.58,.14],[.83,.2],[.91,.32],[.69,.4],[.5,.3]]];
 poly(patches[key].map(([u,v])=>pt(x+u,y+v)),'rgba(40,72,34,.085)');
 const tufts=[[[.2,.64],[.65,.22],[.77,.78]],[[.23,.25],[.54,.7],[.87,.39]],[[.15,.46],[.59,.2],[.73,.72]],[[.34,.24],[.23,.79],[.84,.65]]];
 for(const [u,v] of tufts[key]){const [a,b]=pt(x+u,y+v);rect(a,b,2,1,r[1]);rect(a+1,b-1,1,1,r[3]);}
}
function shadow(x,y,w,d,h){plane(x+.28,y+.36,w+.1,d+.1,1,'#4d6d3c')}
function tree(x,y,size=1,{z=0,receivers}={}){
 if(!tree.painting&&!receivers&&!refGroundShadow.receivers)return cacheDraw('tree:'+size+':'+z,x,y,()=>{tree.painting=true;try{tree(x,y,size,{z})}finally{tree.painting=false}});
 const s=Math.max(.2,size),[a,b]=pt(x,y,z),q=(u,v)=>[x+u*s,y+v*s];
 refGroundShadow([[.04,-.38],[.59,-.35],[1.05,.06],[1.14,.51],[.68,.78],[.04,.62],[-.18,.19]].map(([u,v])=>q(u,v)),z,.2,receivers);
 refGroundShadow([[-.07,-.06],[.16,-.09],[.34,.12],[.14,.24],[-.09,.12]].map(([u,v])=>q(u,v)),z,.24,receivers);
 const root=(dx,dy,height)=>pt(x+dx*s,y+dy*s,z+height*s);
 poly([root(-.055,0,0),root(.055,.04,0),root(.03,.02,33),root(-.035,-.025,33)],'#5c4934');
 line(...root(-.025,-.015,1),...root(-.02,-.015,32),'#ad8a53');
 line(...root(.05,.04,0),...root(.045,.04,26),'#443d30');
 for(const [dx,dy,z] of [[-.37,.02,32],[.35,-.08,35],[-.08,.25,24],[.1,-.31,39]])line(...root(0,0,z-12),...root(dx,dy,z),'#67533a');
 for(const [dx,dy] of [[-.12,.06],[.1,.11],[.1,-.1]])line(...root(0,0,2),...root(dx,dy,0),'#685437');
 // A connected asymmetric crown underpainting avoids a stack of outlined leaf balls.
 poly([[-18,-30],[-15,-45],[-9,-49],[-8,-55],[-1,-60],[7,-55],[10,-49],[17,-45],[22,-36],[22,-29],[17,-24],[14,-18],[7,-17],[3,-13],[-3,-14],[-10,-17],[-15,-20],[-14,-25],[-18,-26]].map(([dx,dy])=>[a+Math.round(dx*s),b+Math.round(dy*s)]),'#2d4931');
 const crown=[[-2,-43,9,0],[8,-37,11,0],[-10,-34,10,0],[-7,-44,9,1],[1,-49,10,1],[12,-28,9,0],[-11,-23,8,0],[0,-30,11,1],[-2,-19,8,0]];
 crown.forEach(([dx,dy,r,l])=>refLeafVolume(a+Math.round(dx*s),b+Math.round(dy*s),Math.round(r*s),l,true));
}
function shrub(x,y,w=1){
 refGroundShadow([[x-.02,y],[x+w+.2,y+.04],[x+w+.2,y+.45],[x-.03,y+.44]],0,.2);
 const count=Math.max(2,Math.ceil(w/.23));
 for(let i=0;i<count;i++){
  const u=(i+.35)/count*w,[a,b]=pt(x+u,y+.16,6+(i%3===1?2:0));
  refLeafVolume(a,b,5+(i%3===0?1:0),i%3===0?1:0);
 }
}
function planter(x,y){
 const terracotta=['#584f42','#807563','#aaa48a','#d9d2b6'];
 refGroundShadow([[x,y+.06],[x+.7,y+.16],[x+.76,y+.66],[x+.11,y+.73]],0,.21);
 box(x+.05,y+.05,.47,.47,0,5,terracotta,false);
 box(x,y,.57,.57,5,2,terracotta,false);
 plane(x+.055,y+.055,.46,.46,7,'#4e4933');
 line(...pt(x,y+.57,7),...pt(x+.57,y+.57,7),terracotta[3]);
 line(...pt(x+.57,y,7),...pt(x+.57,y+.57,7),terracotta[1]);
 for(const [u,v,h] of [[.16,.18,8],[.38,.12,9],[.28,.35,7],[.43,.38,6]]){
  const [a,b]=pt(x+u,y+v,7);line(a,b,a-1,b-h,'#426241');
  poly([[a,b-2],[a-4,b-6],[a-4,b-9],[a-1,b-7],[a+1,b-2]],'#719052');
  poly([[a,b-3],[a+2,b-h-3],[a+4,b-h-4],[a+3,b-h],[a+1,b-3]],'#a2b76b');
 }
}
function lamp(x,y){
 const m=['#273a3d','#456061','#7c9490','#c6d3be'];
 refGroundShadow([[x-.08,y-.06],[x+.72,y+.26],[x+.84,y+.39],[x+.65,y+.44],[x-.12,y+.09]],0,.18);
 box(x-.075,y-.075,.15,.15,0,2,m,false);
 const [a,b]=pt(x,y);rect(a-1,b-24,2,25,m[0]);rect(a-1,b-24,1,23,m[2]);
 poly([[a-4,b-28],[a+1,b-30],[a+5,b-27],[a+4,b-26],[a-3,b-26]],m[0]);
 line(a-3,b-28,a+1,b-29,m[2]);
 poly([[a-3,b-26],[a+1,b-25],[a+1,b-20],[a-3,b-22]],'#e3dbb6');
 poly([[a+1,b-25],[a+4,b-26],[a+4,b-22],[a+1,b-20]],'#b6bba2');
 line(a-3,b-26,a-3,b-22,m[0]);line(a+1,b-25,a+1,b-20,m[1]);line(a+4,b-26,a+4,b-22,m[0]);
 line(a-3,b-22,a+1,b-20,m[0]);line(a+1,b-20,a+4,b-22,m[0]);
 rect(a-1,b-31,2,2,m[1]);rect(a-2,b-1,4,2,m[0]);rect(a-2,b-1,2,1,m[2]);
}
function bench(x,y){
 const m=['#2d3e3f','#445756','#798883','#a1ada0'],wood=['#685137','#967347','#c5a16a','#e5c58b'];
 refGroundShadow([[x-.05,y-.02],[x+1.2,y+.05],[x+1.36,y+.56],[x+.05,y+.69]],0,.22);
 for(const u of [.13,.91]){
  box(x+u,y+.055,.07,.06,0,10,m,false);box(x+u,y+.39,.07,.06,0,5,m,false);
  line(...pt(x+u,y+.08,3),...pt(x+u,y+.41,3),m[1]);
 }
 for(const v of [.12,.24,.36])box(x,y+v,1.1,.09,5,1,wood,false);
 for(const z of [8,11]){
  box(x,y+.06,1.1,.07,z,2,wood,false);
  line(...pt(x,y+.14,z+2),...pt(x+1.1,y+.14,z+2),wood[3]);
  for(const u of [.16,.94]){const a=pt(x+u,y+.145,z+1);rect(...a,1,1,wood[0]);}
 }
 for(const u of [.1,.98]){
  line(...pt(x+u,y+.05,9),...pt(x+u,y+.43,9),m[2]);
  line(...pt(x+u,y+.43,9),...pt(x+u,y+.43,5),m[0]);
 }
}
function crate(x,y,z=0){
 const r=['#6f5537','#9e7847','#c4a16d','#e3c897'];
 refGroundShadow([[x+.02,y+.03],[x+.65,y+.08],[x+.73,y+.64],[x+.06,y+.68]],z,.2);
 box(x,y,.5,.5,z,7,r,false);
 for(const u of [.12,.26,.4])line(...pt(x+u,y+.5,z+.5),...pt(x+u,y+.5,z+6.8),r[1]);
 for(const v of [.13,.27,.41])line(...pt(x+.5,y+v,z+.5),...pt(x+.5,y+v,z+6.8),r[0]);
 for(const v of [.16,.33])line(...pt(x,y+v,z+7),...pt(x+.5,y+v,z+7),r[2]);
 for(const zz of [1,5]){
  poly([pt(x,y+.515,z+zz),pt(x+.5,y+.515,z+zz),pt(x+.5,y+.515,z+zz+1),pt(x,y+.515,z+zz+1)],r[3]);
  poly([pt(x+.515,y,z+zz),pt(x+.515,y+.5,z+zz),pt(x+.515,y+.5,z+zz+1),pt(x+.515,y,z+zz+1)],r[2]);
 }
 line(...pt(x+.04,y+.522,z+1),...pt(x+.47,y+.522,z+6),r[1]);
 line(...pt(x+.07,y+.522,z+1),...pt(x+.5,y+.522,z+6),r[3]);
 for(const [u,v,h] of [[.07,.526,1.5],[.44,.526,5.5],[.526,.07,1.5],[.526,.44,5.5]])rect(...pt(x+u,y+v,z+h),1,1,r[0]);
 line(...pt(x,y+.5,z+7),...pt(x+.5,y+.5,z+7),r[3]);
}
function desk(x,y,type='desk'){box(x,y,.8,.45,0,6,P.wood);let q=pt(x+.25,y+.05,11);rect(q[0]-4,q[1]-4,8,6,P.roof[0]);rect(q[0]-3,q[1]-3,5,3,P.blue[3]);rect(q[0]-1,q[1]+2,3,1,P.paper[2]);plane(x+.48,y+.22,.25,.18,7,P.paper[3]);box(x+.26,y+.58,.28,.23,0,4,P.blue);if(type==='print')box(x+.3,y+.05,.35,.3,6,7,P.paper)}
function person(x,y,shirt=P.pink,phase=0,carry=false,z=0){
 const f=((Math.floor(phase)%4)+4)%4,[a,b]=pt(x,y,z),swing=f===1?1:f===3?-1:0;
 refGroundShadow([[x-.11,y-.12],[x+.24,y-.07],[x+.4,y+.13],[x+.14,y+.28],[x-.12,y+.1]],z,.26);
 // Back arm and split trouser planes precede torso; feet stay within 24×32 at anchor 12,25.
 rect(a+2,b-11-swing,2,5,shirt[0]);rect(a+3,b-7-swing,1,2,'#ba8b64');
 rect(a-2-(f===1?1:0),b-5,2,5-(f===3?1:0),'#334851');
 rect(a+1+(f===3?1:0),b-5,2,4+(f===1?1:0),'#263b42');
 rect(a-2-(f===1?1:0),b-5,1,4,'#6b7e7d');
 rect(a-3-(f===1?1:0),b,3,1,'#233237');rect(a+1+(f===3?1:0),b-(f===3?1:0),3,1,'#233237');
 poly([[a-2,b-12],[a+1,b-13],[a+3,b-11],[a+2,b-6],[a-2,b-6],[a-3,b-9]],shirt[1]);
 poly([[a-2,b-11],[a,b-12],[a+1,b-10],[a,b-7],[a-2,b-7]],shirt[2]);
 rect(a-1,b-11,1,3,shirt[3]);rect(a-2,b-6,4,1,shirt[0]);
 rect(a-3,b-10+swing,2,3,shirt[2]);rect(a-3,b-7+swing,1,3,'#d6ad80');rect(a-2,b-5+swing,1,1,'#a87a55');
 rect(a-1,b-15,3,3,'#d7ad7c');rect(a-1,b-15,1,2,'#edc897');rect(a+2,b-14,1,1,'#ad7f57');
 rect(a-2,b-17,3,2,'#50463d');rect(a+1,b-16,1,1,'#50463d');rect(a-2,b-16,1,2,'#71604a');rect(a-1,b-17,2,1,'#8c7859');
 if(carry){
  poly([[a+1,b-10],[a+5,b-11],[a+8,b-9],[a+4,b-8]],'#e1c99e');
  poly([[a+1,b-10],[a+4,b-8],[a+4,b-4],[a+1,b-6]],'#bf9e6e');
  poly([[a+4,b-8],[a+8,b-9],[a+8,b-5],[a+4,b-4]],'#9b7e59');
  rect(a+3,b-7,2,1,'#e1b78a');rect(a+5,b-8,1,3,'#ddc79e');
 }
}
function windowFront(x,y,z,w=.55,h=10){const a=pt(x,y,z),b=pt(x+w,y,z),c=pt(x+w,y,z-h),d=pt(x,y,z-h);poly([a,b,c,d],P.roof[0]);poly([pt(x+.06,y+.015,z-1),pt(x+w-.06,y+.015,z-1),pt(x+w-.06,y+.015,z-h+1),pt(x+.06,y+.015,z-h+1)],P.blue[2]);line(...pt(x+.12,y+.02,z-2),...pt(x+w-.1,y+.02,z-2),P.blue[3]);line(...pt(x+w/2,y+.03,z),...pt(x+w/2,y+.03,z-h),P.paper[2]);line(...d,...c,P.paper[3]);}
function windowSide(x,y,z,w=.5,h=10){poly([pt(x,y,z),pt(x,y+w,z),pt(x,y+w,z-h),pt(x,y,z-h)],P.roof[0]);poly([pt(x+.01,y+.06,z-1),pt(x+.01,y+w-.06,z-1),pt(x+.01,y+w-.06,z-h+1),pt(x+.01,y+.06,z-h+1)],P.blue[1]);line(...pt(x+.02,y+.08,z-2),...pt(x+.02,y+w-.08,z-2),P.blue[2]);}
const font={A:['010','101','111','101','101'],B:['110','101','110','101','110'],C:['011','100','100','100','011'],D:['110','101','101','101','110'],E:['111','100','110','100','111'],F:['111','100','110','100','100'],G:['011','100','101','101','011'],H:['101','101','111','101','101'],I:['111','010','010','010','111'],J:['001','001','001','101','010'],K:['101','101','110','101','101'],L:['100','100','100','100','111'],M:['10101','11111','10101','10101','10101'],N:['1001','1101','1011','1001','1001'],O:['010','101','101','101','010'],P:['110','101','110','100','100'],Q:['010','101','101','111','011'],R:['110','101','110','101','101'],S:['011','100','010','001','110'],T:['111','010','010','010','010'],U:['101','101','101','101','111'],V:['101','101','101','101','010'],W:['10101','10101','10101','11111','01010'],X:['101','101','010','101','101'],Y:['101','101','010','010','010'],Z:['111','001','010','100','111'],0:['111','101','101','101','111'],1:['010','110','010','010','111'],2:['110','001','010','100','111'],3:['110','001','010','001','110'],4:['101','101','111','001','001'],5:['111','100','110','001','110'],6:['011','100','110','101','010'],7:['111','001','010','010','010'],8:['010','101','010','101','010'],9:['010','101','011','001','110'],' ':['0','0','0','0','0'],'-':['000','000','111','000','000']};
function pixelText(t,x,y,c=P.ink){for(let ch of t.toUpperCase()){let f=font[ch]||font[' '];for(let j=0;j<f.length;j++)for(let i=0;i<f[j].length;i++)if(f[j][i]==='1')rect(x+i,y+j,1,1,c);x+=f[0].length+1;}}
function sign(x,y,t,r=P.pink){
 const letters=t.toUpperCase().split('').reduce((n,c)=>n+(font[c]?.[0].length||1)+1,0),w=(letters+7)/16;
 refGroundShadow([[x+.05,y+.03],[x+w+.18,y+.07],[x+w+.46,y+.37],[x+.24,y+.37]],0,.2);
 const posts=['#334747','#5d716d','#93a498','#c0cbb6'];
 for(const u of [.13,w-.13])box(x+u,y,.07,.08,0,14,posts,false);
 box(x,y-.03,w,.12,11,10,[r[0],r[0],r[1],r[3]],false);
 poly([pt(x+.055,y+.105,12),pt(x+w-.055,y+.105,12),pt(x+w-.055,y+.105,20),pt(x+.055,y+.105,20)],r[2]);
 line(...pt(x+.05,y+.115,20),...pt(x+w-.05,y+.115,20),r[3]);
 line(...pt(x+w,y+.12,11),...pt(x+w,y+.12,21),r[0]);
 refSignText(t,x+.22,y+.13,18,P.ink);
 for(const u of [.09,w-.09])rect(...pt(x+u,y+.13,16),1,1,r[0]);
}
function gable(x,y,w,d,z,r){const a=pt(x,y,z),b=pt(x+w,y,z),c=pt(x+w,y+d,z),e=pt(x,y+d,z),r0=pt(x+w/2,y,z+12),r1=pt(x+w/2,y+d,z+12);poly([a,r0,r1,e],r[2]);poly([r0,b,c,r1],r[1]);poly([e,r1,c],P.paper[2]);line(...a,...r0,r[3]);line(...r0,...r1,r[3]);line(...r1,...c,r[0]);line(...e,...r1,r[0]);for(let v=.25;v<d;v+=.23)line(...pt(x+w/2,y+v,z+12),...pt(x+w,y+v,z),r[0]);}
function building(b,roof=true,stage=4){const{x,y,w,d,type}=b,h=type==='accounts'?31:24,r=type==='accounts'?P.brick:P.paper;shadow(x,y,w,d,h);box(x-.1,y-.1,w+.2,d+.2,0,3,P.pave);if(stage<1)return;box(x,y,w,.09,3,h,r);box(x,y,.09,d,3,h,r);plane(x+.1,y+.1,w-.2,d-.2,3,type==='production'?'#c2c2af':'#9eaca7');for(let u=.2;u<w;u+=.42)line(...pt(x+u,y+.1,3),...pt(x+u,y+d-.1,3),type==='production'?'#b3b69f':'#b4bfb8');if(stage>=2){if(type==='production'){box(x+.45,y+.5,1.1,.65,3,9,P.wood);box(x+.65,y+.63,.08,.75,12,16,P.orange);crate(x+w-.75,y+.4,3);crate(x+w-.75,y+1,3);desk(x+.3,y+d-.8);person(x+1.7,y+1.35,P.blue,0,false,3);}else{desk(x+.3,y+.35);desk(x+1.6,y+.35);desk(x+.3,y+1.2,type==='accounts'?'print':'desk');person(x+1.05,y+1.1,type==='accounts'?P.green:P.pink,0,false,3);} }
if(stage>=3){box(x,y+d-.08,w,.08,3,roof?h:7,r);box(x+w-.08,y,.08,d,3,roof?h:7,r);if(roof){for(let u=.22;u<w-.5;u+=.75){if(type==='production'&&u>1.1&&u<2.1)continue;windowFront(x+u,y+d+.01,h-1,.52,12)}for(let v=.2;v<d-.4;v+=.68)windowSide(x+w+.01,y+v,h-1,.44,11);if(type==='accounts'){for(let u=.22;u<w-.5;u+=.75)windowFront(x+u,y+d+.01,h-16,.52,9)}let doorx=x+w/2-.25;poly([pt(doorx,y+d+.04,16),pt(doorx+.5,y+d+.04,16),pt(doorx+.5,y+d+.04,3),pt(doorx,y+d+.04,3)],P.roof[0]);line(...pt(doorx+.08,y+d+.05,14),...pt(doorx+.08,y+d+.05,5),P.blue[3]);box(doorx-.15,y+d-.02,.8,.55,15,2,type==='creative'?P.pink:P.blue);}}
if(stage>=4&&roof){if(type==='creative'){gable(x-.12,y-.13,w+.24,d+.26,h+3,P.roof);box(x+.3,y+.15,.38,.45,h+10,11,P.brick);}else if(type==='production'){for(let u=0;u<w-.1;u+=1.05){gable(x+u-.04,y-.08,1.06,d+.16,h+3,P.blue);poly([pt(x+u+.2,y+d+.085,h+4),pt(x+u+.49,y+d+.085,h+12),pt(x+u+.49,y+d+.085,h+4)],P.blue[0]);line(...pt(x+u+.35,y+d+.1,h+5),...pt(x+u+.47,y+d+.1,h+9),P.blue[3]);}}else{box(x-.08,y-.08,w+.16,d+.16,h+3,3,P.roof);plane(x+.1,y+.1,w-.2,d-.2,h+6,P.roof[0]);plane(x+.16,y+.16,w-.32,d-.32,h+6,P.pave[1]);for(let v=.55;v<d-.1;v+=.65)line(...pt(x+.16,y+v,h+6),...pt(x+w-.16,y+v,h+6),P.pave[0]);plane(x+.6,y+.7,.6,.7,h+6,P.roof[1]);box(x+.4,y+.5,.5,.6,h+6,7,P.paper);for(let u=0;u<5;u++){let q=pt(x+.43+u*.06,y+.54,h+13);rect(...q,1,3,P.roof[1]);}}}
}
function van(x,y){
 const body=['#697b7b','#9eadab','#d4d9c9','#f1eedb'],metal=['#273d45','#455f67','#8ca4a6','#cadbd7'],glass=['#24404c','#42677a','#779fae','#bad7d8'];
 refGroundShadow([[x-.06,y+.12],[x+.76,y+.17],[x+.94,y+1.96],[x+.17,y+2.06]],0,.22);
 const wheel=(u,v,near)=>{let [a,b]=pt(x+u,y+v,3);poly([[a-2,b-3],[a+1,b-4],[a+3,b-2],[a+3,b+1],[a+1,b+3],[a-2,b+2],[a-3,b]],'#263238');rect(a-1,b-1,3,3,near?'#657576':'#445558');rect(a,b-1,1,2,near?'#c2c9b5':'#80918c');};
 wheel(-.02,.36,false);wheel(-.02,1.48,false);
 box(x,y,.66,1.36,4,12,body,false);
 // Rounded roof edge and lower rocker separate the body from the chassis.
 plane(x+.05,y+.07,.56,1.22,16,body[3]);line(...pt(x+.66,y,15),...pt(x+.66,y+1.36,15),body[2]);
 box(x+.035,y+.02,.64,1.73,3,2,metal,false);
 const side=(u,pts,col)=>poly(pts.map(([v,z])=>pt(x+u,y+v,z)),col);
 side(.66,[[1.06,5],[1.06,16],[1.43,16],[1.84,10],[1.84,5]],body[1]);
 side(.675,[[1.12,15],[1.4,15],[1.67,11],[1.12,11]],glass[1]);
 side(.681,[[1.16,14],[1.36,14],[1.5,12],[1.16,12]],glass[2]);
 line(...pt(x+.685,y+1.17,14),...pt(x+.685,y+1.43,12),glass[3]);
 poly([pt(x+.03,y+1.44,15),pt(x+.64,y+1.44,15),pt(x+.64,y+1.81,10),pt(x+.03,y+1.81,10)],glass[2]);
 line(...pt(x+.07,y+1.47,14),...pt(x+.6,y+1.47,14),glass[3]);
 plane(x+.02,y+1.82,.64,.14,9,body[2]);
 poly([pt(x,y+1.97,5),pt(x+.66,y+1.97,5),pt(x+.66,y+1.97,9),pt(x,y+1.97,9)],body[2]);
 // Sliding-panel joint, handle, narrow service stripe and door bottom.
 line(...pt(x+.678,y+.33,6),...pt(x+.678,y+.33,14),body[0]);line(...pt(x+.678,y+.98,6),...pt(x+.678,y+.98,14),body[0]);
 line(...pt(x+.681,y+.33,6),...pt(x+.681,y+.98,6),body[0]);line(...pt(x+.685,y+.83,11),...pt(x+.685,y+.99,11),metal[0]);
 side(.687,[[.36,8],[.97,8],[.97,9],[.36,9]],P.pink[1]);
 line(...pt(x+.686,y+1.12,6),...pt(x+.686,y+1.12,10),body[0]);
 wheel(.69,.36,true);wheel(.69,1.49,true);
 box(x-.025,y+1.97,.71,.06,4,2,metal,false);
 for(const u of [.065,.49]){const [a,b]=pt(x+u,y+1.985,8);rect(a-1,b-1,3,2,'#ece6b9');rect(a,b-1,1,1,'#ffffe5');}
 line(...pt(x+.22,y+1.99,7),...pt(x+.44,y+1.99,7),metal[0]);
 const mirror=pt(x+.79,y+1.4,12);rect(mirror[0],mirror[1],2,3,metal[0]);rect(mirror[0],mirror[1],1,2,metal[2]);
}
const buildings=[{id:'B-01',name:'Creative',type:'creative',x:2.1,y:3,w:3,d:2.5},{id:'B-02',name:'Production',type:'production',x:8.2,y:2.1,w:3.15,d:3},{id:'B-03',name:'Accounts',type:'accounts',x:8.4,y:8.2,w:2.8,d:2.5}];
function selection(b){let p=[pt(b.x-.23,b.y-.23),pt(b.x+b.w+.23,b.y-.23),pt(b.x+b.w+.23,b.y+b.d+.23),pt(b.x-.23,b.y+b.d+.23)];outline(p,P.green[0]);p.forEach(([x,y])=>{rect(x-2,y-2,5,5,P.ink);rect(x-1,y-1,3,3,P.green[2]);});}
function setup(canvas,x,y){ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ox=x;oy=y;ctx.clearRect(0,0,canvas.width,canvas.height);}
function scene(canvas,{roof=true,selected='B-02',time=0,layer=5}={}){setup(canvas,canvas.width/2,24);rect(0,0,canvas.width,canvas.height,'#dce9e0');let n=15;box(0,0,n,n,-7,7,P.soil);for(let s=0;s<n*2;s++)for(let x=0;x<n;x++){let y=s-x;if(y<0||y>=n)continue;let pave=(x===6||x===7||y===6||y===7||y===12||(x>=8&&x<=12&&y===11)||(x>=8&&x<=11&&y===5)||(x>=2&&x<=5&&y===5));tile(x,y,pave?'pave':'grass');}if(layer===0)return;
// quiet central court, benches, planting, water and garden border
plane(1,10,3,2.1,1,P.pave[1]);plane(1.14,10.14,2.72,1.82,1,P.blue[1]);for(let i=0;i<32;i++){let p=pt(1.3+rnd(i*3)*2.4,10.3+rnd(i*5)*1.5,1);rect(...p,3,1,P.blue[2]);}
let items=[];const add=(x,y,fn)=>items.push({key:x+y,fn});
for(let b of buildings)add(b.x+b.w,b.y+b.d,()=>building(b,b.id===selected?roof:true,4));
if(layer>=2){for(let [x,y,s] of [[1,1,1],[2.6,.8,.85],[5.1,1.25,1.1],[13.3,1.5,1.05],[13.8,3.7,.8],[1,7,1],[.8,8.3,.75],[4.8,11,1],[12.6,10,.85],[13.6,13,1.05],[1.5,13,.9],[4,14,1],[10.5,14,1]])add(x,y,()=>tree(x,y,s));for(let x=1;x<6;x+=.6)add(x,.2,()=>shrub(x,.2,.55));for(let x=9;x<14;x+=.6)add(x,14.25,()=>shrub(x,14.25,.55));for(let [x,y] of [[5.1,5.8],[8.2,5.8],[8.2,7.9],[11.8,11.1]])add(x,y,()=>planter(x,y));for(let [x,y] of [[5.5,8],[7.8,9.8],[5.5,11]])add(x,y,()=>bench(x,y));for(let [x,y] of [[5.9,3],[7.9,11.5],[11.7,6],[4.8,12.6]])add(x,y,()=>lamp(x,y));add(11.5,6.1,()=>van(11.5,6.1));add(11.6,5.5,()=>crate(11.6,5.5));add(10.8,5.65,()=>crate(10.8,5.65));add(9.55,5.4,()=>person(9.55,5.4,P.blue,1));add(10.65,6.0,()=>person(10.65,6.0,P.orange,3,true));}
if(layer>=3){let path=[{x:6.5,y:3+(Math.sin(time*.22)+1)*3,s:P.blue},{x:3+(Math.sin(time*.17+2)+1)*3.5,y:6.5,s:P.pink},{x:7.45,y:8+(Math.sin(time*.2+1)+1)*2,s:P.green},{x:10.8,y:7.25,s:P.orange},{x:4.5,y:12.5,s:P.blue},{x:7,y:1.7,s:P.pink},{x:7.1,y:13.2,s:P.paper}];path.forEach((p,i)=>add(p.x,p.y,()=>person(p.x,p.y,p.s,time*3+i,i===3)));}
items.sort((a,b)=>a.key-b.key).forEach(a=>a.fn());
if(layer>=4){sign(2.25,5.6,'CREATIVE',P.pink);sign(8.15,5.3,'PRODUCTION',P.blue);sign(8.4,10.9,'ACCOUNTS',P.green);}
if(layer>=5)selection(buildings.find(b=>b.id===selected)||buildings[1]);
return buildings.map(b=>({id:b.id,p:pt(b.x+b.w/2,b.y+b.d/2,14)}));}
function specimen(canvas,kind){setup(canvas,canvas.width/2,canvas.height*.63);if(kind==='tile'){tile(-1,-1,'grass');tile(0,-1,'pave');tile(1,-1,'grass');tile(-1,0,'pave');tile(0,0,'pave');tile(1,0,'pave');tile(-1,1,'grass');tile(0,1,'pave');tile(1,1,'grass');}else if(kind==='people'){for(let i=0;i<5;i++)person(-3+i*1.35,-.5,P[['pink','blue','green','orange','paper'][i]],i,i===3);}
else if(kind==='props'){desk(-1.8,-1);crate(.3,-1);crate(.3,-1,7);planter(1.5,-1);bench(-1,1);lamp(1,1);}
else if(kind==='signs'){sign(-2,-1,'CREATIVE',P.pink);sign(1,-1,'OPS',P.green);sign(-.5,1,'PRODUCTION',P.blue);}
else if(kind==='trees'){tree(-1,-1);tree(1,-.5,.9);shrub(-.5,1,1.6);planter(1.5,1);}
else if(kind==='van')van(-.3,-.8);
else if(kind==='creative'||kind==='production'||kind==='accounts'){let b={x:-1.5,y:-1.5,w:3,d:2.5,type:kind};building(b,true);}
else if(kind==='cutaway'){building({x:-1.5,y:-1.5,w:3.15,d:3,type:'production'},false);}
else if(kind.startsWith('stage')){building({x:-1.5,y:-1.5,w:3.15,d:3,type:'production'},kind==='stage4',Number(kind.at(-1)));}}
function icon(canvas,kind){
 setup(canvas,0,0);const ink='#233940',edge='#879e9e',paper='#fcfdf5',shade='#d2ded6',pink='#eaa2bb',green='#65db87',blue='#82b4c1';
 const sheet=(x,y)=>{rect(x,y,9,12,ink);rect(x+1,y+1,7,10,paper);rect(x+7,y+2,1,9,shade);rect(x+2,y+3,4,1,edge);rect(x+2,y+5,5,1,edge);rect(x+2,y+7,3,1,edge)};
 if(kind==='Work'){rect(1,4,14,10,ink);rect(2,5,12,8,shade);rect(2,2,5,3,ink);rect(3,3,3,2,pink);rect(2,6,12,2,paper);rect(3,9,4,3,pink);rect(8,9,5,1,edge);rect(8,11,3,1,edge);}
 if(kind==='Cash'){rect(1,3,12,7,ink);rect(2,4,10,5,green);rect(3,5,8,3,'#bae1a9');rect(6,5,2,3,ink);line(2,12,12,12,ink);poly([[11,10],[14,12],[11,14]],ink);rect(3,11,4,1,shade);}
 if(kind==='Information'){sheet(5,3);sheet(2,1);rect(4,3,5,2,pink);rect(4,7,4,1,ink);rect(4,9,3,1,edge);}
 if(kind==='People'){rect(3,2,3,4,ink);rect(4,3,2,2,paper);rect(10,3,3,4,ink);rect(11,4,1,2,paper);poly([[2,7],[6,7],[8,10],[8,14],[1,14],[1,10]],ink);rect(2,9,4,4,pink);rect(2,9,2,2,'#ffd3df');poly([[9,8],[13,8],[15,11],[15,14],[9,14]],ink);rect(10,10,3,3,blue);}
 if(kind==='Control'){rect(1,2,14,12,ink);rect(2,3,12,10,shade);for(const [x,y,c]of[[4,6,pink],[8,10,green],[12,7,blue]]){rect(x,4,1,8,edge);rect(x-1,y-1,3,3,ink);rect(x-1,y-1,2,2,c);}}
}
window.MMTArt={P,scene,specimen,buildings,icon,drawing:{withSurface,cacheDraw,refGroundShadow,pt,rect,line,poly,outline,plane,box,rnd,tile,tree,shrub,planter,lamp,bench,crate,desk,person,pixelText,sign,van,selection,setup}};
})();
