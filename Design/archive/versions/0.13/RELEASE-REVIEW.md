# Release review · design 0.13 / art 0.10

Reviewed 17 September 2026. [Design document](design-review.html) · [Playable episode](episode-01/index.html) · [Current captures](previews/index.html#episode).

The fictional first episode is implemented and exercised through its visible controls. The operating model, Narrative figures, preview library, project status and P0–P7 phase table now agree. P2 is ready for uncoached playtesting. P4’s fictional loop was built early as test material; P2/P3 validation and historical binding have not been passed by implementation alone.

## What changed

| Area | Current result |
|---|---|
| Episode | Internal and supplier plans; two work bays; shared staff; half-day clock; purchases, payroll and reservations; conditional payment responses; final outcome |
| Records | Date-gated document tray, fixed saved v1/v2 records, bank strip, replies, permission and a separate P-05 reissue |
| Control | Trace or recipient response before approval; one approved reissue; recipient confirmation before release |
| Continuity | Five views preserve project and interval; reading pauses the schedule; save/reopen replays the run; JSON export keeps its action history |
| Ordinary control | Supplier receipt succeeds; routine B-09 has two allocations and both receipts; no anomaly is manufactured |
| Narrative | Real gameplay captures plus diagrams of branches, clocks and cash boundaries; campaign proposals remain identified as proposals |
| Art hero | Independent 36-second composed scene with cutaway foreground, circuit, bakery route, pacing, walkers and flags; pause and reduced-motion support |
| Voila | L-05 replaces the external orange overlook; sixteen truck headings and a 32-second route beside Porter; Johnson’s internal stair is retained |
| Libraries | Current previews, GIFs, original SVG diagrams, run receipts, object sheets and ZIP; prior specifications and checks retained in the archive |

## Review boundaries

The episode is a fictional design prototype, not a recreation of actual financial decisions. Starting cash, internal costs, timing, authority, recipient replies and P-05 are authored simulation inputs or results. CASE-01 and its export-level binding remain unchanged. The Tuesday saved Paid label is never described as proof of post-return platform persistence.

The engine and browser checks establish implementation behavior. They do not measure whether the decisions are enjoyable, whether uncoached players understand the distinctions, or whether a session lasts 12–15 minutes. A general economy, full campaign, reconstruction alternative, arbitrary save branching and production sound remain unimplemented.

The detailed, repeatable check scope is recorded in [QA](qa/README.md). Source hashes, internal links, phase agreement, captures, exported formats and the complete sprite ZIP are checked together. External-source authentication was not repeated during this implementation pass.

## Next work

Run the ordinary scenario without coaching, then the full supplier route. Observe whether players understand staffing, placement, posted cash, open obligations and saved record timing; inspect voluntary replay. Use those findings to revise the operating loop before locking the structure or campaign. P1 continues in parallel: original return linkage, bank direction, continuous status history and recipient settlement remain unresolved. Historical interaction stays disabled.
