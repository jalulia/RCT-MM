/* Local board documents. No network requests and no case-record writes. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MMTBoardStore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  const SCHEMA_VERSION = 1;
  const KEY = 'mmt.whiteboard.v1';
  const MAX_BYTES = 2 * 1024 * 1024;
  const TYPES = ['project', 'staff', 'supplier', 'site', 'zone', 'obligation', 'payment', 'record', 'approval', 'artifact', 'archetype', 'trigger', 'effect', 'note', 'beat', 'anchor'];
  const ID = /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,95}$/;
  const validID = value => typeof value === 'string' && ID.test(value);
  const forbidden = new Set(['__proto__', 'prototype', 'constructor']);
  const migrations = new Map();
  const copy = value => JSON.parse(JSON.stringify(value));
  const uid = () => root.crypto && root.crypto.randomUUID ? root.crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  const bytes = text => typeof TextEncoder !== 'undefined' ? new TextEncoder().encode(text).length : unescape(encodeURIComponent(text)).length;
  const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);

  function validate(input) {
    const errors = [];
    let size = 0;
    const fail = text => { if (errors.length < 30) errors.push(text); };
    const finite = (value, min, max) => typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
    const string = (value, max, min = 0) => typeof value === 'string' && value.length >= min && value.length <= max;
    const allowed = (value, keys, path) => {
      if (!plain(value)) { fail(path + ' must be an object.'); return false; }
      Object.keys(value).forEach(key => { if (!keys.includes(key)) fail(path + ': unknown field ' + key + '.'); });
      return true;
    };
    const seen = new Set();
    function safe(value, path, depth) {
      if (depth > 12) { fail(path + ' is nested too deeply.'); return; }
      if (value === null || typeof value === 'boolean') return;
      if (typeof value === 'string') { if (value.length > 16000) fail(path + ' is too long.'); return; }
      if (typeof value === 'number') { if (!Number.isFinite(value)) fail(path + ' must be finite.'); return; }
      if (typeof value !== 'object') { fail(path + ' contains an unsupported value.'); return; }
      if (seen.has(value)) { fail(path + ' contains a circular reference.'); return; }
      seen.add(value);
      if (!Array.isArray(value) && !plain(value)) fail(path + ' must be a plain object.');
      if (!Array.isArray(value) && Object.keys(value).length > 80) fail(path + ' has too many fields.');
      Object.keys(value).forEach(key => {
        if (forbidden.has(key)) fail(path + ' contains an unsafe field.');
        safe(value[key], path + '.' + key, depth + 1);
      });
      seen.delete(value);
    }
    safe(input, 'Board', 0);
    if (errors.length) return { ok: false, errors };
    try { size = bytes(JSON.stringify(input)); } catch (_) { return { ok: false, errors: ['Board cannot be serialized.'] }; }
    if (size > MAX_BYTES) fail('Board exceeds the 2 MB limit.');
    if (!allowed(input, ['schemaVersion', 'id', 'title', 'nodes', 'edges', 'ink', 'scenario', 'runtime', 'viewport'], 'Board')) return { ok: false, errors };
    if (input.schemaVersion !== SCHEMA_VERSION) fail('Unsupported board schema version.');
    if (!validID(input.id || '')) fail('Board ID is invalid.');
    if (!string(input.title, 160, 1)) fail('Board title must contain 1–160 characters.');
    const nodes = Array.isArray(input.nodes) ? input.nodes : [];
    const edges = Array.isArray(input.edges) ? input.edges : [];
    const ink = Array.isArray(input.ink) ? input.ink : [];
    if (!Array.isArray(input.nodes) || nodes.length > 300) fail('Board must contain at most 300 nodes.');
    if (!Array.isArray(input.edges) || edges.length > 800) fail('Board must contain at most 800 connections.');
    if (!Array.isArray(input.ink) || ink.length > 300) fail('Board must contain at most 300 ink strokes.');
    const ids = new Set();
    function unique(id, path) {
      if (!validID(id || '')) fail(path + ': invalid ID.');
      else if (ids.has(id)) fail(path + ': duplicate ID ' + id + '.');
      else ids.add(id);
    }
    nodes.forEach((node, i) => {
      const path = 'Node ' + (i + 1);
      if (!allowed(node, ['id', 'type', 'title', 'x', 'y', 'params', 'ref'], path)) return;
      unique(node.id, path);
      if (!TYPES.includes(node.type)) fail(path + ': unknown node type.');
      if (!string(node.title, 240, 1)) fail(path + ': title must contain 1–240 characters.');
      if (!finite(node.x, -100000, 100000) || !finite(node.y, -100000, 100000)) fail(path + ': position is out of range.');
      if (!plain(node.params)) fail(path + ': params must be an object.');
      if (node.ref !== undefined && !string(node.ref, 500, 1)) fail(path + ': reference is invalid.');
    });
    const nodeIds = new Set(nodes.filter(plain).map(node => node.id));
    edges.forEach((edge, i) => {
      const path = 'Connection ' + (i + 1);
      if (!allowed(edge, ['id', 'from', 'to', 'kind', 'label'], path)) return;
      unique(edge.id, path);
      if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) fail(path + ': both endpoints must exist.');
      if (!['flow', 'requires', 'informs'].includes(edge.kind)) fail(path + ': unknown connection type.');
      if (edge.label !== undefined && !string(edge.label, 240)) fail(path + ': label is too long.');
    });
    let pointCount = 0;
    ink.forEach((stroke, i) => {
      const path = 'Ink stroke ' + (i + 1);
      if (!allowed(stroke, ['id', 'color', 'width', 'points'], path)) return;
      unique(stroke.id, path);
      if (!/^#[0-9a-f]{6}$/i.test(stroke.color || '')) fail(path + ': colour must be a six-digit hex value.');
      if (!finite(stroke.width, 0.5, 24)) fail(path + ': width must be between 0.5 and 24.');
      if (!Array.isArray(stroke.points) || stroke.points.length < 1 || stroke.points.length > 5000) { fail(path + ': point count is out of range.'); return; }
      pointCount += stroke.points.length;
      stroke.points.forEach(point => {
        if (!plain(point) || Object.keys(point).some(key => !['x', 'y'].includes(key)) || !finite(point.x, -100000, 100000) || !finite(point.y, -100000, 100000)) fail(path + ': point is invalid.');
      });
    });
    if (pointCount > 50000) fail('Board exceeds 50,000 ink points.');
    if (allowed(input.scenario, ['plan', 'placement', 'mode', 'crew', 'assumptions'], 'Scenario')) {
      const scenario = input.scenario;
      if (!['supplier', 'internal'].includes(scenario.plan)) fail('Scenario production plan is invalid.');
      if (!['near', 'shared'].includes(scenario.placement)) fail('Scenario placement is invalid.');
      if (!['full', 'ordinary'].includes(scenario.mode)) fail('Scenario mode is invalid.');
      if (![1, 2].includes(scenario.crew)) fail('Scenario crew must be 1 or 2.');
      if (scenario.assumptions !== undefined && allowed(scenario.assumptions, ['startingCash', 'supplierCost', 'materialsCost', 'payroll'], 'Assumptions')) {
        Object.entries(scenario.assumptions).forEach(([key, value]) => { if (!finite(value, 0, 10000000) || Math.abs(value * 100 - Math.round(value * 100)) > 1e-6) fail('Assumption ' + key + ' must be $0–$10,000,000 with at most two decimal places.'); });
      }
    }
    if (allowed(input.runtime, ['actions'], 'Runtime')) {
      if (!Array.isArray(input.runtime.actions) || input.runtime.actions.length > 500) fail('Runtime must contain at most 500 actions.');
      else input.runtime.actions.forEach((action, i) => {
        const path = 'Action ' + (i + 1);
        if (!allowed(action, ['type', 'value', 'nodeId'], path)) return;
        if (!['advance', 'request', 'reissue', 'substitute', 'crew', 'fire', 'poolAnswer'].includes(action.type)) fail(path + ': unknown action type.');
        if (action.value !== undefined && !(string(action.value, 80) || typeof action.value === 'number' && Number.isFinite(action.value))) fail(path + ': value is invalid.');
        if (action.nodeId !== undefined && !validID(action.nodeId || '')) fail(path + ': node ID is invalid.');
        if (action.type === 'request' && !['processor', 'recipient', 'invoice', 'approval', 'delay'].includes(action.value)) fail(path + ': invalid request.');
        if (action.type === 'poolAnswer' && (!Number.isSafeInteger(action.value) || action.value < 0 || action.value > 1000000000)) fail(path + ': batch answer must be a nonnegative integer in cents.');
        if (action.type === 'crew' && ![1, 2].includes(action.value)) fail(path + ': crew must be 1 or 2.');
        if (action.type === 'fire' && !validID(action.nodeId || '')) fail(path + ': trigger ID is invalid.');
      });
    }
    if (allowed(input.viewport, ['x', 'y', 'zoom'], 'Viewport')) {
      if (!finite(input.viewport.x, -1000000, 1000000) || !finite(input.viewport.y, -1000000, 1000000)) fail('Viewport position is out of range.');
      if (!finite(input.viewport.zoom, 0.1, 8)) fail('Viewport zoom must be between 0.1 and 8.');
    }
    return errors.length ? { ok: false, errors } : { ok: true, errors: [], board: copy(input) };
  }

  function migrate(board) {
    let next = board;
    let steps = 0;
    while (plain(next) && Number.isInteger(next.schemaVersion) && next.schemaVersion < SCHEMA_VERSION && steps++ < 10) {
      const fn = migrations.get(next.schemaVersion);
      if (!fn) throw new Error('No migration is available for board schema ' + next.schemaVersion + '.');
      const previous = next.schemaVersion;
      next = fn(copy(next));
      if (!plain(next) || next.schemaVersion <= previous) throw new Error('Board migration did not advance the schema.');
    }
    return next;
  }
  function importJSON(text) {
    if (typeof text !== 'string' || bytes(text) > MAX_BYTES) return { ok: false, errors: ['Import must be a JSON file smaller than 2 MB.'] };
    try {
      const parsed = JSON.parse(text);
      const document = parsed && parsed.format === 'mmt-whiteboard' ? parsed.board : parsed;
      return validate(migrate(document));
    } catch (error) { return { ok: false, errors: [error.message || 'JSON could not be read.'] }; }
  }
  function exportJSON(board) {
    const result = validate(board);
    if (!result.ok) throw new Error(result.errors.join(' '));
    return JSON.stringify({ format: 'mmt-whiteboard', schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), board: result.board }, null, 2);
  }

  function createStore(options = {}) {
    const key = options.key || KEY;
    const writerId = options.writerId || uid();
    let storage;
    let storageError;
    try { storage = options.storage === undefined ? root.localStorage : options.storage; } catch (error) { storageError = error; }
    const listeners = new Set();
    let loaded = false;
    let baseVersion = null;
    let status = { state: 'unloaded', revision: 0, message: 'Board has not been loaded.' };
    function update(state, message, extra = {}) { status = Object.assign({ state, message, revision: status.revision || 0 }, extra); return status; }
    function emit(event) { listeners.forEach(fn => { try { fn(event); } catch (_) { /* A view listener cannot interrupt a save. */ } }); }
    function available() {
      if (storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function') return true;
      update('unavailable', 'Local saving is unavailable. Export the board to keep a copy.', { error: storageError ? storageError.message : 'Storage is not available.' });
      return false;
    }
    function readEnvelope() {
      const raw = storage.getItem(key);
      if (raw === null) return null;
      if (bytes(raw) > MAX_BYTES + 4096) throw new Error('Saved board exceeds the size limit.');
      const envelope = JSON.parse(raw);
      if (!plain(envelope) || envelope.format !== 'mmt-whiteboard-store' || envelope.schemaVersion !== SCHEMA_VERSION || !Number.isSafeInteger(envelope.revision) || envelope.revision < 1 || !validID(envelope.versionId || '') || !stringDate(envelope.savedAt)) throw new Error('Saved board envelope is invalid.');
      const checked = validate(migrate(envelope.board));
      if (!checked.ok) throw new Error(checked.errors.join(' '));
      envelope.board = checked.board;
      return envelope;
    }
    function stringDate(value) { return typeof value === 'string' && value.length < 60 && Number.isFinite(Date.parse(value)); }
    function load() {
      if (!available()) return null;
      try {
        const saved = readEnvelope();
        loaded = true;
        baseVersion = saved ? saved.versionId : null;
        update(saved ? 'saved' : 'empty', saved ? 'Saved on this browser.' : 'New board.', { revision: saved ? saved.revision : 0, savedAt: saved ? saved.savedAt : null });
        return saved ? copy(saved.board) : null;
      } catch (error) {
        loaded = false;
        update('corrupt', 'The saved board could not be read. It has not been replaced.', { error: error.message });
        return null;
      }
    }
    function save(board) {
      const checked = validate(board);
      if (!checked.ok) return { ok: false, revision: status.revision, message: checked.errors.join(' '), errors: checked.errors };
      if (!available()) return { ok: false, revision: status.revision, message: status.message };
      try {
        const current = readEnvelope();
        if (!loaded && current) {
          update('conflict', 'A saved board exists. Reload it before saving changes.', { revision: current.revision });
          return { ok: false, conflict: true, revision: current.revision, message: status.message };
        }
        if ((current ? current.versionId : null) !== baseVersion) {
          update('conflict', 'Another tab saved a newer board. Export these changes or reload the saved board.', { revision: current ? current.revision : 0 });
          return { ok: false, conflict: true, revision: status.revision, message: status.message };
        }
        const envelope = { format: 'mmt-whiteboard-store', schemaVersion: SCHEMA_VERSION, revision: (current ? current.revision : 0) + 1, versionId: uid(), parentId: baseVersion, writerId, savedAt: new Date().toISOString(), board: checked.board };
        storage.setItem(key, JSON.stringify(envelope));
        // Verify the write before reporting success (also catches non-persistent mock storage).
        const stored = readEnvelope();
        if (!stored || stored.versionId !== envelope.versionId) {
          update('conflict', 'Another tab changed the board during this save. Export these changes before reloading.');
          return { ok: false, conflict: true, revision: status.revision, message: status.message };
        }
        loaded = true;
        baseVersion = envelope.versionId;
        update('saved', 'Saved on this browser.', { revision: envelope.revision, savedAt: envelope.savedAt });
        emit({ type: 'saved', status: Object.assign({}, status) });
        return { ok: true, revision: envelope.revision, message: status.message };
      } catch (error) {
        const quota = error && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED');
        update(quota ? 'full' : 'error', quota ? 'Browser storage is full. Export the board to keep these changes.' : 'The board could not be saved. Export it to keep these changes.', { error: error.message });
        return { ok: false, revision: status.revision, message: status.message };
      }
    }
    function saveLocked(board) {
      const checked = validate(board);
      if (!checked.ok) return Promise.resolve({ ok: false, revision: status.revision, message: checked.errors.join(' '), errors: checked.errors });
      const snapshot = checked.board;
      if (root.navigator && root.navigator.locks && typeof root.navigator.locks.request === 'function') {
        return root.navigator.locks.request(key + ':write', () => save(snapshot)).catch(error => ({ ok: false, revision: status.revision, message: 'Saving could not acquire the browser lock. Export this board.', error: error.message }));
      }
      return Promise.resolve(save(snapshot));
    }
    function onStorage(event) {
      if (event.key !== key && event.key !== null) return;
      if (event.storageArea && event.storageArea !== storage) return;
      try {
        const current = readEnvelope();
        if ((current ? current.versionId : null) === baseVersion) return;
        update('conflict', 'The saved board changed in another tab. Export these changes or reload the saved board.', { revision: current ? current.revision : 0 });
        emit({ type: 'external-change', status: Object.assign({}, status) });
      } catch (error) {
        update('corrupt', 'Another tab wrote a board that could not be read.', { error: error.message });
        emit({ type: 'external-change', status: Object.assign({}, status) });
      }
    }
    if (root.addEventListener) root.addEventListener('storage', onStorage);
    const snapshotPrefix = key + ':snapshot:';
    function listSnapshots() {
      if (!available()) return [];
      try {
        const result = [];
        for (let index = 0; index < storage.length; index++) {
          const itemKey = storage.key(index);
          if (!itemKey || !itemKey.startsWith(snapshotPrefix)) continue;
          const item = JSON.parse(storage.getItem(itemKey));
          if (plain(item) && validID(item.id || '') && typeof item.title === 'string' && stringDate(item.savedAt)) result.push({ id: item.id, title: item.title, savedAt: item.savedAt });
        }
        return result.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
      } catch (error) { update('error', 'Saved checkpoints could not be listed.', { error: error.message }); return []; }
    }
    function saveSnapshot(board, title) {
      const checked = validate(board);
      if (!checked.ok) return { ok: false, message: checked.errors.join(' '), errors: checked.errors };
      if (typeof title !== 'string' || !title.trim() || title.length > 160) return { ok: false, message: 'Name the checkpoint with 1–160 characters.' };
      if (!available()) return { ok: false, message: status.message };
      if (listSnapshots().length >= 12) return { ok: false, message: 'Twelve checkpoints are saved. Export or remove one before adding another.' };
      try {
        const item = { id: uid(), title: title.trim(), savedAt: new Date().toISOString(), board: checked.board };
        storage.setItem(snapshotPrefix + item.id, JSON.stringify(item));
        return { ok: true, id: item.id, message: 'Checkpoint saved on this browser.' };
      } catch (error) { return { ok: false, message: 'Checkpoint could not be saved. Export the board instead.', error: error.message }; }
    }
    function loadSnapshot(id) {
      if (!validID(id || '') || !available()) return { ok: false, errors: ['Checkpoint ID or storage is unavailable.'] };
      try {
        const raw = storage.getItem(snapshotPrefix + id);
        if (!raw) return { ok: false, errors: ['Checkpoint was not found.'] };
        if (bytes(raw) > MAX_BYTES + 4096) return { ok: false, errors: ['Checkpoint exceeds the size limit.'] };
        return validate(migrate(JSON.parse(raw).board));
      } catch (error) { return { ok: false, errors: [error.message] }; }
    }
    function deleteSnapshot(id) {
      if (!validID(id || '') || !available()) return { ok: false, message: 'Checkpoint ID or storage is unavailable.' };
      try { storage.removeItem(snapshotPrefix + id); return { ok: true }; } catch (error) { return { ok: false, message: error.message }; }
    }
    function recoverSavedJSON() {
      if (!available()) return null;
      try { return storage.getItem(key); } catch (_) { return null; }
    }
    function dispose() { if (root.removeEventListener) root.removeEventListener('storage', onStorage); listeners.clear(); }
    return { load, save, saveLocked, validate, exportJSON, importJSON, getStatus: () => Object.assign({}, status), subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn); }, saveSnapshot, listSnapshots, loadSnapshot, deleteSnapshot, recoverSavedJSON, dispose, key };
  }
  const defaultStore = createStore();
  return Object.assign(defaultStore, { SCHEMA_VERSION, TYPES, MAX_BYTES, createStore, registerMigration: (fromVersion, fn) => {
    if (!Number.isInteger(fromVersion) || fromVersion < 0 || fromVersion >= SCHEMA_VERSION || typeof fn !== 'function') throw new Error('Invalid migration registration.');
    migrations.set(fromVersion, fn);
  } });
});
