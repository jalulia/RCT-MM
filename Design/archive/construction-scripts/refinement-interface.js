// Draw a shared component inside another study without clearing its canvas.
function withSurface(canvas,x,y,fn){const before=[ctx,ox,oy];ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ox=x;oy=y;try{return fn();}finally{[ctx,ox,oy]=before;}}
function icon(canvas,kind){
 setup(canvas,0,0);const ink='#233940',edge='#879e9e',paper='#fcfdf5',shade='#d2ded6',pink='#eaa2bb',green='#65db87',blue='#82b4c1';
 const sheet=(x,y)=>{rect(x,y,9,12,ink);rect(x+1,y+1,7,10,paper);rect(x+7,y+2,1,9,shade);rect(x+2,y+3,4,1,edge);rect(x+2,y+5,5,1,edge);rect(x+2,y+7,3,1,edge)};
 if(kind==='Work'){rect(1,4,14,10,ink);rect(2,5,12,8,shade);rect(2,2,5,3,ink);rect(3,3,3,2,pink);rect(2,6,12,2,paper);rect(3,9,4,3,pink);rect(8,9,5,1,edge);rect(8,11,3,1,edge);}
 if(kind==='Cash'){rect(1,3,12,7,ink);rect(2,4,10,5,green);rect(3,5,8,3,'#bae1a9');rect(6,5,2,3,ink);line(2,12,12,12,ink);poly([[11,10],[14,12],[11,14]],ink);rect(3,11,4,1,shade);}
 if(kind==='Information'){sheet(5,3);sheet(2,1);rect(4,3,5,2,pink);rect(4,7,4,1,ink);rect(4,9,3,1,edge);}
 if(kind==='People'){rect(3,2,3,4,ink);rect(4,3,2,2,paper);rect(10,3,3,4,ink);rect(11,4,1,2,paper);poly([[2,7],[6,7],[8,10],[8,14],[1,14],[1,10]],ink);rect(2,9,4,4,pink);rect(2,9,2,2,'#ffd3df');poly([[9,8],[13,8],[15,11],[15,14],[9,14]],ink);rect(10,10,3,3,blue);}
 if(kind==='Control'){rect(1,2,14,12,ink);rect(2,3,12,10,shade);for(const [x,y,c]of[[4,6,pink],[8,10,green],[12,7,blue]]){rect(x,4,1,8,edge);rect(x-1,y-1,3,3,ink);rect(x-1,y-1,2,2,c);}}
}
// Cache deterministic sprites at native resolution; animated selection stays outside.
function cacheDraw(key,x,y,paint){
 const cache=cacheDraw.frames||(cacheDraw.frames=new Map());let frame=cache.get(key);
 if(!frame){const dest=ctx.canvas,canvas=dest.ownerDocument?dest.ownerDocument.createElement('canvas'):new dest.constructor(384,288);canvas.width=384;canvas.height=288;withSurface(canvas,192-(x-y)*16,192-(x+y)*8,paint);frame=canvas;cache.set(key,frame);}
 const p=pt(x,y);ctx.drawImage(frame,p[0]-192,p[1]-192);
}
