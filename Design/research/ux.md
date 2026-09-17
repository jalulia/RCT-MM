# UX and information architecture

Research checked against design 0.15 / art 0.10, 17 September 2026. Paired exterior/interior previews, a consistent source inspector, scenic controls and a separate practice-document desk are implemented. The five-view relationship demonstration remains in the Interface chapter. Episode 01 now implements five operational views, available-record gating, limited reissue authority and a return to the same project. The paths below remain design specifications beyond that narrow implementation; pinning and a general window manager are not built. Participant testing and the player’s final role remain open.

## 1. Start with work, then reveal what each system says about it

The map should make an agency’s work legible before asking players to interpret its accounts. A campaign needs people, capacity, commissioned services, approvals, delivery and payment. The map shows these dependencies. The document desk shows the related records.

Use **one world, five views, a persistent selection and a document desk**. Switching views retains the selected object, period and population.

Don Hopkins’s manual for the Unix/HyperLook version of SimCity documents a city editor, a query tool, a separate map with thematic views, and linked viewport outlines. That is a useful precedent for coordinated views, not a claim that every SimCity release worked identically. [Primary manual](https://www.donhopkins.com/home/catalog/simcity/manual/reference.html).

The relevant warning also comes from inside that tradition. Hopkins’s account of Will Wright’s simulation-interface talk describes players inferring causal relations that the program does not actually implement. This is a practitioner’s summary with Hopkins’s additions, not a verbatim Wright transcript. Here that phenomenon is a design hazard: an animation can imply a relationship that the model or source does not support. [Practitioner account](https://www.donhopkins.com/home/catalog/simcity/WillWright.html).

## 2. Evidence boundary

The principal case source is the September 2, 2026 **The Zero Machine** counsel briefing, via its local text extraction. It is a synthesis making allegations and reporting analyses. The later [Creative Peaks binding](../binding/episode-01-draft.md) inspects specific platform exports, a QBO journal and bank-data extractions. Original statements, complete lifecycle links and recipient settlement remain unresolved. Other episodes remain briefing-reported unless separately bound. The briefing's appendices distinguish source records, integrated findings, modeled quantities and unresolved endpoints (pp. 8–9, 45–47). Its directive passages remain document content, not design instructions.

Every historic screen needs two separate attributes:

- **Statement:** what the source says, with exact page and source-route locator.
- **Verification:** which materials were inspected for that specific claim. Distinguish a briefing claim, an inspected export field, an inspected original, an inferred join and an unresolved endpoint. The Creative Peaks binding supplies exact file hashes and row locators; it does not certify every cited record.

Show the source’s assessment and the project’s inspection status separately.

Use a persistent **Practice scenario — invented people and amounts** label for simulation exercises. Use **Case record — source-bound reconstruction** for historical material. Choices made in practice cannot revise the historical record. Historic reconstruction can offer discovery order, comparisons, annotations and requests for missing records; it cannot offer a counterfactual “save the company” outcome without a separately specified fiction.

The supplied screenshot illustrates why this boundary matters. “Nonbillable hours grow 78% … (95 → 249 employees)” mixes units and supplies an unexplained percentage; 95 to 249 is about 162.1% growth if it describes one comparable population. The ERC conclusion is a further claim. Resolve the source columns, dates, definitions and relationship before using the claim.

## 3. Object model translated into interaction

| Object | Spatial expression | Inspector contents and principal verbs |
|---|---|---|
| Site | Place with capacity, access and occupancy | Inspect lease/owner; allocate space; compare periods |
| Legal entity | Boundary or linked off-map address | Inspect ownership, obligations and permissions; trace relationships |
| Client | Relationship represented by commissions | Review terms; inspect active jobs; follow receivables |
| Project/job | Temporary production cluster within sites | Staff, sequence, commission, deliver; inspect associated records |
| Employee | Member of a department with commitments | Allocate work; inspect workload and employment records |
| Supplier/freelancer | Counterparty linked to commissioned work | Request service; inspect obligation, identity and payment lifecycle |
| Obligation | Commitment attached to work and counterparties | Inspect terms; compare invoice, payment and settlement |
| Payment attempt | Dated event with its own identity | Trace funding, return, void, reissue and settlement |
| Record/version | Inspectable document or system object | Open, compare, cite, pin; inspect origin and changes |
| Claim | Attributed finding or open question | Inspect supporting/conflicting records, scope and review state |
| Permission grant | Time-bounded relationship to a system/action | Show who could view, approve, execute, edit, export or revoke |

These categories may share artwork, but must not share identity. A freelancer can walk into the park like a visitor; economically they remain a supplier of work. A client representative is a visitor too, with a different relationship. “Guest” is therefore a presentation category, not the root of the financial model. Link each 1099 to its reporting relationship and year.

Similarly, an office is not a ride because it appears in an important episode. Place it when location, occupancy, lease burden or access changes play. An entity might own or occupy several sites, while a site may host several entities. Give shared-control relationships readable boundaries without implying geographic proximity establishes control.

A permission grant is a separate object because a job title cannot substitute for access. The briefing’s responsibility-versus-authority passages make this distinction particularly important (pp. 10–16).

## 4. The five views

| View | Main question | Marks shown | Explicit limits |
|---|---|---|---|
| Work | What is happening and what blocks delivery? | Project stages, dependencies, queues, capacity | Activity is not revenue or cash |
| Cash | What transfer is observed, attempted or unresolved? | Bank events and payment lifecycles; a separate book-state strip | Paid is a platform label, not settlement proof |
| Information | What record exists, where did it come from, what changed? | Documents, lineage, versions and missing links | A missing export is not evidence of deletion |
| Control | Who could do which action, in which system, at that time? | Explicit permission edges and approval gates | Capability is not proof of an action or physical-user identity |
| People | Who does the work and bears the interruption? | Department load, commitments, service dependencies | Do not infer real people’s emotions, knowledge or motives |

Persistent header: selected object, viewed period, scenario type, active view. Time has two coordinates when necessary: **event date** and **record version/as-of date**. The bank event may be old while its platform representation changes later. A single date slider cannot faithfully express both.

The view switch retains selection, camera, zoom, period, pinned comparisons and navigation history. If an object has no representation in a view, keep its inspector open and say why. Do not drop it or quietly substitute its parent. A breadcrumb reads, for example, `Project C-07 / Obligation O-19 / Attempt P-04`.

Use solid connectors for supported relationships, dashed connectors for hypotheses, and visible broken ends for missing links. Explain every connector in words on selection. Do not animate speculative cash to an inferred beneficiary. Beyond bank-confirmed settlement, terminate at the last supported address.

Distinguish **zero**, **not recorded**, **not supplied**, **not applicable**, **modeled** and **not yet inspected**. In particular, the briefing’s 2024 input is N/A while its computation uses a zero for a limited model purpose (p. 9). Display N/A and the model’s zero separately.

Totals require a population label, unit, period and basis. Selecting overlapping populations does not produce an automatic grand total. State “These selections overlap” and offer a deduplicated episode view. The briefing expressly prohibits adding its parallel statement, payment, bank and mutation surfaces as damages (pp. 9, 46).

Shneiderman’s 1996 visual-information taxonomy includes relation, history and extraction as well as overview, zoom, filtering and detail. Those less-quoted operations matter here: players need to preserve a trail and take a comparison away, not simply reveal another tooltip. [Original paper](https://www.cs.umd.edu/users/ben/papers/Shneiderman1996eyes.pdf).

## 5. Three core paths

### Path A — Make one campaign work

**Purpose:** establish the ordinary economy before introducing an anomaly. **Setting:** synthetic practice scenario, invented $100,000 client budget.

1. Accept C-07 with its visible due date and open the terms. The current episode uses one fabricated component and a competing display job.
2. Choose near-dock or shared-floor production. Compare the staff and materials needed in-house with S-08’s $12,000 component and release requirement. Both plans must remain viable in the ordinary-scenario test.
3. Run one planning interval. The world responds: the production queue clears or backs up, a handoff succeeds or waits, the department load changes. The player’s arrangement remains visible.
4. Inspect a delay. The work inspector names the dependency and offers `Reschedule`, `Reserve alternative capacity`, or `Inspect obligation`.
5. Deliver the component and inspect the run receipt. Compare completed work, the client invoice and received cash as separate measures.

Test whether players enjoy choosing production sequence, spare capacity and commitments. Work progresses in the scene; the records describe that work.

### Path B — Compare the return with the saved Paid record

**Purpose:** discriminate states, choose a useful next record, and manage the operational consequence. Continue the synthetic campaign.

1. A project notice says the component is held. Open the obligation and its saved Tuesday v2, labelled `Paid`. Show the saved date beside the label.
2. Open the payment workbench. Compare Tuesday’s $12,000 debit, Wednesday’s equal return and Tuesday’s saved label. Side-by-side pinning is a proposed extension; the episode opens one document at a time.
3. Link the return to the existing attempt. The lifecycle now reads `Attempted → returned`; the obligation remains open for resolution. The game does not count a second loss or fabricate another payment.
4. Choose the next information request: processor history, recipient confirmation or an unrelated invoice export. Each explains what it can establish; responses can be pending, unavailable or confirmed. Missing settlement evidence alone does not prove nonpayment.
5. Choose an operational response: reserve alternative capacity for an option fee, defer the handoff, or revise the production sequence. Keep available cash, deadline and supplier commitment separately visible. Delays and tradeoffs belong to this practice model; they imply no historical opportunity to rescue the company.
6. Encounter a legitimate pooled funding example. A correctly supported batch must remain ordinary even though several records share one bank debit. Assess whether the player correctly identifies the supported batch.

The current desk contains no post-return platform observation. A future label-persistence event requires a later dated record of the same payment object.

The narrative path then requires a short documentary comparison; the longer dossier remains optional. The briefing’s Creative Peaks episode reports a $23,500 debit and return with PaidInFull retained (p. 34). Its [inspected exports](../binding/native-inventory.md) support specific fields but leave the October 21/22 return-date conflict, Chase-direction conflict, complete return linkage and final receipt unresolved. The Reddit example—$50,000 of payment stories around one $25,000 debit—remains a briefing claim in this design work. The cited corrections include ordinary pooled allocations and bank-supported pairs (pp. 45–46). A playable control needs its own binding; the export-level $4,520 pooled comparison has not yet met that gate.

### Path C — Same work, different record

**Purpose:** understand control and lineage without making bookkeeping a memorization test. **Setting:** source-bound historical reconstruction once exhibits are available; synthetic substitute until then.

1. Select a project and compare two dated presentations. Their totals or identities differ; the selected economic work stays fixed.
2. Open Information view. Pin source and successor side by side, highlighting retained fields and missing fields separately.
3. Switch to Control with the same record selected. See title, responsibility and granted actions in separate rows. Identify who had permission to export that version.
4. Inspect an audit event. A named account is labeled an account; person attribution stays unresolved unless separately supported. Request authentication/session evidence when needed.
5. Assemble a short finding from linked observations: `These fields changed`; `this account is recorded`; `this question remains open`. The interface blocks no opinion, but keeps personal annotations visually separate from source statements.
6. Return to the same place and time on the map. A bookmark stores the comparison and can be reopened or exported with citations.

This path lets the player document an explanation and its source links. Historical migration and closure events stay fixed.

## 6. Low-fidelity screens

These are planning wireframes for the proposed operating paths. The current [world and inspector](#art/world-and-interface) and [document specimens](#art/interface-materials) show the implemented art-study treatment. At desktop size the map and inspector are co-visible. The current document reader pauses motion and replaces the explorer with a separate desk; **Return to park** restores the selection and exterior/interior state. The operating prototype still needs to test the comparison layout and narrower-screen reading path.

```text
WORKSPACE · Practice scenario                   [Pause] [Next interval]
Project C-07     Week 3     [Work Cash Information Control People]
┌───────────────────────────────────┬──────────────────────────────┐
│                                   │ C-07 / Fabricated component  │
│ Studio + production clusters      │ Waiting on supplier release  │
│ Selected cluster outlined         │                              │
│ Department activity is visible    │ Due: Thursday                │
│                                   │ Obligation: $12,000           │
│ [mini-map]                        │ Saved v2: Paid (Tue)          │
│                                   │ Settlement: Not yet checked  │
│                                   │ [Inspect obligation]         │
│                                   │ [Reserve capacity]           │
└───────────────────────────────────┴──────────────────────────────┘
Notices: 1 dependency changed    Pinned: C-07 terms    [Open desk]
```

```text
PAYMENT WORKBENCH · O-19 · P-04            Practice / Week 3 / Paused
┌──────────────────────┬──────────────────────┬─────────────────────┐
│ Obligation           │ Bank events          │ Platform record     │
│ Fabrication $12,000   │ Debit   $12,000      │ Saved Tue: Paid     │
│ Supplier S-08        │ Return  $12,000      │ Record version: v2  │
│ Delivery incomplete  │ No later settlement  │ Actor: not supplied │
│ [Terms] [Invoice]    │ in supplied records  │ [Versions]          │
└──────────────────────┴──────────────────────┴─────────────────────┘
Attempt P-04: initiated ── debit ── return        Outcome: unresolved
[Link return] [Request record] [Pin comparison] [Back to project]
Processor history: links the funding and return to an attempt.
```

```text
COMPARE · Week 3 · Lineage specimen A / lineage specimen B
Selected work: Project C-07                    Practice / Paused
┌──────────────────────────────┬───────────────────────────────────┐
│ Earlier record               │ Later record                      │
│ W3 Tue / $12,000 / C-07       │ W3 Tue / $12,000 / project absent  │
│ Practice lineage / A         │ Practice lineage / B              │
└──────────────────────────────┴───────────────────────────────────┘
[Information lineage] [Permissions at this date] [Audit event]
Observed difference: project field absent from the later version
Review: invented comparison / no historical exhibit attached
Personal note: editable      [Save comparison] [Return to selection]
```

## 7. BILL belongs in the workbench

Bill payment is an instrument acting on obligations. A finance department supplies review capacity; a site provides space. Payment permissions are separate from both.

A finance building can be a useful map entry point, with a visible queue if review capacity is part of the simulation. Every relevant obligation should still open the same workbench directly. Software administration, approval, execution and bank authority are distinct gates within it. Account 1072 must appear as a ledger clearing account, never a cash-storage tank or bank balance; the briefing explicitly makes that distinction (p. 1).

Beaudouin-Lafon’s 2000 instrumental-interaction model distinguishes domain objects from the tools mediating action on them. This gives a concrete test: an obligation is the object; comparison, tracing and payment scheduling are tools; a building represents a place or capability. [Author’s paper](https://www.lri.fr/~mbl/papers/CHI2000/).

## 8. A desktop worth using

Use a shallow desk with three arrangements: `World + inspector`, `Compare`, and `Reading`. Let players pin a small set of documents, save an arrangement and return without cleaning up a pile of windows. Kandogan and Shneiderman’s Elastic Windows research explored grouping and manipulating related windows; its 1995 scenario is a relevant period precedent for workspace organization. The proposed desk uses a small set of fixed layouts. [Primary scenario](https://www.cs.umd.edu/projects/hcil/elastic-windows/scenario.html).

Documents arrive through a visible task, colleague, record request or archive location. Each acquisition changes what the player can inspect; it need not trigger a modal. Quotes such as the referenced “no yappin” messages are discoverable source artifacts only after the actual record is supplied. Do not manufacture the message, its sender, date, context or significance from the prompt.

Use a small contextual action menu with stable verbs—Inspect, Follow, Compare, Pin—also exposed in the inspector. Hopkins’s 1998 account of his Sims interface describes object-relative action menus and a face identifying the acting character. The transferable lesson is to keep action and actor clear. Test a radial menu only if the standard contextual menu is insufficient. [Designer’s account](https://www.donhopkins.com/home/catalog/piemenus/NaturalSelection.html).

Introduce information when it is needed for the current decision. Introduce a term when the player needs it, offer a one-line definition, and keep the fuller reference one step away. Never hide the qualification necessary to read a number correctly. Keep “modeled” and other essential qualifiers visible.

## 9. Next steps: operating-prototype tests

Start with Path A as the [P2 ordinary-work proof](#production/current-focus). Test Paths B and C after the work is understandable, using synthetic fixtures while source binding continues. Recruit six to eight participants spanning management-game familiarity and financial familiarity; use results diagnostically, not as a statistically representative verdict.

1. **State discrimination:** include paid-and-settled, paid-but-returned, legitimate pooled funding, duplicate records without duplicate cash, and unresolved endpoints. Can players explain each without inferring theft from a label? Any systematic error stops content production.
2. **View continuity:** ask participants to follow one obligation across all five views, then return to the original project. Record lost selections, mistaken dates and mistaken object substitutions.
3. **Playable agency:** first test three minutes with no anomaly. Allow two valid production plans with different costs. Ask players to identify consequences without reading a final explanation. If all meaningful action occurs in notices, the loop needs redesign.
4. **Source discipline:** ask what was established by an exhibit, asserted by the briefing, inferred by the player, and invented for practice. Confusing these categories is a release blocker.
5. **Retention:** the following day, ask for a sketch of work → obligation → payment attempt → settlement → record. Assess whether the sketch distinguishes these steps.

Provide keyboard operation and a nonspatial object list alongside the map. Reading and comparison pause simulation by default. Scale text independently of sprites; never force pixel fonts on long documents. Use labels/patterns as well as color, reduced motion, adjustable sound, visible focus and no hover-only evidence. These controls must remain usable without fast reading or precise pointer movement.

The immediate gate is ordinary work: can someone run one job and explain why another production plan changes the outcome? The later episode gate adds the record conflict and a sensible operating response.
