const fs=require('node:fs'),path=require('node:path');const target=path.join(__dirname,'office-pixel-study.js');let s=fs.readFileSync(path.join(__dirname,'archive/0.7/office-pixel-study.js'),'utf8');
// Keep the standalone study's source-specific framing; bind reusable objects to the current kit.
s=s.replace('function painter(canvas){','function painter(canvas){');
const hooks=[
 ["  function skylight(x,y,w=1.4,d=.85,z=36){","if(window.MMTArt?.drawing.withSurface)return window.MMTArt.drawing.withSurface(canvas,ox,oy,()=>window.MMTArt.components.skylight(x,y,w,d,z));"],
 ["  function timberRoom(x,y,w=2.5,d=1.6){","if(window.MMTArt?.drawing.withSurface)return window.MMTArt.drawing.withSurface(canvas,ox,oy,()=>window.MMTArt.components.timberPod(x,y,w,d,2));"],
 ["  function booth(x,y){","if(window.MMTArt?.drawing.withSurface)return window.MMTArt.drawing.withSurface(canvas,ox,oy,()=>window.MMTArt.components.booth(x,y));"],
 ["  function station(x,y,{occupied=false,tone=C.teal}={}){","if(window.MMTArt?.drawing.withSurface)return window.MMTArt.drawing.withSurface(canvas,ox,oy,()=>{window.MMTArt.components.whiteDesk(x,y,1.5);if(occupied)window.MMTArt.drawing.person(x+.67,y+.88,tone,0,false,2);});"],
 ["  function streetTree(x,y){","if(window.MMTArt?.drawing.withSurface){plane(x-.4,y-.35,.8,.7,0,'#687562');plane(x-.27,y-.23,.54,.46,1,'#514f3b');return window.MMTArt.drawing.withSurface(canvas,ox,oy,()=>window.MMTArt.drawing.tree(x,y,1.02));}"],
 ["  function person(x,y,shirt=C.teal,state='stand',z=0){","if(state!=='seat'&&window.MMTArt?.drawing.withSurface)return window.MMTArt.drawing.withSurface(canvas,ox,oy,()=>window.MMTArt.drawing.person(x,y,shirt,state==='walk'?1:0,state==='carry',z));"]
];for(const [find,add]of hooks){if(!s.includes(find))throw Error(find);s=s.replace(find,find+'\n    '+add);}
const painter=fs.readFileSync(path.join(__dirname,'park-kit.js'),'utf8');const from=painter.indexOf(' function paint('),to=painter.indexOf('\n return Object.freeze',from);const sf=s.indexOf(' function paint('),st=s.indexOf('\n return Object.freeze',sf);s=s.slice(0,sf)+painter.slice(from,to)+s.slice(st);
fs.writeFileSync(target,s);console.log('Standalone studies share current object renderers.');
