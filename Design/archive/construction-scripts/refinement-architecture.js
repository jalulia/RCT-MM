/* Replacement declarations for park-kit.js, inside its existing closure.
   Photo-derived: Porter front elevation, plywood rooms, desks, skylights;
   Boerum brick / curtain-wall hierarchy; Johnson interior mezzanine.
   Roof plans, compressed dimensions and Johnson exterior remain adaptations. */
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
function archSideMasonry(x,y,d,h,z,ramp){
 archSideTone(x,y,z+h,d,h,ramp[1],archMix(ramp[1],ramp[0],.12));
 const mortar=archMix(ramp[1],ramp[2],.18);
 for(let zz=2,row=0;zz<h;zz+=3,row++)for(let v=-(row%2)*.18;v<d;v+=.37){const a=Math.max(0,v),b=Math.min(d,v+.32);line(...pt(x+.012,y+a,z+zz),...pt(x+.012,y+b,z+zz),mortar);if(v>0)line(...pt(x+.014,y+v,z+zz),...pt(x+.014,y+v,z+zz+2),mortar);}
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
function archMezzanine(x,y,w,d){
 const mw=w*.4,md=Math.min(.8,d*.25);box(x+.12,y+.12,mw,md,15,2,white,false);for(const u of [.12,mw+.05])box(x+u,y+.15,.07,md,3,12,white,false);
 const railY=y+.12+md;line(...pt(x+.12,railY,24),...pt(x+.12+mw,railY,24),'#e75e31');
 for(let u=.14;u<mw+.12;u+=.17)line(...pt(x+u,railY,17),...pt(x+u,railY,24),'#bc4526');
 for(let i=0;i<6;i++)box(x+mw+.2+i*.11,y+.15,.11,.62,3+i*2,1.5,['#89361f','#b44125','#e2703d','#f3a471'],false);
 line(...pt(x+mw+.2,y+.79,10),...pt(x+mw+.86,y+.79,22),'#ec7142');
}
function building(b,roof=true,stage=4){
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
function supernova(x,y){
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
