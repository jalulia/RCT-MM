const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {createCanvas}=require('@napi-rs/canvas'),v=vm.createContext({window:{}});
for(const f of ['pixel-kit.js','park-kit.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),v);
const k=v.window.MMTArt,pose=k.components.deliveryPose,obstacles=k.buildings.concat([{id:'L-04',x:13,y:8,w:2.4,d:2.4}]);
const footprint=p=>{const a=p.heading*Math.PI/2,c=Math.cos(a),s=Math.sin(a);return [[-1.74,-.86],[1.74,-.86],[1.74,.86],[-1.74,.86]].map(([u,v])=>[p.x+u*c-v*s,p.y+u*s+v*c]);};
function overlaps(a,b){for(const poly of [a,b])for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],axis=[q[1]-p[1],p[0]-q[0]],proj=ps=>ps.map(p=>p[0]*axis[0]+p[1]*axis[1]),aa=proj(a),bb=proj(b);if(Math.max(...aa)<Math.min(...bb)||Math.max(...bb)<Math.min(...aa))return false;}return true;}
const stopped=pose(0),headings=new Set();let samples=0;
for(let i=0;i<640;i++){const t=i/20,p=pose(t),body=footprint(p);headings.add(((p.heading%4)+4)%4);for(const [x,y]of body)assert(x>=0&&x<=20&&y>=0&&y<=17,'Truck leaves park at '+t);for(const b of obstacles)assert(!overlaps(body,[[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.d],[b.x,b.y+b.d]]),'Truck overlaps '+b.id+' at '+t);if(t<4)assert(Math.hypot(p.x-stopped.x,p.y-stopped.y)<1e-8);assert.deepEqual(pose(t,false),pose(0,false));samples++;}
assert.equal(headings.size,16);assert.deepEqual(pose(0),pose(32));assert(Math.hypot(pose(31.999).x-stopped.x,pose(31.999).y-stopped.y)<.001);
const c=createCanvas(640,360);for(const t of [0,8,16,24]){const hit=k.scene(c,{time:t,landmark:'L-05'}).find(h=>h.id==='L-05'),p=pose(t);assert.deepEqual(Array.from(hit.p),Array.from(k.drawing.pt(p.x,p.y,18)));}
const m=JSON.parse(fs.readFileSync(path.join(__dirname,'../assets/sprite-catalogue/manifest.json'))),l=m.objects.find(o=>o.id==='L-05');assert.equal(l.name,'Voila delivery truck');assert.equal(l.variants.length,16);assert(l.gifSequences.find(s=>s.kind==='orientation-study'));assert.equal(k.landmarks.find(o=>o.id==='L-05').site,'B-02');
for(const name of ['default.png','default.gif'])assert(!fs.existsSync(path.join(__dirname,'../assets/sprite-catalogue/objects/L-05',name)));
// This replacement must not change the already accepted Johnson stair or cutaway.
const old=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(path.join(__dirname,'pixel-kit.js'),'utf8'),old);vm.runInContext(fs.readFileSync(path.join(__dirname,'../archive/versions/0.11/working/park-kit.js'),'utf8'),old);
function interior(kit){const b=kit.buildings.find(b=>b.id==='B-03'),c=createCanvas(192,160);kit.drawing.setup(c,96,112);kit.components.building({...b,x:-b.w/2,y:-b.d/2},false);return c.toBuffer('image/png');}assert(interior(k).equals(interior(old.window.MMTArt)),'Johnson cutaway changed');
const report={artRevision:k.version,routeSamples:samples,headings:headings.size,loadingStopSeconds:4,loopSeconds:32,buildingAndSolariumClearance:true,parkBounds:true,movingHitTarget:true,johnsonCutawayPixelIdentical:true,retiredFramesAbsent:true};
fs.writeFileSync(path.join(__dirname,'../qa/voila-checks.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
