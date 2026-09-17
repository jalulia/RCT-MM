const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {chromium}=require('playwright'),root=path.resolve(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'assets/sprite-catalogue/manifest.json'))),project=JSON.parse(fs.readFileSync(path.join(root,'project.json')));
(async()=>{
 const executable=path.join(os.homedir(),'Library/Caches/ms-playwright/chromium_headless_shell-1194/chrome-mac/headless_shell');
 const browser=await chromium.launch({headless:true,executablePath:process.env.MMT_CHROMIUM||(fs.existsSync(executable)?executable:undefined)}),p=await browser.newPage({viewport:{width:1512,height:1050},reducedMotion:'no-preference'}),errors=[],checks=[];
 const base=process.env.MMT_SITE_URL||'http://127.0.0.1:8769/Design/';p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'design-review.html#art/component-kit');
 await p.waitForTimeout(200);assert.ok(await p.evaluate(()=>document.getElementById('art/component-kit').getBoundingClientRect().top>document.querySelector('.masthead').getBoundingClientRect().bottom),'Component heading is below fixed header');
 assert.equal(await p.locator('.art-kit-item').count(),data.counts.objects);
 for(const o of data.objects){const card=p.locator(`[id="art/kit-${o.id}"]`);assert.equal(await card.locator(`a[href="assets/sprite-catalogue/index.html#${o.id}"]`).count(),1);assert.equal(await card.locator('[data-motion-src]').count(),Number(o.display.animated));}
 checks.push('All 44 registered objects have matching kit IDs, catalogue links and motion choices');
 await p.goto(base+'design-review.html#art/voila-delivery');assert.equal(await p.evaluate(()=>location.hash),'#art/kit-L-05');assert.equal(await p.locator('[id="art/voila-delivery"]').count(),0);
 const truck=p.locator('[id="art/kit-L-05"] img');await truck.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('[id="art/kit-L-05"] img').dataset.motionPlaying==='true');
 const first=await truck.screenshot();await p.waitForTimeout(4800);const moving=await truck.screenshot();assert.ok(!first.equals(moving),'Truck preview must change after the loading stop');
 checks.push('Legacy truck bookmark reaches its kit entry; isolated delivery visibly leaves its loading stop');
 await p.locator('#fig-A04 [data-preview-motion]').click();await truck.scrollIntoViewIfNeeded();assert.equal(await truck.getAttribute('data-motion-playing'),'false');const poster=await truck.screenshot();await p.waitForTimeout(350);assert.ok(poster.equals(await truck.screenshot()));
 await p.locator('#fig-A04 [data-preview-motion]').click();await truck.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('[id="art/kit-L-05"] img').dataset.motionPlaying==='true');
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForFunction(()=>document.querySelector('[id="art/kit-L-05"] img').dataset.motionPlaying==='false');assert.equal(await truck.getAttribute('data-motion-playing'),'false');checks.push('Pause holds a still poster; resume works; changing to reduced motion stops playback');
 for(const [surface,url,selector]of [['catalogue','assets/sprite-catalogue/index.html#L-05','#L-05 .asset-stage img'],['library','previews/index.html#motion','img[data-motion-src="../assets/sprite-catalogue/objects/L-05/motion/loop.gif"]']]){
  await p.emulateMedia({reducedMotion:'no-preference'});await p.goto(base+url);const im=p.locator(selector);await im.scrollIntoViewIfNeeded();await p.waitForFunction(sel=>document.querySelector(sel).dataset.motionPlaying==='true',selector);assert.ok((await im.getAttribute('src')).endsWith('objects/L-05/motion/loop.gif'));
  await p.emulateMedia({reducedMotion:'reduce'});await p.waitForFunction(sel=>document.querySelector(sel).dataset.motionPlaying==='false',selector);assert.equal(await im.getAttribute('data-motion-playing'),'false');checks.push(surface+' uses the same isolated motion and honors reduced motion');
 }
 await p.goto(base+'assets/sprite-catalogue/index.html#L-05');const event=p.waitForEvent('download');await p.locator('#L-05 a[href="objects/L-05/motion/loop.gif"]').click();const download=await event;assert.ok(fs.readFileSync(await download.path()).equals(fs.readFileSync(path.join(root,'assets/sprite-catalogue/objects/L-05/motion/loop.gif'))));checks.push('Isolated GIF download byte-matches the catalogue file');
 for(const width of [1512,390])for(const [name,url]of [['component-kit','design-review.html#art/component-kit'],['truck-component','design-review.html#art/kit-L-05'],['office-discoveries','design-review.html#art/office-discoveries'],['catalogue-truck','assets/sprite-catalogue/index.html#L-05'],['motion-library','previews/index.html#motion']]){
  await p.setViewportSize({width,height:width===390?844:1050});await p.goto(base+url);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,name+' overflow');await p.screenshot({path:path.join(root,'qa',name+'-'+width+'.png')});
 }
 checks.push('Component kit, discoveries, catalogue and motion library fit desktop and 390px widths');
 await p.goto('file://'+path.join(root,'design-review.html')+'#art/kit-L-05');assert.equal(await p.locator('[id="art/kit-L-05"] a.art-kit-object').count(),1);checks.push('Component route opens from the local file');
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(root,'qa/component-library-checks.json'),JSON.stringify({designRevision:project.designRevision,objects:data.counts.objects,animatedObjects:data.objects.filter(o=>o.display.animated).length,checks,errors,passed:true},null,2)+'\n');await browser.close();console.log(JSON.stringify({checks:checks.length,passed:true}));
})().catch(e=>{console.error(e);process.exit(1)});
