function featureRaster(faces){
 const pixels=new Map(),put=(x,y,d,c)=>{x=Math.round(x);y=Math.round(y);const k=x+','+y,a=pixels.get(k);if(!a||d>=a.d-.001)pixels.set(k,{x,y,d,c});};
 for(const f of faces){const ps=f.p;if(f.edge){const a=ps[0],b=ps[1],n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]));for(let i=0;i<=Math.ceil(n);i++){let t=n?Math.min(1,i/n):0;put(a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1]),a[2]+t*(b[2]-a[2])+.008,f.edge);}continue;}
  let a=ps[0],b=ps[1],c=ps[2],det=0;for(let k=2;k<ps.length;k++){c=ps[k];det=(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);if(Math.abs(det)>.0001)break;}if(Math.abs(det)<.0001)continue;
  const dx=((b[2]-a[2])*(c[1]-a[1])-(c[2]-a[2])*(b[1]-a[1]))/det,dy=((b[0]-a[0])*(c[2]-a[2])-(c[0]-a[0])*(b[2]-a[2]))/det;
  for(let y=Math.ceil(Math.min(...ps.map(a=>a[1])));y<=Math.floor(Math.max(...ps.map(a=>a[1])));y++){const intersections=[];for(let i=0,j=ps.length-1;i<ps.length;j=i++){let p=ps[j],q=ps[i];if((p[1]<=y&&q[1]>y)||(q[1]<=y&&p[1]>y))intersections.push(p[0]+(y-p[1])*(q[0]-p[0])/(q[1]-p[1]));}intersections.sort((a,b)=>a-b);for(let i=0;i+1<intersections.length;i+=2)for(let x=Math.ceil(intersections[i]);x<=Math.floor(intersections[i+1]);x++)put(x,y,a[2]+(x-a[0])*dx+(y-a[1])*dy,f.color);}
 }
 for(const p of pixels.values())rect(p.x,p.y,1,1,p.c);
}
// Source-shaped feature objects. Fixed native pixels, shared dimetric camera.
function featureTone(hex,k){const n=parseInt(hex.slice(1),16);return '#'+[n>>16,n>>8&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*k))).toString(16).padStart(2,'0')).join('');}
function car(x,y,heading=0,z=3){
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
// Analytic sampled sculpture: smooth shoulders and bowls, not an extruded wavy slab.
function reception(x,y){
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
function pennant(x,y,tone){const [a,b]=pt(x,y);line(a,b,a+7,b+3,'#5e7357');rect(a-1,b-30,2,30,'#445654');rect(a,b-30,1,30,'#a8bbb1');rect(a-2,b,5,2,'#72877b');poly([[a+1,b-29],[a+12,b-25],[a+2,b-20]],featureTone(tone,.82));poly([[a+1,b-29],[a+8,b-26],[a+1,b-22]],tone);line(a+1,b-29,a+8,b-27,featureTone(tone,1.14));}
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
