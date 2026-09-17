# Release review · design 0.16 / art 0.10

Reviewed 17 September 2026. [Design document](design-review.html) · [Whiteboard](whiteboard/index.html) · [Playable episode](episode-01/index.html) · [Park builder](../test/index.html).

The design whiteboard is a separate workshop tool linked from the reader header. It uses the current episode reducer and sprite catalogue. Episode rules, historical bindings and art source files are unchanged.

## Changes

- Systems, Story and Structure share stable object IDs. Story beats link to operating records; hierarchy anchors organise the same objects.
- Scenario settings, costs and work-bay placement replay the current action list. The board reports changes in balances, workload, handoffs and rule state.
- Explicit triggers and effects can update workshop counters. Required links gate these effects. Diagram arrows and workshop counters cannot change episode balances.
- Local autosave, JSON transfer, checkpoints, undo, pen strokes and keyboard controls support facilitated sessions.
- A Supabase client and SQL migration implement shared rooms, cursor presence, field-level merging and explicit conflict handling. **The hosted project is not connected yet.**
- The CMS plan separates sources, entities, object definitions, narrative beats, anchors, scenarios, runs, assets and board layouts. It records the distinction between editable assumptions and evidence.
- The 0.15 authored specification and release records are archived. The reader header, project manifest, build commands and phase references now include the board.

## Verification

The whiteboard passes 19 model checks, 13 persistence checks, 24 collaboration checks and 14 browser checks. Collaboration checks include the PostgreSQL functions in a local harness. That harness substitutes the unavailable `pg_jsonschema` extension; the real extension and hosted connection still need verification in Supabase. Two-browser UI checks use an intercepted HTTP service and cover independent changes, simultaneous title edits, typing during remote edits, presence and separate camera positions.

Reader and library checks cover desktop/mobile layout, asset loading and motion controls. Release checks verify internal links, version records, phase consistency, source hashes and sprite ZIP contents. [QA records](qa/README.md) distinguish implementation tests from participant research.

## Current focus

Connect the chosen Supabase project and verify a two-person workshop. **P2 remains the uncoached ordinary-work test.** Use six to eight participants, then offer the full supplier route. P1 source binding continues in parallel; historical interaction remains disabled. The GDD's [production sequence](design-review.html#production/production-sequence) remains the phase plan.
