# Mad Money Tycoon — Ordinary-work-first practice

Self-contained practice build. Primary fun = running a small agency: arrange production, watch it work, revise.

**Inquiry / returned-payment is not on the default path.** A single locked *Practice · ordinary* mode.

Original Episode 01 and `mmt-7turn` sources are untouched.

## Open

```bash
cd /workspace/mmt-ordinary
python3 -m http.server 8040
```

Then visit http://127.0.0.1:8040/

No build step.

## Files

| File | Role |
|------|------|
| `index.html` | Entry |
| `model.js` | Integer-cent ordinary engine |
| `app.js` | UI (plans, bay, crew, views, reset) |
| `styles.css` | Geist / invoice-carbon layout |
| `assets/fonts/` | Geist + GeistMono |
| `VERIFY.md` | Node simulation results |
| `verify-sims.js` | Re-runnable assertions |

## Loop

accept scope → reserve capacity → commit make/buy → produce → handoff → review

## Two plans (genuine tradeoffs)

| | Make in-house | Buy from S-08 |
|--|---------------|---------------|
| Cash | $4,000 materials | $12,000 supplier (settle Mon PM) |
| Staff | 4 fab + 2 pack | 2 pack only |
| Display job | Easy to starve with crew 2 | Easier to protect with crew 1 |
| Release | After fab+pack | After clean recipient receipt (Tue AM) |

Bay: near-dock = 1 handoff interval; shared floor = 2.

## Economy (invented, integer cents)

- Opening posted cash $40,000
- Campaign budget $100,000 = ceiling · not cash
- Client receivable $24,000 on delivery · not a receipt
- Shared staff 2 units / half-day; display job 3 units due Tue AM
- Promise Thu AM; payroll $6,000 Wed AM (reserved → posted)
- Max 8 half-day intervals

## Semantics

work ≠ revenue · obligation ≠ settlement · capability ≠ execution · fiction ≠ history · unknown valid · posted ≠ available after reserves · receivable ≠ receipt · ceiling ≠ cash

No fraud meter. Closeout: delivery timing, promise met?, other job on time?, posted/usable, what remains owed.

## Reset

*New run* and *Try the other plan* clear `localStorage`, stop timers, and construct a fresh `initial()` — never mutate prior state in place.
