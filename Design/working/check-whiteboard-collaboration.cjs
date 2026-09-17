/* Two independent clients, optimistic merges, offline retries and the SQL contract.
 * Set MMT_PGLITE_MODULE to an installed @electric-sql/pglite directory to execute
 * the PostgreSQL functions too. That harness substitutes only pg_jsonschema;
 * schema validation has separate store tests and needs the real extension at deployment.
 */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const Store = require('../whiteboard/store.js');
const Collaboration = require('../whiteboard/collaboration.js');
const Model = require('../whiteboard/model.js');
const clone = value => JSON.parse(JSON.stringify(value));
const reports = [];
function seed() { const value = Model.seedBoard(); value.viewport ||= { x: 0, y: 0, zoom: 1 }; return value; }
function referenceService() {
  const rooms = new Map();
  return async (name, args) => {
    if (name === 'mmt_board_create') {
      const checked = Store.validate(args.p_board); if (!checked.ok) return { ok: false, message: checked.errors.join(' ') };
      const roomId = crypto.randomUUID(), editKey = crypto.randomBytes(32).toString('hex');
      const room = { board: checked.board, revision: 1, editKey, receipts: new Map(), people: new Map() }; rooms.set(roomId, room);
      return { ok: true, roomId, editKey, revision: 1, board: clone(room.board), participants: [] };
    }
    const room = rooms.get(args.p_room_id);
    if (!room || room.editKey !== args.p_edit_key) return { ok: false, message: 'The room link is invalid.' };
    if (name === 'mmt_board_read') {
      room.people.set(args.p_client_id, { ...args.p_presence, clientId: args.p_client_id });
      return { ok: true, revision: room.revision, ...(args.p_since === room.revision ? {} : { board: clone(room.board) }), participants: [...room.people.values()] };
    }
    if (name === 'mmt_board_patch') {
      const receiptId = args.p_client_id + '/' + args.p_mutation_id;
      const hash = JSON.stringify(args.p_ops);
      if (room.receipts.has(receiptId)) return room.receipts.get(receiptId) === hash ? { ok: true, replayed: true, board: clone(room.board), revision: room.revision } : { ok: false, message: 'A mutation ID was reused.' };
      const applied = Collaboration.applyOperations(room.board, args.p_ops);
      if (!applied.ok) return { ok: false, conflicts: applied.conflicts, board: clone(room.board), revision: room.revision };
      if (JSON.stringify(room.board) !== JSON.stringify(applied.board)) { room.board = applied.board; room.revision++; }
      room.receipts.set(receiptId, hash);
      return { ok: true, board: clone(room.board), revision: room.revision };
    }
    throw Error('Unknown RPC');
  };
}

async function runSuite(label, rpc) {
  const one = Collaboration.createClient({ rpc, clientId: 'client-one', autoPoll: false });
  const two = Collaboration.createClient({ rpc, clientId: 'client-two', autoPoll: false });
  async function check(name, run) {
    try { await run(); reports.push({ name: label + ': ' + name, passed: true }); }
    catch (error) { reports.push({ name: label + ': ' + name, passed: false, error: error.stack }); throw error; }
  }
  const room = await one.create(seed(), { name: 'One' });
  assert.equal(room.ok, true);
  assert.equal((await two.join({ ...room, name: 'Two' })).ok, true);
  await check('different objects merge across simultaneous drafts', async () => {
    const a = one.getBoard(), b = two.getBoard();
    a.nodes[0].x += 100; b.nodes[1].y += 100;
    assert.equal((await one.sync(a)).ok, true);
    assert.equal((await two.sync(b)).ok, true);
    await one.poll();
    assert.equal(one.getBoard().nodes[0].x, a.nodes[0].x);
    assert.equal(one.getBoard().nodes[1].y, b.nodes[1].y);
    assert.equal(two.getBoard().nodes[0].x, a.nodes[0].x);
  });
  await check('different fields on the same object merge', async () => {
    const a = one.getBoard(), b = two.getBoard();
    a.nodes[0].title = 'A precise title'; b.nodes[0].y += 40;
    assert.equal((await one.sync(a)).ok, true);
    assert.equal((await two.sync(b)).ok, true);
    assert.equal(two.getBoard().nodes[0].title, 'A precise title');
    await one.poll();
  });
  await check('same-field edits stop with both versions retained', async () => {
    const a = one.getBoard(), b = two.getBoard();
    a.nodes[0].title = 'First title'; b.nodes[0].title = 'Second title';
    await one.sync(a);
    const result = await two.sync(b);
    assert.equal(result.ok, false); assert.ok(result.conflicts.some(value => value.endsWith('/title')));
    assert.equal(result.board.nodes[0].title, 'Second title');
    assert.equal(result.remoteBoard.nodes[0].title, 'First title');
    const remote = one.getBoard(); remote.nodes[2].x += 25; await one.sync(remote);
    await two.poll();
    assert.equal(two.getStatus().state, 'conflict', 'An unrelated remote change cannot clear an unresolved conflict');
    await two.resolve('remote');
    assert.equal(two.getBoard().nodes[0].title, 'First title');
    assert.equal(two.getBoard().nodes[2].x, remote.nodes[2].x);
  });
  await check('unsaved local changes survive an incoming remote revision', async () => {
    const local = two.getBoard(); local.nodes[0].x += 33; two.setDraft(local);
    const remote = one.getBoard(); remote.nodes[1].title = 'Remote supplier'; await one.sync(remote);
    await two.poll(); // Poll flushes the known local draft before requesting a snapshot.
    assert.equal(two.getBoard().nodes[0].x, local.nodes[0].x);
    assert.equal(two.getBoard().nodes[1].title, 'Remote supplier');
    await one.poll();
  });
  await check('playback actions are atomic instead of doubled', async () => {
    const a = one.getBoard(), b = two.getBoard();
    a.runtime.actions = [{ type: 'advance' }]; b.runtime.actions = [{ type: 'advance' }, { type: 'advance' }];
    await one.sync(a);
    assert.equal((await two.sync(b)).ok, false);
    await two.resolve('local');
    assert.equal(two.getBoard().runtime.actions.length, 2);
    await one.poll();
    assert.equal(one.getBoard().runtime.actions.length, 2);
  });
  await check('camera changes remain local', async () => {
    const camera = one.getBoard(); camera.viewport = { x: 777, y: 555, zoom: 2 }; await one.sync(camera);
    await two.poll();
    assert.notEqual(two.getBoard().viewport.x, 777);
    assert.equal(one.getBoard().viewport.x, 777);
  });
  await check('presence includes participants and their current mode', async () => {
    two.presence({ x: 20, y: 30, view: 'story' }); await two.poll(); await one.poll();
    const participant = one.getParticipants().find(value => value.clientId === 'client-two');
    assert.equal(participant.view, 'story'); assert.equal(participant.x, 20);
  });
  await check('an incorrect edit capability cannot read a room', async () => {
    const stranger = Collaboration.createClient({ rpc, clientId: 'stranger', autoPoll: false });
    assert.equal((await stranger.join({ roomId: room.roomId, editKey: 'f'.repeat(64) })).ok, false);
    stranger.dispose();
  });
  await check('an uncertain write retries the same mutation once', async () => {
    let failAfterWrite = true;
    const uncertain = Collaboration.createClient({ clientId: 'client-uncertain', autoPoll: false, rpc: async (name, args) => {
      const result = await rpc(name, args);
      if (name === 'mmt_board_patch' && failAfterWrite) { failAfterWrite = false; throw Error('Connection dropped after commit'); }
      return result;
    } });
    await uncertain.join(room);
    const change = uncertain.getBoard(); change.nodes[0].params.note = 'One committed edit';
    const oldRevision = uncertain.getStatus().revision;
    assert.equal((await uncertain.sync(change)).offline, true);
    await uncertain.poll();
    assert.equal(uncertain.getStatus().state, 'shared');
    assert.equal(uncertain.getStatus().revision, oldRevision + 1);
    assert.equal(uncertain.getBoard().nodes[0].params.note, 'One committed edit');
    uncertain.dispose();
  });
  await check('room keys never appear in the exported board', async () => {
    const exported = Store.exportJSON(one.getBoard());
    assert.equal(exported.includes(room.editKey), false);
    assert.equal(exported.includes(room.roomId), false);
  });
  await check('one conflicting operation rolls back the complete patch', async () => {
    await one.poll(); const current = one.getBoard();
    const changes = [
      { kind: 'field', collection: 'nodes', id: current.nodes[0].id, field: 'title', before: current.nodes[0].title, after: 'This must not commit' },
      { kind: 'field', collection: 'nodes', id: current.nodes[1].id, field: 'title', before: 'Stale title', after: 'Another change' }
    ];
    const result = await rpc('mmt_board_patch', { p_room_id: room.roomId, p_edit_key: room.editKey, p_client_id: 'atomic-test', p_base_revision: one.getStatus().revision, p_mutation_id: crypto.randomUUID(), p_ops: changes });
    assert.equal(result.ok, false);
    assert.equal(result.board.nodes[0].title, current.nodes[0].title);
    await two.poll(); assert.equal(two.getBoard().nodes[0].title, current.nodes[0].title);
  });
  one.dispose(); two.dispose();
}

async function runSQL() {
  const { PGlite } = require(process.env.MMT_PGLITE_MODULE);
  const db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create schema extensions;
    create function extensions.jsonb_matches_schema(schema json, instance jsonb) returns boolean language sql immutable as $$
      select jsonb_typeof(instance)='object' and instance ?& array['schemaVersion','id','title','nodes','edges','ink','scenario','runtime','viewport']
        and instance->>'schemaVersion'='1' and jsonb_typeof(instance->'nodes')='array'
        and jsonb_typeof(instance->'edges')='array' and jsonb_typeof(instance->'ink')='array'; $$;`);
  const migration = fs.readFileSync(path.join(__dirname, '../whiteboard/supabase.sql'), 'utf8').replace('create extension if not exists pg_jsonschema with schema extensions;', '-- pg_jsonschema is unavailable in the local PostgreSQL WASM harness.');
  try {
    await db.exec(migration);
    const rpc = async (name, args) => {
      assert.ok(['mmt_board_create', 'mmt_board_read', 'mmt_board_patch'].includes(name));
      const keys = Object.keys(args);
      const values = keys.map(key => args[key] && typeof args[key] === 'object' ? JSON.stringify(args[key]) : args[key]);
      const sql = `select public.${name}(${keys.map((key, i) => `${key} => $${i + 1}`).join(',')}) as result`;
      const result = (await db.query(sql, values)).rows[0].result;
      if (result.board) assert.equal(Store.validate(result.board).ok, true, 'SQL output must match the portable board format');
      return result;
    };
    await runSuite('PostgreSQL RPC', rpc);
    await db.exec('set role anon');
    assert.equal((await rpc('mmt_board_create', { p_board: seed() })).ok, true);
    await assert.rejects(() => db.query('select * from mmt_private.rooms'), /permission denied/);
    await db.exec('reset role');
    reports.push({ name: 'PostgreSQL RPC: anonymous direct table access denied', passed: true });
  } finally { await db.close(); }
}

(async () => {
  try {
    const migration = fs.readFileSync(path.join(__dirname, '../whiteboard/supabase.sql'), 'utf8');
    const embedded = migration.match(/\$board_schema\$([\s\S]*?)\$board_schema\$/);
    assert.deepEqual(JSON.parse(embedded[1]), JSON.parse(fs.readFileSync(path.join(__dirname, '../whiteboard/board.schema.json'), 'utf8')));
    reports.push({ name: 'Migration embeds the current portable schema', passed: true });
    await runSuite('Reference transport', referenceService()); if (process.env.MMT_PGLITE_MODULE) await runSQL();
  }
  catch (error) { if (!reports.some(report => report.error === error.stack)) reports.push({ name: 'Harness', passed: false, error: error.stack }); }
  const passed = reports.every(report => report.passed);
  console.log(JSON.stringify({ passed, checks: reports.length, sqlExecuted: Boolean(process.env.MMT_PGLITE_MODULE), sqlSchemaExtension: 'Deployment required; local SQL harness substitutes a structural check.', results: reports }, null, 2));
  if (!passed) process.exitCode = 1;
})();
