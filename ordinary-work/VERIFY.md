# Verification — Mad Money Tycoon Ordinary

Node simulations against `model.js` (revision `ordinary-1`). Run date: 2026-09-17 (America/New_York).

```bash
cd /workspace/mmt-ordinary && node verify-sims.js
```

All four checks: **PASS**

---

## 1) Make + dock + crew 2 → delivers; other job outcome — PASS

| Field | Result |
|-------|--------|
| Plan / bay / crew | make · dock · 2 |
| Finish turn | 5 (Wed AM · payroll posted) |
| Delivered | turn 4 · Tue PM |
| Promise | Kept (≤ Thu AM) |
| Other job | **Missed** (0 capacity left for display) |
| Posted / usable | $30,000 / $30,000 |
| Receivable | $24,000 (not cash) |
| Obligation | No supplier obligation (make plan) |

Path: materials −$4k → fab 4 @ crew 2 (2 turns) → pack 2 (1 turn) → dock handoff → payroll −$6k.

---

## 2) Buy + dock + crew 1 → delivers; shop/other preserved; supplier settlement — PASS

| Field | Result |
|-------|--------|
| Plan / bay / crew | buy · dock · 1 |
| Finish turn | 5 (Wed AM) |
| Delivered | turn 4 · Tue PM |
| Promise | Kept |
| Other job | **On time** (done turn 3 · Tue AM) |
| Posted / usable | $22,000 / $22,000 |
| Ledger | P-04-debit −$12,000 (Mon PM); PAY-01 −$6,000 (Wed AM) |
| Receivable | $24,000 |
| Obligation | O-19 resolved by recipient-confirmed payment |

---

## 3) Buy + studio (2 handoff) vs dock timing — PASS

| | Buy · dock · crew 1 | Buy · studio · crew 1 |
|--|---------------------|------------------------|
| Delivered | Tue PM (turn 4) | **Wed AM (turn 5)** |
| Handoff intervals | 1 | 2 |
| Other job | On time | On time |
| Posted | $22,000 | $22,000 |

---

## 4) Reset / replay leaves no stale state — PASS

After a finished Buy run, `reduce(s, {type:'reset', plan:'make', bay:'dock', crew:2})` yields a clean Planning state with make preselected, $40,000 cash, empty ledger/events, and no settlement flags. First advance posts `MAT-01` only.

---

Sources under `/workspace/cdxcloud-mmt/` and `/workspace/mmt-7turn/` were **not** modified.
