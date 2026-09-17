# Episode 01 / The handoff

A complete fictional practice loop, built for design review. [Play](index.html) · [Scenario rules](../design-review.html#episode/scenario-rules) · [Captures and GIFs](../previews/index.html#episode).

Choose in-house production or supplier S-08, place the job in one of two work bays and allocate two shared staff units. Run half-day intervals. The full supplier route includes a returned payment; the ordinary scenario supplies a successful control. Requests, approval, reissue, substitution and a revised handoff alter the run. Closeout preserves delivery, staffing, cash, reservations and the original promise separately.

All operating values and replies are invented. The fixed P-04 fixture contains a Tuesday Paid snapshot followed by a Wednesday funding return. Reopening that snapshot does not observe a later platform state. P-05 and its receipt are new simulation events, never additional evidence about the historical case. The case comparison is read-only; the binding gate remains closed.

## Maintained sources

- `model.js`: integer-cent configuration, transitions, event ledger, reservations and outcomes.
- `episode.js`: controls, available-record tray, five views, document desk, save/replay and JSON run export.
- `scene.js`: the episode's Johnson-derived practice workshop, drawn with the shared pixel kit.
- `episode.css`: Geist typography and the existing invoice/carbon/bank-strip material system.
- `index.html`: portable entry point; opens directly or over HTTP.

The model is deterministic. A run exports its model revision, configuration, mode, actions, state and outcome. Browser persistence replays actions in its versioned namespace. Only one current run is stored; export before starting another. Old-model migration and arbitrary timeline branching are not implemented.

Half-day production values are deliberately coarse. Staff cost is fixed payroll. The physical handoff consumes time, not extra staff units. Two-person allocation represents shared capacity, not the full five-department organization. The client fee becomes a receivable on delivery; client collection is outside this episode. Scenery motion does not advance the economic clock.

## Verification and next test

Engine checks exercise both plans, placement, staffing conflicts, returned cash, permission, reissue, substitute production, valid pooling and replay. Browser checks operate the visible controls, complete three routes, preserve selection across views, export/reload a run, close the desk by keyboard and check a 390px layout. Captures record those runs, with time condensed where labelled.

No participant sessions have been conducted. The next task is the P2 uncoached ordinary-work test, followed by the structure comparison. The full episode's 12–15 minute session length remains a design target. See [current focus](../design-review.html#production/current-focus).
