/* Browser regression for the live design board. Uses public controls, reads exported state. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),qa=path.join(root,'qa');
const localChrome=path.join(os.homedir(),'Library/Caches/ms-playwright/chromium_headless_shell-1194/chrome-mac/headless_shell');
const base=process.env.MMT_SITE_URL||'http://127.0.0.1:8769/Design/';
function mockRooms(){
 const Store=require('../whiteboard/store.js'),Collaboration=require('../whiteboard/collaboration.js'),crypto=require('node:crypto'),copy=x=>JSON.parse(JSON.stringify(x));
 const rooms=new Map(),requests=[],pending=[];let holdPatches=false;
 function rpc(name,args){
  if(name==='mmt_board_create'){const checked=Store.validate(args.p_board);if(!checked.ok)return{ok:false,message:checked.errors.join(' ')};const roomId=crypto.randomUUID(),editKey=crypto.randomBytes(32).toString('hex');rooms.set(roomId,{board:checked.board,revision:1,editKey,people:new Map(),receipts:new Map()});return{ok:true,roomId,editKey,revision:1,board:copy(checked.board),participants:[]};}
  const room=rooms.get(args.p_room_id);if(!room||room.editKey!==args.p_edit_key)return{ok:false,message:'Invalid test room key.'};
  if(name==='mmt_board_read'){room.people.set(args.p_client_id,{...args.p_presence,clientId:args.p_client_id});return{ok:true,revision:room.revision,...(args.p_since===room.revision?{}:{board:copy(room.board)}),participants:[...room.people.values()]};}
  if(name==='mmt_board_patch'){const key=args.p_client_id+'/'+args.p_mutation_id,hash=JSON.stringify(args.p_ops);if(room.receipts.has(key))return room.receipts.get(key)===hash?{ok:true,replayed:true,board:copy(room.board),revision:room.revision}:{ok:false,message:'Mutation ID reused.'};const applied=Collaboration.applyOperations(room.board,args.p_ops);if(!applied.ok)return{ok:false,conflicts:applied.conflicts,board:copy(room.board),revision:room.revision};if(JSON.stringify(room.board)!==JSON.stringify(applied.board)){room.board=applied.board;room.revision++;}room.receipts.set(key,hash);return{ok:true,board:copy(room.board),revision:room.revision};}
  throw Error('Unexpected mock RPC '+name);
 }
 async function install(context,label){await context.route('https://testproject.supabase.co/rest/v1/rpc/**',async route=>{const request=route.request(),headers={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'POST,OPTIONS'};if(request.method()==='OPTIONS')return route.fulfill({status:204,headers});const name=new URL(request.url()).pathname.split('/').pop(),args=request.postDataJSON();requests.push({label,name,args,headers:request.headers()});const respond=()=>route.fulfill({status:200,contentType:'application/json',headers,body:JSON.stringify(rpc(name,args))});if(holdPatches&&name==='mmt_board_patch'){pending.push(respond);if(pending.length===2){holdPatches=false;for(const resolve of pending.splice(0))await resolve();}return;}await respond();});}
 return{install,requests,rooms,holdNextPair(){holdPatches=true;}};
}
async function checkSharedUI(browser,checks){
 const service=mockRooms(),contexts=[],errors=[];let one,two;
 const ready=p=>p.waitForFunction(()=>!!window.MMTWhiteboard?.evaluation),value=p=>p.evaluate(()=>({board:MMTWhiteboard.board,view:MMTWhiteboard.view,viewport:MMTWhiteboard.viewport}));
 const change=async(p,selector,text)=>{await p.locator(selector).fill(text);await p.locator(selector).press('Tab');};
 const select=async(p,id)=>{await p.locator(`[data-node="${id}"]`).focus();await p.locator(`[data-node="${id}"]`).press('Enter');};
 const close=async p=>{if(await p.locator('#inspector').isVisible())await p.locator('#close-inspector').click();};
 try{
  for(const label of ['one','two']){const context=await browser.newContext({viewport:{width:1512,height:1050},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});contexts.push(context);await service.install(context,label);}
  one=await contexts[0].newPage();two=await contexts[1].newPage();for(const p of [one,two])p.on('pageerror',e=>errors.push(e.message));
  await one.goto(base+'whiteboard/');await ready(one);await one.locator('#open-room').click();await one.locator('#participant-name').fill('Designer one');await one.locator('#supabase-url').fill('https://testproject.supabase.co');await one.locator('#supabase-key').fill('sb_publishable_browser_regression');await one.locator('#create-room').click();await one.waitForFunction(()=>document.querySelector('#room-status').textContent.includes('Shared room ready'));
  const link=await one.locator('#room-link').inputValue();assert.match(link,/#room=/);await one.locator('#copy-room').click();assert.equal(await one.evaluate(()=>navigator.clipboard.readText()),link);await one.locator('#close-room').click();
  await two.goto(link);await ready(two);await two.locator('#participant-name').fill('Designer two');await two.locator('#join-room').click();await two.waitForFunction(()=>document.querySelector('#room-status').textContent.includes('Shared room ready'));await two.locator('#close-room').click();checks.push('Two separate browser sessions create and join a shared room through a copied edit link using mocked Supabase HTTP.');

  await one.locator('[data-add-type="note"]').click();const noteOne=(await value(one)).board.nodes.at(-1).id;await change(one,'[data-field="title"]','Designer one note');await change(one,'[data-field="note"]','Preserve the delivery deadline.');await close(one);
  await two.locator('[data-add-type="note"]').click();const noteTwo=(await value(two)).board.nodes.at(-1).id;await change(two,'[data-field="title"]','Designer two note');await change(two,'[data-field="note"]','Check recipient confirmation.');await close(two);
  for(const p of [one,two])await p.waitForFunction(ids=>ids.every(id=>MMTWhiteboard.board.nodes.some(n=>n.id===id)),[noteOne,noteTwo]);checks.push('Different notes from independent sessions merge and appear on both boards.');

  await select(one,noteOne);const typing='Text typed while another participant adds a card.';await one.locator('[data-field="note"]').fill(typing);
  await two.locator('[data-add-type="note"]').click();const third=(await value(two)).board.nodes.at(-1).id;await change(two,'[data-field="title"]','Arrived during typing');await close(two);await two.waitForFunction(()=>document.querySelector('#save-state').textContent.includes('Shared'));
  await one.waitForTimeout(1800);assert.equal(await one.locator('[data-field="note"]').inputValue(),typing);await one.locator('[data-field="note"]').press('Tab');await close(one);
  for(const p of [one,two])await p.waitForFunction(({third,noteOne,typing})=>MMTWhiteboard.board.nodes.some(n=>n.id===third)&&MMTWhiteboard.board.nodes.find(n=>n.id===noteOne)?.params.note===typing,{third,noteOne,typing},{timeout:8000});checks.push('Remote additions during an active text edit survive alongside the text when it is committed.');

  service.holdNextPair();await Promise.all([change(one,'#board-title','Concurrent title one'),change(two,'#board-title','Concurrent title two')]);
  await Promise.race([one.locator('#conflict-banner').waitFor({state:'visible',timeout:8000}),two.locator('#conflict-banner').waitFor({state:'visible',timeout:8000})]);const loser=await one.locator('#conflict-banner').isVisible()?one:two,winner=loser===one?two:one;const accepted=(await value(winner)).board.title;assert.notEqual((await value(loser)).board.title,accepted);await loser.locator('#reload-saved').click();for(const p of [one,two])await p.waitForFunction(title=>MMTWhiteboard.board.title===title,accepted);checks.push('Conflicting edits to one field show a review banner; Load saved board adopts the shared value.');

  await close(one);await close(two);await one.locator('button[data-view="systems"]').click();await two.locator('button[data-view="systems"]').click();const twoViewport=(await value(two)).viewport;await one.locator('#zoom-in').click();await one.locator('#zoom-in').click();const oneViewport=(await value(one)).viewport;assert.notEqual(oneViewport.zoom,twoViewport.zoom);const rect=await one.locator('#viewport').boundingBox();await one.mouse.move(rect.x+rect.width*.7,rect.y+rect.height*.6);await one.locator('button[data-view="story"]').click();await one.waitForTimeout(1400);assert.deepEqual((await value(two)).viewport,twoViewport);assert.equal((await value(two)).view,'systems');const ownPresence=service.requests.filter(r=>r.label==='one'&&r.name==='mmt_board_read').at(-1).args.p_presence;assert.equal(ownPresence.name,'Designer one');assert.equal(ownPresence.view,'story');assert(Number.isFinite(ownPresence.x));assert(Number.isFinite(ownPresence.y));checks.push('Each participant keeps their viewport and view; presence sends cursor coordinates, view and name.');
  assert.deepEqual(errors,[]);assert(service.requests.every(r=>r.headers.apikey==='sb_publishable_browser_regression'));assert(service.requests.some(r=>r.name==='mmt_board_create'));assert(service.requests.some(r=>r.name==='mmt_board_patch'));
 }catch(error){if(one)await one.screenshot({path:path.join(qa,'whiteboard-shared-one-failure.png')});if(two)await two.screenshot({path:path.join(qa,'whiteboard-shared-two-failure.png')});throw error;}finally{for(const context of contexts)await context.close();}
}
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.MMT_CHROMIUM||(fs.existsSync(localChrome)?localChrome:undefined),headless:true});
 const context=await browser.newContext({viewport:{width:1512,height:1050},reducedMotion:'reduce',acceptDownloads:true});
 const page=await context.newPage(),errors=[],failed=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
 const state=()=>page.evaluate(()=>({board:MMTWhiteboard.board,evaluation:MMTWhiteboard.evaluation,view:MMTWhiteboard.view,viewport:MMTWhiteboard.viewport}));
 const select=async id=>{const card=page.locator(`[data-node="${id}"]`);await card.focus();await card.press('Enter');await page.locator('#inspector').waitFor({state:'visible'});};
 const close=async()=>{if(await page.locator('#inspector').isVisible())await page.locator('#close-inspector').click();};
 const change=async(selector,value)=>{await page.locator(selector).fill(String(value));await page.locator(selector).press('Tab');};
 try{
  await page.goto(base+'whiteboard/');await page.waitForFunction(()=>!!window.MMTWhiteboard?.evaluation);await page.evaluate(()=>document.fonts.ready);await page.locator('#fit').click();
  let s=await state();assert.equal(s.board.nodes.filter(n=>n.type==='beat').length,6);assert.equal(s.evaluation.episode.turn,0);assert.equal(await page.locator('[data-node].type-beat').count(),0);
  for(let i=0;i<4;i++)await page.locator('#step').click();
  s=await state();assert.equal(s.evaluation.episode.turn,4);assert.equal(s.evaluation.episode.returned,true);assert.equal(s.evaluation.nodes.payment.state,'returned');assert.equal(s.evaluation.proposal.counters['review tasks'],1);assert.match(s.evaluation.nodes.record.detail,/saved Tue/);checks.push('Four UI steps reach the funding return, preserve saved Paid and fire the proposed review counter.');

  await change('#board-title','Workshop: production and payment');await select('discussion');await change('[data-field="note"]','Keep supplier receipt separate from the saved Paid record.');await close();
  await page.waitForFunction(()=>document.querySelector('#save-state').textContent==='Saved locally');await page.reload();await page.waitForFunction(()=>!!window.MMTWhiteboard?.evaluation);
  s=await state();assert.equal(s.board.title,'Workshop: production and payment');assert.equal(s.board.nodes.find(n=>n.id==='discussion').params.note,'Keep supplier receipt separate from the saved Paid record.');assert.equal(s.evaluation.episode.turn,4);checks.push('Title, discussion notes and run actions survive autosave and reload.');

  await page.locator('[data-add-type="trigger"]').click();s=await state();const trigger=s.board.nodes.at(-1).id;await change('[data-field="title"]','Workshop pulse');await page.locator(`[data-node="${trigger}"]`).focus();for(let i=0;i<8;i++)await page.keyboard.press('Shift+ArrowLeft');await close();
  await page.locator('[data-add-type="effect"]').click();s=await state();const effect=s.board.nodes.at(-1).id;await change('[data-field="metric"]','discussion tasks');await change('[data-field="value"]',3);await close();await page.locator('#fit').click();
  await page.locator(`[data-port="${trigger}"]`).click();await page.locator(`[data-node="${effect}"] .node-title`).click();
  s=await state();assert(s.board.edges.some(e=>e.from===trigger&&e.to===effect&&e.kind==='flow'));await close();await page.locator('[data-tool="select"]').click();await select(trigger);await page.locator(`[data-action="fire:${trigger}"]`).click();
  s=await state();assert.equal(s.evaluation.proposal.counters['discussion tasks'],3);assert.equal(s.evaluation.episode.cash,4000000);checks.push('New trigger and effect connect through the UI; firing changes only the separate proposal counter.');

  await close();await select('project');await change('[data-field="assumption:startingCash"]',45000.25);s=await state();assert.equal(s.evaluation.episode.cash,4500025);assert.equal(s.evaluation.stats.find(x=>x.key==='posted').delta,500025);assert.equal(await page.evaluate(()=>MMTEpisode.CONFIG.startingCash),4000000);checks.push('Assumption edits replay the run, display the exact cash delta and leave canonical model constants unchanged.');

  await close();await page.locator('button[data-view="story"]').click();assert.equal(await page.locator('[data-node].type-beat').count(),6);assert.equal(await page.locator('[data-node].type-project').count(),0);s=await state();assert.equal(s.evaluation.nodes['story-return'].state,'reached');
  await page.locator('[data-node="story-production"] [data-reveal="project"]').click();s=await state();assert.equal(s.view,'systems');assert.equal(s.board.nodes.find(n=>n.id==='project').title,'C-07 · component');assert.match(await page.locator('#inspector-body').innerText(),/episode:C-07/);
  await close();await page.locator('button[data-view="structure"]').click();assert.equal(await page.locator('[data-node].type-anchor').count(),4);assert.equal(await page.locator('[data-node="project"]').count(),1);assert(await page.locator('[data-edge="hierarchy:project"]').count());checks.push('Story and hierarchy project the same gameplay IDs; an inline story object opens its actual system card.');

  await page.locator('button[data-view="systems"]').click();await page.locator('#fit').click();s=await state();const bayBefore=s.board.nodes.find(n=>n.id==='work-bay'),zone=s.board.nodes.find(n=>n.id==='shared-zone');const viewport=await page.locator('#viewport').boundingBox(),vp=s.viewport;
  const start={x:viewport.x+vp.x+(bayBefore.x+75)*vp.zoom,y:viewport.y+vp.y+(bayBefore.y+42)*vp.zoom};
  const delta={x:(zone.x+16-bayBefore.x)*vp.zoom,y:(zone.y+90-bayBefore.y)*vp.zoom};
  await page.mouse.move(start.x,start.y);await page.mouse.down();await page.mouse.move(start.x+delta.x,start.y+delta.y,{steps:16});await page.mouse.up();
  s=await state();assert.equal(s.board.scenario.placement,'shared');assert.equal(s.evaluation.episode.bay,'studio');assert(s.evaluation.signals.some(x=>x.title==='Shared floor adds one handoff interval'));checks.push('Dragging the work bay into the shared-floor zone updates physical handoff rules.');

  await close();await page.locator('#open-board-menu').click();const downloadPromise=page.waitForEvent('download');await page.locator('#export-board').click();const download=await downloadPromise,file=await download.path(),exportText=fs.readFileSync(file,'utf8');const exported=await page.evaluate(text=>MMTBoardStore.importJSON(text),exportText);assert.equal(exported.ok,true,JSON.stringify(exported.errors));const beforeExport=await state();assert.equal(exported.board.title,beforeExport.board.title);assert.deepEqual(exported.board.nodes,beforeExport.board.nodes);assert.deepEqual(exported.board.runtime,beforeExport.board.runtime);
  const importBoard=JSON.parse(JSON.stringify(exported.board));importBoard.title='Imported workshop';await page.locator('#import-file').setInputFiles({name:'workshop.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(importBoard))});
  s=await state();assert.equal(s.board.title,'Imported workshop');assert.deepEqual(s.board.nodes,exported.board.nodes);assert.equal(s.evaluation.proposal.counters['discussion tasks'],3);checks.push('Downloaded JSON validates and imports through the file picker with stable IDs, rules and run history.');

  await page.locator('#fit').click();await page.screenshot({path:path.join(qa,'whiteboard-systems-1512.png')});
  await page.locator('button[data-view="story"]').click();await page.screenshot({path:path.join(qa,'whiteboard-story-1512.png')});
  await page.locator('button[data-view="structure"]').click();await page.screenshot({path:path.join(qa,'whiteboard-structure-1512.png')});
  await page.setViewportSize({width:390,height:844});for(const view of ['systems','story','structure']){await page.locator(`button[data-view="${view}"]`).click();const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.getAttribute('src'))}));assert(layout.scroll<=layout.width+1,view+' horizontal overflow: '+layout.scroll);assert.deepEqual(layout.broken,[]);}
  await page.locator('button[data-view="systems"]').click();await page.locator('#show-library').click();await page.locator('#library-search').fill('Note');await page.locator('[data-add-type="note"]').click();assert(await page.locator('#inspector').isVisible());await close();await page.screenshot({path:path.join(qa,'whiteboard-systems-390.png')});checks.push('Systems, Story and Structure fit a 390px viewport; the mobile card library adds editable cards.');
  await checkSharedUI(browser,checks);
  await page.waitForTimeout(500);assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);checks.push('No JavaScript console errors, failed responses or broken image assets.');
  for(const name of ['whiteboard-browser-failure.png','whiteboard-shared-one-failure.png','whiteboard-shared-two-failure.png'])fs.rmSync(path.join(qa,name),{force:true});
  const report={passed:true,checks,errors,failed};fs.writeFileSync(path.join(qa,'whiteboard-browser-checks.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 }catch(error){await page.screenshot({path:path.join(qa,'whiteboard-browser-failure.png')});console.error(JSON.stringify({passed:false,checks,errors,failed,error:error.message},null,2));throw error;}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
