/* Replacement declarations for pixel-kit.js; paste inside its existing closure.
   Dependencies: P, pt, rect, line, poly, outline, plane, box, pixelText, font.
   No palette mutation, timer, image, antialiasing, or Fedora change.
   Main light: upper left. Contact/cast shadows live in world XY at receiver Z.
   Optional tree fourth argument: {z:3,receivers:[{x,y,w,d,z:8,
   risers:[{side:'y+',bottom:3},{side:'x+',bottom:3}]}]}. Supply NONOVERLAPPING
   top rectangles, including surrounding floor; riser shadows are clipped to their
   intersection with the same footprint. Existing three-argument tree calls are unchanged.
   refGroundShadow.receivers remains an optional scene-wide fallback; local options do not mutate it.
*/
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
function tree(x,y,size=1,{z=0,receivers}={}){
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
function refSignText(t,x,y,z,color){
 let col=0;for(const ch of t.toUpperCase()){
  const glyph=font[ch]||font[' '];glyph.forEach((row,j)=>{for(let i=0;i<row.length;i++)if(row[i]==='1')rect(...pt(x+(col+i)/16,y,z-j),1,1,color);});
  col+=glyph[0].length+1;
 }
}
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
