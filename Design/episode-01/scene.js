(()=>{
const K=window.MMTArt,D=K.drawing,C=K.components,P=K.P,E=window.MMTEpisode;
function draw(canvas,s,time=0){D.setup(canvas,320,48);D.rect(0,0,640,320,'#c5dbb3');D.box(0,0,13,13,-5,5,P.soil);for(let q=0;q<26;q++)for(let x=0;x<13;x++){const y=q-x;if(y>=0&&y<13)D.tile(x,y,(x===8||y===6||y===7||y===10)?'pave':'grass');}
 const b={...K.buildings[2],x:2.2,y:1.5,w:5.1,d:3.8},items=[],add=(x,y,fn)=>items.push({d:x+y,fn});
 const bays={dock:{x:9,y:4.5},studio:{x:4,y:9}};
 for(const[id,p]of Object.entries(bays)){D.plane(p.x-.65,p.y-.65,2.5,2.2,.6,id===s.bay?'#cedbc7':'#b3c4ad');for(let i=0;i<4;i++)D.plane(p.x-.6+i*.5,p.y+1.4,.2,.08,1,id===s.bay?'#f5f4e7':'#779579');}
 add(7.3,5.3,()=>C.building(b,false));
 add(10.9,2.9,()=>D.van(10.9,2.9));add(8.8,6.05,()=>D.sign(8.8,6.05,'01 DOCK',P.green));add(3.9,10.3,()=>D.sign(3.9,10.3,'02 FLOOR',P.pink));add(11.4,4.2,()=>D.crate(11.4,4.2));
 const p=bays[s.bay],active=s.started&&s.delivered===null&&!E.ready(s),total=s.plan==='internal'?6:s.substitute?3:2,done=s.plan==='supplier'&&!s.substitute&&!s.supplierSettled?0:s.plan==='internal'||s.substitute?total-s.work:2-s.prep;
 add(p.x+1.3,p.y+.8,()=>{C.whiteDesk(p.x,p.y,2);if(done>0){D.box(p.x+.12,p.y+.02,Math.min(1.3,.25+done*.18),.45,9,4,P.orange,false);D.line(...D.pt(p.x+.12,p.y+.03,13),...D.pt(p.x+1.1,p.y+.03,13),P.orange[3]);}if(E.ready(s))D.crate(p.x+1.3,p.y+.9);});
 add(9.5,10.4,()=>{C.whiteDesk(9.5,10.4,2);if(s.other===0)D.box(9.7,10.5,.7,.45,9,5,P.blue,false);});
 for(let i=0;i<2;i++){const x=i<s.crew?p.x+.4+i*.7:10.5,y=i<s.crew?p.y+.85:11.1;add(x,y,()=>D.person(x,y,i?P.orange:P.blue,active?time*4+i:0));}
 const a=K.boerumMotion.sample(time),cx=8.45,cy=7.1+a.u*2.6;
 add(cx,cy,()=>D.person(cx,cy,P.pink,time*4,s.delivered!==null||s.handoff>0));
 for(const[x,y,z]of[[.7,2.8,.85],[1.5,.9,.85],[7.5,.6,.7],[11.6,7.5,.72],[1.4,11.5,.8]])add(x,y,()=>D.tree(x,y,z));
 for(const[x,y]of[[7.6,5.8],[8.4,11.9]])add(x,y,()=>D.lamp(x,y));add(5.8,11.4,()=>D.bench(5.8,11.4));add(7.3,12.3,()=>C.cat(7.3,12.3,time));
 items.sort((a,b)=>a.d-b.d).forEach(o=>o.fn());
 if(s.plan){const p=bays[s.bay];D.selection({x:p.x-.65,y:p.y-.65,w:2.5,d:2.2,h:0});}
 return Object.entries(bays).map(([id,p])=>({id,p:D.pt(p.x+.45,p.y+.3,6)}));
}
window.MMTEpisodeScene={draw};
})();
