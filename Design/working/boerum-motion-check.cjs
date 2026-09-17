'use strict';
// Run with Node and @napi-rs/canvas available. No files are emitted.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {createCanvas}=require('@napi-rs/canvas');
const load=(ctx,file)=>vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),ctx,{filename:file});
const expected=[[-1,-1,false],[1,1,false],[-1,1,true],[1,1,false],[-1,-1,false],[1,-1,true]];
for(const order of [['office-pixel-study.js','park-kit.js'],['park-kit.js','office-pixel-study.js']]){
 const ctx=vm.createContext({window:{}});load(ctx,'pixel-kit.js');order.forEach(file=>load(ctx,file));
 const {MMTOffice:office,MMTArt:park,MMTBoerumMotion:motion}=ctx.window;
 assert.equal(office.boerumMotion,park.boerumMotion,'both views share the same sampler and painter');
 assert.equal(motion.loopSeconds,36);
 expected.forEach(([travel,facing,moonwalk],leg)=>{
  const t=leg*6+2.7,state=motion.sample(t);
  assert.equal(state.leg,leg);assert.equal(state.travel,travel);assert.equal(state.facing,facing);assert.equal(state.moonwalk,moonwalk);
  assert.equal(Math.sign(motion.sample(t+.05).u-motion.sample(t-.05).u),travel,'position changes in the requested direction');
  const pixels=[];motion.paint((...args)=>pixels.push(args),0,0,state);
  const nose=pixels.find(p=>p[4]==='#aa7757');
  assert.equal(Math.sign(nose[0]),facing,'the actual painted nose faces the expected direction');
  const hold=motion.sample(leg*6+5.7);assert.equal(hold.moving,false);
  assert.equal(hold.u,travel<0?0:1);
  assert.ok(Math.abs(motion.sample(leg*6+5.99999).u-motion.sample((leg+1)*6).u)<.00001,'no endpoint teleport');
 });
 for(const t of [0,.13,5.7,12.25,23.4,30.75])assert.equal(JSON.stringify(motion.sample(t)),JSON.stringify(motion.sample(t+36)),'sampler loops');
 assert.equal(motion.sample(-.1).leg,5);assert.equal(motion.sample(NaN).leg,0);
 const frames=[0,1,2,3,4,5,6,7].map(frame=>{const r=[];motion.paint((...args)=>r.push(args),0,0,{...motion.sample(12.2),frame});return r;});
 const upper=rects=>rects.filter(p=>p[1]<-5),feet=rects=>rects.filter(p=>p[1]>=-5&&p[1]<=0);
 frames.forEach(frame=>assert.deepEqual(upper(frame),upper(frames[0]),'moonwalk torso/arms stay level'));
 assert.notDeepEqual(feet(frames[0]),feet(frames[2]),'moonwalk feet actually slide');
 assert.ok(feet(frames[0]).some(p=>p[1]===-1&&p[2]===4),'moonwalk raised heel is painted');
 assert.ok(feet(frames[0]).some(p=>p[1]===0&&p[2]===4),'moonwalk has a planted extended shoe');
 const bytes=canvas=>Buffer.from(canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data);
 const a=createCanvas(320,180),b=createCanvas(320,180);
 office.draw(a,'boerum',0);office.draw(b,'boerum',36);assert.ok(bytes(a).equals(bytes(b)),'standalone rendered loop is seamless');
 office.draw(a,'boerum',12.25);office.draw(b,'boerum',12.25);assert.ok(bytes(a).equals(bytes(b)),'paused study has identical pixels');
 a.width=b.width=640;a.height=b.height=360;
 park.scene(a,{time:32.2});park.scene(b,{time:32.2});assert.ok(bytes(a).equals(bytes(b)),'paused park has identical pixels');
}
console.log('Boerum motion passed: six legs, facing vs travel, painted glide, holds, loop, frozen-time rendering, both load orders.');
