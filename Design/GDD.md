# Mad Money Tycoon — game design document

Revision 0.14 · 17 September 2026 · Design review edition

## 01. Game

Run an agency: arrange production, assign departments, commission suppliers and meet commitments. Conflicting records become part of play when they change a decision about the work.

<!-- figure:game-in-context -->

### Player role

The working proposal gives the player a fictional operations role with limited authority. They can make production plans, reserve capacity and request approvals. Historical scenes use fixed records and distinguish what the source reports from what has been independently checked.

The audience is provisionally curious adults familiar with management games, without accounting expertise. Desktop browser; mouse and keyboard; pauseable single-player sessions. Test a 12–15 minute episode before setting campaign length. Audience, player authority and distribution remain open.

### Two structures to test

| | Operating campus | Reconstruction park |
|---|---|---|
| Player action | Arrange production and make authorized commitments | Arrange a reconstruction and test explanations |
| Immediate problem | Preserve delivery while a payment is unresolved | Explain what the available payment records establish |
| Can change | Fictional plans, schedules and outcomes | Selection, comparisons and the account assembled by the player |
| Cannot change | The historical record | Past events or missing endpoints |
| Main risk | The player assumes real people had the same freedom or information | The activity becomes filing rather than play |

Test both with the same returned-payment episode and amount of source information. Look for voluntary experimentation and accurate explanation. The current preference is operating play with a linked historical reconstruction; it remains a testable choice.

### How the story enters play

<!-- figure:chapter-lanes -->

Every narrative chapter includes a short historical comparison. It identifies what transfers from practice, what the source says, and what remains unresolved. The deeper dossier is optional. A separate sandbox may omit the historical sequence.

### Design decisions

| Design rule | Reason |
|---|---|
| Separate work, obligations, cash, records and permissions | The story depends on their differences |
| Persistent staff departments; dated supplier engagements | Employment and external work create different commitments |
| Projects are configurable production clusters | Placement and staffing should affect production |
| Buildings provide capacity, access or a burden | Geography must have a function |
| Preserve selection and period across views | Players need to compare the same object |
| Keep historical and simulated outcomes distinct | A player's choices cannot create evidence |

The first episode applies these rules to one workshop, two projects and a shared staff pool. Their clarity and interest still need the [uncoached ordinary-work test](#production/current-focus); automated playthroughs do not validate comprehension.

Open decisions: audience; player authority; real-name representation; final building aesthetics; game distribution. This design review is prepared for public GitHub Pages; publication of the eventual game remains a separate decision.

## 02. First episode

Campaign C-07 has a $100,000 budget ceiling and a Thursday handoff. Make its component in-house or commission supplier S-08 for $12,000. Staff time, bay placement and payment release affect delivery. The supplier route in the full episode introduces a returned payment; the in-house route avoids that obligation.

All operating amounts, schedules, replies and permissions are invented. The historical comparison is read-only.

### Playable episode

<!-- figure:episode-playable -->

The complete fictional loop is playable: planning, half-day intervals, shared staffing, material purchases, supplier release, record inspection, trace requests, reissue authority, substitute production, revised handoff, a routine pooled payment and a final run receipt. Five views preserve the selected project and period. Save/reopen restores the current run; export retains its action history.

### Scenario rules

| Input | Implemented rule |
|---|---|
| Cash and budget | $40,000 opening cash; $100,000 campaign ceiling; neither is the $24,000 client invoice raised on handoff |
| Shared staff | Two work units per half-day; the competing display job needs three units by Tuesday PM |
| Internal plan | $4,000 materials; six fabrication units plus two check-and-pack units |
| Supplier plan | O-19 commits $12,000; two check-and-pack units in-house; supplier release depends on receipt |
| Handoff | Near dock: one interval; shared floor: two. Handoff starts after work and release are ready; it consumes no staff units in this simplified model |
| Fixed commitments | B-09: $2,000 Thursday AM. Payroll: $6,000 Friday AM |
| Full supplier route | P-04 scheduled Monday; debit and saved Paid v2 Tuesday; funding returns Wednesday |
| Ordinary supplier route | P-04 received Tuesday PM; no return; handoff can complete Wednesday AM |
| Requests | Trace and invoice export: one interval; recipient confirmation: two; finance approval after a received trace or recipient response: one |
| Reissue | Approval permits one P-05 debit; recipient confirms next interval; earliest handoff is the following interval |
| Substitute | $1,500 option + $4,000 materials; three fabrication units; O-19 stays open and reserved |
| Revised promise | Client accepts Friday PM after one interval; the original Thursday promise remains in the outcome |
| Closeout | Earliest Friday PM, once both jobs finish; otherwise closes after interval 12 with unresolved work visible |

The fixed P-04 records never change. P-05 and responsive messages are new simulation events, explicitly labelled as such. The exact executable values and transition rules are maintained in the [scenario model](episode-01/model.js).

<!-- figure:episode-branches -->

### Session path

<!-- figure:first-episode -->

<!-- figure:episode-documents -->

### Payment states

<!-- figure:payment-lifecycle -->

The episode’s **On the desk** tray exposes only records available at the current interval. Reading pauses the schedule and returns to the same selection and view. The player can request a processor trace or recipient confirmation, seek one finance approval, build a substitute or revise the handoff. Reading an invoice export alone does not unlock reissue authority.

The lifecycle diagram describes the fixed returned-payment fixture. A successful player-created P-05 is a separate later attempt; it does not fill a missing historical endpoint.

Inspecting and comparing are navigation actions. The consequential choice is the changed commitment or plan they inform.

### Historical comparison

Creative Peaks on CASE-01 p.34 remains the proposed historical anchor. The first binding pass has inspected BILL, bank-data and QBO export rows. A return-date conflict, a bank-direction conflict and an incorrect derived vendor join require explicit treatment. Historical play remains inactive while those links and an ordinary pooled-payment control are checked.

<!-- figure:binding-status -->

<!-- figure:source-comparison -->

Ask the player to distinguish what their invented run changed from what the historical records establish. If this transition feels detached from the operating problem, revise it before expanding the campaign. See [source issues](evidence-map.md#issues-found-during-this-pass).

## 03. Objects & systems

A project connects people, contracts, places and obligations. These are separate objects even when they share a building or illustration.

### Relationship model

<!-- figure:relationships -->

<!-- figure:object-examples -->

### Object definitions

| Object | Essential relationships | What it becomes on screen |
|---|---|---|
| Person | Roles and employment/engagements over time; attributed actions | Worker, visitor, principal or account-linked subject |
| Employment | Employer, department, availability, compensation, benefits, period | Persistent park staff in creative, production, accounts, media, ops |
| Supplier engagement | Supplier, service, milestone, rate, terms, obligation | Visiting specialist, crew, delivery or external service |
| Client relationship | Contracting entity and agreements | Client contact and a portfolio of commissions |
| Contract | Scope, fees, outside costs, approvals, rights, timing | Offer and terms; creates commitments, not immediate cash |
| Project | Deliverables, dependencies, labor and supplier requirements | Temporary, configurable production cluster |
| Site | Address, occupancy, facilities, lessee and lease | Office/studio/district with capacity and cost |
| Legal entity | Owners, accounts, contracts, debts, rights | Selectable boundary; may own or occupy several sites |
| Obligation | Debtor, creditor, currency, amount, due date, basis | A durable commitment, independent of a platform label |
| Payment attempt | Funding, route, batch, profile, return/reissue and settlement | A dated lifecycle in the payment workbench |
| System account/profile | Platform identity, versions, privileges | A software/control object, not automatically a person |
| Permission | Who may do what, where, when, granted by whom | Control edges and precise blocked-action explanations |
| Record/version | Provenance, author/account, date, immutable source and prior versions | Receipt, message, audit event or comparison |
| Claim | Exact proposition, scope, supporting/conflicting records, proof boundary and review state | Attributed finding or open question; many records may support one claim |

Employment can be salaried, hourly or otherwise structured. Fixed recurring cost is an initial simulation approximation. Benefits create obligations; a repeat freelancer remains an external engagement unless the underlying relationship changes.

Clients and suppliers may share animation assets but have different behavior. A client commissions work; a supplier provides it. Courier engagements attach to handoffs. Artist collaborations may include rights as well as production. A freelancer's tax form is a dated reporting artifact, with treatment dependent on the recipient, payment route and year; see [IRS 2024 instructions](https://www.irs.gov/pub/irs-prior/i1099mec--2024.pdf). It is not the character type.

### Sites and companies

“Office Space” can be a build-menu category. Each site still needs an occupant, lessee or owner, dates, capacity, cost and narrative purpose. McKibbin, Boerum, 266 Johnson, Colorado, Porter and Hong Kong require those checks before becoming map locations.

An affiliated company such as Starfish is an entity with contracts, accounts and obligations. It may share a site or remain off-map. Place a site only when location, capacity, access or geography matters; otherwise show an address in the inspector.

### Operating loop

<!-- figure:operating-loop -->

Accepting scope reserves future time. A specialist may reduce production time but require a deposit and advance notice. Internal production competes for shared staff and facilities. Acceptance may unlock a contractual milestone; it does not settle an invoice.

Supported routine transactions are handled in batches. Inquiry starts with a conflict that affects a commitment or historical question: inspect → compare → request a useful record → narrow the explanation → adjust the plan.

### Economy

| System | Player input | Consequence | Hard boundary |
|---|---|---|---|
| Capacity | Assign people, reserve facilities, accept scope | Work advances or queues | Work activity is not recognized revenue |
| Contracts | Choose eligible scope/production plan, seek approval | Rights and obligations change | Budget ceiling is not a cash receipt |
| Treasury | Schedule authorized payments and contingency | Reservations, posted bank movement and final settlement affect different liquidity measures | Posted cash, committed funds, usable liquidity, credit and revenue remain separate |
| People | Allocate work, add slack, commission help | Availability and service continuity change | No invented emotional diagnosis of real people |
| Suppliers | Commit service, approve milestones, check delivery | Payables and production dependencies | Real invoice does not close payment endpoint |
| Payment lifecycle | Inspect attempts, returns, reissues, confirmation | An obligation may remain unresolved | Paid is not a universal settlement truth |
| Reporting | Compare eligible views and periods | Same work can have different representations | A noncash reclassification cannot refill a bank |
| Control | Inspect/request specific permissions | A supported action becomes available or remains blocked | Ownership and seniority do not grant root access |
| Records | Preserve versions, compare sources, bind claims | Better explanation and retained lineage | Missing records do not become adverse facts by default |

The first operating proof uses one cash balance, one shared production capacity, one site and supplier S-08. Expand to the five departments after that tradeoff works. Add a credit facility, currencies or legal entities when the test needs them. Hong Kong data requires explicit HKD/USD fields and sourced conversion rules.

Compute money in integer minor units. Preserve original source precision and record display rounding separately. Aggregate by stated population and economic episode; a platform object and its bank member cannot become two expenses.

### Customization and outcomes

Players can vary facility mix, project placement, department assignments, make/buy choices, schedule slack, contingency reservations and saved production plans. Desk arrangements, document pins, filters and fictional decoration provide expression. Physical distance affects a physical handoff only when modeled; it does not accelerate bank authorization.

Show commitments met, production completed, cash remaining, unresolved obligations and workload strain in the fictional model. Evaluate supported explanations separately. Weighting these into one score is an open design choice.

Allow pause, planning undo, branching and replay. After running an interval, show the action and its consequence. The historical company can close even when the player has successfully understood a system failure. No fraud score or suspect-ranking mechanic is proposed.

## 04. Narrative

Order the campaign by what the player needs to understand. Keep the full chronology available in the record view.

### The episode in play

<!-- figure:episode-storyboard -->

The implemented episode compresses work, authority and payment into one test. It does not lock the longer campaign order below. Its screenshots and GIFs record the running simulation; the chapter proposals remain unbuilt.

<!-- figure:narrative-sequence -->

### Chapter sequence

| Chapter proposal | First experience | New distinction | Historical anchor in CASE-01 | Requires before script lock |
|---|---|---|---|---|
| 1. The work | Deliver a small production using staff and a supplier | Work / cost / fee / receipt | pp.1–6, 56 | One complete contract/job chain |
| 2. The desk | Responsibility without the permission to finish a task | Role / access / authority | pp.10–16 | Dated access and correspondence exhibits |
| 3. The report | A busy campus has two different financial portraits | Activity / presentation | pp.17–22 | Native workbooks and audience versions |
| 4. The payment | A label and cash lifecycle disagree | Obligation / attempt / settlement | pp.28–29, 33–34 | Adverse chain plus legitimate controls |
| 5. The other company | Cash travels while a debt stays | Entity / site / benefit / burden | pp.23–27, 48–49 | Corrected property/affiliate source manifest |
| 6. The handover | New ownership, incomplete control, changed records | Ownership / administration / version | pp.29–38 | Settlement, platform and migration records |
| 7. After closing | The world stops producing; documents continue changing | Operational time / record time | pp.39–40 | Bounded audit windows and account attribution |

Each chapter begins with a normal case, allows a plan, introduces pressure, offers competing readings and resolves only what the records support. Documents enter when they help answer the current question.

### Events

| Event | Decision or record interaction | Consequence and narrative purpose |
|---|---|---|
| A commission exceeds the current workshop | Internal overtime/slack versus external specialist versus phased delivery | Establishes the attraction of growth and the cost of commitments |
| Client approval arrives after a reserved slot | Hold capacity, swap sequence, or release it | Makes contract time and production time diverge |
| A real bill enters a pooled payment | Inspect batch membership or let supported routine processing proceed | Teaches a normal state before an exception |
| A bank return arrives beside a saved Paid snapshot | Establish which attempt returned, then protect delivery | Distinguishes a saved record from a later status observation |
| Two transfers share amount and date | Compare native identities and banks | Defeats the tempting but invalid matching shortcut |
| An off-map affiliate requests liquidity | Compare authorization, return terms and remaining commitments | Distinguishes gross deployment from retained benefit |
| A report preserves profit but changes scale | Pin operating activity beside two reports | Makes representation consequential and inspectable |
| The owner cannot administer the software | Follow dated permission grants | Reveals the distance between ownership and control |
| Migration keeps money fields and loses job identity | Restore or mark lineage using documented links | A puzzle about history, not “missing money” animation |
| Business closes but an account edits a bill | Compare operation date with edit date | Ends the productive world without inventing an evidentiary ending |

These are proposed decisions and record interactions. Compare, pin and follow do not count as consequential gameplay by themselves. In an operating scenario they must inform a commitment; in reconstruction they must help discriminate between explanations.

Relief, tax and employee-benefit episodes are deferred modules. Their historical rules, populations and source claims require specialist review before gameplay design.

### Clocks and consequences

<!-- figure:episode-clocks -->

<!-- figure:episode-cash -->

### Characters and voice

Use fictional roles with practical constraints: a producer coordinating dependencies; an account lead protecting a promise; a freelancer awaiting confirmation; an operations coordinator finding capacity; a finance approver with a specific permission; a client contact authorized to approve scope. One person can occupy several roles.

Historical representation follows documented roles and actions. Motives and dialogue require sources. Rogers's authority problem must not become an invented suspicion motive, and named account activity must not become authenticated human action. The [cast register](evidence-map.md#cast-organizations-and-authority-over-time) preserves those distinctions.

Dry humor can come from fictional workplace friction. Avoid jokes at the expense of unpaid people and invented quotations from source subjects.

**Source task — message discovery:** obtain the original “no yappin” record, its sender, date and context before scripting that encounter.

## 05. Interface

Keep the world, selected object and active question in view. Documents open alongside the context that made them useful.

### Five views

<!-- figure:five-views -->

| View | Question | Primary marks | Prohibited inference |
|---|---|---|---|
| Work | What is happening; what blocks it? | Project stages, capacity, dependencies | Activity equals revenue |
| Cash | What moved and how far is it supported? | Bank events, attempts, returns, known endpoints | Paid equals settled; batch equals beneficiary |
| Information | Which record, which version, from where? | Lineage, comparisons, missing links | Failed export equals destruction |
| Control | Who could do which action then? | Dated grants, approval chains, system boundaries | Capability proves execution |
| People | Who supplies work and bears interruption? | Department commitments, employment/engagement links | Model strain proves a real person's feelings |

Rights and obligations stay in the inspector across views. Preserve the selected object, camera and period. Show event date, record version and availability to the represented role separately. Later discoveries belong to retrospective inspection. Available, received, read and understood are different states; unknown is valid.

### Desk layouts

<!-- figure:desk-layouts -->

The episode implements one active document, its reading context and an exact return to the selected project/view. Its saved v1/v2 records have direct version switches. Side-by-side pinning remains a proposed extension; the separate art material study demonstrates comparison. Reading pauses the schedule. A full window manager is outside this prototype.

### Document vocabulary

The [interactive material study](#art/interface-materials) develops the invoice, saved record, bank-event strip, form reader, player note and record index as distinct objects. The art explorer retains its separate **Practice documents** tray. The playable episode uses an **On the desk** tray with records gated by the simulated date; its bank strips and carbon sheets draw on the same vocabulary. White invoice stock carries obligations; pink carbon stock carries a version; the narrow strip carries dated events. Shape and printed labels carry the distinction as well as colour.

### Payment workbench

Use three aligned columns: obligation and terms; bank/processor lifecycle; platform label and version. Stable IDs connect the records. Open it directly from a bill or project; a finance building may also provide access and represent staff-review capacity. The permission model controls actions regardless of entry point.

See the [payment lifecycle](#episode/payment-states) and the [detailed interface research](research/ux.md) for the same interaction at different levels of detail.

### Quantities and evidence

Every quantitative display includes measure, unit, population, period and basis. Keep necessary qualifiers visible; put the exact source locator one step away. Distinguish zero, not applicable, unavailable, not supplied, not inspected and modeled.

A transfer animation ends at the last supported endpoint. Bank movement, information transfer and permission edges use different marks. A named account, job title or access grant cannot stand in for a person's action.

### Accessibility

Keyboard equivalents; visible focus; a nonspatial object list; independent text scaling; labels and patterns for status; reading pause; reduced motion; adjustable audio; no hover-only evidence; reliable back history. At small widths, switch between world and inspector with an explicit return. Mobile reading is an initial target; full mobile management controls are not yet scoped.

## 06. Art & sound

One original pixel system, developed from components into a working scene. RCT supplies the scale and spatial logic; the agency supplies the buildings, work, records and people. The document keeps its own crisp typography.

### Visual system

<!-- figure:art-package -->

The animated cover is a separately composed 36-second scene: a foreground Chrysler circuit, exposed Johnson interior, bakery route, pacing pedestrian and flags. Its clock pauses offscreen and respects reduced motion. [Download the hero GIF](previews/art-hero.gif).

### References

<!-- figure:art-references -->

### Office architecture

<!-- figure:office-references -->

The component system is accepted. The building forms, scene density and material palette remain in development. The current sites use Matt Fry’s documented office features; the earlier village architecture is archived. Place and department stay separate: Porter is a site, not an “Accounts building.”

### Boerum street study

<!-- figure:boerum-study -->

The anonymous fedora walker repeats six traversals: left, right, moonwalk left, right, left, moonwalk right. Each traversal takes 5.4 seconds, followed by a 0.6-second pause. Both Boerum views use the same cycle; reduced motion and the pause control still apply.

### Architecture study

<!-- figure:office-study -->

Richness comes from repeated facade bays, layered interiors, visible work and distinctive gathering places. The assembled scene combines a compact street edge with planted courts. Episode 01 tests a physical consequence: near-dock placement saves one handoff interval. The [current focus](#production/current-focus) is whether players understand that choice without coaching.

### Office discoveries

<!-- figure:park-discoveries -->

### Scale and material

<!-- figure:art-scale -->

The world is drawn on an integer pixel grid. Text, controls and source documents remain independent of it. A building needs a recognisable roof, entrance and working interior before it needs surface detail.

### Component kit

<!-- figure:art-components -->

The kit and catalogue read the same register: 44 objects, 136 atlas frames and eight categories. Motion previews use the scene renderer; frame sheets remain explicit records of poses and states. Open an object for its source notes, all variants and PNG/GIF downloads.

L-05 is the Voila bakery truck, associated with Porter. Its invented route includes a four-second loading stop and a 28-second circuit. PR-04 is the generic supplier van used in the fictional episode. Johnson’s orange stair remains inside B-03. These are separate components with separate uses.

### Assembly

<!-- figure:art-assembly -->

### World and interface

<!-- figure:art-world -->

Sites and scenery can be selected separately. A landmark opens its photograph and identifies the invented park behaviour. Courtyard choices change the visible installation. The Chrysler circuit and Voila delivery route each have a run/park control. **Play motion / Pause motion** controls the shared scenic clock. These are art-study interactions, not a working economy.

Each building has visible **Exterior / Interior** previews. The inspector consistently shows the selected sprite, source photograph and park interpretation. The **Practice documents** tray opens C-07 independently of building selection and returns to the same park state. Work, Cash, Information, Control and People views operate in Episode 01 and have a separate [relationship study](#interface/five-views). Architectural browsing does not use those tabs.

The arrangement combines architecture and objects from different sites and photographs. It is not a historical map or a claim that the event objects were permanent. The playable episode uses a smaller Johnson-derived practice workshop: near-dock placement saves one handoff interval. Test whether that consequence is legible before adding more attractions.

### Interface materials

<!-- figure:art-material-system -->

| Material | Information it carries | Interaction |
|---|---|---|
| Ruled invoice | Supplier, obligation, amount and terms | Open the obligation; pin its related bank extract |
| Carbon copy | Platform label, saved version, effective and recorded times | Switch v1/v2 without overwriting either snapshot |
| Perforated strip | Dated bank movements and the extract’s limits | Pin alongside the invoice or saved record |
| Numbered form | Entity, period, revision and fields | Future binding opens the original page and line; the current specimen is unbound |
| Ruled note | Player interpretation and linked record IDs | Edit a question; preserve it while switching documents |
| File tabs and terminal index | Record identity and relationships | Change document while retaining the selected object |

RCT’s object inspector remains the organising model: select, inspect, compare, return. One reader with one pinned comparison is enough for this proof. Documents have fixed reading positions; managing a pile of draggable windows is not the task.

The invoice and bank extract are not interchangeable receipts. A platform label stays inside its dated record. The source image, when bound, retains its original appearance in a separate viewer; themed summaries never replace native evidence.

Geist remains the navigation face. Geist Mono handles IDs, narrow records and tabular figures. Sprocket holes, perforations and dense dot patterns stay at the edge of the reading surface. No texture, random ink loss or simulated screen flicker crosses a number. Pink identifies a record copy, green identifies an active control; neither is a verdict.

The populated specimens use the fictional C-07 / O-19 / P-04 fixture. The version labels and times are invented interaction values. V2 was recorded on Tuesday, before Wednesday’s bank return; reopening it does not establish a post-return platform status. A later status observation is required before the playable episode can teach label persistence. T-01 is a separate, unbound form-layout study, not an IRS form or a record connected to C-07. The 2024 IRS Form 941-X is linked only as a visual reference for field and part structure. Player notes persist across document changes but reset on page reload.

### Implementation scope

| Implemented system | Use in Episode 01 / next test |
|---|---|
| Original pixel renderer, three office-derived buildings, removable roofs | Johnson-derived cutaway workshop; test the near-dock and shared-floor handoff |
| 44 registered objects, paths, furnishings, staff and scenery | Reused by both production plans; assess recognition at scene scale |
| Six exterior/interior choices and a consistent source inspector | Retain place and selection while inspecting the work assigned there |
| Separate practice-document desk with version and bank comparison | Introduce the payment exception after ordinary work is understandable |
| PNG/GIF exports, atlases, anchors and orientation metadata | Gameplay, map cycle and UI captures published alongside the scenic exports |

The [current focus](#production/current-focus) defines that proof. Art work follows demonstrated recognition or interaction problems in that test.

The art study demonstrates the visual system. Episode 01 reuses it for a running fictional economy at one-workshop scope. Neither establishes a complete animation set or an approved engine for the full campaign. The procedural drawings remain the current editable source.

Sound is not implemented. A later pass should use footsteps, fabrication, paper handling and deliveries; reading and essential state changes must remain clear with sound off.

Source images and third-party game art stay in the reference board. Supplied PZ mods remain craft references with their stated reuse restrictions. The [OpenRCT2 graphics helper](https://github.com/OpenRCT2/Blender-RCT-Graphics) documents a historical sprite workflow; its Blender 2.79 dependency makes it a reference, not the proposed production setup. The [supplied tile mod](https://steamcommunity.com/workshop/filedetails/?id=2337452747) is likewise a construction reference, not an asset license for this game.

## 07. Build & test

Next: test the ordinary scenario without coaching. The fictional episode is built; participant comprehension and structure comparison remain open. Source binding runs in parallel. Choose the campaign and engine after the relevant source and play tests.

<!-- figure:current-deliverables -->

### Current focus

**P2 · Ordinary-work proof — ready for uncoached playtesting.** The [playable episode](episode-01/index.html) includes an ordinary scenario with no returned payment. Both production plans complete; staffing and bay placement change the outcome. Automated engine checks and browser playthroughs cover their transitions. Participant comprehension and interest have not been tested.

<!-- figure:ordinary-work-proof -->

Run the ordinary scenario first with six to eight participants of varied game/accounting familiarity. Allow three minutes without coaching. Observe plan selection, bay recognition, staff reassignment and voluntary replay. Ask what changed delivery, what consumed cash, and what remains owed. Then offer the full supplier route and ask them to distinguish the saved Tuesday label from Wednesday’s return.

Review the run receipts and observed mistakes before changing the model. If the choices are dull or the distinctions need explanation from the facilitator, revise P2. **Next implementation depends on those findings:** clearer spatial handoff cues, stronger competing-job feedback or a smaller record set. P3’s reconstruction alternative has not been built or compared.

The full fictional loop was implemented early to expose dependencies and produce test material. This does not pass P2/P3 or lock the campaign. A 12–15 minute reading-and-play session remains a target; the automated captures are condensed demonstrations, not measured participant sessions.

**P1 · Source binding — parallel.** Retrieve the original return chain, establish the later observation of the same payment object and bind an ordinary control. Its [release gate](binding/episode-01-draft.md#8-readiness-decision) applies to the historical comparison; it does not block this fictional proof. Additional art studies enter the immediate work only when they solve a demonstrated recognition or interaction problem.


### Architecture

<!-- figure:architecture -->

The episode uses a canvas scene with a DOM interface and a pure transition model. Cash uses integer cents. Save/reopen replays the action log in a versioned namespace; run export includes configuration, current state and outcome. This narrow prototype does not yet have arbitrary timeline branching, document pinning or a general simulation engine.

An event has an economic identity and a representation identity. Returns reference an attempt; reissues reference an obligation; edits reference prior versions. Use typed, sourced many-to-many links for batch members, partial settlements, repeated attempts and multi-client records. Shared amount/date or journal context does not establish identity. Do not invent fractional client allocations for unsplit objects.

Keep effective time and recorded time. A source correction visibly invalidates dependent narrative and figures. Saves include scenario version, source/data version, seed, decisions, pins, layout and view state. Fictional parameters never write to historical data. Exports state their population and basis.

### Mod boundary

Separate art packs, fictional scenarios and versioned source/document packs. A manifest declares model compatibility, dependencies, license and historical or invented status. Use separate save namespaces and retain provenance. JSON scenarios and replaceable atlases may suffice; Workshop integration and unrestricted scripting are not prototype commitments.

### Source review

A complete historical-scene record needs: proposition; event and record dates; source and locator; amount, currency and population; supporting and conflicting evidence; endpoint boundary; source assessment; inspection status; withdrawn predecessors; allowed player action; simulated assumptions; and the argument the mechanic teaches.

Check both arithmetic and meaning: denominator, identity, period, population, quotation context and endpoint. The current [evidence map](evidence-map.md) records unresolved routes and discrepancies; this design pass does not certify the case.

Each historical scene needs source/financial, gameplay-comprehension and interface-semantics review. AI review is preparation for the relevant human/source authority. Record disagreements beside the claim and hold the affected historical interaction until resolved.

### Production sequence

<!-- figure:production-plan -->

<!-- production:table -->
| Phase | Status | Work and concrete output | Proceed only when |
|---|---|---|---|
| P0 · Source orientation | Complete at stated scope | Corpus inventory, chapter coverage, technique routing and initial design | Corrections and inspection limits remain visible |
| P1 · Source binding | Active · parallel | Original return linkage, same-object status observation and an ordinary control | The historical comparison meets the binding packet’s claim-specific gate |
| P2 · Ordinary-work proof | Ready for playtest | Implemented ordinary scenario; two viable plans; capacity and handoff consequences | Uncoached players explain the tradeoff and want to try another plan |
| P3 · Structure comparison | Queued after P2 | Test operating-campus and reconstruction-park versions of the same payment conflict | Players choose and explain consequences without confusing fiction with history |
| P4 · Thin playable episode | Fictional loop built · validation pending | Playable exception route, ordinary control, run exports and read-only case comparison | P2/P3 findings incorporated; participant timing checked; P1 gates any historical interaction |
| P5 · Campaign outline lock | Queued after P4 | Sequence learning prerequisites, source anchors, permissions and endings | Each chapter adds a distinction and has adequate source coverage |
| P6 · Game production | Queued after P5 | Episodes, assets, software, saves, access and performance checks | Each scene passes source, semantic and gameplay review |
| P7 · Game release preparation | Queued after P6 | Audience edit, attribution, rights, packaging and distribution | Review findings resolved; version and source scope explicit |
<!-- /production:table -->

P1 continues alongside P2–P3. P4’s fictional implementation is available early as test material; the validation sequence remains P2 → P3 → P4. No historical simulation is enabled. Publishing this review and prototype is separate from the eventual game release in P7.

Estimate after the first source-bound slice using verified scenes, unique transitions, assets and review effort. The located validation package is an archival collection; full campaign coverage has not been assessed.

### Responsibilities

| Role | Owns |
|---|---|
| Source editor | Claims, corrections, chronology and coverage |
| Systems designer | Actions, state transitions and incentives |
| UX designer | Continuity, disclosure, comparison and accessible paths |
| Art / technical art | Camera, scale, asset grammar and readable states |
| Developer | Model, renderer, persistence and replay tools |
| Integrator | Agreement across the model, narrative, figures and software |

Workshop one scene through all roles: define its distinction, propose two decisions, draw the path, identify misleading marks, estimate hidden state and test a legitimate counterexample.

### Acceptance tests

| Test | Prompt / setup | Failure means |
|---|---|---|
| Ordinary play | Three minutes of production with no anomaly and two viable plans | If boring, revise management before adding investigation |
| State discrimination | Paid/settled, returned/Paid, valid pooling, duplicate records, unknown endpoint | Any recurring false inference stops content expansion |
| View continuity | Follow one obligation through five views and return | Lost identity/time requires interface redesign |
| Permission model | Owner lacks export; operator can initiate but not approve | If title substitutes for authority, model or UI is wrong |
| Nonadditivity | Show bill, batch member, ledger and bank event | Counting one episode twice is a release blocker |
| History versus fiction | Ask what the player changed and what actually happened | Blurred answers require stronger separation |
| Recall | Next day: sketch work→obligation→attempt→settlement→record | Memorized accusations without usable distinctions is failure |
| Art readability | Identify roles, selection and blocked work at two zooms | If style destroys legibility, adjust assets before enlarging world |
| Artifact QA | Keyboard, scaling, narrow layout, reduced motion, save/reopen | Navigation and reading must remain reliable |

Start with six to eight participants with different management-game and financial familiarity. These are diagnostic sessions. Record behavior and mistaken explanations; avoid instructions that teach the answer immediately before testing it.

### Open decisions and next steps

| Decision or dependency | When it matters | Next action |
|---|---|---|
| Audience and player authority | P2 test setup; P3 structure choice | State the provisional operations role and participant mix before testing |
| Operating campus or reconstruction park | P3 | Compare the two structures using the same conflict; retain fixed historical outcomes |
| Ordinary work | P2, immediate | Run uncoached sessions with the implemented ordinary scenario; review comprehension and voluntary replay |
| Historical comparison and legitimate control | P1, alongside P2–P3 | Follow the binding packet; start with the $4,520 pooled-funding lead, subject to its unresolved checks |
| Art refinements | As required by P2 recognition or interaction | Observe recognition of work bays, ready components and the physical handoff before adding objects |
| Real-name treatment, campaign and game distribution | Before P5/P7 respectively | Resolve against audience, source coverage and review findings |

CASE-01 is the narrative reference; the validation package is an archival source collection. Neither overrides conflicting records. The [current focus](#production/current-focus) is the working priority; research-page proposals support it rather than creating separate production queues.

### Change record

| Revision | Change | Status |
|---|---|---|
| 0.14 | Catalogue-driven component kit, isolated motion previews, unified asset libraries and source links; redundant truck section and speculative art task lists removed | P2 remains the next test; P1 runs in parallel; no new gameplay or historical claims |
| 0.13 | Playable fictional episode, ordinary control, conditional responses, five views, run persistence/export, captured gameplay and Narrative figures; test plan reconciled | P2 ready for uncoached playtest; P4 fictional loop built early; P1 and historical gates remain open |
| 0.12 | Voila bakery truck replaces L-05 overlook; Porter service route, 16 vehicle orientations and GIF exports; Johnson stair retained; custom animated art hero | Design 0.12 / art 0.10; P2 remains next, P1 remains parallel |
| 0.11 | Cross-reference and dependency audit; one P0–P7 phase sequence; explicit P2 ordinary-work proof; corrected document entry points, taxonomy, source gates and preview labels | Design 0.11 / art 0.9; source binding remains parallel and historical interaction inactive |
| 0.10 | Exterior/interior preview choices, consistent source inspector, separate practice desk, compact home navigation; Johnson frontage and interior correction; black-and-silver Supernova | Design 0.10 / art 0.9; historical interaction remains inactive |
| 0.9 | Full editorial reconciliation; inline visual examples; current preview library; GIF exports and versioned archive; portable Pages package | Design review release; historical interaction remains inactive |
| 0.8 | Source-based refinement of every registered sprite; rounded reception sculpture, rebuilt booth/cat/stag/castle, corrected stairs and stepped shadows, 16-direction Chrysler and complete attraction assembly | Art study; photographs remain references and attraction behaviour remains invented |
| 0.7 | Shared document-material system, interactive invoice/carbon/bank/form/note specimens, park record comparison and six-leg Boerum moonwalk | Fictional interface proof; native evidence unchanged |
| 0.6 | Main map and kit rebuilt around office-derived site forms; photographed objects become selectable landmarks; courtyard variants and optional Chrysler circuit added | Park composition and interaction study; source binding remains in progress |
| 0.5 | Approved component system retained; office photographs and industrial component study added; first episode source binding begun | Architectural revision and export-level evidence review in progress |
| 0.4 | One original pixel kit developed through materials, components, assembly, a live scene and readable interface specimens; previous colorway studies superseded | Visual proposal; interactive art proof |
| 0.3 | Mad Money Tycoon title restored; Geist typography; notes beside figures; source-document previews | Typography and navigation revised |
| 0.2 | One reader sequence; first episode moved forward; relationships, lifecycles, views and production stages drawn; document typography and navigation rebuilt | Design structure and presentation revised |
| 0.1 | Source orientation, ontology, alternate structures, research, interface paths, art studies and process | Initial proposal; source limits remain in the evidence map |

Source changes must update affected scenes and figures. Superseded decisions remain in revision history rather than competing in the active specification.
