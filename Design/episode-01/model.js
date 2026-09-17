/* All values in this module are invented simulation inputs. Money is integer cents. */
(function(root){
'use strict';
const CONFIG={revision:1,startingCash:4000000,budget:10000000,fee:2400000,materials:400000,supplier:1200000,payroll:600000,pool:200000,option:150000,capacity:2,due:7,otherDue:3,maxTurn:12};
const DAYS=['Mon AM','Mon PM','Tue AM','Tue PM','Wed AM','Wed PM','Thu AM','Thu PM','Fri AM','Fri PM','Mon AM +1','Mon PM +1','Tue AM +1'];
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n/100);
const clone=s=>JSON.parse(JSON.stringify(s));
function initial(mode='episode'){if(!['episode','ordinary'].includes(mode))throw Error('Unknown scenario.');return {schema:1,mode,turn:0,plan:null,bay:'dock',crew:1,cash:CONFIG.startingCash,work:0,prep:2,handoff:0,other:3,otherDone:null,delivered:null,promise:CONFIG.due,started:false,materialsPaid:false,optionPaid:false,substitute:false,supplierSettled:false,returned:false,reissue:false,receiptAt:null,requests:{},approved:false,delayApproved:false,poolAnswer:null,view:'Work',selection:'C-07',documents:[],ledger:[],events:[],actions:[],finished:false};}
const dueCash=s=>(s.turn<8?CONFIG.payroll:0)+(s.turn<6?CONFIG.pool:0)+((s.plan==='internal'||s.substitute)&&!s.materialsPaid?CONFIG.materials:0)+(s.plan==='supplier'&&!s.supplierSettled&&!s.reissue&&(!s.started||s.turn<2||s.returned)?CONFIG.supplier:0);
const available=s=>s.cash-dueCash(s);
const log=(s,text,kind='work')=>s.events.push({turn:s.turn,text,kind});
function post(s,id,amount,label){if(s.ledger.some(e=>e.id===id))throw Error('Duplicate bank event '+id);if(s.cash+amount<0)throw Error('Insufficient posted cash');s.cash+=amount;s.ledger.push({id,turn:s.turn,amount,label});log(s,label+' · '+money(amount),'cash');}
function ready(s){return s.work===0&&s.prep===0&&(s.plan==='internal'||s.substitute||s.supplierSettled);}
function stage(s){if(!s.started)return 'Plan production';if(s.delivered!==null)return 'Delivered';if(s.work>0)return s.substitute?'Build substitute':'Fabrication';if(s.prep>0)return 'Check & pack';if(s.plan==='supplier'&&!s.substitute&&!s.supplierSettled)return s.returned?'Supplier release held':'Await supplier receipt';return 'Physical handoff';}
function request(s,type){if(s.requests[type])return;const waits={processor:1,recipient:2,invoice:1,approval:1,delay:1};s.requests[type]={due:s.turn+waits[type],status:'pending'};log(s,({processor:'Processor trace',recipient:'Recipient confirmation',invoice:'Invoice export',approval:'Finance approval',delay:'Client extension'})[type]+' requested.','record');}
function advance(s){
 if(!s.plan)throw Error('Choose a production plan first.');if(s.finished)throw Error('This run is complete.');s.started=true;s.turn++;
 if(s.plan==='internal'&&!s.materialsPaid){post(s,'MAT-01',-CONFIG.materials,'Workshop materials');s.materialsPaid=true;}
 if(s.substitute&&!s.materialsPaid){post(s,'MAT-02',-CONFIG.materials,'Substitute materials');s.materialsPaid=true;}
 if(s.plan==='supplier'){
  if(s.turn===1){s.documents.push('v1');log(s,'P-04 scheduled against O-19.','record');}
  if(s.turn===2){post(s,'P-04-debit',-CONFIG.supplier,'P-04 funding debit');s.documents.push('v2');log(s,'Saved v2: Paid, W3 Tue 10:02. This is a snapshot.','record');}
  if(s.turn===3&&s.mode==='ordinary'){s.supplierSettled=true;s.receiptAt=3;s.documents.push('ordinary-receipt');log(s,'S-08 confirms receipt and releases the component.','record');}
  if(s.turn===4&&s.mode==='episode'){post(s,'P-04-return',CONFIG.supplier,'P-04 funding return');s.returned=true;s.documents.push('return');log(s,'Component held. O-19 still needs resolution.','notice');}
 }
 if(s.turn===6){post(s,'B-09',-CONFIG.pool,'Routine batch B-09');s.documents.push('pool');log(s,'B-09 allocates $1,200 to O-20 and $800 to O-21. Both receipts supplied.','record');}
 if(s.turn===8)post(s,'PAY-01',-CONFIG.payroll,'Scheduled staff payroll');
 for(const[type,r]of Object.entries(s.requests))if(r.status==='pending'&&s.turn>=r.due){r.status='received';s.documents.push(type);if(type==='approval'){s.approved=true;log(s,'Finance grants one reissue instruction for O-19.','control');}else if(type==='delay'){s.delayApproved=true;s.promise=9;log(s,'Client approves Friday PM handoff. Original Thursday promise remains in the log.','work');}else log(s,({processor:'Processor trace links the return to P-04. No later attempt is supplied.',recipient:'S-08 confirms this attempt was not received. The fabrication obligation remains open.',invoice:'The invoice export repeats O-19. It does not establish settlement.'})[type],'record');}
 if(s.reissue&&s.turn===s.reissue+1){s.supplierSettled=true;s.receiptAt=s.turn;s.documents.push('reissue-receipt');log(s,'S-08 confirms receipt of P-05; the component is released.','record');}
 const readyAtStart=ready(s)&&s.receiptAt!==s.turn;
 const otherWork=Math.min(s.other,CONFIG.capacity-s.crew);s.other-=otherWork;
 if(s.other===0&&s.otherDone===null){s.otherDone=s.turn;log(s,'Competing display job complete.');}
 let units=s.crew;
 if(s.work){const used=Math.min(units,s.work);s.work-=used;units-=used;}
 if(units&&s.prep){const used=Math.min(units,s.prep);s.prep-=used;}
 if(readyAtStart&&s.delivered===null){s.handoff++;if(s.handoff>=(s.bay==='dock'?1:2)){s.delivered=s.turn;log(s,'C-07 delivered. A $24,000 client invoice is raised; no receipt is modeled.','work');}}
 if(s.turn===CONFIG.otherDue&&s.other>0)log(s,'The competing display job missed its reserved handoff.','notice');
 if(s.turn===s.promise&&s.delivered===null)log(s,'The current C-07 handoff promise has been missed.','notice');
 if(s.turn>=CONFIG.maxTurn||(s.turn>=9&&s.delivered!==null&&s.other===0))s.finished=true;
}
function reduce(input,a){const s=clone(input);if(a.type==='reset')return initial(a.mode);if(s.finished&&!['view','select','poolAnswer'].includes(a.type))throw Error('Start another run to change this outcome.');
 switch(a.type){
  case 'plan':if(s.started)throw Error('The production plan is committed. Use a response action.');if(!['internal','supplier'].includes(a.value))throw Error('Unknown plan.');s.plan=a.value;s.work=a.value==='internal'?6:0;s.prep=2;break;
  case 'bay':if(s.started)throw Error('Bay placement is committed.');if(!['dock','studio'].includes(a.value))throw Error('Unknown bay.');s.bay=a.value;break;
  case 'crew':if(![1,2].includes(a.value))throw Error('Choose one or two units.');s.crew=a.value;break;
  case 'view':if(!['Work','Cash','Information','Control','People'].includes(a.value))throw Error('Unknown view.');s.view=a.value;break;
  case 'select':s.selection=a.value;break;
  case 'request':
   if(!['processor','recipient','invoice','approval','delay'].includes(a.value))throw Error('Unknown request.');
   if(a.value!=='delay'&&!s.returned)throw Error('The return has not occurred in this run.');
   if(a.value==='approval'&&!['processor','recipient'].some(k=>s.requests[k]?.status==='received'))throw Error('Finance needs a received trace or recipient response.');
   request(s,a.value);break;
  case 'reissue':if(!s.approved||s.reissue||s.supplierSettled)throw Error('A current, unused approval is required.');if(s.cash<CONFIG.supplier)throw Error('Insufficient posted cash.');post(s,'P-05-debit',-CONFIG.supplier,'Approved reissue P-05');s.reissue=s.turn;s.documents.push('reissue');break;
  case 'substitute':if(!s.returned||s.substitute||s.supplierSettled)throw Error('Substitute capacity is unavailable.');if(available(s)<CONFIG.option+CONFIG.materials)throw Error('Not enough cash after existing reservations.');post(s,'ALT-01',-CONFIG.option,'Substitute capacity option');s.optionPaid=true;s.substitute=true;s.work=3;break;
  case 'poolAnswer':if(s.turn<6)throw Error('The routine batch is not available yet.');s.poolAnswer=a.value;break;
  case 'advance':advance(s);break;
  default:throw Error('Unknown action '+a.type);
 }
 s.actions.push({at:s.turn,...a});if(s.cash<0||available(s)<0)throw Error('Cash reservations exceed the available balance.');return s;
}
function outcome(s){return {delivery:s.delivered===null?'Not delivered':DAYS[s.delivered],metPromise:s.delivered!==null&&s.delivered<=s.promise,originalPromiseMet:s.delivered!==null&&s.delivered<=CONFIG.due,otherOnTime:s.otherDone!==null&&s.otherDone<=CONFIG.otherDue,posted:s.cash,committed:dueCash(s),usable:available(s),receivable:s.delivered!==null?CONFIG.fee:0,obligation:s.plan==='internal'?'O-19 was not created':s.supplierSettled?'O-19 resolved by recipient-confirmed payment':'O-19 remains open',batch:s.poolAnswer===200000?'One $2,000 bank debit correctly distinguished from its allocations':'Routine batch explanation not yet correct'};}
const api={CONFIG,DAYS,money,initial,reduce,stage,ready,available,committed:dueCash,outcome};root.MMTEpisode=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
