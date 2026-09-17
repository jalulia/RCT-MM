const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
let html=fs.readFileSync(path.join(__dirname,'park-builder.html'),'utf8');
for(const [key,file] of Object.entries({PIXEL:'Design/working/pixel-kit.js',PARK:'Design/working/park-kit.js'}))html=html.replace('/* '+key+' */',()=>fs.readFileSync(path.join(root,file),'utf8').replaceAll('</script','<\\/script'));
html=html.replace('FONT_DATA',fs.readFileSync(path.join(root,'Design/assets/fonts/Geist-Regular.otf')).toString('base64'));
fs.mkdirSync(path.join(root,'test'),{recursive:true});fs.writeFileSync(path.join(root,'test/index.html'),html);console.log('Built standalone test/index.html');
