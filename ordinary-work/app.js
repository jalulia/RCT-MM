(() => {
  'use strict';
  const E = window.MMTOrdinary;
  const $ = id => document.getElementById(id);
  const cash = E.money;
  const C = E.CONFIG;
  const KEY = 'mmt-ordinary-v1';

  let s = E.initial();
  let auto = null;
  let doc = null;

  function loadSaved() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved?.schema !== 1 || !Array.isArray(saved.actions)) return;
      const seed = E.initial();
      s = saved.actions.reduce((state, a) => {
        if (!a || a.type === 'reset') return state;
        try { return E.reduce(state, a); } catch { return state; }
      }, seed);
    } catch {
      try { localStorage.removeItem(KEY); } catch {}
    }
  }

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        schema: 1,
        mode: 'ordinary',
        preselect: s.plan || s.preselect || null,
        bay: s.bay,
        crew: s.crew,
        actions: s.actions
      }));
    } catch {}
  }

  function clearPersist() {
    try { localStorage.removeItem(KEY); } catch {}
  }

  function stop() {
    clearInterval(auto);
    auto = null;
    if ($('auto')) $('auto').textContent = 'Run schedule';
  }

  function dispatch(a) {
    try {
      const before = s.events.length;
      s = E.reduce(s, a);
      persist();
      $('notice').textContent = '';
      if (
        a.type === 'advance' &&
        (s.finished || s.events.slice(before).some(e => e.kind === 'notice' || e.kind === 'record'))
      ) stop();
      render();
      return true;
    } catch (e) {
      stop();
      $('notice').textContent = e.message;
      return false;
    }
  }

  const btn = (label, type, value, extra) =>
    `<button type="button" data-action="${type}"${
      value === undefined ? '' : ` data-value="${value}"`
    } ${extra || ''}>${label}</button>`;

  const row = (a, b) => `<tr><td>${a}</td><td>${b}</td></tr>`;
  const day = turn => (turn === 0 ? 'Planning' : E.DAYS[turn]);

  function bars(done, total, missed) {
    let h = '';
    for (let i = 0; i < total; i++) {
      const filled = i < done;
      h += `<i class="${!filled && missed ? 'miss empty' : filled ? '' : 'empty'}"></i>`;
    }
    return h;
  }

  function capacityBoard() {
    const otherDone = C.otherWork - s.other;
    const otherMissed = s.turn >= C.otherDue && s.other > 0;
    let cDone = 0, cTotal = 0, cLabel = 'Choose a plan';
    if (s.plan === 'make') {
      cTotal = C.fabWork + C.prep;
      cDone = C.fabWork - s.work + (C.prep - s.prep);
      cLabel = `${cDone} / ${cTotal} staff-units · fab+pack`;
    } else if (s.plan === 'buy') {
      cTotal = C.prep;
      cDone = C.prep - s.prep;
      cLabel = s.supplierSettled
        ? `${cDone} / ${cTotal} pack · supplier released`
        : `${cDone} / ${cTotal} pack · awaiting release`;
    }
    if (s.delivered !== null) cLabel += ` · handed off ${E.DAYS[s.delivered]}`;

    $('bars-c07').innerHTML = s.plan ? bars(cDone, cTotal, false) : bars(0, 6, false);
    $('cap-c07-label').textContent = cLabel;
    $('bars-other').innerHTML = bars(otherDone, C.otherWork, otherMissed);
    $('cap-other-label').textContent =
      s.otherDone !== null
        ? `Done ${E.DAYS[s.otherDone]}${s.otherDone <= C.otherDue ? ' · on time' : ' · late'}`
        : otherMissed
          ? `${s.other} remain · MISSED Tue AM`
          : `${s.other} remain · due Tue AM`;

    const rest = C.capacity - s.crew;
    $('pool-units').innerHTML =
      `<span class="on">${s.crew}→C07</span>` +
      (rest ? `<span class="other">${rest}→Disp</span>` : `<span>0→Disp</span>`);
  }

  function workView() {
    if (s.selection === 'OTHER') {
      const missed = s.turn >= C.otherDue && s.other > 0;
      return `<h3>Display job</h3><div class="stage-track">
        <div class="${!s.other ? 'done' : missed ? 'warn' : ''}"><b>FABRICATION</b><span>${C.otherWork - s.other} / ${C.otherWork} units</span></div>
        <div class="${s.otherDone !== null && s.otherDone <= C.otherDue ? 'done' : missed ? 'warn' : ''}"><b>RESERVATION</b><span>Tue AM</span></div>
        <div class="${s.otherDone !== null ? 'done' : ''}"><b>HANDOFF</b><span>${s.otherDone === null ? 'Not complete' : E.DAYS[s.otherDone]}</span></div>
      </div><p class="legend">Staff not assigned to C-07 works this reservation. A missed reservation stays in the closeout.</p>`;
    }
    const need = s.bay === 'dock' ? 1 : 2;
    return `<h3>${E.stage(s)}</h3><div class="stage-track">
      <div class="${s.started && !s.work ? 'done' : ''}"><b>01 / MAKE</b><span>${
        !s.plan ? 'Choose a plan'
          : s.work ? `${s.work} fab units remain`
          : s.plan === 'buy' ? (s.supplierSettled ? 'Supplier component released' : 'Awaiting supplier')
          : 'Fabricated'
      }</span></div>
      <div class="${!s.prep ? 'done' : ''}"><b>02 / CHECK & PACK</b><span>${s.prep} units remain</span></div>
      <div class="${s.delivered !== null ? 'done' : ''}"><b>03 / HAND OFF</b><span>${
        s.delivered !== null ? E.DAYS[s.delivered]
          : s.plan === 'buy' && !s.supplierSettled ? 'Await supplier release'
          : `${s.handoff} / ${need} · ${s.bay === 'dock' ? 'near-dock' : 'shared floor'}`
      }</span></div>
    </div><p class="legend">Promise: ${E.DAYS[s.promise]}. Budget ceiling $100,000 is not cash. No client cash arrives here.</p>`;
  }

  function view() {
    if (s.view === 'Work') return workView();
    if (s.selection === 'OTHER') {
      if (s.view === 'Cash')
        return `<h3>Display job / shared cash</h3><table>${row('Separate materials', 'None modeled')}${row('Shared Wed AM payroll', '$6,000')}${row('Shared posted cash', cash(s.cash))}</table><p class="legend">Payroll belongs to the shared staff pool. O-19 belongs only to a buy plan on C-07.</p>`;
      if (s.view === 'Information')
        return `<h3>Display job / current record</h3><div class="info-grid"><div><span>OBJECT</span><b>OTHER / competing display</b></div><div><span>RESERVATION</span><b>Tuesday AM</b></div><div><span>WORK REMAINING</span><b>${s.other} units</b></div><div><span>HANDOFF</span><b>${s.otherDone === null ? 'Not complete' : E.DAYS[s.otherDone]}</b></div></div>`;
      if (s.view === 'Control')
        return `<h3>Display job / production control</h3><p>You assign the shared staff. Capacity not on C-07 works this reservation. Tuesday AM deadline is fixed.</p>`;
      return `<h3>Display job / ${C.capacity - s.crew} unit per interval</h3><div class="info-grid"><div><span>SHARED CAPACITY</span><b>2 units total</b></div><div><span>ASSIGNED TO C-07</span><b>${s.crew}</b></div><div><span>REMAINING HERE</span><b>${s.other} units</b></div><div><span>DEADLINE</span><b>Tuesday AM</b></div></div>`;
    }
    if (s.view === 'Cash')
      return `<h3>Cash has a direction.</h3><table><tbody>${row('Opening bank cash', cash(C.startingCash))}${s.ledger
        .map(e => row(`${e.id} · ${e.label}`, `${e.amount > 0 ? '+' : ''}${cash(e.amount)}`))
        .join('')}${row('Posted balance', cash(s.cash))}${row('Still reserved', cash(E.reserved(s)))}${row(
        'Available after reserves',
        cash(E.available(s))
      )}${row('Campaign ceiling (not cash)', cash(C.budget))}${row(
        'Client receivable (not receipt)',
        s.delivered !== null ? cash(C.fee) : '$0'
      )}</tbody></table><p class="legend">Ceiling and receivable are excluded from bank cash.</p>`;
    if (s.view === 'Information')
      return `<h3>What is known now</h3><div class="info-grid"><div><span>PAYMENT SNAPSHOT</span><b>${
        s.documents.includes('v2') ? 'v2 / Paid / saved Mon PM'
          : s.documents.includes('v1') ? 'v1 / Scheduled'
          : s.plan === 'buy' ? 'No platform record yet' : 'No supplier payment (make)'
      }</b></div><div><span>BANK</span><b>${
        s.supplierPaid ? 'P-04 debit posted' : s.plan === 'buy' ? 'No P-04 debit yet' : 'No P-04'
      }</b></div><div><span>RECIPIENT</span><b>${
        s.supplierSettled ? 'Receipt confirmed' : s.plan === 'buy' ? 'Not confirmed' : 'N/A'
      }</b></div><div><span>OBLIGATION</span><b>${
        s.plan !== 'buy' ? 'No O-19 in this plan' : s.supplierSettled ? 'O-19 resolved' : 'O-19 open'
      }</b></div></div><p class="legend">Open saved records below. Later events do not rewrite earlier snapshots. Historical interaction is inactive.</p>`;
    if (s.view === 'Control')
      return `<h3>Who can do what</h3><table><tbody>${row('Production / you', 'Plan, place, staff, run intervals')}${row(
        'Supplier S-08',
        'Confirm receipt; release component (ordinary path)'
      )}${row('Client', 'Receives handoff; invoice raised')}${row(
        'Finance / inquiry',
        'Inactive on this ordinary path'
      )}</tbody></table><p class="legend">Returned-payment and reissue authority are out of scope for Practice · ordinary.</p>`;
    return `<h3>Two units per interval</h3><div class="info-grid"><div><span>C-07 ALLOCATION</span><b>${s.crew} unit${
      s.crew === 1 ? '' : 's'
    } / interval</b></div><div><span>DISPLAY ALLOCATION</span><b>${C.capacity - s.crew} / interval</b></div><div><span>DISPLAY DEADLINE</span><b>Tue AM · ${s.other} remain</b></div><div><span>STAFF COST</span><b>$6,000 payroll Wed AM</b></div></div><p class="legend">Payroll is fixed. Assigning both units to C-07 starves the display reservation.</p>`;
  }

  function decisions() {
    let out = !s.started
      ? `<h3>Choose how it gets made.</h3><p>Complete C-07 by Thursday AM while protecting the display job’s Tuesday AM handoff. Two viable plans — replay the other after closeout.</p><div class="plans">${btn(
          '<b>Make in-house</b><span>$4,000 materials · 4 fabrication + 2 check-and-pack</span><small>USES SHARED STAFF · NO SUPPLIER OBLIGATION · CHEAPER CASH</small>',
          'plan',
          'make',
          `aria-pressed="${s.plan === 'make'}"`
        )}${btn(
          '<b>Buy from S-08</b><span>$12,000 supplier · settle mid-run · 2 check-and-pack in-house</span><small>PRESERVES STAFF FOR DISPLAY · CLEAN RECEIPT ON ORDINARY PATH</small>',
          'plan',
          'buy',
          `aria-pressed="${s.plan === 'buy'}"`
        )}</div>`
      : `<h3>${E.stage(s)}</h3><p>${s.plan === 'make' ? 'Make in-house' : 'Buy from S-08'} · ${
          s.bay === 'dock' ? 'near-dock bay' : 'shared-floor bay'
        }. ${
          s.delivered !== null
            ? 'Client invoice raised; payment is outside this practice.'
            : 'Handoff promised ' + E.DAYS[s.promise] + '.'
        }</p>`;

    out += `<div class="staff"><label>CAPACITY / C-07</label><div class="staff-options">${btn(
      '1 unit / shared',
      'crew',
      1,
      `aria-pressed="${s.crew === 1}" ${s.finished ? 'disabled' : ''}`
    )}${btn(
      '2 units / concentrated',
      'crew',
      2,
      `aria-pressed="${s.crew === 2}" ${s.finished ? 'disabled' : ''}`
    )}</div><small>${
      s.other
        ? `${s.other} units remain on the display job. Due Tue AM.`
        : 'Display job finished ' + E.DAYS[s.otherDone] + '.'
    } Staff can be reassigned between intervals.</small></div>`;
    return out;
  }

  const labels = {
    terms: ['C-07', 'Work order', 'memo'],
    bank: ['BANK', 'Bank extract', 'strip'],
    v1: ['P-04 / V1', 'Scheduled', 'carbon'],
    v2: ['P-04 / V2', 'Paid snapshot', 'carbon'],
    'ordinary-receipt': ['S-08', 'P-04 received', 'strip'],
    client: ['C-07', 'Client invoice', '']
  };

  function render() {
    const prior = document.activeElement;
    const focusAction = prior?.dataset?.action;
    const focusValue = prior?.dataset?.value;

    $('date').textContent = s.started ? E.DAYS[s.turn] : 'Mon AM';
    $('interval').textContent = s.finished
      ? 'Run complete'
      : s.started
        ? `Interval ${s.turn} / ${C.maxTurn}`
        : 'Planning';
    $('cash').textContent = cash(s.cash);
    $('reserved').textContent = cash(E.reserved(s));
    $('available').textContent = cash(E.available(s));
    $('receivable').textContent = s.delivered !== null ? cash(C.fee) : '$0';
    $('decisions').innerHTML = decisions();
    $('view-panel').innerHTML = view();
    capacityBoard();

    for (const el of document.querySelectorAll('[data-view]'))
      el.setAttribute('aria-pressed', el.dataset.view === s.view);
    for (const el of document.querySelectorAll('[data-select]'))
      el.setAttribute('aria-pressed', el.dataset.select === s.selection);
    for (const el of document.querySelectorAll('[data-bay]')) {
      el.setAttribute('aria-pressed', el.dataset.bay === s.bay);
      el.disabled = s.started;
    }

    $('advance').disabled = !s.plan || s.finished;
    $('auto').disabled = !s.plan || s.finished;

    const records = [
      'terms',
      ...(s.ledger.length ? ['bank'] : []),
      ...s.documents.filter(d => labels[d])
    ];
    $('record-tray').innerHTML = [...new Set(records)]
      .map(id => {
        const l = labels[id];
        return `<button type="button" class="record-tab ${l[2]}" data-doc="${id}"><small>${l[0]}</small><b>${l[1]}</b><small>OPEN RECORD ↗</small></button>`;
      })
      .join('');

    $('event-log').innerHTML = s.events.length
      ? s.events
          .slice()
          .reverse()
          .map(e => `<li><time>${day(e.turn)}</time><span>${e.text}</span></li>`)
          .join('')
      : '<li><time>Planning</time><span>Two staff units available. No plan committed. Ordinary practice path.</span></li>';

    $('outcome').hidden = !s.finished;
    if (s.finished) {
      const o = E.outcome(s);
      const otherPlan = s.plan === 'make' ? 'buy' : 'make';
      const otherLabel = otherPlan === 'make' ? 'Make in-house' : 'Buy from S-08';
      $('outcome').innerHTML = `<div class="outcome-box"><header><span class="folio">RUN RECEIPT / PRACTICE · ORDINARY</span><h2>${
        o.metPromise ? 'Handoff made.' : 'The handoff slipped.'
      }</h2></header><div class="outcome-grid">
        <div><small>C-07 DELIVERY</small><strong>${o.delivery}</strong></div>
        <div><small>THU AM PROMISE</small><strong>${o.metPromise ? 'Kept' : 'Missed'}</strong></div>
        <div><small>DISPLAY RESERVATION</small><strong>${o.otherOnTime ? 'Protected' : 'Missed'}</strong></div>
        <div><small>POSTED CASH</small><strong>${cash(o.posted)}</strong></div>
        <div><small>STILL RESERVED</small><strong>${cash(o.committed)}</strong></div>
        <div><small>CLIENT RECEIVABLE / NOT CASH</small><strong>${cash(o.receivable)}</strong></div>
      </div><p>${o.remainsOwed}. Usable after reserves: ${cash(o.usable)}. Plan was <b>${
        s.plan === 'make' ? 'Make' : 'Buy'
      }</b> · bay <b>${s.bay}</b> · crew <b>${s.crew}</b>.</p>
      <div class="actions">${btn(`Try the other plan · ${otherLabel}`, 'replay')}${btn(
        'New run',
        'reset-ui'
      )}<button type="button" id="outcome-export">Download run receipt ↓</button></div></div>`;
    }

    if (focusAction && prior && !prior.isConnected) {
      const target = [...document.querySelectorAll('[data-action]')].find(
        b => b.dataset.action === focusAction && b.dataset.value === focusValue
      );
      (target && !target.disabled ? target : $('advance')).focus({ preventScroll: true });
    }
  }

  function documentBody(id) {
    const title = labels[id][1];
    const cls = labels[id][2];
    const head = labels[id][0];
    let body = '';
    let note = '';
    let tag = 'FICTIONAL SCENARIO / ORDINARY PRACTICE';

    if (id === 'terms') {
      body = `<h3>Fabricated component</h3><div class="big">$100,000 <small>ceiling</small></div><table>${row(
        'Client fee to invoice on handoff',
        '$24,000'
      )}${row('Original handoff', 'Thu AM')}${row('Opening bank cash', '$40,000')}${row(
        'Shared capacity',
        '2 units / interval'
      )}${row('Competing display job', '3 units / due Tue AM')}${row(
        'Staff payroll / Wed AM',
        '$6,000'
      )}${row('Make work', '4 fab + 2 pack')}${row('Buy work', 'supplier + 2 pack')}</table><p>The campaign ceiling is a planning limit, not a transfer. No client cash receipt is modeled.</p>`;
      note =
        'Select a plan and a work bay, then allocate staff. Plans and placement lock on the first interval; staffing stays adjustable.';
    } else if (id === 'bank') {
      body = `<h3>Posted entries</h3><div class="entry">OPENING BALANCE<strong>$40,000</strong></div>${s.ledger
        .map(
          e =>
            `<div class="entry">${e.id} / ${E.DAYS[e.turn]}<br>${e.label}<strong>${
              e.amount > 0 ? '+' : ''
            }${cash(e.amount)}</strong></div>`
        )
        .join('')}<div class="entry">CLOSING BALANCE<strong>${cash(s.cash)}</strong></div>`;
      note = 'Reserved amounts are not yet in this extract. Posted ≠ available after reserves.';
    } else if (id === 'v1' || id === 'v2') {
      const paid = id === 'v2';
      tag = 'SAVED FIXTURE / NEVER REWRITTEN · HISTORICAL INTERACTION INACTIVE';
      body = `<h3>${paid ? 'Paid' : 'Scheduled'}</h3><div class="big">$12,000</div><table>${row(
        'Campaign',
        'C-07'
      )}${row('Obligation', 'O-19')}${row('Recipient', 'S-08')}${row('Payment attempt', 'P-04')}${row(
        'Saved at',
        paid ? 'Mon PM' : 'Mon AM'
      )}${row('Version', paid ? '2' : '1')}</table><p>Status as saved at the time shown.</p>`;
      note = paid
        ? 'This Mon PM snapshot records the settlement debit. On the ordinary path, recipient receipt follows next interval. The snapshot is not rewritten.'
        : 'This records scheduling, not a recipient receipt.';
    } else if (id === 'ordinary-receipt') {
      body = `<h3>P-04 received</h3><p>S-08 confirms receipt of the $12,000 P-04 payment. O-19 is resolved and the component is released.</p>`;
      note = 'Ordinary-path confirmation. No return, reissue, or inquiry on this practice track.';
    } else if (id === 'client') {
      body = `<h3>Campaign handoff</h3><div class="big">$24,000</div><table>${row(
        'Campaign',
        'C-07'
      )}${row('Delivery', E.DAYS[s.delivered])}${row('Invoice state', 'Issued')}${row(
        'Cash received',
        '$0'
      )}</table>`;
      note = 'Revenue invoiced is not cash received. Collection is outside this practice.';
    }

    return {
      title,
      html: `<article class="paper ${cls}"><div class="stamp"><span>${head}</span><span>${tag}</span></div>${body}<footer>MAD MONEY TYCOON / ORDINARY PRACTICE / INVENTED VALUES</footer></article><aside class="annotation"><b>READING THIS RECORD</b><p>${note}</p>${
        ['v1', 'v2'].includes(id)
          ? `<div class="doc-versions">${s.documents
              .filter(x => ['v1', 'v2'].includes(x))
              .map(
                x =>
                  `<button type="button" data-doc="${x}" aria-pressed="${id === x}">${x.toUpperCase()}</button>`
              )
              .join('')}</div>`
          : ''
      }<p>Auto-schedule is paused while this desk is open.</p><button type="button" data-close>Return to the same view ↙</button></aside>`
    };
  }

  function openDoc(id) {
    stop();
    doc = id;
    const d = documentBody(id);
    $('doc-title').textContent = d.title;
    $('doc-content').innerHTML = d.html;
    if (!$('desk').open) $('desk').showModal();
  }

  function closeDoc() {
    doc = null;
    $('desk').close();
  }

  function exportRun() {
    const data = {
      title: 'Mad Money Tycoon / Ordinary practice',
      scope: 'Entirely fictional simulation; not historical evidence',
      modelRevision: C.revision,
      config: C,
      mode: 'ordinary',
      outcome: E.outcome(s),
      state: s
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = `mmt-ordinary-${s.plan || 'plan'}-${s.turn}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /** Bulletproof reset: stop timers, clear storage, replace state with fresh initial(). */
  function reset(opts) {
    opts = opts || {};
    stop();
    doc = null;
    if ($('desk').open) $('desk').close();
    clearPersist();
    s = E.initial({
      plan: opts.plan || null,
      bay: opts.bay || 'dock',
      crew: opts.crew || 1
    });
    persist();
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('button,a');
    if (!b) return;
    if (b.dataset.doc) {
      openDoc(b.dataset.doc);
      return;
    }
    if (b.hasAttribute('data-close')) {
      closeDoc();
      return;
    }
    if (b.dataset.view) dispatch({ type: 'view', value: b.dataset.view });
    if (b.dataset.select) dispatch({ type: 'select', value: b.dataset.select });
    if (b.dataset.bay) dispatch({ type: 'bay', value: b.dataset.bay });
    if (b.dataset.action) {
      const type = b.dataset.action;
      if (type === 'replay') {
        const other = s.plan === 'make' ? 'buy' : 'make';
        reset({ plan: other, bay: 'dock', crew: other === 'buy' ? 1 : 2 });
        return;
      }
      if (type === 'reset-ui') {
        reset();
        return;
      }
      dispatch({
        type,
        value: type === 'crew' ? Number(b.dataset.value) : b.dataset.value
      });
    }
    if (b.id === 'outcome-export') exportRun();
  });

  $('advance').onclick = () => dispatch({ type: 'advance' });
  $('auto').onclick = () => {
    if (auto) {
      stop();
      return;
    }
    auto = setInterval(() => dispatch({ type: 'advance' }), 2200);
    $('auto').textContent = 'Pause schedule';
  };
  $('new-run').onclick = () => {
    if (!s.started || s.finished || confirm('Start a new run? Export first if you want to keep it.'))
      reset();
  };
  $('terms-link').onclick = e => {
    e.preventDefault();
    openDoc('terms');
  };
  $('export-run').onclick = exportRun;
  $('close-desk').onclick = closeDoc;
  $('desk').addEventListener('close', () => {
    doc = null;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });

  loadSaved();
  render();

  window.MMTGame = {
    get state() {
      return JSON.parse(JSON.stringify(s));
    },
    dispatch,
    reset,
    openDoc,
    closeDoc,
    stop,
    render
  };
})();
