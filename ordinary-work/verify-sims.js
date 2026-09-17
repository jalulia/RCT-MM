#!/usr/bin/env node
'use strict';
const E = require('./model.js');
const assert = (c, m) => {
  if (!c) {
    console.error('FAIL:', m);
    process.exitCode = 1;
  } else console.log('PASS:', m);
};

function run(actions) {
  let s = E.initial();
  for (const a of actions) s = E.reduce(s, a);
  while (!s.finished) s = E.reduce(s, { type: 'advance' });
  return { s, o: E.outcome(s) };
}

const make = run([
  { type: 'plan', value: 'make' },
  { type: 'bay', value: 'dock' },
  { type: 'crew', value: 2 }
]);
assert(make.o.deliveryTurn === 4, '1 Make delivers turn 4 (Tue PM)');
assert(make.o.metPromise === true, '1 Make keeps promise');
assert(make.o.otherOnTime === false, '1 Make other job missed');
assert(make.o.posted === 3000000, '1 Make posted $30,000');
assert(make.s.ledger.some(e => e.id === 'MAT-01'), '1 Make materials posted');
assert(!make.s.ledger.some(e => e.id === 'P-04-debit'), '1 Make no supplier debit');

const buy = run([
  { type: 'plan', value: 'buy' },
  { type: 'bay', value: 'dock' },
  { type: 'crew', value: 1 }
]);
assert(buy.o.deliveryTurn === 4, '2 Buy dock delivers turn 4');
assert(buy.o.otherOnTime === true, '2 Buy other on time');
assert(buy.o.posted === 2200000, '2 Buy posted $22,000');
assert(
  buy.s.ledger.some(e => e.id === 'P-04-debit' && e.amount === -1200000),
  '2 Buy supplier settlement -$12k'
);
assert(buy.s.supplierSettled === true, '2 Buy supplier settled');

const studio = run([
  { type: 'plan', value: 'buy' },
  { type: 'bay', value: 'studio' },
  { type: 'crew', value: 1 }
]);
assert(studio.o.deliveryTurn === 5, '3 Buy studio delivers turn 5 (Wed AM)');
assert(studio.o.deliveryTurn === buy.o.deliveryTurn + 1, '3 Studio is +1 handoff vs dock');
assert(studio.o.otherOnTime === true, '3 Studio other still on time');

let s = buy.s;
s = E.reduce(s, { type: 'reset', plan: 'make', bay: 'dock', crew: 2 });
assert(s.turn === 0 && !s.started && s.delivered === null, '4 Reset turn/started/delivered clean');
assert(
  s.cash === E.CONFIG.startingCash && s.ledger.length === 0 && s.events.length === 0,
  '4 Reset cash/ledger/events clean'
);
assert(s.plan === 'make' && s.work === 4 && s.other === 3, '4 Reset plan/work/other preselected');
assert(!s.supplierPaid && !s.materialsPaid && !s.supplierSettled, '4 Reset settlement flags clean');
s = E.reduce(s, { type: 'advance' });
assert(
  s.ledger.some(e => e.id === 'MAT-01') && !s.ledger.some(e => e.id === 'P-04-debit'),
  '4 Fresh make posts materials only'
);

if (!process.exitCode) console.log('\nAll ordinary sims PASS.');
