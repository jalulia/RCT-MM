# Episode 01 — Creative Peaks and pooled funding

Source-binding draft · 16 September 2026

**Bound at export-field level:** a $23,500 Creative Peaks LLC invoice/payment representation; October 21 funding debit; October 22 return credit; Paid/PaidInFull fields in later BILL exports; and a separate October 23 QBO entry crediting Chase and debiting clearing account 1072. Each item has an exact file/row locator below. **Not yet bound:** the original bank pages, an identifier-complete return-to-payment join, the October 23 bank direction, final supplier receipt or later cure, and the ordinary pooling control.

**Recommendation:** retain Creative Peaks as the first historical payment-state comparison, conditional on these joins. It is suitable for asking what a payment attempt did and what the platform continued to report. It is not yet a historical production-management episode. The fictional fabrication job must remain fictional.

## 1. What was inspected

The reconstruction is **CASE-01**, `The_Zero_Machine_Specific_Story_Reconstruction FINAL.pdf`, a 58-page counsel briefing dated September 2, 2026. Its SHA-256 was recomputed as `9352893711180900fcd770651011c65036504a66570490138d68fcd9a5c253e8`. Cached pages 31, 34, 45–48, 52 and 58 match fresh PDF text extraction after Unicode/whitespace normalization. Pages 34 and 45 were also read visually. `Design/evidence-map.md` supplies the existing design/source context.

The exact CSV records listed below were inspected for this packet. Those are inspected **exports and statement extractions**, not authenticated original statements, invoices, audit logs or recipient confirmations. The source's labels “proved,” “closed” and “false state” remain attributed conclusions.

File paths below are relative to the external `validation_package/` source collection. CSV record numbering counts the header as record 1; physical line differences are explicit. Full file hashes, provenance and discovery status are collected in the companion [native inventory](native-inventory.md). An uninspected original is not an original known to be absent.

## 2. The reconstruction's claims, preserved separately

| Claim | Exact locator | Limit or conflict |
|---|---|---|
| QBO/BILL represents **$23,500 Paid**, under **October 20, 2024** | CASE-01 p.34, first Creative Peaks box | The date belongs to the representation. It is not the bank funding date. |
| Bank debit and exact return; **PaidInFull** survives | p.34, second and third boxes | The bank box prints no individual debit/return date. Duration and observation timestamp are absent. |
| **October 21** cash/value record reports the $23,500 return with Paid state surviving | p.31, §13.5, “OCT 21 CASH / VALUE RECORD” | **Material date conflict:** both inspected bank and BILL funding exports place the return on **October 22**, referencing October 21 funding/receipt. Preserve the printed claim and the contrary fields. |
| Separate **October 23 / $23,500 / 1072 replenishment** | p.34, fourth box | The QBO entry exists in inspected export rows. Actual bank direction and downstream use remain separate questions. |
| Creative Peaks is the closed return/Paid exception; most positive Funding Return values were bank debits | p.46, Appendix G; p.52, R65 | This source warning prevents a general “positive means returned cash” rule. |
| Return/state conflict classified as proved; downstream use open | p.48, T13; retrieval route LR02 p.58 | A source conclusion, not this packet's independent verification status. |

## 3. The inspected export chain

| Event or observation | Exact fields and locators | What it establishes |
|---|---|---|
| Invoice representation | BILL November bill CSV **record/line 11940**: Creative Peaks LLC, invoice **8**, invoice date **09/30/24**, amount **23500.00**, due date **10/07/24**, terms **Due upon receipt**. Description **`2nd 50% of Muse Video (60" version)`**; customer **`ELF23-112S-2 Muse Starfish`**. | Recoverable service/project labels and two distinct due-date/terms fields. Preserve the description literally; do not reinterpret its quote mark as a measurement. This is not the original engagement or proof of performance. |
| October 20 representation | QBO 2024 journal group **244448**, records **87625–87626**, physical lines **87630–87631**: dated **10/20/2024**, Bill Payment (Check), **8-P**, Creative Peaks LLC; credit **1072**, debit **20011**, each **23,500.00**. BILL payment row below has Created Date **10/20/24**. | The date discrepancy with October 21 processing is explainable as distinct recorded events. QBO's transaction-type label does not prove a physical check; BILL identifies ACH. |
| October 21 payment and funding | BILL November payment CSV **record/line 12215**: process **10/21/24**, payment **23500.00**, status **Paid**, confirmation **`P24102001 - 2159600`**, vendor Creative Peaks LLC, invoice **8**, method **ACH**, account **1072**, Updated Date **10/23/24**. Bank combined CSV **record/line 5833**: **10/21/24**, debit **23,500**, Creative Peaks LLC, invoice **8**, token **`016SQQKNZ3IU6KL`**, trace **`906695022995636`**; points to `Madwell_BofA Statements_2024.pdf` **p.82**. BILL funds CSV **record/line 820**: Date **10/21/24**, Amount **−23500.00**, confirmed; description `BILL 10/21/24 Payables Funding`. | Cross-system correspondence through vendor/invoice/amount and dates; a bank extraction records a funding debit. The exact bank token is not exposed in the inspected BILL payment row. |
| October 22 return | Bank combined CSV **record/line 5834**: **10/22/24**, credit **23,500**, `RETURN OF POSTED CHECK / ITEM (RECEIVED ON 955210210004019 10-21) ELECTRONIC TRANSACTION`; source PDF **p.80**. BILL funds CSV **record/line 825**: Created/Updated/Date **10/22/24**, Amount **23500.00**, confirmed; description `BILL 10/21/24 Payables Funding Return`. | Two inspected exports support October 22 as the return date. The return reference differs from the debit's visible trace/token; an explicit return-to-funding identity join still needs its underlying record. |
| October 23 clearing entry | QBO journal group **247396**, records **89021–89022**, physical lines **89028–89029**: **10/23/2024**, Expense, Bill.com; credit **10048 Chase - Madwell - 6976**, debit **1072 Bill.com Money Out Clearing**, **23,500.00** each. Memo contains masked payment reference `PXXXX2001 - XXX9600`. | A recorded replenishment entry; the memo is consistent with the BILL confirmation's visible suffixes. It is not supplier receipt. A Chase extraction reported by the inventory has a full matching reference but contrary IN/DEPOSIT direction: reconcile against the statement before drawing a bank outflow. |
| Later status observation | BILL November payment **12215** has **Paid**. Bill **11940** has **PaidInFull** in Status and UI Payment Status, Paid Amount **23500.00**, Paid On and Full Payment Date **10/21/24**, Updated **10/23/24**. | These fields exist in a November-2025-labelled export inspected now. Updated Date is not a timestamped history of every status transition. This does not establish uninterrupted Paid status from October 2024 onward, or preclude a later cure. |

**Exact export files:**

* Bank: `Banks/Combine Statements_Madwell BoA_2019-2024.csv`.
* BILL funding: `BILL/Exports November 2025/3142088456155106656_Madwell_Funds_Transfer_11-14-25-06085.csv`.
* BILL payment: `BILL/Exports November 2025/3142087767626386927_Madwell_Payment_11-14-25-060730.csv`.
* BILL bill: `BILL/Exports November 2025/3142087651595154464_Madwell_Bill_11-14-25-060716.csv`.
* QBO: `QB/Madwell LLC_Journal_2024.csv`.

**Excluded derived join:** the companion inventory reports that `billcom_bank_reconciled.csv` record 9991 attaches the Creative Peaks payment confirmation to Elite Office Cleaning invoice 8 and unrelated bill/risk fields. This packet does not use that enriched row. Its path and exact conflicting fields belong in the inventory. A shared invoice number is insufficient to join different vendors.

The BILL Vendor Id fields are empty in these rows. Creative Peaks LLC is the exported name, not independently authenticated legal or receiving-account identity. Funding Currency is also blank; the source displays dollars, but an explicit native currency remains to be bound.

## 4. Which connections can be drawn

| Connection | Present support | Missing before stronger assertion |
|---|---|---|
| Invoice 8 → payment representation | Vendor, invoice, amount and payment confirmation within BILL; corresponding QBO fields | Stable object IDs, original invoice and historical vendor/profile identity |
| Representation → October 21 bank funding | Bank description names Creative Peaks LLC and invoice 8; amounts and dates correspond | Native processor-to-bank identifier bridge; any batch membership |
| October 21 funding → October 22 return | Bank return and BILL funds description agree on amount, direction and referenced funding date | Native reversal/return association; reason code and original statement context |
| Return → later Paid/PaidInFull fields | Exported state and source account are compatible with the reported conflict | Complete lifecycle/audit to establish persistence period and distinguish uncured return from later settlement |
| Payment → October 23 entry | Same amount; masked QBO confirmation suffixes; inventory reports full matching Chase reference | Original Chase direction; processor receipt and allocation; actual reissue/settlement result |
| Any of the above → supplier never paid, permanent loss, named operator's purpose | **Unsupported here** | Recipient evidence, later rail search, dated actor/audit records and separate evidence of intent |

Draw bank events as bank events. A bank debit to a processor is not automatically a delivery to the supplier. The visible return credit is not permission to animate the same dollars into a later expense.

## 5. The ordinary control is still an open binding task

The inventory now supplies a compact **export-supported comparison**: FT records 348–349 allocate $1,920 and $2,600 to two vendors, totaling $4,520. Both share ACH confirmation `015ECWFDPPZCFOP` with a single B1 bank debit, record 89, dated February 14, 2019. This is stronger than an amount-only match. It still needs the original statement cents, complete funding-group coverage and the relevant lifecycle records. It is not identified as one of CASE-01’s ten controls. [Inspect the exact rows and limits](native-inventory.md#ordinary-pooling-comparison).

CASE-01 p.45 Appendix G supplies two retrieval leads:

* **Ten ordinary one-bank-event-to-many-BILL allocations, $1,014,217.28 total.** Individual event IDs, dates, member amounts and exhibits are not printed. Select one complete, compact example from its row-level control schedule. Prefer a comparable route when the records support one.
* **SiriusXM, $150,000 genuine bank payment, four later BILL allocation objects.** This is the named fallback for teaching supported payment with later allocation. The PDF does not establish whether it belongs to the ten-control total. Do not call it a matched pooled control until the bank/member relationship is inspected.

The 65 bank-supported versus 43 bank-disproved intercompany routes on p.45 are a different population. The two separate $25,000 events on that page are a useful identity-matching control, not a pooling example. The adjacent Reddit scene on p.34 has a different lifecycle; none of its dates or three-member amounts can fill gaps here.

**Current inventory lead, not independently inspected in this packet:** three LOCAL SIXTY NINE invoices, 0000163/0000162/0000167, share a SentPay/disbursement/ACH token chain and total **$50,416.48**. The matching February 3, 2022 bank extraction retains only **$50,416**; its original locator is `Madwell_BofA Statements_2022.pdf` p.14. This is a promising one-vendor/multiple-invoice allocation, not a verified batch across vendors. Exact cents and original-source closure remain open; see the native inventory.

A valid control must have the original debit, complete member list, allocation arithmetic and enough return/reissue history to support its stated lesson. If its proof stops at processor funding, label that endpoint. Do not promote it to confirmed recipient receipt.

## 6. What remains to collect

1. **Original BofA statement pp.80/82 and the native return record**, including account, date definitions, reference bridge and return reason. Resolve the reconstruction's October 21/22 discrepancy explicitly.
2. **BILL payment/bill IDs, funding association and audit history**, including the October 23 update, any retry/reissue and historical payout profile. Export status alone cannot date all transitions.
3. **Original Chase statement and processor funding record** for October 23. Resolve the extraction-direction conflict before presenting a cash arrow.
4. **One complete ordinary control**, from the ten-control schedule or the SiriusXM chain.
5. **Original invoice, contract, acceptance and recipient remittance**, only to the extent needed for claims about service, obligation, delivery or receipt. The exported customer/description fields improve the lead; they do not establish operational consequences.

Date of event, date represented in accounting, date of record update and date of observation remain separate. Access, receipt, reading and understanding also remain separate if a real person's knowledge enters the episode.

## 7. Conservation, play and the fictional boundary

The reported debit and return net to **zero for that pair**: −23,500 + 23,500 = 0. That is not an available-cash calculation or a conclusion about fees, other payments or final loss. Paid/PaidInFull adds no second cash event. The October 23 clearing entry is neither automatic cure nor a second supplier payment. Never add a selected control to the $1,014,217.28 aggregate before checking membership.

In the historical comparison, the player can inspect the records, separate their dates, test identity matches, assemble a bounded account and identify the next necessary exhibit. They cannot change history. A useful answer may end at an unresolved endpoint. “Not supplied” must never score as “never happened.”

In fictional practice, they can reserve capacity, choose in-house or external work, defer a handoff and request a simulated confirmation. **C-07/O-19/P-04, the $100,000 campaign, $12,000 attempted payment, fabricated component, week-three Thursday deadline, team-day capacity, replacement price, approval roles, cash reserves, supplier dialogue and consequences remain invented.** Replacing the supplier's name with Creative Peaks would not turn them into historical facts. The exported “second 50%” description also does not license treating the synthetic payment as a deposit.

Use separate `practice/*` and `case/*` records. Their comparison concerns a mechanism; it is not an identity mapping. A shared screen must not carry a practice field silently into the historical view.

## 8. Readiness decision

Creative Peaks remains a compact candidate because its central distinction can be taught without accepting the reconstruction's enterprise-wide thesis. The date conflict is useful editorial pressure: it forces the interface to distinguish a source's narration from the records it cites.

Release a historical comparison only at its supported scope: inspect the original return join, establish a later observation of the same BILL object, resolve or visibly retain the October 23 bank-direction issue, and bind one ordinary control. Final supplier receipt may remain open if the episode says so. Complete historical production play requires the separate engagement and delivery chain.

If the ordinary control becomes ready first, test it first. The test is whether a player can explain **one legitimate one-to-many allocation and one returned funding attempt with a later Paid label**, without concluding that every pool is suspect or every return proves permanent nonpayment. No historical readiness is claimed merely because the synthetic prototype works.

Binding files: [exact source inventory](native-inventory.md) · [structured observations and unresolved links](episode-01.bindings.json).
