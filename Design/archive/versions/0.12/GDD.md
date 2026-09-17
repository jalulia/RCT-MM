# Mad Money Tycoon — game design document

Revision 0.12 · 16 September 2026 · Design review edition

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

These are the current design constraints. Their operating effects still need the [ordinary-work proof](#production/current-focus); the art study alone does not validate them.

Open decisions: audience; player authority; real-name representation; final building aesthetics; game distribution. This design review is prepared for public GitHub Pages; publication of the eventual game remains a separate decision.

## 02. First episode

A $100,000 campaign needs a $12,000 fabricated component. A saved platform record says Paid, but the available bank record shows a debit followed by an equal return. The player must protect delivery while confirmation is pending.

All amounts, schedules and choices in this prototype are invented.

### Fifteen-minute path

<!-- figure:first-episode -->

<!-- figure:episode-documents -->

### Payment states

<!-- figure:payment-lifecycle -->

The workbench opens from the affected project or obligation. It separates terms, payment events and platform records. The player can request processor history or recipient confirmation, then reserve substitute capacity, defer a handoff or change the production sequence. Confirmation may remain pending.

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
| A returned attempt remains labelled Paid | Protect delivery while seeking the right confirmation | Changes operations without requiring an accusation |
| Two transfers share amount and date | Compare native identities and banks | Defeats the tempting but invalid matching shortcut |
| An off-map affiliate requests liquidity | Compare authorization, return terms and remaining commitments | Distinguishes gross deployment from retained benefit |
| A report preserves profit but changes scale | Pin operating activity beside two reports | Makes representation consequential and inspectable |
| The owner cannot administer the software | Follow dated permission grants | Reveals the distance between ownership and control |
| Migration keeps money fields and loses job identity | Restore or mark lineage using documented links | A puzzle about history, not “missing money” animation |
| Business closes but an account edits a bill | Compare operation date with edit date | Ends the productive world without inventing an evidentiary ending |

These are proposed decisions and record interactions. Compare, pin and follow do not count as consequential gameplay by themselves. In an operating scenario they must inform a commitment; in reconstruction they must help discriminate between explanations.

Relief, tax and employee-benefit episodes are deferred modules. Their historical rules, populations and source claims require specialist review before gameplay design.

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

Start with one active document, one pinned comparison and the selected object’s context. Reading pauses the world and retains a return target. A full window manager is outside the first prototype.

### Document vocabulary

The [interactive material study](#art/interface-materials) develops the invoice, saved record, bank-event strip, form reader, player note and record index as distinct objects. The same components open from the separate **Practice documents** tray beside the park. White invoice stock carries obligations; pink carbon stock carries a version; the narrow strip carries dated events. Shape and printed labels carry the distinction as well as colour.

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

Richness comes from repeated facade bays, layered interiors, visible work and distinctive gathering places. The assembled scene combines a compact street edge with planted courts. **Next spatial proof:** make one service route affect an ordinary handoff.

### Office discoveries

<!-- figure:park-discoveries -->

### Scale and material

<!-- figure:art-scale -->

The world is drawn on an integer pixel grid. Text, controls and source documents remain independent of it. A building needs a recognisable roof, entrance and working interior before it needs surface detail.

### Component kit

<!-- figure:art-components -->

The kit separates ground, props, people, signs and building parts. It can be extended without repainting a whole scene. Boerum, Porter and Johnson supply distinct site forms. Their placement together is a fictional park composition; no department, entity or historical chronology is inferred from a building style.

The [object catalogue](assets/sprite-catalogue/index.html) contains 44 registered objects and 136 transparent frames, with labelled overviews, per-object sheets and a frame manifest. The Boerum previews show the full 36-second cycle. Catalogue exports rebuild from the same render functions as the park. The full refinement redrew 43 earlier objects and added the complete Chrysler attraction assembly. The latest pass replaces the standalone overlook with the Voila delivery truck; Johnson retains its orange interior stair. Both vehicles have 16 orientations. [Compare the previous and refined sprites](assets/sprite-catalogue/sheets/refinement-comparison.png).

### Assembly

<!-- figure:art-assembly -->

### World and interface

<!-- figure:art-world -->

Sites and scenery can be selected separately. A landmark opens its photograph and identifies the invented park behaviour. Courtyard choices change the visible installation. The Chrysler circuit and Voila delivery route each have a run/park control. **Play motion / Pause motion** controls the shared scenic clock. These are art-study interactions, not a working economy.

Each building has visible **Exterior / Interior** previews. The inspector consistently shows the selected sprite, source photograph and park interpretation. The **Practice documents** tray opens C-07 independently of building selection and returns to the same park state. The proposed Work, Cash, Information, Control and People views remain in the [interface study](#interface/five-views); architectural browsing does not use those tabs.

The arrangement combines architecture and objects from different sites and photographs. It is not a historical map or a claim that the event objects were permanent. The next play test should make one spatial choice affect an ordinary production handoff before adding more attractions.

### Voila delivery

<!-- figure:voila-delivery -->

L-05 is a bakery delivery NPC associated with Porter. The 32-second sequence begins with a four-second loading stop, then follows the marked service road. The truck, route and loading behavior are park inventions. They do not imply a historical delivery or a transaction in the case. The separate PR-04 generic van remains an available component, without a duplicate placement on the current map.

The external orange overlook has been retired. Johnson’s internal stair and mezzanine remain part of B-03.

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

### Production and next proof

| Implemented | Next use in the operating proof |
|---|---|
| Original pixel renderer, three office-derived buildings, removable roofs | Use one existing site; make room for a visible production handoff |
| 44 registered objects, paths, furnishings, staff and scenery | Reuse the kit for the two production plans; assess recognition at scene scale |
| Six exterior/interior choices and a consistent source inspector | Retain place and selection while inspecting the work assigned there |
| Separate practice-document desk with version and bank comparison | Introduce the payment exception after ordinary work is understandable |
| PNG/GIF exports, atlases, anchors and orientation metadata | Export only the states needed by the proof from the same renderer |

The [current focus](#production/current-focus) defines that proof. Model-to-sprite comparisons, new camera angles, extra attractions and a full animation set are later production options. Occlusion and handoff poses become immediate tasks only where the chosen scene needs them.

This pass demonstrates a visual system and its interactions. It does not establish a complete animation set, a running economy or an approved production engine. The current procedural drawings are an editable art proof; modelled source assets can replace them only if they preserve the resulting image.

Sound follows ordinary work: footsteps, fabrication, paper handling and deliveries. Reading pauses ambient motion. A future sound pass should test one handoff, one waiting state and one record opening; the same states must remain clear with sound off.

Source images and third-party game art stay in the reference board. Supplied PZ mods remain craft references with their stated reuse restrictions. The [OpenRCT2 graphics helper](https://github.com/OpenRCT2/Blender-RCT-Graphics) documents a historical sprite workflow; its Blender 2.79 dependency makes it a reference, not the proposed production setup. The [supplied tile mod](https://steamcommunity.com/workshop/filedetails/?id=2337452747) is likewise a construction reference, not an asset license for this game.

## 07. Build & test

Next: make one ordinary job playable with the existing kit. Source binding runs in parallel. Choose the campaign and engine after the episode has passed its relevant source and play tests.

<!-- figure:current-deliverables -->

### Current focus

**P2 · Ordinary-work proof — next.** One fictional site, campaign C-07, one shared production-capacity conflict and one physical handoff. The player plans, runs an interval and revises the plan. Both in-house production and supplier S-08 must be viable.

<!-- figure:ordinary-work-proof -->

Before implementation, specify the invented starting cash, internal work time and cost, supplier lead time, approvals, due date and competing capacity reservation. C-07’s $100,000 budget is a ceiling, not a cash balance; O-19’s $12,000 fabrication amount already belongs to the external plan. No new historical values are needed.

The output is a three-minute playable or clickable test with a visible consequence for delivery, capacity and cash commitments. Observe whether uncoached players can explain the tradeoff and choose to try the other plan. Revise the management loop if the decisions only change a final explanation. Use the [diagnostic test protocol](#production/acceptance-tests), not a numerical pass rate from a small sample.

**P1 · Source binding — parallel.** Retrieve the original return chain, establish the later observation of the same payment object and bind an ordinary control. Its [release gate](binding/episode-01-draft.md#8-readiness-decision) applies to the historical comparison; it does not block this fictional proof. Additional art studies enter the immediate work only when they solve a demonstrated recognition or interaction problem.


### Architecture

<!-- figure:architecture -->

The first prototype can use a small canvas/SVG scene with a DOM interface. Engine selection follows measured scene complexity and art needs.

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
| P2 · Ordinary-work proof | Next | Three-minute job; two viable plans; one capacity conflict and handoff | Players can explain the tradeoff and want to try another plan |
| P3 · Structure comparison | Queued after P2 | Test operating-campus and reconstruction-park versions of the same payment conflict | Players choose and explain consequences without confusing fiction with history |
| P4 · Thin playable episode | Queued after P3 | 12–15 minute loop with one conflict, one valid control and the historical comparison | State, identity and provenance stay clear; P1 covers the historical content used |
| P5 · Campaign outline lock | Queued after P4 | Sequence learning prerequisites, source anchors, permissions and endings | Each chapter adds a distinction and has adequate source coverage |
| P6 · Game production | Queued after P5 | Episodes, assets, software, saves, access and performance checks | Each scene passes source, semantic and gameplay review |
| P7 · Game release preparation | Queued after P6 | Audience edit, attribution, rights, packaging and distribution | Review findings resolved; version and source scope explicit |
<!-- /production:table -->

P1 continues alongside P2–P3. Structure tests can use synthetic records; the historical portion of P4 requires P1’s gate. Publishing this design review is complete and is separate from the eventual game release in P7.

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
| Ordinary work | P2, immediate | Specify and test C-07’s internal-capacity plan against S-08’s supplier plan |
| Historical comparison and legitimate control | P1, alongside P2–P3 | Follow the binding packet; start with the $4,520 pooled-funding lead, subject to its unresolved checks |
| Art refinements | As required by P2 recognition or interaction | Test the existing kit before adding objects or camera views |
| Real-name treatment, campaign and game distribution | Before P5/P7 respectively | Resolve against audience, source coverage and review findings |

CASE-01 is the narrative reference; the validation package is an archival source collection. Neither overrides conflicting records. The [current focus](#production/current-focus) is the working priority; research-page proposals support it rather than creating separate production queues.

### Change record

| Revision | Change | Status |
|---|---|---|
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
