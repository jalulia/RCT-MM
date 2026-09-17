const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),os=require('node:os');
const {createCanvas}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'..'),out=path.join(root,'previews');fs.mkdirSync(out,{recursive:true});
const v=vm.createContext({window:{}});for(const f of ['pixel-kit.js','park-kit.js','hero-scene.js','office-pixel-study.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),v);
const kit=v.window.MMTArt,entries=[];
for(const [id,title,state] of [
 ['park-party','Event courtyard',{court:'party'}],['park-social','Booth courtyard',{court:'social'}],['park-garden','Garden courtyard',{court:'garden'}],
 ['boerum-cutaway','Boerum cutaway',{selected:'B-01',roof:false}],['porter-cutaway','Porter cutaway',{selected:'B-02',roof:false}],['johnson-cutaway','Johnson cutaway',{selected:'B-03',roof:false}]
]){const c=createCanvas(640,360);kit.scene(c,state);fs.writeFileSync(path.join(out,id+'.png'),c.toBuffer('image/png'));entries.push({id,title,png:id+'.png',gif:id+'.gif',kind:'still',size:[640,360],route:'#art/world-and-interface',caption:'Current art study. Fictional arrangement; no production economy.'});}
const animations=[];
for(const spec of [
 {id:'art-hero',title:'Art hero / composed scene',frames:360,period:36,durationMs:36000,size:[768,360],hero:true,caption:'Custom composition: Chrysler circuit, bakery delivery, Boerum pacing, flags and foreground walkers. A synchronized presentation loop; invented arrangement.'},
 {id:'chrysler-circuit',title:'Chrysler circuit',frames:224,period:Math.PI*2/.28,durationMs:22400,state:{circuit:true,delivery:false,court:'social'},caption:'One circuit at approximately real study speed. Driving attraction invented; the photographed car is stationary.'},
 {id:'voila-delivery',title:'Voila delivery route',frames:320,period:32,durationMs:32000,state:{circuit:false,delivery:true,court:'social'},caption:'Four-second loading stop and 28-second service loop beside Porter. Vehicle and route invented; bakery reference supplied.'}
]){
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mmt-'+spec.id+'-'));
 for(let i=0;i<spec.frames;i++){const c=createCanvas(...(spec.size||[640,360]));if(spec.hero)kit.hero(c,i*spec.period/spec.frames);else kit.scene(c,{...spec.state,time:i*spec.period/spec.frames});fs.writeFileSync(path.join(temp,String(i).padStart(3,'0')+'.png'),c.toBuffer('image/png'));}
 entries.push({id:spec.id,title:spec.title,png:spec.id+'.png',gif:spec.id+'.gif',kind:'animation',size:spec.size||[640,360],durationMs:spec.durationMs,route:spec.hero?'#art/visual-system':'#art/world-and-interface',caption:spec.caption});
 fs.copyFileSync(path.join(temp,'000.png'),path.join(out,spec.id+'.png'));animations.push({id:spec.id,temp,frames:spec.frames});
}
fs.writeFileSync(path.join(__dirname,'scene-render-input.json'),JSON.stringify({animations,output:out,entries},null,2));console.log(JSON.stringify({scenes:entries.length,animationFrames:animations.reduce((n,a)=>n+a.frames,0)}));
