import fs from 'node:fs';
const base=new URL('../',import.meta.url);
const catalogue=JSON.parse(fs.readFileSync(new URL('assets/sprite-catalogue/manifest.json',base)));
const objects=catalogue.objects.map(({id,name,group,display})=>({id,name,group,display}));
fs.writeFileSync(new URL('whiteboard/assets.js',base),'/* Generated from the shared sprite catalogue by build-whiteboard-assets.mjs. */\nwindow.MMTBoardAssets='+JSON.stringify(objects)+';\n');
console.log('Whiteboard art references: '+objects.length);
