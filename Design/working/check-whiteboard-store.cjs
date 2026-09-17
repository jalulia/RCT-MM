/* Persistence checks: data loss, invalid imports and cross-tab conflicts. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Store = require('../whiteboard/store.js');
const tests = [];
function test(name, run) { tests.push({ name, run }); }
function memory() {
  const data = new Map();
  return { getItem: key => data.has(key) ? data.get(key) : null, setItem: (key, value) => data.set(key, String(value)), removeItem: key => data.delete(key), key: index => [...data.keys()][index] || null, get length() { return data.size; } };
}
function board() {
  return {
    schemaVersion: 1, id: 'board-1', title: 'Supplier route',
    nodes: [
      { id: 'project-1', type: 'project', title: 'C-07', x: 80, y: 120, params: {}, ref: 'episode:C-07' },
      { id: 'supplier-1', type: 'supplier', title: 'Supplier', x: 320, y: 120, params: { note: 'A workshop assumption.' }, ref: 'episode:S-08' }
    ],
    edges: [{ id: 'edge-1', from: 'project-1', to: 'supplier-1', kind: 'flow', label: 'Fabricate' }],
    ink: [{ id: 'stroke-1', color: '#e89cbf', width: 2, points: [{ x: 10, y: 10 }, { x: 20, y: 20 }] }],
    scenario: { plan: 'supplier', placement: 'near', mode: 'full', crew: 1, assumptions: { startingCash: 40000, supplierCost: 12000, materialsCost: 4000, payroll: 6000 } },
    runtime: { actions: [{ type: 'advance' }, { type: 'request', value: 'recipient' }] },
    viewport: { x: 0, y: 0, zoom: 1 }
  };
}

test('JSON round trip preserves IDs, references, settings, actions and drawing', () => {
  const source = board();
  const result = Store.importJSON(Store.exportJSON(source));
  assert.equal(result.ok, true);
  assert.deepEqual(result.board, source);
  result.board.nodes[0].title = 'Renamed';
  assert.equal(source.nodes[0].title, 'C-07');
});

test('load and save return detached objects and increasing revisions', async () => {
  const store = Store.createStore({ storage: memory(), writerId: 'one' });
  assert.equal(store.load(), null);
  assert.equal(store.getStatus().state, 'empty');
  const source = board();
  assert.equal((await store.saveLocked(source)).revision, 1);
  source.title = 'Unsaved';
  assert.equal(store.load().title, 'Supplier route');
  const loaded = store.load(); loaded.title = 'Saved edit';
  assert.equal(store.save(loaded).revision, 2);
  assert.equal(store.load().title, 'Saved edit');
});

test('another tab cannot silently overwrite a newer board', () => {
  const storage = memory();
  const one = Store.createStore({ storage, writerId: 'one' });
  const two = Store.createStore({ storage, writerId: 'two' });
  one.load(); one.save(board());
  const stale = two.load();
  const current = one.load(); current.title = 'First tab edit'; one.save(current);
  stale.title = 'Stale second tab';
  const result = two.save(stale);
  assert.equal(result.ok, false); assert.equal(result.conflict, true);
  assert.equal(two.getStatus().state, 'conflict');
  assert.equal(one.load().title, 'First tab edit');
  assert.equal(Store.importJSON(Store.exportJSON(stale)).board.title, 'Stale second tab');
  const reloaded = two.load(); reloaded.title = 'Resolved edit';
  assert.equal(two.save(reloaded).ok, true);
});

test('a new store must read an existing board before writing', () => {
  const storage = memory();
  Store.createStore({ storage }).save(board());
  const stranger = Store.createStore({ storage });
  assert.equal(stranger.save(board()).conflict, true);
});

test('corrupt saved JSON is preserved through load and attempted save', () => {
  const storage = memory(); storage.setItem('broken', '{partly-written');
  const store = Store.createStore({ storage, key: 'broken' });
  assert.equal(store.load(), null); assert.equal(store.getStatus().state, 'corrupt');
  assert.equal(store.save(board()).ok, false);
  assert.equal(storage.getItem('broken'), '{partly-written');
  assert.equal(store.recoverSavedJSON(), '{partly-written');
});

test('quota failure reports failure and retains the previous board', () => {
  const storage = memory(); const store = Store.createStore({ storage });
  store.save(board());
  storage.setItem = () => { const error = new Error('Full'); error.name = 'QuotaExceededError'; throw error; };
  const changed = board(); changed.title = 'Not saved';
  assert.equal(store.save(changed).ok, false);
  assert.equal(store.getStatus().state, 'full');
  assert.equal(store.load().title, 'Supplier route');
});

test('unavailable storage does not claim that edits were saved', async () => {
  const store = Store.createStore({ storage: null });
  assert.equal(store.load(), null);
  assert.equal((await store.saveLocked(board())).ok, false);
  assert.equal(store.getStatus().state, 'unavailable');
  assert.equal(Store.importJSON(store.exportJSON(board())).ok, true);
});

test('unsafe and unsupported JSON cannot enter a board', async () => {
  const unsafe = JSON.stringify(board()).replace('"params":{}', '"params":{"__proto__":{"polluted":true}}');
  assert.equal(Store.importJSON(unsafe).ok, false);
  assert.equal({}.polluted, undefined);
  const future = board(); future.schemaVersion = 99;
  assert.equal(Store.validate(future).ok, false);
  const cyclic = board(); cyclic.nodes[0].params.self = cyclic;
  assert.equal(Store.validate(cyclic).ok, false);
  assert.equal((await Store.saveLocked(cyclic)).ok, false);
  const nan = board(); nan.nodes[0].x = NaN;
  assert.equal(Store.validate(nan).ok, false);
  const code = board(); code.nodes[0].params.run = () => true;
  assert.equal(Store.validate(code).ok, false);
  assert.equal(Store.importJSON('x'.repeat(Store.MAX_BYTES + 1)).ok, false);
});

test('invalid topology, duplicate IDs and impossible settings are rejected', () => {
  const detached = board(); detached.edges[0].to = 'absent';
  assert.equal(Store.validate(detached).ok, false);
  const duplicate = board(); duplicate.nodes[1].id = duplicate.nodes[0].id;
  assert.equal(Store.validate(duplicate).ok, false);
  const negative = board(); negative.scenario.assumptions.payroll = -1;
  assert.equal(Store.validate(negative).ok, false);
  const crew = board(); crew.scenario.crew = 3;
  assert.equal(Store.validate(crew).ok, false);
  const action = board(); action.runtime.actions.push({ type: 'request', value: 'invent-fact' });
  assert.equal(Store.validate(action).ok, false);
  const amount = board(); amount.runtime.actions.push({ type: 'advance', value: {} });
  assert.equal(Store.validate(amount).ok, false);
  const batch = board(); batch.runtime.actions.push({ type: 'poolAnswer', value: 200000 });
  assert.equal(Store.validate(batch).ok, true);
  batch.runtime.actions[2].value = 200000.5;
  assert.equal(Store.validate(batch).ok, false);
  const precision = board(); precision.scenario.assumptions.payroll = 6000.001;
  assert.equal(Store.validate(precision).ok, false);
  const excessive = board(); excessive.scenario.assumptions.payroll = 10000000.01;
  assert.equal(Store.validate(excessive).ok, false);
  const longRun = board(); longRun.runtime.actions = Array.from({ length: 501 }, () => ({ type: 'advance' }));
  assert.equal(Store.validate(longRun).ok, false);
});

test('ink and object limits bound an imported board', () => {
  const tooMany = board(); tooMany.nodes = Array.from({ length: 301 }, (_, i) => ({ id: 'n-' + i, type: 'note', title: 'Note', x: i, y: 0, params: {} })); tooMany.edges = [];
  assert.equal(Store.validate(tooMany).ok, false);
  const ink = board(); ink.ink = Array.from({ length: 11 }, (_, i) => ({ id: 'ink-' + i, color: '#111111', width: 1, points: Array.from({ length: 4600 }, () => ({ x: 0, y: 0 })) }));
  assert.equal(Store.validate(ink).ok, false);
  const colour = board(); colour.ink[0].color = 'url(javascript:alert(1))';
  assert.equal(Store.validate(colour).ok, false);
});

test('checkpoints remain separate from the live board and can be removed', () => {
  const store = Store.createStore({ storage: memory() });
  store.save(board());
  const alternative = board(); alternative.scenario.plan = 'internal';
  const saved = store.saveSnapshot(alternative, 'In-house plan');
  assert.equal(saved.ok, true);
  assert.equal(store.listSnapshots()[0].title, 'In-house plan');
  assert.equal(store.loadSnapshot(saved.id).board.scenario.plan, 'internal');
  assert.equal(store.load().scenario.plan, 'supplier');
  assert.equal(store.deleteSnapshot(saved.id).ok, true);
  assert.equal(store.listSnapshots().length, 0);
  assert.equal(store.loadSnapshot('../invalid').ok, false);
});

test('schema migrations are explicit and unknown versions stay blocked', () => {
  const old = board(); old.schemaVersion = 0;
  assert.equal(Store.importJSON(JSON.stringify(old)).ok, false);
  Store.registerMigration(0, value => Object.assign(value, { schemaVersion: 1 }));
  assert.equal(Store.importJSON(JSON.stringify(old)).ok, true);
});

test('cross-tab storage events notify without replacing working data', () => {
  const storage = memory(); const listeners = [];
  const sandbox = { module: { exports: {} }, localStorage: storage, TextEncoder, console, addEventListener: (name, fn) => { if (name === 'storage') listeners.push(fn); }, removeEventListener: () => {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../whiteboard/store.js'), 'utf8'), sandbox);
  const store = sandbox.module.exports;
  store.load();
  let notice;
  store.subscribe(value => { notice = value; });
  Store.createStore({ storage }).save(board());
  listeners.forEach(fn => fn({ key: store.key, storageArea: storage }));
  assert.equal(notice.type, 'external-change');
  assert.equal(store.getStatus().state, 'conflict');
});

(async () => {
  const results = [];
  for (const item of tests) {
    try { await item.run(); results.push({ name: item.name, passed: true }); }
    catch (error) { results.push({ name: item.name, passed: false, error: error.stack }); }
  }
  console.log(JSON.stringify({ passed: results.every(result => result.passed), checks: results.length, results }, null, 2));
  if (results.some(result => !result.passed)) process.exitCode = 1;
})();
