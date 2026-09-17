const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),os=require('node:os');
const {createCanvas}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'..'),out=path.join(root,'previews');fs.mkdirSync(out,{recursive:true});
const v=vm.createContext({window:{}});for(const f of ['pixel-kit.js','park-kit.js','office-pixel-study.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),v);
const kit=v.window.MMTArt,entries=[];
for(const [id,title,state] of [
 ['park-party','Event courtyard',{court:'party'}],['park-social','Booth courtyard',{court:'social'}],['park-garden','Garden courtyard',{court:'garden'}],
 ['boerum-cutaway','Boerum cutaway',{selected:'B-01',roof:false}],['porter-cutaway','Porter cutaway',{selected:'B-02',roof:false}],['johnson-cutaway','Johnson cutaway',{selected:'B-03',roof:false}]
]){const c=createCanvas(640,360);kit.scene(c,state);fs.writeFileSync(path.join(out,id+'.png'),c.toBuffer('image/png'));entries.push({id,title,png:id+'.png',gif:id+'.gif',kind:'still',size:[640,360],route:'#art/world-and-interface',caption:'Current art study. Fictional arrangement; no production economy.'});}
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mmt-circuit-'));const frames=224,period=Math.PI*2/.28;
for(let i=0;i<frames;i++){const c=createCanvas(640,360);kit.scene(c,{time:i*period/frames,circuit:true,court:'social'});fs.writeFileSync(path.join(temp,String(i).padStart(3,'0')+'.png'),c.toBuffer('image/png'));}
entries.push({id:'chrysler-circuit',title:'Chrysler circuit',png:'chrysler-circuit.png',gif:'chrysler-circuit.gif',kind:'animation',size:[640,360],durationMs:22400,route:'#art/world-and-interface',caption:'One circuit at approximately real study speed. Driving attraction invented; the photographed car is stationary.'});
fs.copyFileSync(path.join(temp,'000.png'),path.join(out,'chrysler-circuit.png'));
fs.writeFileSync(path.join(__dirname,'scene-render-input.json'),JSON.stringify({temp,frames,output:out,entries},null,2));console.log(JSON.stringify({scenes:entries.length,animationFrames:frames}));
