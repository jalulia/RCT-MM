# The Madwell Architecture — Interactive Dossier: Build Plan

*Claude Cowork working folder · created 2026-06-10 · Julia's brief: a highly engaging, well-designed, shareable frontend for the Madwell Architecture package, 100% true to documents, styled on the AC-Pico technical-catalogue system (modernism + methodological presentation + dense-information visualization), minus AC branding.*

---

## 1. What this is

A single-file HTML dossier (`prototype/index.html`) that renders the counsel package — Summary.md (incl. Annex A), Receipts.md, START_HERE.md, verify.py output — as a navigable "plate" document. It is a **reading instrument for the existing package**, not a new analysis. Every figure, date, name and quote traces to a named source section or finding ID.

Audience note: every source document is marked *DRAFT — Counsel briefing only — Not for circulation*. The frontend carries that marking on the topbar, cover, and footer. "Shareable" here means shareable within the counsel/review perimeter as a single file.

## 2. Design reference — what we take from AC-Pico

Studied at source (https://jalulia.github.io/AC-Pico/, raw HTML + CSS). We adopt the **system**, not the brand:

- Plate structure: numbered PLATE sections, 2px rules, mono running heads (`PLATE 03 / Data Flow · [Fig. 03]`), huge tight-tracked titles, `/ slash` subtitles.
- Document chrome: fixed topbar (doc ID · READ NNN/100 counter · 2px progress bar), fixed right-side index nav with [0–9] hotkeys and active states.
- Frames: corner-tick frames (┌ ┐ └ ┘) around figures, frame-heads with SPEC/Fig labels.
- Spec rows: mono key / sans value tables; pulsing status dot.
- Drawing language: stroke-based SVG diagrams, 8.5px mono labels, numbered callout circles, hover-to-isolate groups.
- Domain color-coding: small accent dots/labels mapping each "rail" to a color (used sparingly on a near-monochrome paper/ink base).
- Interactions: segmented toggles, reveal-on-scroll (reduced-motion safe), legend rows hot-linking to diagram groups, an interactive "try it" element.
- Typography: grotesk sans + IBM Plex Mono pairing (we use Schibsted Grotesk + IBM Plex Mono via Google Fonts; offline fallback to system stacks).

What we do NOT take: the Arcade Commons logo/mark, the "Arcade Commons" palette names, any AC text.

Full token spec: `01_DESIGN_SYSTEM.md`.

## 3. Information architecture — plates

The package's own reading order (START_HERE → Summary §1–12 → Annex A → Receipts → verify) maps to 10 plates:

| Plate | Title | Source of truth | Primary visualization |
|---|---|---|---|
| 00 | Cover / The Dossier | START_HERE thesis; Exec Summary §1 | Spec rows; closure-identity hero; rail legend |
| 01 | The Equation (A.6) | Summary §2.8, Receipts §A.6 | Animated three-term arithmetic; perimeter cards |
| 02 | Superposition (inflow) | Summary §1, §2.1 | Year-register table 2018–2023 w/ delta bars; three-witness convergence |
| 03 | The Circuit | Summary §3 (Steps 1–7) | AC-style flow diagram, hover-isolate steps |
| 04 | The Eight Rails (outflow) | Summary §2.2 (+2.2.1–2.2.3) | By-rail-by-year matrix; chassis-rotation toggle (2018–23 vs 2024) |
| 05 | Mechanism Catalogue | Summary §4.1–4.10 | Component-card grid ("silicon" style), expandable, finding-ID tagged |
| 06 | The AMEX Loop | Annex A (+§2.3, §2.7, §4.8) | Loop diagram w/ numbered callouts; cap-and-residual table; 8 foundations |
| 07 | Timeline 2011–2025 | Summary §4.8/A.4 timeline + §8 + §4.9 | Dense vertical chronology, era bands, domain-coded |
| 08 | Roles & Access | Summary §5 (+4.6.8) | Access-matrix cards; Sojka-exclusion register |
| 09 | Proof Discipline | START_HERE proven-vs-inferred; §9–10; Receipts; my verify run | Findings browser (filter/search all 110); verification panel; five-production diagonal |

## 4. Fidelity rules (the "100% true" contract)

1. **Numbers verbatim.** Dollar figures, counts, percentages, dates exactly as the Summary/Receipts state them; rounding only where the source itself rounds (e.g. "$141.5M"). Cross-checked against my local verifier run (see `verification/`).
2. **Quotes verbatim or absent.** No paraphrase inside quotation marks.
3. **Source tagging.** Every plate carries § references; findings carry IDs (A.1–A.6, B.1–B.84, C.1.*, P1).
4. **Proven/inferred line preserved.** Inferred items (HK landing accounts, Malaky refund destination, Source 04 (a)-vs-(d), intent) are labeled exactly as the package labels them. PASS vs INFO status shown per finding.
5. **Allegation framing.** Cover and footer state: forensic claims prepared by Christopher Sojka through the Foxhunt workspace; draft; counsel briefing only; method-level findings with act-level attribution pending production (§10).
6. **Verification honesty.** The verification panel reports the package's expected output (54 PASS / 0 FAIL / 0 SKIP / 56 INFO across 110) AND my actual sandbox run (P1 128/128; 53 PASS / 56 INFO / 0 FAIL; B.3 not completed locally — 45s process cap — package-recorded PASS).

## 5. Technical decisions

- **Single file**, no build step, no external JS. Google Fonts is the only external request (with graceful fallback).
- Vanilla JS: scroll progress, scrollspy, hotkeys 0–9, reveal observer, segmented toggles, findings-browser filter, diagram hover-isolation. All ~no-dependency.
- Data for the findings browser inlined as a JS array generated from the package's findings index + my verifier run.
- Responsive to ~380px; side nav hides under 1180px (as reference does); `prefers-reduced-motion` respected.
- Print stylesheet: plates paginate cleanly (counsel will print).

## 6. Deliverables in this folder

```
_Claude Cowork/
  00_PLAN.md                 ← this file
  01_DESIGN_SYSTEM.md        ← tokens, type, components, diagram language
  02_CONTENT_MAP.md          ← plate-by-plate source map + fidelity contract
  03_PROCESS_LOG.md          ← what was done, in order, with outcomes
  prototype/index.html       ← the interactive dossier (open in any browser)
  verification/
    verify_run_2026-06-10_summary.txt   ← my aggregated verifier output
    FIDELITY_CHECK.md        ← figure-by-figure prototype↔source crosscheck
```

## 7. Sequence

1. ✅ Deep read of package; full verifier run (109/110 locally; B.3 time-capped).
2. ✅ Design-system extraction from AC-Pico source.
3. Write design system + content map docs.
4. Build prototype skeleton (chrome, nav, cover) → plates in order → JS.
5. Fidelity pass: scripted grep of every $ figure in prototype against source docs; manual quote check; record in FIDELITY_CHECK.md.
6. Hand off to Julia; iterate on her notes (open points listed in 03_PROCESS_LOG.md §Open questions — e.g., whether Mir's tooling should consume the same inlined findings data).

— Claude (Cowork), 2026-06-10
