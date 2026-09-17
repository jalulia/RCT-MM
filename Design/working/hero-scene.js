/* Composed art plate, independent of the interactive park's selection and clock. */
(()=>{
const K=window.MMTArt,D=K.drawing,C=K.components,P=K.P;
const {pt,rect,poly,line,plane,tile,tree,shrub,bench,lamp,crate,person}=D;
function hero(canvas,time=0){
 const ox=350,oy=25,t=((time%36)+36)%36;D.setup(canvas,ox,oy);rect(0,0,canvas.width,canvas.height,'#c6dcb4');
 const shape=[[0,2],[2,0],[20,0],[22,2],[22,13],[18,17],[3,17],[0,14]],inside=(x,y)=>x>=0&&y>=0&&x<=22&&y<=17&&x+y>=2&&x-y<=20&&x+y<=35&&y-x<=14;
 const ground=shape.map(p=>pt(...p,0));poly(ground.map(([x,y])=>[x,y+7]),'#6c7844');poly(ground,'#659446');
 // Paths make a wide promenade; the plate has no selectable-state markings.
 const ctx=canvas.getContext('2d');ctx.save();ctx.beginPath();ground.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();
 for(let sum=0;sum<40;sum++)for(let x=0;x<22;x++){let y=sum-x;if(y<0||y>=17||!inside(x+.5,y+.5))continue;const paved=(x===7||x===8)||(y===6||y===7)||(y===14&&x>7&&x<18)||(x===13&&y>7&&y<15);tile(x,y,paved?'pave':'grass');}
 ctx.restore();
 const shifted=(dx,dy,fn)=>D.withSurface(canvas,ox+(dx-dy)*16,oy+(dx+dy)*8,fn);
 shifted(1.7,0,()=>C.deliveryRoad());plane(9.8,1.2,6.2,4.7,.5,'#aeb9ae');plane(13.6,11.1,5,4.2,.5,'#bec8ba');
 let items=[];const add=(x,y,draw)=>items.push({depth:x+y,draw});
 const sites=[{...K.buildings[0],x:1.8,y:3.2},{...K.buildings[1],x:10.2,y:1.3},{...K.buildings[2],x:13.8,y:11.3}];
 for(const b of sites)add(b.x+b.w,b.y+b.d,()=>C.building(b,b.id!=='B-03'));
 // An offset foreground circuit counters the weight of the industrial hall.
 shifted(1.1,-.4,()=>C.circuit(t/36*(2*Math.PI/.28),true));
 const a=t/36*Math.PI*2,cx=5.3+2*Math.cos(a),cy=11.7+1.55*Math.sin(a),ch=Math.round(Math.atan2(1.55*Math.cos(a),-2*Math.sin(a))/(Math.PI/8))/4;
 add(cx+1,cy,()=>C.car(cx,cy,ch,4));
 add(3.6,10.1,()=>C.supernova(.9,7.85));add(7.2,7.6,()=>C.stag(7.2,7.6));
 plane(9.3,8,3.3,2.3,1,'#d4c8ae');add(11.2,10,()=>C.inflatable(9.4,8.1));add(11.5,9.8,()=>C.shark(10.95,8.9,t*Math.PI/18));
 add(18.5,10.8,()=>C.solarium(17.3,8.4));add(10.7,16.5,()=>C.reception(9.1,15.8));
 const van=C.deliveryPose(t*32/36);add(van.x+3.2,van.y,()=>C.voila(van.x+1.7,van.y,van.heading));
 add(16.2,5.4,()=>crate(16.2,5.4));add(13.1,13.8,()=>C.cat(13.1,13.8,t));
 for(const [x,y,s] of [[1.3,2.5,.85],[4.7,1.1,.9],[7.8,.9,.72],[.6,6.2,.9],[.7,11.6,.78],[2.4,15,.9],[7.1,16.3,.7],[20.4,10.9,.86],[19.7,13.3,.68]])add(x,y,()=>tree(x,y,s));
 for(const [x,y]of[[7,2.3],[9.1,6.3],[13,10.4],[8.9,15.1],[1.3,7.2]])add(x,y,()=>lamp(x,y));
 for(const[x,y]of[[5.7,8.8],[11.5,13.9],[9.4,5.7]])add(x,y,()=>bench(x,y));
 for(let i=0;i<5;i++)add(19.15,9.1+i*.65,()=>shrub(19.15,9.1+i*.65,.4));
 const pace=K.boerumMotion.sample(t);add(6.5,5.75,()=>K.boerumMotion.paint(rect,...pt(2.05+pace.u*3.95,5.75),pace));
 // Paired walkers, a waiting producer and a crate carrier, each with room to read.
 for(const [i,tone]of[P.pink,P.blue,P.green].entries()){
  const a=t/36*Math.PI*2+i*2.1,x=7.85+.33*Math.sin(a),y=8.2+4.7*(.5+.5*Math.cos(a));add(x,y,()=>person(x,y,tone,t*4+i));
 }
 add(11.8,6.75,()=>person(11.8,6.75,P.orange,0));add(12.6,7.25,()=>person(12.6,7.25,P.blue,0,true));
 add(10.2,14.7,()=>person(10.2,14.7,P.pink,0));
 items.sort((a,b)=>a.depth-b.depth).forEach(o=>o.draw());
 // Two restrained flags move on the same period; no shifting texture/noise pass.
 for(const[x,y,phase]of[[8.9,14.65,0],[12.5,6.05,1]]){
  const [px,py]=pt(x,y),flap=Math.round(Math.sin(t*Math.PI/3+phase)*2);rect(px,py-24,1,24,'#617875');poly([[px+1,py-24],[px+11,py-21+flap],[px+1,py-17]],phase?'#ec8842':'#dc88ad');line(px+1,py-24,px+9,py-21+flap,phase?'#ffc36b':'#f7c1d7');
 }
}
K.hero=hero;K.heroPeriod=36;
})();
