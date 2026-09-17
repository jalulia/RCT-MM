# HANDOFF — resuming this work in a fresh Claude session

*For a teammate who has the same `Mad Money/` folder (incl. `The Madwell Architecture/` source package). Mount the folder in Cowork, paste the kickoff prompt below, and Claude reconstructs full context from these files.*

## What this folder is

`_Tools/_Claude Cowork/` is the complete working state of the interactive-dossier build (prototype v15, 2026-06-10): every design decision, critique, verification run, and the deliverable itself. A parallel planning track lives at `_Tools/` root (PLAN.md / STYLE_NOTES.md / SOURCE_MAP.md / PROCESS.md) — merged; see PROCESS.md's merge entry.

## Reading order for a fresh session

1. **`03_PROCESS_LOG.md`** — the full decision history, entries 01–21. Read first; it is the project memory.
2. **`01_DESIGN_SYSTEM.md`** — the codified system (color law, object taxonomy, type, v14 identity layer). Binding.
3. **`04_VISUAL_FLOW.md`** — the cadence score + form-from-meaning figure inventory.
4. **`05_REVIEW.md` + `06_OVERHAUL.md`** — the standing critiques and what was executed vs deferred.
5. **`02_CONTENT_MAP.md` + `00_PLAN.md`** — plate↔source mapping and the original fidelity contract.
6. The deliverable: **`prototype/index.html`** (single file; `prototype/data/*.json` = machine-readable layer; `prototype/verify_server.py` = optional live-verify helper).

## The two laws (non-negotiable)

1. **Fidelity.** Every figure/quote/date verbatim from the source package. After ANY content edit, run from the `Mad Money/` root:
   `python3 "_Tools/_Claude Cowork/verification/fidelity_check.py"` → must print `FIDELITY: PASS`. Verbatim facsimile strings carry class `vq`. Never invent derived figures (roundings count as inventions).
2. **The design system** in `01_DESIGN_SYSTEM.md` — semantic color only (ink system / acid = money flagged / cobalt = verified), only documents are boxed, form-from-meaning figures, no red, no italics, no serifs.

## Verification environment notes

- `verify.py` full run ≈ 2 min; in time-capped sandboxes use `verification/run_verify_chunked.py` (resumable; state in /tmp). Expected: 128/128 SHA · 53 PASS / 56 INFO / 0 FAIL (+ B.3 may exceed a 45s process cap; package-recorded PASS).
- `requirements.txt` upstream is missing `openpyxl>=3.0` (see `_Tools/REQUIREMENTS_NOTE.md`).
- Local run outputs already captured: `verification/verify_run_2026-06-10_summary.txt` + `_pass2.txt`.

## Open threads (as of handoff)

- Counsel-print pass (plate-per-page PDF) — unstarted.
- Hand-tuned mobile layouts for the access matrix + waterfall figures.
- Optional check-stroke texture band (Ki-landscape analog) — awaiting Julia's call.
- Hosting: file-sharing only; if a URL is ever needed, gate it (counsel-only material).

## Kickoff prompt (paste into a fresh Cowork session with the folder mounted)

> Read `_Tools/_Claude Cowork/README_HANDOFF.md` and follow its reading order to reconstruct the project state. Confirm the fidelity suite passes before and after any change you make. The deliverable is `_Tools/_Claude Cowork/prototype/index.html`. Continue from the open threads or my new notes, appending decisions to `03_PROCESS_LOG.md` as numbered entries, same format.
