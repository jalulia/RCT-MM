# Visual Flow Score — v3

*The cadence plan. The document reads like a film: three acts, three tonal registers, alternating density. Every beat below names its ground, its dominant element, its type scale, and its motion tier — so the scroll has a planned rhythm of big → dense → pause → land.*

## The three registers

| Register | Ground | Voice | Used for |
|---|---|---|---|
| **A — Arithmetic** | paper `#FCFCFB` | Schibsted mega-numerals + mono chrome | convergences, charts, the math |
| **B — Evidence** | manila `#F4ECDD` full-bleed bands | document facsimiles, warm, "exhibits on the table" | every facsimile group |
| **C — Ledger** | ink-deep `#0F1114` full-bleed | light-on-dark mono, machine-room | the rails chart, the AMEX loop, act dividers, the closing |

Plus an **editorial counter-voice**: Newsreader italic (28–44px) for pull-quotes — the package speaking in prose between data movements. Caveat remains reserved for documented handwriting only.

## Type scale ladder

| Level | Spec | Where |
|---|---|---|
| XXL numeral | Schibsted 600, clamp(44–104px), tabular | cover equation (count-up), divider figures ($352.47) |
| Masthead | clamp(64–168px), −.05em, .84 lh | cover only |
| Divider | clamp(40–96px) on ink-deep | two act dividers |
| Plate title | clamp(38–64px) | unchanged |
| Ghost numeral | 120–240px outline stroke, no fill | plate wayfinding, behind headers |
| Pull quote | Newsreader italic 300, clamp(24–40px) | one per act |
| Body / cards / captions | unchanged from v2 | density layer |

## The score (scroll order)

| Beat | Register | Dominant element | Density | Motion |
|---|---|---|---|---|
| 00 Cover | A | masthead → **typographic equation, count-up** | air | T1 count-up |
| 00b | A | spec rows + abstract + compact Fig 00 + marking | medium | reveal |
| 01 Equation | A | four stat tiles → perimeter cards → limits | medium | reveal |
| — takeaway | A | big-type band | air | underline |
| 02 Superposition | A | **register bar-chart** (measured = filed + delta, per year) — table demoted to "as printed" | air→medium | T1 bar-grow |
| 02b | B | manila band: the two-records-of-2023 docs | pause | reveal |
| 02c | A | witness cards, expense-side frame, takeaway | medium | — |
| **DIVIDER I** | **C** | "HOW IT MOVED" + §11.5 sentence in serif | air | fade |
| 03 Circuit | A | hero diagram (enlarged), step cards | medium | dash crawl |
| 03b | B | manila: the two contradicting emails | pause | — |
| 04 Rails | A→**C** | title on paper → **dark band: stacked rail chart by year** (toggle dims eras) — matrix demoted | dense→air | T1 stack-grow |
| 04b | A | trigger cards, statement-strip (manila), takeaway | medium | — |
| 05 Mechanisms | A | **two feature diagrams** (dual-book; forfeiture cycle) → 3 card groups | dense | reveal |
| 05b | B | manila interludes: JE voucher / Transamerica / **Belfer thread** / WBN / FPS | pause | — |
| **DIVIDER II** | **C** | **"$352.47"** XXL + one line | air | T1 count-up |
| 06 AMEX Loop | **C** | whole data zone dark: loop diagram + stats | dense | dash crawl |
| 06b | B | manila: AMEX statement + descriptor anatomy | pause | — |
| 07 Timeline | A | era chronology, embedded CashPro doc, paired instruments (manila) | rhythmic | — |
| 08 Roles | A | cast cards + execution-block facsimile | medium | — |
| 09 Proof | A | proven/inferred → verification → findings browser → **production staircase** | dense | reveal |
| Closing | **C** | final takeaway + marking on ink-deep | air | — |

## Rules of the cadence

1. **Never two dense beats adjacent** — a manila pause or a takeaway band always intervenes.
2. **Dark is rare** — two dividers, one chart zone, one machine-room plate, the close. Its scarcity is its authority.
3. **Motion tiers:** T1 (count-up, bar/stack grow, dash crawl) only on load-bearing figures; T2 reveals everywhere; T3 hover. All gated by `prefers-reduced-motion`.
4. **Tables never lead.** Every table that previously led a section now follows its visualization, demoted into a "as printed (verbatim)" disclosure.
5. **One pull-quote per act**, serif italic — the only non-data voice on the page.
6. **Ghost numerals** carry wayfinding so plate headers can stay quiet.

## v4 — form from meaning

The principle: every figure's geometry is derived from what the thing actually *is*, not from a generic box-and-arrow vocabulary.

| Subject | What it is | The form it got |
|---|---|---|
| Closure identity (A.6) | three independent measurements of one object | **surveyor's triangulation** — three vertices sighting one point, residual at center |
| Fiscal superposition (§1) | one transaction wearing four states | **a fanned pile of paper records**, each "reconciles ✓," disagreement only at the dashed boundary |
| The DataHole (§2.2) | money leaving attributability | **streams pouring into a void** — stroke width ∝ dollars, ink-deep aperture ringed in oxide; Unknown Check dashes back *out* |
| The AMEX loop (Annex A) | a circuit | **an orbit** — stations on a ring, animated circulation, the hidden account dashed-and-faded at the bottom, a −$0.01 satellite |
| The audit perimeter (§3 Step 5) | 943 routine documents and one absence | **a data-texture field**: 943 faint cells, one dashed empty cell outside the wall |
| The HK rail (B.56) | reconciled money, unconfirmed recipients | **747 unfilled ticks** — the field is the finding (confirmed: none) |
| The penny residual | a fingerprint | **a near-empty page** holding −$0.01 |
| Depletion (§8.4) | $325 million → $352.47 | **scale as meaning**: ghost-outline "$325 million" over a small solid counting $352.47 |
| The unresolved (§10) | what production hasn't returned yet | **crosshatch chips** beside each inferred item |

Texture hints (all restrained): 5% fractal paper grain over everything (multiply); faint ledger ruling inside manila bands; the marking rendered as a slightly-rotated double-ring stamp.

Breathing: three interstitial breaks (943-field · 747-field · the penny) at 130px vertical padding — single-figure pages inside the scroll.

## v7 — object taxonomy & the flag system (supersedes v5/v6 color law)

**Red is gone from the document entirely.** The chromatic story is now:

| Treatment | Meaning |
|---|---|
| **ink, solid** | measured fact |
| **dash / hatch** | claimed / operator-authored |
| **acid highlighter `#F0E63C`** | money flagged — gap rows, outflow figures, the void total, $352.47. Ink text on acid ground (paper); acid text (dark). Reads as a highlighted ledger line, not a colored word |
| **cobalt `#2B3BE0`** | verified — PASS chips, the triangulated point, the A.6 residual |
| **rails = tonal ink ramp** | one mechanism, one family; lightness = dollar magnitude (remapped light→dim inside dark grounds). No categorical rainbow |

**Object taxonomy — every block type has its own dress, consistently:**

| Object | Dress |
|---|---|
| `FIG` | corner-tick frame, inverted FIG tag — analytic drawings only |
| `DATA` | heavy top+bottom rules, full-bleed columns, no ticks — verbatim registers |
| `EXHIBIT №` | 1.5px ink card, № numeral, chip tag, hard offset shadow on manila — document mockups |
| `SPEC` | bare rule-rows; identity rows (subject/magnitude/findings) lead at 19px/600 |
| `NOTE` | 2px left hairline, no frame — analyst prose |
| `INDEX` | ruled list rows under a top rule |
| `TAKEAWAY` | full-rule band, drawn underline |
| marking | flat ink classification strip — no stamp, no theater |

Interstitials are now drawn figures, not textures: the 943 grid sits inside a drawn perimeter with Account 1072 as an acid cell outside the wall ("NEVER INSIDE"); the 747 register carries row indices and a `CONFIRMED 000/747` readout panel.

## v5 — semantic color & print tactility (superseded — kept for history)

Reference recalibration (obys.agency / library.obys.agency · Ruder, Müller-Brockmann, Vignelli lineage): monochrome carries the system; color is **rare and means something**; counts and ticks are the texture; weight contrast is the boldness.

**Color law (three colors, three meanings):**

| Color | Meaning | Appears as |
|---|---|---|
| **ink** | the system | all chrome — slashes, nav, figs, toggles, summaries, progress, emphasis-by-underline |
| **oxide `#B42E20`** | *money leaving* — nothing else | outflow strokes, gap bars, masked/landed labels, the void figure, −$0.01, $352.47, the stamp |
| **cobalt `#2B3BE0`** | *verified/proven* — nothing else | PASS chips, the triangulated "one architecture" point, the A.6 residual |

Serif **removed** (Newsreader dropped). Pull-quotes are now sans 400 against a 2px ink bar, with bold-and-underline phrase emphasis. Caveat survives only as documented handwriting (the CFO correction). Masthead and plate titles run **300/700 weight contrast in one lockup** (The Madwell / **Architecture**; Super**position**; Eight **Rails**). Ghost numerals are solid print-grey, not outline. Obys-grade annotations: counts in heads — Evidence (2), The three witnesses (3), instruments (12), foundations (8), findings (110); registration tick-rulers under every plate rule; ✱ footnote glyphs on every note and caption.

## Palette (v3 full — superseded by v5 color law above)

```
paper #FCFCFB · ink #16181C · ink-2 #595F66 · ink-3 #969CA3 · ink-4 #BCC1C6
manila #F4ECDD · manila-line #E7DCC4 · manila-ink #5C5340
ink-deep #0F1114 · dk-panel #1B1F25 · dk-line #262B31 · dk-text #E8EAEC · dk-dim #9BA1A8
oxide #B42E20 (light ground) · oxide-dk #E0604E (dark ground)
navy #27506E — filed-claims coding (bars, dashed boxes)
gold #B98A2E / #D2A455 — annotation, caution
rails: jw #1F6F8B · ax #B42E20 · ex #4C7A3D · tr #8A5A9E · dv #C77B28 · aw #5B6770 · cm #9C8B5A · uc #3E8E7E
```

Dark zones remap the CSS variables wholesale (`.band--ink { --ink: … }`), so every component renders correctly in both registers without per-component forks.
