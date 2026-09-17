# Design System — Madwell Dossier · Codified Spec (v7)

*The authoritative system as built. Earlier iterations are preserved in `03_PROCESS_LOG.md`; the cadence score and form-from-meaning inventory live in `04_VISUAL_FLOW.md`. Reference lineage: AC-Pico plate grammar × Obys/Swiss-canon print discipline (Ruder · Müller-Brockmann · Vignelli).*

---

## 1 · Color law — three colors, three meanings, nothing decorative

| Token | Value (paper / dark) | Meaning | Never used for |
|---|---|---|---|
| ink ramp | `#16181C` → `#BCC1C6` | the system: text, chrome, rules, figures | — |
| **acid flag** | highlight `#F0E63C` · text-on-dark `#E8D437` | **money flagged** — gaps, outflows, the void total, $352.47, "zero/none" findings | navigation, decoration, emphasis of prose |
| **cobalt** | `#2B3BE0` / `#7D8CFF` | **verified** — PASS chips, the triangulated point, the A.6 residual | anything unverified |

Acid renders as a **highlighter ground under ink text on paper** (a flagged ledger line) and as **acid text on dark**. There is no red anywhere in the document. Claims (filings, operator-authored labels) are encoded by **dash/hatch**, never by color. Rails are **one tonal ink ramp** — one mechanism, lightness ∝ dollar magnitude — remapped per ground (`--r-*` swap inside `.band--ink`).

## 2 · Grounds — three registers

| Ground | Use | Furniture |
|---|---|---|
| paper `#FCFCFB` | arithmetic, narrative | 5% grain, tick-rulers under plate rules |
| manila `#F1E9D8` (full-bleed) | evidence only | faint ledger ruling; exhibits cast hard offset shadows |
| ink-deep `#0F1114` (full-bleed) | the machine: rails chart, the loop, act dividers, closing | CSS-var remap makes every component dark-native |

Dark is rare by rule: two dividers, two figure zones, the closing.

## 3 · Object taxonomy — same name, same dress, always

| Object | Tag | Dress |
|---|---|---|
| **FIG** | inverted `FIG` chip | corner-tick frame — the only object with ticks; analytic drawings |
| **DATA** | outline `DATA` chip | heavy top+bottom rules, no side borders, full-width columns; verbatim registers (usually demoted behind a `+` disclosure) |
| **EXHIBIT** | `№ NN` auto-counter | 1.5px ink card, doc-type bar, bordered tag chip, hard offset shadow on manila; verbatim text, captioned "layout reconstructed, not a scan" |
| **SPEC** | — | bare rule-rows; identity rows lead at 19px/600 |
| **NOTE** | outline `NOTE` chip | 2px left hairline, no frame; analyst prose & honest-limits |
| **INDEX** | outline `INDEX` chip | ruled list rows under a top rule (foundations, legends, findings browser) |
| **TAKEAWAY** | mono kicker | full-rule band, one sentence ≤34ch/32px, underline draws on reveal |
| **INTERSTITIAL** | — | single drawn figure, ≥130px air, one caption; argues by form |
| marking | — | flat ink classification strip (rules above/below, tracked mono). No stamps, no rotation, no theater |

## 4 · Type

- **Schibsted Grotesk** — display & body. Lockups pair 300/700 in one line (The Madwell **Architecture**, Eight **Rails**). No italics anywhere in the document; emphasis = weight, or bold+drawn-underline in takeaways.
- **IBM Plex Mono** — all chrome, labels, figures, descriptors, counters. Tabular numerals everywhere numbers column.
- **Caveat** — exclusively for documented handwriting (the struck-Member/CFO correction). Nothing else.
- Quoted blocks hang their opening quotation mark (−.42ch). Scale ladder: masthead clamp(58–162) · divider numeral ≤170 · plate title clamp(38–64) · ghost numeral 110–220 solid `--line` · pull 21–34 · body 16 · annotation mono 8.5–11.

## 5 · Print furniture (CSS counters — automatic)

Plate folios `— 03 / 09 —` close every plate; every exhibit doc-bar carries `№ NN`; heads carry counts — Evidence (2), witnesses (3), instruments (12), foundations (8), findings (110); ✱ marks only notes that annotate the object above them.

## 6 · Diagram grammar

Stroke hierarchy 1.6 / 1.2–1.4 / 0.8–1. Nodes = rounded chips with mono index (`01 ·`), title, one-line sub. Labels never float: 1px leader ticks tie them to geometry. Arrowheads = small solid triangles. Money legs dashed-acid; return/comparison legs pale; unresolved = dashed outline + reduced opacity. Every FIG carries a one-line legend strip. Dense figures pair with a **"Read the …" ledger** aside — numbered one-liners for click-ready comprehension.

## 7 · Motion tiers

T1 (count-ups, bar/stack growth, dash crawl, drawn underlines) only on load-bearing figures; T2 staggered reveals; T3 hovers (cards sharpen to ink, summaries thicken underline; non-interactive rows keep default cursor). Everything gated by `prefers-reduced-motion`.

## 7.5 · v14 — air & identity (world-building layer)

**Only documents are objects.** The border is now semantic: if something is boxed, it is a document. Mechanism cards, cast cards, and info cards de-boxed to top-rules + 64px gutters (editorial lists, not card walls).

**Document types are micro-brands** under the constant № exhibit sticker: `doc--email` (soft corners, open double-hairline header) · `doc--stmt`/`doc--alert` (square corners, tracked caps, tabular — banks are square) · `doc--form` (square + offset outline, the government double-rule) · `doc--ledger` (ruled paper through the body) · `doc--report` (dotted leaders) · `doc--files` (filled tree panel) · `doc--screen` (a true dark terminal with its own var remap). The dossier's chrome stays constant across them — evidence stickers on foreign papers.

**Players carry monogram marks**: 46px geometric two-letter rings. State grammar: filled = principals (DE, DT) · outline = professionals/staff (MB, MG, CW, HK) · dotted = the conduit (BM) · **dashed = the excluded (CS)**.

**Grain is a material, not a wash**: paper tooth at a whisper (2.8%); pixel-sharp high-frequency grain (180px tile, screen-blend, 16%) reserved for ink-deep moments — bands, dividers, the closing, the terminal.

**Air scale**: kickers 88px clear; takeaways 104px; plate titles to clamp(42–76); ghost numerals to 260px and allowed to crop the right edge; cover masthead to 188px; measures narrowed (kickers 56ch, card prose 52ch). Timeline gains hierarchy: five hinge events sit larger on heavier dots; everything else stays quiet.

## 8 · Fidelity coupling (design ⇄ truth)

Verbatim strings inside facsimiles carry class `vq`; `verification/fidelity_check.py` machine-checks every $ figure, %, quote fragment, and `vq` span against the corpus on every edit. Diagram labels are audited against source sentences (see FIDELITY_CHECK.md). Reconstructions always disclose themselves. Status claims show the package-expected verifier output **and** the local run.
