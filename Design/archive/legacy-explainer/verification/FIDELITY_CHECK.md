# Fidelity Check — prototype/index.html ↔ source corpus

## Addendum · 2026-06-10 second pass (post-v7, full re-verification)

1. **`verify.py` re-run from clean state** (fresh checkpoint, all 110 findings): **identical to first pass — Phase 1: 128/128 SHA-256 PASS; Phase 2: 53 PASS / 56 INFO / 0 FAIL / 0 ERROR**; B.3 again exceeded the sandbox 45s per-call cap (package-shipped output records PASS $22,789,412.78). Full row dump: `verify_rerun_2026-06-10_pass2.txt`.
2. **Automated fidelity suite: PASS** — 167+ dollar figures, all percentages/ratios, all quote fragments, all 65 `vq` facsimile strings verbatim against Summary/Receipts/START_HERE/Instructions.
3. **Diagram-label audit (new): 22/22 structural claims grounded** in source sentences — orbit stations & legs (session-routing, hidden-account funding, $99,999.99 cap, zero pennies on 2105, 2–4 lumps/mo, round-dollar mirroring, no-obligation receiver, refund destination, delayed/bundled redeposits), void ("not attributable to a recognizable category"), 943 perimeter ("none of them touch Account 1072"), 747 readout ("not one … independently confirmed"), circuit (5,873 / zero "CashPro"/"BillPay"), superposition ("all things to everyone"), triangle (0.005%), penny (penny-residual signature; zero $0.01/$0.02 on 2105), dual-book (suppressed from the GL header index), forfeiture (§11.09(b) language), $352.47 and ~$325M (§8.4). One initial probe mismatch was a quote-punctuation artifact in the audit script, not in the page.
4. **Honesty markers intact post-redesign:** every facsimile still carries "layout reconstructed, not a scan"; the loop ledger is tagged "MECHANICS PER ANNEX A.1, CONDENSED"; the CashPro panel still says "not the screenshot itself."

---


*Run 2026-06-10 against: Summary.md (incl. Annex A), Receipts.md, START_HERE.md, Instructions.txt, Executive_Summary.md, README.md, and the local verifier output. Checker script: `fidelity_check.py` (this folder). Normalization: NFKC, curly→straight quotes, dash/ellipsis unification, bold-marker stripping, whitespace collapse.*

## Results

| Class | Extracted from prototype | Method | Result |
|---|---:|---|---|
| Dollar figures ($ / HK$, incl. M-forms) | **167** | exact substring in source (accounting-paren form accepted) | **167/167 verbatim** |
| Percentages & ratios (n%, n×) | 37 | exact substring | **37/37 verbatim** |
| Quoted material (.q blocks + &ldquo;…&rdquo; spans) | 98 items | per-fragment (ellipsis-omission aware) | **0 failing fragments** |
| Dates m/d/yyyy | 79 | exact substring | 62 exact; **17 format variants** (see below) |
| Findings register | 110 rows | generated from local verifier output | 1:1 (ids, statuses, labels) |
| HTML structure | — | parser tag-balance | balanced, 0 errors |
| JavaScript | — | `node --check` + headless run | syntax OK, 0 runtime errors |
| Interactions | — | headless Chromium (Playwright) | progress/READ, scrollspy, rail toggle, findings search (e.g. &ldquo;1711&rdquo;→7 rows), hover-isolate all functional |

## Notes & resolved items

1. **Fixed during pass:** `HK$58.2M` → restored to source-exact `HK$58,184,579` (source does not round this figure). Adweek quote restored verbatim (&ldquo;has grown consistently, retaining our team through ups and downs—and even the worst of the pandemic&rdquo;). Sherman quote extended to full clause (&ldquo;…and Whitney was not let go&rdquo;). &ldquo;1711 was air traffic control, not a runway&rdquo; quoted in full. &ldquo;No profit share to start&rdquo; capitalization corrected. Authorization-to-Borrow language restored to &ldquo;Any 2 of the following: David Eisenman, the CEO / Daniel Tucker, the CFO.&rdquo;
2. **Date format variants (17):** prototype prints m/d/yyyy (zero-padded in timeline) where the source writes prose dates (&ldquo;May 1, 2023&rdquo;) or unpadded forms (&ldquo;3/14/2024&rdquo;). Every variant was hand-confirmed to be the same calendar date as the source; no date value differs. List: 02/05/2016, 03/14/2024, 04/30/2025, 05/01/2023, 05/22/2017, 05/24/2023, 08/27/2024, 10/02/2024, 10/04/2023, 10/3/2023, 11/03/2025, 12/07/2022, 12/08/2023, 12/27/2020, 3/1/2023, 5/1/2023, 9/14/2023.
3. **Accounting-paren figure:** prototype&rsquo;s `−$870,733.21` corresponds to source&rsquo;s `$(870,733.21)` (RGD contra) — same value, sign notation differs by convention.
4. **Source-internal $138.0M variance** (§2.1 prose $137,966,462 / register total $137,976,747 / Receipts A.1 $138,004,462) is reproduced as-is and footnoted on Plate 02; no silent reconciliation.
5. **Ellipsis omissions inside quotes** are used only where the package itself is being excerpted; every fragment on each side of an ellipsis is verbatim (verified mechanically).
6. **Verification claims on Plate 09** state both the package-expected output (54/0/0/56 across 110) and the actual local run (P1 128/128; 53 PASS / 56 INFO / 0 FAIL; B.3 45s-cap with package-recorded PASS) — no overclaim.
7. **Diagram labels** are layout-shortened in two places (loop figure: &ldquo;ACH LUMPS ▸&rdquo;, &ldquo;PORTAL ▸ / CAP + RESIDUAL&rdquo;); the full verbatim descriptor `AMERICAN EXPRESS DES:ACH PMT INDN:BERNARD D MALAKY CO ID:1133133497` is printed on the same figure, and full phrasing appears in adjacent prose. No figure or quote is altered by these labels.

## Visual QA (headless Chromium 148, 1440×950 and 390×840)

Plates 00/03/04/06/09 screenshot-reviewed; nav-overlap at 1440px resolved (maxw 1200, nav hidden <1340px); circuit and loop label collisions resolved; rail-matrix toggle, findings browser, and reveal animations confirmed; zero console errors.

**Verdict: the prototype is figure-, quote-, and framing-faithful to the package as of this run.** Any future content edits should re-run `fidelity_check.py`.
