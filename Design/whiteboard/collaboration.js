/* Shared rooms use Supabase RPCs. The edit key is a room capability, not an API secret. */
(function (root, factory) {
  const api = factory(root, typeof module === 'object' && module.exports ? require('./store.js') : root.MMTBoardStore);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MMTBoardCollaboration = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root, Store) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const equal = (a, b) => stable(a) === stable(b);
  function stable(value) { return JSON.stringify(value, (_, item) => item && !Array.isArray(item) && typeof item === 'object' ? Object.keys(item).sort().reduce((out, key) => { out[key] = item[key]; return out; }, {}) : item); }
  const uuid = () => root.crypto && root.crypto.randomUUID ? root.crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  const collections = ['nodes', 'edges', 'ink'];
  const entityFields = { nodes: ['type', 'title', 'x', 'y', 'params', 'ref'], edges: ['from', 'to', 'kind', 'label'], ink: ['color', 'width', 'points'] };
  const valuePaths = [['title'], ['scenario', 'plan'], ['scenario', 'placement'], ['scenario', 'mode'], ['scenario', 'crew'], ['scenario', 'assumptions'], ['runtime', 'actions']];
  const get = (object, path) => path.reduce((value, key) => value && value[key] !== undefined ? value[key] : null, object);

  function diff(before, after) {
    const operations = [];
    for (const collection of collections) {
      const previous = new Map(before[collection].map(item => [item.id, item]));
      const next = new Map(after[collection].map(item => [item.id, item]));
      for (const id of new Set([...previous.keys(), ...next.keys()])) {
        const a = previous.get(id), b = next.get(id);
        if (!a || !b) { operations.push({ kind: 'entity', collection, id, before: a || null, after: b || null }); continue; }
        for (const field of entityFields[collection]) if (!equal(a[field] ?? null, b[field] ?? null)) operations.push({ kind: 'field', collection, id, field, before: a[field] ?? null, after: b[field] ?? null });
      }
    }
    for (const path of valuePaths) if (!equal(get(before, path), get(after, path))) operations.push({ kind: 'value', path, before: get(before, path), after: get(after, path) });
    return clone(operations);
  }

  function applyOperations(board, operations, options = {}) {
    if (!Array.isArray(operations) || operations.length > 1200) return { ok: false, conflicts: ['Too many operations.'], board: clone(board) };
    const output = clone(board), conflicts = [];
    for (const op of operations) {
      let current, label;
      if (op.kind === 'entity' || op.kind === 'field') {
        if (!collections.includes(op.collection) || typeof op.id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,95}$/.test(op.id)) return { ok: false, conflicts: ['Invalid collection operation.'], board: clone(board) };
        const index = output[op.collection].findIndex(item => item.id === op.id);
        const item = index < 0 ? null : output[op.collection][index];
        if (op.kind === 'field' && !entityFields[op.collection].includes(op.field)) return { ok: false, conflicts: ['Invalid field.'], board: clone(board) };
        current = op.kind === 'entity' ? item : item ? item[op.field] ?? null : null;
        label = op.collection + '/' + op.id + (op.kind === 'field' ? '/' + op.field : '');
        if (equal(current, op.after)) continue; // An identical edit is already represented.
        if (!equal(current, op.before) || op.kind === 'field' && !item) {
          conflicts.push(label);
          if (!options.force) continue;
        }
        if (op.kind === 'entity') {
          if (op.after !== null && (!op.after || op.after.id !== op.id)) return { ok: false, conflicts: ['Entity ID changed.'], board: clone(board) };
          if (op.after === null) { if (index >= 0) output[op.collection].splice(index, 1); }
          else if (index >= 0) output[op.collection][index] = clone(op.after);
          else output[op.collection].push(clone(op.after));
        } else if (item) {
          if (op.after === null) delete item[op.field]; else item[op.field] = clone(op.after);
        }
      } else if (op.kind === 'value' && valuePaths.some(path => equal(path, op.path))) {
        current = get(output, op.path); label = op.path.join('/');
        if (equal(current, op.after)) continue;
        if (!equal(current, op.before)) { conflicts.push(label); if (!options.force) continue; }
        const owner = op.path.length === 1 ? output : output[op.path[0]];
        const key = op.path[op.path.length - 1];
        if (op.after === null) delete owner[key]; else owner[key] = clone(op.after);
      } else return { ok: false, conflicts: ['Invalid operation.'], board: clone(board) };
    }
    if (conflicts.length && !options.force) return { ok: false, conflicts, board: clone(board) };
    const checked = Store.validate(output);
    return checked.ok ? { ok: true, board: checked.board, conflicts } : { ok: false, board: clone(board), conflicts: checked.errors };
  }

  function createClient(options = {}) {
    const url = (options.url || '').replace(/\/$/, '');
    const publishableKey = options.publishableKey || '';
    const clientId = options.clientId || uuid();
    const listeners = new Set();
    let room = null, base = null, draft = null, revision = 0, participants = [], busy = null, flight = null, conflict = null, timer = null, disposed = false;
    let presenceState = { name: String(options.name || 'Guest').slice(0, 48), view: 'systems', x: null, y: null };
    let status = { state: 'local', message: 'Local board.' };
    const emit = event => listeners.forEach(fn => { try { fn(event); } catch (_) { /* A subscriber must not interrupt persistence. */ } });
    const setStatus = (state, message) => { status = { state, message, revision, roomId: room ? room.roomId : null }; emit({ type: 'status', status: Object.assign({}, status) }); };
    async function rpc(name, payload) {
      if (options.rpc) return options.rpc(name, clone(payload));
      if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(url)) throw new Error('Set a valid Supabase project URL.');
      if (!publishableKey) throw new Error('Set the public Supabase publishable key.');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const headers = { 'Content-Type': 'application/json', apikey: publishableKey };
        if (publishableKey.startsWith('eyJ')) headers.Authorization = 'Bearer ' + publishableKey;
        const response = await (options.fetch || root.fetch)(url + '/rest/v1/rpc/' + name, {
          method: 'POST', headers,
          body: JSON.stringify(payload), signal: controller.signal
        });
        let body;
        try { body = await response.json(); } catch (_) { throw new Error('The collaboration service returned an unreadable response.'); }
        if (!response.ok) throw new Error(body.message || 'The collaboration service rejected this request.');
        return body;
      } finally { clearTimeout(timeout); }
    }
    function credentials() { return { p_room_id: room.roomId, p_edit_key: room.editKey, p_client_id: clientId }; }
    function localCopy(board) { const result = clone(board); if (draft && draft.viewport) result.viewport = clone(draft.viewport); return result; }
    function acceptRemote(result) {
      const unresolved = conflict && conflict.slice();
      revision = result.revision;
      if (result.participants) participants = result.participants;
      if (!result.board) { emit({ type: 'presence', participants }); return; }
      const checked = Store.validate(result.board);
      if (!checked.ok) throw new Error('The shared board has an unsupported format: ' + checked.errors.join(' '));
      const localChanges = base && draft ? diff(base, draft) : [];
      const merged = applyOperations(checked.board, localChanges);
      base = clone(checked.board);
      if (!merged.ok) {
        const kept = applyOperations(checked.board, localChanges, { force: true });
        draft = localCopy(kept.ok ? kept.board : draft);
        conflict = merged.conflicts;
        setStatus('conflict', 'The same field changed in another session. Review the two versions.');
        emit({ type: 'conflict', board: clone(draft), remoteBoard: clone(base), conflicts: conflict.slice(), revision, participants });
      } else {
        draft = localCopy(merged.board); conflict = unresolved;
        if (conflict) {
          setStatus('conflict', 'The same field changed in another session. Review the two versions.');
          emit({ type: 'conflict', board: clone(draft), remoteBoard: clone(base), conflicts: conflict.slice(), revision, participants });
          return;
        }
        setStatus('shared', localChanges.length ? 'Local changes waiting to sync.' : 'Shared board saved.');
        emit({ type: 'board', board: clone(draft), revision, participants });
      }
    }
    function schedule() {
      if (timer) clearTimeout(timer);
      if (!disposed && room && options.autoPoll !== false) timer = setTimeout(poll, Math.max(600, options.pollMs || 1000));
    }
    async function poll() {
      if (!room || disposed || busy) { schedule(); return; }
      try {
        if (flight || !conflict && base && draft && diff(base, draft).length) await flush();
        else {
          const result = await rpc('mmt_board_read', Object.assign(credentials(), { p_since: revision, p_presence: presenceState }));
          if (!result.ok) throw new Error(result.message || 'Shared board could not be loaded.');
          acceptRemote(result);
        }
      } catch (error) { setStatus('offline', error.message + ' Your local draft is retained.'); emit({ type: 'error', error: error.message }); }
      finally { schedule(); }
    }
    function setDraft(board) {
      const checked = Store.validate(board);
      if (!checked.ok) return checked;
      draft = checked.board;
      return { ok: true };
    }
    async function flush() {
      if (busy) return busy;
      if (!room || !base || !draft) return { ok: false, message: 'Join a shared room first.' };
      if (conflict) return { ok: false, conflicts: conflict.slice(), board: clone(draft), remoteBoard: clone(base), revision };
      if (!flight) {
        const ops = diff(base, draft);
        if (!ops.length) return { ok: true, board: clone(draft), revision };
        flight = { operations: ops, target: clone(draft), baseRevision: revision, mutationId: uuid() };
      }
      const packet = flight;
      setStatus('saving', 'Saving shared changes…');
      busy = (async () => {
        try {
          const result = await rpc('mmt_board_patch', Object.assign(credentials(), { p_base_revision: packet.baseRevision, p_ops: packet.operations, p_mutation_id: packet.mutationId }));
          if (result.ok) {
            base = clone(packet.target); flight = null; acceptRemote(result);
            return { ok: true, board: clone(draft), revision };
          }
          flight = null;
          if (result.board) acceptRemote(result);
          if (!conflict) { conflict = result.conflicts || [result.message || 'Shared changes were rejected.']; setStatus('conflict', 'Shared changes need review.'); emit({ type: 'conflict', board: clone(draft), remoteBoard: clone(base), conflicts: conflict.slice(), revision, participants }); }
          return { ok: false, conflicts: conflict.slice(), board: clone(draft), remoteBoard: clone(base), revision };
        } catch (error) {
          setStatus('offline', error.message + ' Your local draft is retained.');
          emit({ type: 'error', error: error.message });
          return { ok: false, message: error.message, offline: true };
        } finally { busy = null; }
      })();
      return busy;
    }
    async function sync(board) { const checked = setDraft(board); if (!checked.ok) return checked; return flush(); }
    async function create(board, settings = {}) {
      const checked = Store.validate(board); if (!checked.ok) return checked;
      if (settings.name) presenceState.name = String(settings.name).slice(0, 48);
      const result = await rpc('mmt_board_create', { p_board: checked.board });
      if (!result.ok) return result;
      room = { roomId: result.roomId, editKey: result.editKey }; base = null; draft = null; flight = null; conflict = null;
      acceptRemote(result); schedule();
      return Object.assign({}, result, { board: clone(draft) });
    }
    async function join(settings) {
      if (!settings || !/^[0-9a-f-]{36}$/i.test(settings.roomId || '') || !/^[0-9a-f]{64}$/i.test(settings.editKey || '')) return { ok: false, message: 'The room link is incomplete.' };
      const candidate = { roomId: settings.roomId, editKey: settings.editKey };
      if (settings.name) presenceState.name = String(settings.name).slice(0, 48);
      const result = await rpc('mmt_board_read', { p_room_id: candidate.roomId, p_edit_key: candidate.editKey, p_client_id: clientId, p_since: -1, p_presence: presenceState });
      if (!result.ok) return result;
      room = candidate; base = null; draft = null; flight = null; conflict = null; acceptRemote(result); schedule();
      return Object.assign({}, result, candidate, { board: clone(draft) });
    }
    async function resolve(choice) {
      if (!conflict) return { ok: true, board: draft && clone(draft), revision };
      if (choice === 'remote') { draft = localCopy(base); conflict = null; setStatus('shared', 'Loaded the shared version.'); emit({ type: 'board', board: clone(draft), revision, participants }); return { ok: true, board: clone(draft), revision }; }
      if (choice === 'local') { conflict = null; return flush(); }
      return { ok: false, message: 'Choose the shared version or your draft.' };
    }
    function leave() { if (timer) clearTimeout(timer); timer = null; room = null; base = null; flight = null; conflict = null; participants = []; setStatus('local', 'Local board.'); }
    function presence(value) {
      if (value.name !== undefined) presenceState.name = String(value.name).slice(0, 48);
      if (['systems', 'story', 'structure'].includes(value.view)) presenceState.view = value.view;
      for (const coordinate of ['x', 'y']) if (value[coordinate] === null || Number.isFinite(value[coordinate]) && Math.abs(value[coordinate]) <= 100000) presenceState[coordinate] = value[coordinate];
    }
    return { create, join, sync, setDraft, resolve, poll, presence, leave, subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn); }, getStatus: () => Object.assign({}, status), getSession: () => room && Object.assign({}, room), getClientId: () => clientId, getBoard: () => draft && clone(draft), getParticipants: () => clone(participants), dispose: () => { disposed = true; leave(); listeners.clear(); } };
  }
  return { createClient, diff, applyOperations };
});
