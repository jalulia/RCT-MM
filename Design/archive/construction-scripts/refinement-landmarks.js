/* Replacement landmark functions for park-kit.js. The host's D primitives and
   material constants remain authoritative; no globals or shared files mutated.
   All footprints, function arguments and 32×16 anchors are retained. */

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

function solarium(x,y){
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

function stag(x,y){
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

function inflatable(x,y){
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
