# Creative Peaks: local source inventory

Inspected 16 September 2026. This is a read-only inventory of local files and their observed fields, not a determination of fraud or recipient settlement. CASE-01 claims remain a separate layer; see [episode-01-draft.md](episode-01-draft.md). No source files were changed and no supplied analysis scripts were executed.

The usable evidence is currently **export-level**. The packaged BILL exports and QBO journal support identifiable bill/payment/ledger observations. The bank files are consolidated or extracted CSVs carrying statement locators; they are **not native bank statements**. Original statements, a working payment audit, and a unique bank-return link were not located. Two date/direction conflicts and one incorrect derived join must survive any adaptation.

## Scope and integrity

All paths below are relative to `/Users/juliacompton/Documents/Ø/The Madwell Architecture/validation_package/`. File labels are inventory identifiers, not original exhibit numbers. `local` provenance applies throughout. Instructions were read from `/Users/juliacompton/AGENTS.md`; no more specific AGENTS file was found in the source tree. The spreadsheet skill informed read-only CSV inspection and separation of source values from calculated comparisons.

`REPRODUCIBILITY/reading/SOURCE_MANIFEST.md` declares SHA-256 values for 111 source files. Its historic paths use `Bank Statements`, `Bill.com`, and `Quickbooks`; the local package uses `Banks`, `BILL`, and `QB`. The hashes below were computed from the actual bytes. “Matches” means the computed digest appears in the manifest. This establishes consistency with that manifest, not completeness, correctness, native provenance, the identity of an exporter, or authority over the later CASE-01 account. File modification dates were not used to choose a canonical version. No manifest establishing the authoritative September 2026 corpus was located.

| ID | Exact relative path | Character of file |
|---|---|---|
| B1 | `Banks/Combine Statements_Madwell BoA_2019-2024.csv` | Consolidated/enriched statement extraction; includes classifications, source filename, and page fields |
| B2 | `Banks/chase_additional_transactions.csv` | Statement extraction with parser/classification fields; direction requires original-page verification |
| BN | `BILL/Exports November 2025/3142087651595154464_Madwell_Bill_11-14-25-060716.csv` | Packaged BILL bill export; later snapshot |
| PN | `BILL/Exports November 2025/3142087767626386927_Madwell_Payment_11-14-25-060730.csv` | Packaged BILL payment export; later snapshot |
| FN | `BILL/Exports November 2025/3142088456155106656_Madwell_Funds_Transfer_11-14-25-06085.csv` | Packaged funding-transfer export; no unique transfer ID column |
| BM | `BILL/Exports from May 2025/3019846565496268547_Madwell_Bill_05-29-25-141603 (1).csv` | Earlier packaged bill snapshot |
| PM | `BILL/Exports from May 2025/3019846974298497443_Madwell_Payment_05-29-25-141652.csv` | Earlier packaged payment snapshot |
| FM | `BILL/Exports from May 2025/3019848671145928536_Madwell_Funds_Transfer_05-29-25-14201.csv` | Earlier packaged funding snapshot |
| FT | `BILL/Exports November 2025/09. FundsTransferDetail_rpt1114070123.csv` | Detailed export/report with SentPay and ACH fields; 5,485 data records including subtotal/total rows |
| AU | `BILL/Exports November 2025/10. ApproverAudit.csv` | 29-byte error response, not an audit dataset |
| Q1 | `QB/Madwell LLC_Journal_2024.csv` | QBO journal report export, including report/group headers |
| Q2 | `QB/1072_all_years.csv` | Account-specific derivative; corroborative locator, not independent evidence |
| D1 | `BILL/billcom_bank_reconciled.csv` | Derived join/risk classification table; contains an incorrect CP bill join |
| IX | `BILL/bill_query_pdfs_index.json` | Derived index of 585 PDF names/previews; not the PDFs |

| ID | SHA-256 | Manifest |
|---|---|---|
| B1 | `b79176a6837843749b7cccb3d17cea8cec889763e1993b47bdb18789f7703823` | Matches |
| B2 | `4fee4962303b1019586719405331518f8a7c8be5d7b197ac213560d595c1e328` | Matches |
| BN | `50b4f8661f65fd1a69f8683b9680ada2ef78bca30bfe2cb385ccf18b43a07c35` | Matches |
| PN | `8ab82d2bb3f7b7701259bca988b18cc79239a39cbbf9409b8b9069349aa26be6` | Matches |
| FN | `012f982a5b4438bcef0508b7364c9031961dfcda524e29e192b78bf6d85643ae` | Matches |
| BM | `83dada2a2f8afb9b09dd927d24c12b0d221cfa7e8f938449f38e2a82a77bb6a0` | Matches |
| PM | `c85e9666153d6da5d83e376ffd89cd8c378ee9e75ecba86cbcfa91d8b46103d9` | Matches |
| FM | `6ab5473a04d944bcb057aabe44a43b35e3b3e1d26df15869e615bc70a68a7f45` | Matches |
| FT | `6d09229da4a52b52d17c766f641ee392a5b8369f30dfa3875f6509d9734a2771` | Matches |
| AU | `7b442de2ff9e0ed66d090bebd51d2b171f03e096fc62937874cf4165b8003fe8` | Matches |
| Q1 | `e067678197ac9baa7c33dbf1d17c29a44254ef065ce1b3a322d5a8635804c3bf` | Matches |
| Q2 | `c2446200d5fe8ee55e21d4f20d1f60abc82a1d04fab5b321839d47cba038c252` | Not listed by this digest |
| D1 | `16586f4f55d9029303a74aa4750b3d613046ae00780141dc21bf0879dc2dd683` | Matches |
| IX | `34d5ecc1e8485f4a77a4ac4a010b27b31015ddf434aecfbe75c6cdc8fbdb538b` | Not listed by this digest |

Manifest itself: `b8e2a820da33d947b3dfc990962b9e4b8ed1b5bc650e80878aa182593a86f85f`. Package `README.md`: `a92eea4c4712f2743bd47d0762e0f13e3edb76dcbed2494189ed09c0d3b5d529`; its stated date is 18 May 2026. Historic README, START_HERE, and archived narratives are leads, not controlling interpretations of these rows.

## Exact observation references

CSV record numbers are one-based, counting every parsed record from the beginning of the file. In the ordinary exports, the header is record 1. Physical line numbers were checked separately. They equal record numbers for the cited BILL and bank records. Q1 contains report headers and multiline cells, so both numbers are provided. Its numeric group labels are called **report group labels** here; their status as native QBO transaction IDs has not been established.

| Reference | Locator | What the file establishes |
|---|---|---|
| CP-BILL | BN record/line 11940; BM record/line 11927 | Creative Peaks LLC, invoice `8`, invoice/GL posting date `09/30/24`, amount and paid amount `23500.00`, due date `10/07/24`. `Payment Terms Name` separately says `Due upon receipt`. Preserve both fields. |
| CP-STATE | Same BN/BM records | `Approval Status=Approved`; `Status=PaidInFull`; `UI Payment Status=PaidInFull`; `Paid On` and `Full Payment Date=10/21/24`; updated `10/23/24`. These states are observed in two later snapshots, not a continuous state history. |
| CP-PAY | PN and PM record/line 12215 | Confirmation `P24102001 - 2159600`; vendor Creative Peaks LLC; invoice `8`; amount `23500.00`; `Status=Paid`; created `10/20/24`; process `10/21/24`; updated `10/23/24`; method `ACH`; `Is Pay Faster Payment=Yes`; requested delivery `standard`; account `Bill.com Money Out Clearing`, `1072`. |
| CP-BANK-DEBIT | B1 record/line 5833 | Date `10/21/24`; debit `$23,500`; payables description names Creative Peaks LLC, invoice 8, and token `016SQQKNZ3IU6KL`. Original locator fields: `Madwell_BofA Statements_2024.pdf`, `pageNumber=82`. |
| CP-BANK-RETURN | B1 record/line 5834 | Date `10/22/24`; credit `$23,500`; description `RETURN OF POSTED CHECK / ITEM (RECEIVED ON 955210210004019 10-21) ELECTRONIC TRANSACTION`. Original locator fields: same PDF, `pageNumber=80`. This row does not name CP or reproduce the debit token. |
| CP-FUND-DEBIT | FN/FM record/line 820 | Created/updated/date `10/21/24`; amount `-23500.00`; status `confirmed`; GL `10010`; description `BILL 10/21/24 Payables Funding`. |
| CP-FUND-RETURN | FN record/line 825; FM record/line 823 | Created/updated/date `10/22/24`; amount `23500.00`; status `confirmed`; GL `10010`; description `BILL 10/21/24 Payables Funding Return`. |
| CP-QB-BILL | Q1 group `243405`; header record 80570/line 80575; entries records 80571–80572/lines 80576–80577 | Dated `09/30/2024`, Bill `8`, Creative Peaks LLC; credit AP Reclass `20011` for 23,500; debit COGS `50100` for 23,500. |
| CP-QB-PAY | Q1 group `244448`; header record 87624/line 87629; entries records 87625–87626/lines 87630–87631 | Dated `10/20/2024`, Bill Payment (Check), number `8-P`, Creative Peaks LLC; credit `1072` for 23,500; debit AP Reclass `20011` for 23,500. Its transaction-type label is not proof of a paper check. |
| CP-QB-WIRE | Q1 group `247396`; header record 89020/line 89027; entries records 89021–89022/lines 89028–89029 | Dated `10/23/2024`, Expense, name Bill.com; credit account `10048` Chase ending 6976 and debit `1072`, each 23,500. Wire memo contains masked reference `PXXXX2001 - XXX9600` and masked transaction number. |
| CP-CHASE | B2 record/line 1148 | Date `10/23/24`, amount `23500`, account suffix `6976`; description contains **full** reference `P24102001 - 2159600` and `Trn: 3360434297Es`, Bill.Com LLC; `direction=IN`, `section=DEPOSIT`. Source filename `20241031-statements-6976-.pdf`, statement date `20241031`; no page field. |
| CP-QB-DERIVATIVE | Q2 records/lines 9748–9749 | Restates 10/20 CP `8-P` credit to 1072 and 10/23 Bill.com wire debit to 1072. Do not count this as a second independent ledger source. |
| CP-AUDIT-GAP | AU whole file | Exact contents: `ORA-00936: missing expression`. The filename does not make this an approval audit. |
| CP-DERIVED-JOIN-ERROR | D1 record/line 9991 | Correct CP payment confirmation is paired with `Bill_Vendor=Elite Office Cleaning`, `Bill_Inv_Date=04/01/22`, `Bill_Amount=4365.89`, unrelated descriptions/accounts, and derived overpayment/stub classifications. These bill associations are contradicted by CP-BILL. Exclude them and their dependent risk labels. |

Bill description is literally `2nd 50% of Muse Video (60" version)`. The line is assigned to account `COGS - Vendors & Services` / `50100`, department `1 New York Office - (Ops/Cogs)`, customer `ELF23-112S-2 Muse Starfish`. These are exported accounting labels; they do not by themselves establish the legal entity that received the work or who controlled payment.

The bill creator field is `00601NEQXUFVRIJ6gwek`; payment creator is `00601ZYFHXSFUIA6dm8c`. They are account identifiers, not verified human identities. `Vendor Id` and bill `Integration ID` are blank. The payment confirmation is useful across PN/PM and B2; neither export supplies a CP SentPay ID. Do not promote an account label, blank ID, or descriptive match into a stable native entity/object identity.

## Conflicts and limits of the joins

**Return date.** CASE-01 p31 reportedly dates the CP return October 21; the case-binding agent handles that source claim. B1 and FN/FM instead distinguish October 21 funding/debit from an October 22 return posting. The return description refers back to October 21. The game must preserve the dates by source and event type until the original statement and payment lifecycle resolve them. A QBO payment date of October 20 is a third kind of date, not an interchangeable timestamp.

**Chase direction.** B2's exact payment confirmation makes it a much stronger link than amount alone. But its `IN/DEPOSIT` classification conflicts with Q1's credit to Chase/debit to 1072. A parsing or classification error is possible; it has not been demonstrated. The original Chase statement is required before calling this a verified bank debit or a verified replenishment. Even a confirmed transfer to BILL would not independently prove recipient settlement.

**Return identity.** B1's adjacent equal debit/credit and BILL's matching funding/return descriptions support a candidate lifecycle. The bank return lacks the CP name and ACH token. Native return trace, funding-transfer ID, or explicit parent-child link is still needed for a unique external join. Separate PN records 12230–12231 concern HITENY S.A. invoice 38, also $23,500, with different confirmations; amount-only matching can attach the wrong transaction.

**Status is a snapshot.** May and November exports each say `Paid` / `PaidInFull`. That supports the later displayed states. It does not prove the status was unchanged at every intervening moment, who set it, whether another route settled the invoice, recipient receipt, intent, or loss. `Cancel Request Submitted=false` is also a snapshot field, not proof that no return or other lifecycle event happened.

**Missing detail is a coverage result.** FT contains no case-insensitive `Creative Peaks` match and no match for the CP debit token or payment-confirmation suffix in the targeted search. This establishes a gap in the inspected report, not a missing payment in the world. AU cannot fill it. Do not treat the report's omission, or a derived `FTD_Match=NONE`, as evidence of wrongdoing.

## Ordinary pooling comparison

One compact comparison has an exact shared-token join at export level. It demonstrates why several allocations need not imply several bank withdrawals.

| Reference | FT record/line | Vendor/invoice | Amount | Disbursement / SentPay |
|---|---:|---|---:|---|
| POOL-MEMBER-A | 348 | `Katherine  Beherec` / `3-14` | $1,920.00 | `015OZHZFSPZEF5L` / `stp01JSJYMPZAL1l090n` |
| POOL-MEMBER-B | 349 | `Scott Nolan` / `12519` | $2,600.00 | `015ZXKVSAPZEF5M` / `stp01TZPQLHJSS1l0912` |

Both FT records have process date `02/14/19`, funding source Bank of America ending 2105, and ACH confirmation `015ECWFDPPZCFOP`. Their displayed sum is **$4,520.00**. `POOL-BANK`: B1 record/line **89**, date `2/14/19`, shows a $4,520 debit, the same confirmation, and description `Multiple Payments`. Its original locator is `2 Bank of America_Madwell LLC_February 2019.pdf`, `pageNumber=3`.

This is an **export-supported pooled-funding comparison**, not a fully verified legitimate-payment control. The bank extraction displays whole dollars; a displayed equality cannot certify original cents. Native bank/recipient records and coverage of the funding group remain unchecked. It is not asserted to be one of CASE-01's ten pools or its SiriusXM control. Those populations have not been tied to native records in this pass.

A weaker multi-invoice candidate is FT records/lines 5408–5410: LOCAL SIXTY NINE LLC invoices `0000163`, `0000162`, `0000167`, totaling $50,416.48, shared ACH `016DSZHYT23TIT2`, disbursement `016HCBZLG240BKV`, SentPay `stp01ZZFCDTFZR3ah5cc`, process `02/03/22`. B1 record/line 3111 shares the token and date but displays only $50,416; locator `Madwell_BofA Statements_2022.pdf`, page 14. This cannot supply cent-level closure either.

## Missing originals and next binding requirements

The source tree and relevant immediate parent were inventoried without executing their code. Exact-filename searches were also run beneath `/Users/juliacompton/Documents` and `/Users/juliacompton/Library/Mobile Documents/com~apple~CloudDocs/ICLOUD-bridge/_ALLM` for `Madwell_BofA Statements_2024.pdf`, `20241031-statements-6976-.pdf`, and `2 Bank of America_Madwell LLC_February 2019.pdf`; no matches were returned. This is a bounded filename search, not proof the originals do not exist under other names, in archives, or elsewhere. IX is an inventory aid, not an original-source substitute. Its relevant missing objects were not recovered.

To close the episode: obtain the cited original BoA pages and Chase statement; preserve hashes and actual page locators; obtain the native bill/payment object IDs, complete audit/export with lifecycle timestamps and time zone, and explicit funding/return linkage; identify actor accounts through independent access/user records; and obtain recipient settlement or replacement-payment evidence. The full confirmation links the Chase description to the BILL payment, but the unresolved direction and missing settlement layer remain material.

For the reader now, show literal export fields beside CASE-01 claims, mark the October 21/22 and Chase-direction conflicts, and label the conclusion **recipient settlement unresolved**. A synthetic exercise may demonstrate a return/status mismatch, but it must not borrow a definitive historical ending from the scenario designer.
