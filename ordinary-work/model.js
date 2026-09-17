/* Mad Money Tycoon — Ordinary-work-first practice.
   All values invented. Money is integer cents.
   Loop: accept scope → reserve capacity → commit make/buy → produce → handoff → review.
   Inquiry / returned-payment is NOT on the default path. */
(function (root) {
  'use strict';

  const CONFIG = {
    revision: 'ordinary-1',
    startingCash: 4000000,
    budget: 10000000,
    fee: 2400000,
    materials: 400000,
    supplier: 1200000,
    payroll: 600000,
    capacity: 2,
    fabWork: 4,
    prep: 2,
    otherWork: 3,
    due: 7,
    otherDue: 3,
    payrollTurn: 5,
    supplierPayTurn: 2,
    supplierReceiptTurn: 3,
    maxTurn: 8
  };

  const DAYS = [
    'Planning',
    'Mon AM', 'Mon PM', 'Tue AM', 'Tue PM',
    'Wed AM', 'Wed PM', 'Thu AM', 'Thu PM'
  ];

  const money = n =>
    new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0
    }).format(n / 100);

  const clone = s => JSON.parse(JSON.stringify(s));

  function initial(opts) {
    opts = opts || {};
    const plan = opts.plan || null;
    const bay = opts.bay || 'dock';
    const crew = [1, 2].includes(opts.crew) ? opts.crew : 1;
    const s = {
      schema: 1,
      mode: 'ordinary',
      turn: 0,
      plan: null,
      bay: bay,
      crew: crew,
      cash: CONFIG.startingCash,
      work: 0,
      prep: CONFIG.prep,
      handoff: 0,
      other: CONFIG.otherWork,
      otherDone: null,
      delivered: null,
      promise: CONFIG.due,
      started: false,
      materialsPaid: false,
      supplierPaid: false,
      supplierSettled: false,
      receiptAt: null,
      view: 'Work',
      selection: 'C-07',
      documents: [],
      ledger: [],
      events: [],
      actions: [],
      finished: false,
      preselect: plan || null
    };
    if (plan === 'make' || plan === 'buy') {
      s.plan = plan;
      s.work = plan === 'make' ? CONFIG.fabWork : 0;
      s.prep = CONFIG.prep;
    }
    return s;
  }

  function reserved(s) {
    let r = 0;
    if (s.turn < CONFIG.payrollTurn) r += CONFIG.payroll;
    if (s.plan === 'make' && !s.materialsPaid) r += CONFIG.materials;
    if (s.plan === 'buy' && !s.supplierPaid) r += CONFIG.supplier;
    return r;
  }

  const available = s => s.cash - reserved(s);
  const log = (s, text, kind) => s.events.push({ turn: s.turn, text: text, kind: kind || 'work' });

  function post(s, id, amount, label) {
    if (s.ledger.some(e => e.id === id)) throw Error('Duplicate bank event ' + id);
    if (s.cash + amount < 0) throw Error('Insufficient posted cash');
    s.cash += amount;
    s.ledger.push({ id: id, turn: s.turn, amount: amount, label: label });
    log(s, label + ' · ' + money(amount), 'cash');
  }

  function ready(s) {
    return s.work === 0 && s.prep === 0 && (s.plan === 'make' || s.supplierSettled);
  }

  function stage(s) {
    if (!s.started) return 'Plan production';
    if (s.delivered !== null) return 'Delivered';
    if (s.work > 0) return 'Fabrication';
    if (s.prep > 0) return 'Check & pack';
    if (s.plan === 'buy' && !s.supplierSettled) {
      return s.supplierPaid ? 'Await supplier receipt' : 'Await supplier settlement';
    }
    return 'Physical handoff';
  }

  function advance(s) {
    if (!s.plan) throw Error('Choose a production plan first.');
    if (s.finished) throw Error('This run is complete.');
    s.started = true;
    s.turn++;

    if (s.plan === 'make' && !s.materialsPaid) {
      post(s, 'MAT-01', -CONFIG.materials, 'Workshop materials');
      s.materialsPaid = true;
    }

    if (s.plan === 'buy') {
      if (s.turn === 1) {
        s.documents.push('v1');
        log(s, 'P-04 scheduled against O-19 (supplier obligation).', 'record');
      }
      if (s.turn === CONFIG.supplierPayTurn && !s.supplierPaid) {
        post(s, 'P-04-debit', -CONFIG.supplier, 'P-04 supplier settlement');
        s.supplierPaid = true;
        s.documents.push('v2');
        log(s, 'Saved v2: Paid, Mon PM. Snapshot is historical and inactive.', 'record');
      }
      if (s.turn === CONFIG.supplierReceiptTurn && s.supplierPaid && !s.supplierSettled) {
        s.supplierSettled = true;
        s.receiptAt = s.turn;
        s.documents.push('ordinary-receipt');
        log(s, 'S-08 confirms receipt and releases the component.', 'record');
      }
    }

    if (s.turn === CONFIG.payrollTurn) {
      post(s, 'PAY-01', -CONFIG.payroll, 'Scheduled staff payroll');
    }

    const readyAtStart = ready(s) && s.receiptAt !== s.turn;
    const otherWork = Math.min(s.other, CONFIG.capacity - s.crew);
    s.other -= otherWork;
    if (s.other === 0 && s.otherDone === null) {
      s.otherDone = s.turn;
      log(s, 'Competing display job complete.');
    }

    let units = s.crew;
    if (s.work) {
      const used = Math.min(units, s.work);
      s.work -= used;
      units -= used;
    }
    if (units && s.prep) {
      const used = Math.min(units, s.prep);
      s.prep -= used;
    }

    if (readyAtStart && s.delivered === null) {
      s.handoff++;
      const need = s.bay === 'dock' ? 1 : 2;
      if (s.handoff >= need) {
        s.delivered = s.turn;
        s.documents.push('client');
        log(s, 'C-07 delivered. A $24,000 client invoice is raised; no receipt is modeled.', 'work');
      } else {
        log(s, 'Handoff in progress (' + s.handoff + ' / ' + need + ').', 'work');
      }
    }

    if (s.turn === CONFIG.otherDue && s.other > 0) {
      log(s, 'The competing display job missed its reserved handoff.', 'notice');
    }
    if (s.turn === s.promise && s.delivered === null) {
      log(s, 'The current C-07 handoff promise has been missed.', 'notice');
    }

    if (
      s.turn >= CONFIG.maxTurn ||
      (s.delivered !== null &&
        s.turn >= CONFIG.payrollTurn &&
        (s.other === 0 || s.turn > CONFIG.otherDue))
    ) {
      s.finished = true;
    }
  }

  function reduce(input, a) {
    const s = clone(input);
    if (a.type === 'reset') {
      return initial({ plan: a.plan || null, bay: a.bay || 'dock', crew: a.crew || 1 });
    }
    if (s.finished && a.type !== 'view' && a.type !== 'select') {
      throw Error('Start another run to change this outcome.');
    }
    switch (a.type) {
      case 'plan':
        if (s.started) throw Error('The production plan is committed.');
        if (a.value !== 'make' && a.value !== 'buy') throw Error('Unknown plan.');
        s.plan = a.value;
        s.work = a.value === 'make' ? CONFIG.fabWork : 0;
        s.prep = CONFIG.prep;
        s.preselect = a.value;
        break;
      case 'bay':
        if (s.started) throw Error('Bay placement is committed.');
        if (a.value !== 'dock' && a.value !== 'studio') throw Error('Unknown bay.');
        s.bay = a.value;
        break;
      case 'crew':
        if (a.value !== 1 && a.value !== 2) throw Error('Choose one or two units.');
        s.crew = a.value;
        break;
      case 'view':
        if (['Work', 'Cash', 'Information', 'Control', 'People'].indexOf(a.value) < 0) {
          throw Error('Unknown view.');
        }
        s.view = a.value;
        break;
      case 'select':
        s.selection = a.value;
        break;
      case 'advance':
        advance(s);
        break;
      default:
        throw Error('Unknown action ' + a.type);
    }
    s.actions.push(Object.assign({ at: s.turn }, a));
    if (s.cash < 0 || available(s) < 0) {
      throw Error('Cash reservations exceed the available balance.');
    }
    return s;
  }

  function outcome(s) {
    return {
      delivery: s.delivered === null ? 'Not delivered' : DAYS[s.delivered],
      deliveryTurn: s.delivered,
      metPromise: s.delivered !== null && s.delivered <= s.promise,
      otherOnTime: s.otherDone !== null && s.otherDone <= CONFIG.otherDue,
      otherDone: s.otherDone,
      posted: s.cash,
      committed: reserved(s),
      usable: available(s),
      receivable: s.delivered !== null ? CONFIG.fee : 0,
      remainsOwed:
        s.plan === 'buy' && !s.supplierSettled
          ? 'O-19 supplier obligation remains open'
          : s.plan === 'buy'
            ? 'O-19 resolved by recipient-confirmed payment'
            : 'No supplier obligation (make plan)',
      plan: s.plan,
      bay: s.bay,
      crew: s.crew
    };
  }

  const api = {
    CONFIG: CONFIG,
    DAYS: DAYS,
    money: money,
    initial: initial,
    reduce: reduce,
    stage: stage,
    ready: ready,
    available: available,
    reserved: reserved,
    committed: reserved,
    outcome: outcome
  };
  root.MMTOrdinary = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
