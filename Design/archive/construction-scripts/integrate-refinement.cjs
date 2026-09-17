const fs=require('node:fs'),path=require('node:path');
function funcs(s){let found=[];for(const m of s.matchAll(/^function\s+(\w+)\s*\(/gm)){let param=s.indexOf('(',m.index),pd=1;while(pd){param++;if(s[param]==='(')pd++;if(s[param]===')')pd--;}let begin=s.indexOf('{',param),depth=0,quote=null,comment=null;for(let i=begin;i<s.length;i++){let c=s[i],n=s[i+1];if(comment==='line'){if(c==='\n')comment=null;continue;}if(comment==='block'){if(c==='*'&&n==='/'){comment=null;i++;}continue;}if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote=null;continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='/'&&n==='/'){comment='line';i++;continue;}if(c==='/'&&n==='*'){comment='block';i++;continue;}if(c==='{')depth++;if(c==='}'&&--depth===0){found.push({name:m[1],start:m.index,end:i+1,code:s.slice(m.index,i+1)});break;}}}return found;}
// Rebuild from the retained 0.7 source so this operation is repeatable.
for(const [dest,fragments] of [['park-kit.js',['refinement-featured.js','refinement-landmarks.js','refinement-architecture.js']],['pixel-kit.js',['refinement-primitives.js','refinement-interface.js']]]){
 let s=fs.readFileSync(path.join(__dirname,'archive/0.7',dest),'utf8'),helpers=[];
 for(const f of fragments){const p=path.join(__dirname,f);if(!fs.existsSync(p))continue;for(const fn of funcs(fs.readFileSync(p,'utf8'))){const target=funcs(s).find(a=>a.name===fn.name);if(target)s=s.slice(0,target.start)+fn.code+s.slice(target.end);else helpers.push(fn.code);}}
 const at=s.indexOf('\nfunction ');s=s.slice(0,at)+'\n'+helpers.join('\n')+'\n'+s.slice(at);if(dest==='park-kit.js')s=s.replace("version:'0.7'","version:'0.8'").replace('components:{building,','components:{circuit,building,');if(dest==='pixel-kit.js')s=s.replace('drawing:{pt,','drawing:{withSurface,cacheDraw,refGroundShadow,pt,');
 const oldPainter="put(-2,-15,5,1,'#283943');put(-4,-14,9,1,'#2a3c43');"; const newPainter=oldPainter+"put(-1,-17,2,1,'#85918f');put(-2,-16,2,1,'#647883');put(-3,-14,4,1,'#7b8b90');";s=s.replace(oldPainter,newPainter);s=s.replace("put(1,-9,1,3,'#d0d2c0');","put(1,-9,1,3,'#d0d2c0');put(-1,-9,1,3,'#aec6cb');put(-1,-13,1,2,'#ecc499');");if(dest==='park-kit.js'){
 for(const [name,signature,key,x,y,args]of[
 ['car','x,y,heading=0,z=3',"'car:'+heading+':'+z",'x','y','x,y,heading,z'],
 ['reception','x,y',"'reception'",'x','y','x,y'],
 ['building','b,roof=true,stage=4',"'building:'+b.type+':'+b.w+':'+b.d+':'+b.h+':'+roof+':'+stage",'b.x','b.y','b,roof,stage'],
 ['stag','x,y',"'stag'",'x','y','x,y'],['solarium','x,y',"'solarium'",'x','y','x,y'],['inflatable','x,y',"'inflatable'",'x','y','x,y'],['supernova','x,y',"'supernova'",'x','y','x,y']]){
 const marker='function '+name+'('+signature+'){';s=s.replace(marker,marker+'\n if(!'+name+'.painting)return D.cacheDraw('+key+','+x+','+y+',()=>{'+name+'.painting=true;try{'+name+'('+args+')}finally{'+name+'.painting=false}});');
 }
 }else{const marker='function tree(x,y,size=1,{z=0,receivers}={}){';s=s.replace(marker,marker+"\n if(!tree.painting&&!receivers&&!refGroundShadow.receivers)return cacheDraw('tree:'+size+':'+z,x,y,()=>{tree.painting=true;try{tree(x,y,size,{z})}finally{tree.painting=false}});");}
 fs.writeFileSync(path.join(__dirname,dest),s);
}
