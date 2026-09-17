# Mad Money Tycoon — game design document

Revision 0.16 · 17 September 2026 · Design review edition

## 01. Game

Plan production, assign staff, commission suppliers and deliver client work. Use payment records and approval histories to resolve delays.

<!-- figure:game-in-context -->

### Player role

<!-- figure:margin-role -->

The player is a fictional operations coordinator. They can choose production plans, reserve capacity and request approvals. Historical comparisons identify the source claim, the records inspected and any unresolved links.

The initial test audience is adults familiar with management games; accounting knowledge is optional. The prototype runs in a desktop browser with mouse, keyboard and pause controls. Test a 12–15 minute session before setting campaign length. The final audience, player permissions and game distribution are undecided.

### Two structures to test

| | Operating campus | Reconstruction park |
|---|---|---|
| Player action | Arrange production and make authorized commitments | Arrange a reconstruction and test explanations |
| Immediate problem | Preserve delivery while a payment is unresolved | Explain what the available payment records establish |
| Can change | Fictional plans, schedules and outcomes | Selection, comparisons and the account assembled by the player |
| Cannot change | The historical record | Past events or missing endpoints |
| Main risk | The player assumes real people had the same freedom or information | The activity becomes filing rather than play |

Compare both structures using the same payment conflict and source material. Observe whether players try another plan and can explain the result. Operating play with a historical comparison is the preferred proposal, pending that test.

### How the story enters play

<!-- figure:chapter-lanes -->

Each proposed chapter ends with a short comparison between the fictional scenario and the case records. It states which mechanism they share and where the evidence stops. Further source reading is optional. The standalone park builder has no historical sequence.

### Design decisions

| Design rule | Reason |
|---|---|
| Separate work, obligations, cash, records and permissions | The story depends on their differences |
| Persistent staff departments; dated supplier engagements | Employment and external work create different commitments |
| Projects are configurable production clusters | Placement and staffing should affect production |
| Buildings provide capacity, access or a burden | Geography must have a function |
| Preserve selection and period across views | Players need to compare the same object |
| Keep historical and simulated outcomes distinct | A player's choices cannot create evidence |

Episode 01 applies these rules to one workshop, two projects and a shared staff pool. The [next playtest](#production/current-focus) checks whether players understand and enjoy the choices. Automated checks cover state transitions.

Open decisions: audience; player authority; real-name representation; final building aesthetics; game distribution. This design review is prepared for public GitHub Pages; publication of the eventual game remains a separate decision.

## 02. First episode

Produce C-07’s component in-house or commission S-08. Staff allocation, bay placement and payment release determine the handoff date.

All operating amounts, schedules, replies and permissions are invented. The historical comparison is read-only.

### Playable episode

<!-- figure:episode-playable -->

The episode runs from planning to closeout in half-day intervals. It includes shared staffing, material purchases, supplier release, record requests, reissue approval, substitute production and a revised handoff. A routine pooled payment provides a comparison. Five views retain the selected project and period. Runs can be saved, reopened and exported with their action history.

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

P-04 records are fixed. A reissue creates P-05; replies and approval messages are labelled simulation events. The [scenario model](episode-01/model.js) defines the executable values and transitions.

<!-- figure:episode-branches -->

### Session path

<!-- figure:first-episode -->

<!-- figure:episode-documents -->

### Payment states

<!-- figure:payment-lifecycle -->

The episode’s **On the desk** tray exposes only records available at the current interval. Reading pauses the schedule and returns to the same selection and view. The player can request a processor trace or recipient confirmation, seek one finance approval, build a substitute or revise the handoff. Reading an invoice export alone does not unlock reissue authority.

The lifecycle diagram describes the fixed returned-payment fixture. A successful player-created P-05 is a separate later attempt; it does not fill a missing historical endpoint.


### Historical comparison

The proposed historical comparison is Creative Peaks, CASE-01 p.34. Selected BILL, bank-data and QBO export rows have been inspected. The return date and bank direction conflict across sources; a derived vendor join is incorrect. Historical interaction remains disabled until the required links and an ordinary pooled-payment comparison are checked.

<!-- figure:binding-status -->

<!-- figure:source-comparison -->

Ask players what their run changed and what the historical records establish. Revise the comparison if they cannot connect it to the operating problem. See [source issues](evidence-map.md#issues-found-during-this-pass).

## 03. Objects & systems

Projects link contracts, people, sites and obligations. Each has its own identity, dates and relationships.

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

Employment records include pay structure and benefits. The initial model approximates payroll as a recurring cost. Repeat freelance work remains an external engagement unless the relationship changes.

Clients and suppliers may share animation assets but have different behavior. A client commissions work; a supplier provides it. Courier engagements attach to handoffs. Artist collaborations may include rights as well as production. A freelancer's tax form is a dated reporting artifact, with treatment dependent on the recipient, payment route and year; see [IRS 2024 instructions](https://www.irs.gov/pub/irs-prior/i1099mec--2024.pdf). It is not the character type.

### Sites and companies

<!-- figure:margin-site -->

The proposed “Office Space” menu groups sites. Before a site enters a historical scenario, establish its occupant, lessee or owner, dates, capacity, cost and relevance. This applies to McKibbin, Boerum, 266 Johnson, Colorado, Porter and Hong Kong. Architectural studies alone do not establish those facts.

An affiliated company such as Starfish is an entity with contracts, accounts and obligations. It may share a site or remain off-map. Place a site only when location, capacity, access or geography matters; otherwise show an address in the inspector.

### Operating loop

<!-- figure:operating-loop -->

<!-- figure:margin-handoff -->

Accepting scope reserves future time. A specialist may reduce production time but require a deposit and advance notice. Internal production competes for shared staff and facilities. Acceptance may unlock a contractual milestone; it does not settle an invoice.

Process routine transactions in batches. When a conflict affects delivery, compare the records, request missing information and adjust the plan.

### Economy

| System | Player input | Consequence | Hard boundary |
|---|---|---|---|
| Capacity | Assign people, reserve facilities, accept scope | Work advances or queues | Work activity is not recognized revenue |
| Contracts | Choose eligible scope/production plan, seek approval | Rights and obligations change | Budget ceiling is not a cash receipt |
| Treasury | Schedule authorized payments and contingency | Reservations, posted bank movement and final settlement affect different liquidity measures | Posted cash, committed funds, usable liquidity, credit and revenue remain separate |
| People | Allocate work, add slack, commission help | Availability and service continuity change | No invented emotional diagnosis of real people |
| Suppliers | Commit service, approve milestones, check delivery | Payables and production dependencies | An invoice establishes the obligation; recipient settlement still needs evidence |
| Payment lifecycle | Inspect attempts, returns, reissues, confirmation | An obligation may remain unresolved | A Paid label requires a dated record and separate settlement evidence |
| Reporting | Compare eligible views and periods | Same work can have different representations | A noncash reclassification does not change the bank balance |
| Control | Inspect/request specific permissions | A supported action becomes available or remains blocked | Ownership and seniority do not grant system access |
| Records | Preserve versions, compare sources, bind claims | Better explanation and retained lineage | Missing records do not become adverse facts by default |

Episode 01 uses one cash balance, one shared staff pool, one site and supplier S-08. Test these choices before adding five departments, credit, currencies or more entities. Hong Kong records require explicit HKD/USD fields and sourced conversion rules.

Store money in integer minor units. Preserve source precision and record any display rounding. Totals must identify their population and economic episode; exclude duplicate representations of the same expense.

### Customization and outcomes

Players can vary facility mix, project placement, department assignments, make/buy choices, schedule slack, contingency reservations and saved production plans. Desk arrangements, document pins, filters and fictional decoration provide expression. Physical distance affects a physical handoff only when modeled; it does not accelerate bank authorization.

Show commitments met, production completed, cash remaining, unresolved obligations and workload strain in the fictional model. Evaluate supported explanations separately. Weighting these into one score is an open design choice.

Allow pause, planning undo, branching and replay. After running an interval, show the action and its consequence. The historical company can close even when the player has successfully understood a system failure. No fraud score or suspect-ranking mechanic is proposed.

## 04. Narrative

Introduce production first, then permissions, reporting and payment. Keep the case chronology available in the record view.

### The episode in play

<!-- figure:story-work -->

Episode 01 begins with a production choice. Making C-07 in-house uses shared staff; commissioning S-08 costs $12,000 and makes delivery depend on supplier release. The competing display job needs three work units by Tuesday PM.

The supplier route then introduces a returned payment. The player can request records, seek reissue approval, make a substitute or revise the handoff. These choices change the fictional run. The historical comparison is read-only.

[Play the episode](episode-01/index.html) or [watch the supplier run](previews/episode/supplier-run.gif). The longer campaign below is proposed.

### Chapter sequence

<!-- layout:campaign -->

| Chapter proposal | First experience | New distinction | Historical anchor in CASE-01 | Requires before script lock |
|---|---|---|---|---|
| 1. The work | Deliver a small production using staff and a supplier | Work / cost / fee / receipt | pp.1–6, 56 | One complete contract/job chain |
| 2. The desk | Responsibility without the permission to finish a task | Role / access / authority | pp.10–16 | Dated access and correspondence exhibits |
| 3. The report | Compare two financial reports for the same operating activity | Activity / presentation | pp.17–22 | Native workbooks and audience versions |
| 4. The payment | Compare the saved payment label with dated bank events | Obligation / attempt / settlement | pp.28–29, 33–34 | Adverse chain plus legitimate controls |
| 5. The other company | Trace a transfer between entities while tracking the original obligation | Entity / site / benefit / burden | pp.23–27, 48–49 | Corrected property/affiliate source manifest |
| 6. The handover | New ownership, incomplete control, changed records | Ownership / administration / version | pp.29–38 | Settlement, platform and migration records |
| 7. After closing | Production stops; later records may revise the account | Operational time / record time | pp.39–40 | Bounded audit windows and account attribution |

<!-- /layout:campaign -->

Start each chapter with routine work. Let the player make a plan before introducing a delay or record conflict. Make the relevant documents available at that point; keep unresolved findings visible at closeout.

### Events

<!-- layout:events -->

| Event | Decision or record interaction | Consequence and narrative purpose |
|---|---|---|
| A commission exceeds the current workshop | Internal overtime/slack versus external specialist versus phased delivery | Introduces the cost and capacity commitments of accepting work |
| Client approval arrives after a reserved slot | Hold capacity, swap sequence, or release it | Makes contract time and production time diverge |
| A real bill enters a pooled payment | Inspect batch membership or let supported routine processing proceed | Teaches a normal state before an exception |
| A bank return arrives beside a saved Paid snapshot | Establish which attempt returned, then protect delivery | Distinguishes a saved record from a later status observation |
| Two transfers share amount and date | Compare native identities and banks | Requires an identifier match before joining the transfers |
| An off-map affiliate requests liquidity | Compare authorization, return terms and remaining commitments | Distinguishes gross deployment from retained benefit |
| A report changes gross amounts while preserving profit | Pin operating activity beside two reports | Shows how a saved record affects a later decision |
| The owner cannot administer the software | Follow dated permission grants | Separates ownership from system permissions |
| Migration keeps money fields and loses job identity | Restore or mark lineage using documented links | Tests record lineage without implying a cash loss |
| Business closes but an account edits a bill | Compare operation date with edit date | Separates business closure from later account activity |

<!-- /layout:events -->

These events are proposals. In an operating scenario, record inspection must inform a production or payment decision. In reconstruction, it must help distinguish competing explanations.

Relief, tax and employee-benefit episodes are deferred until specialist review establishes their rules, populations and source claims.

### Clocks and consequences

<!-- figure:story-record -->

Tuesday’s saved v2 says **Paid**. Wednesday’s bank event records an equal return. The earlier copy stays available, but it cannot establish the platform’s status on Wednesday. The player needs a later observation to answer that question.

<!-- figure:episode-clocks -->

<!-- figure:story-obligation -->

A substitute can complete the job while O-19 remains open. In the captured substitute run, $26,500 remains in posted cash; $12,000 is reserved for O-19, leaving $14,500 available. The $100,000 budget ceiling and $24,000 client invoice are separate measures.

[Inspect the cash diagram](previews/episode/cash-boundaries.svg) or [open the captured outcome](previews/episode/substitute-outcome.png).

### Characters and voice

<!-- figure:margin-people -->

Use fictional roles with specific responsibilities. Producers coordinate dependencies; account leads manage client commitments; freelancers wait for release or payment confirmation. Operations allocates capacity, finance approves payments, and the client contact approves scope. One person may hold several roles.

Historical characters use documented roles and actions. Source any dialogue or claim about motive. Rogers’s limited authority does not establish suspicion or intent. Platform activity identifies an account unless separate evidence identifies its operator. See the [cast register](evidence-map.md#cast-organizations-and-authority-over-time).

Dry humor can come from fictional workplace friction. Avoid jokes at the expense of unpaid people and invented quotations from source subjects.

**Source task — message discovery:** obtain the original “no yappin” record, its sender, date and context before scripting that encounter.

## 05. Interface

Retain the selected object, date and view when opening a document. Return to the same state when reading ends.

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

Episode 01 opens one document at a time and pauses the schedule while reading. Version controls switch between saved v1/v2 records. Closing the document restores the selected project and view. Side-by-side pinning is demonstrated in the material study but is not implemented in the episode.

### Document vocabulary

<!-- figure:margin-materials -->

Invoices show obligations. Pink carbon copies show saved platform versions. Narrow bank strips list dated movements. Printed labels and shape distinguish the records as well as colour. The [material study](#art/interface-materials) also includes a form reader, player note and record index.

The art explorer opens these specimens through **Practice documents**. Episode 01 uses **On the desk**, which lists only records available at the current simulated date.

### Payment workbench

Use three aligned columns: obligation and terms; bank/processor lifecycle; platform label and version. Stable IDs connect the records. Open it directly from a bill or project; a finance building may also provide access and represent staff-review capacity. The permission model controls actions regardless of entry point.

See the [payment lifecycle](#episode/payment-states) and the [detailed interface research](research/ux.md) for the same interaction at different levels of detail.

### Quantities and evidence

<!-- figure:margin-quantity -->

Every quantitative display includes measure, unit, population, period and basis. Keep necessary qualifiers visible; put the exact source locator one step away. Distinguish zero, not applicable, unavailable, not supplied, not inspected and modeled.

A transfer animation ends at the last supported endpoint. Bank movement, information transfer and permission edges use different marks. A named account, job title or access grant cannot stand in for a person's action.

### Design whiteboard

[Open the whiteboard](whiteboard/index.html). This workshop tool uses the fictional Episode 01 model. It has three views of the same objects:

- **Systems:** staff, work, obligations, payment attempts and explicit trigger rules. Step the clock, change costs or move the work bay between placement zones to inspect consequences.
- **Story:** ordered beats, reveals and linked objects. Beat states follow the episode run; changing a beat's copy does not rewrite an event.
- **Structure:** episode anchors and their child objects. Reparenting a card changes its design grouping.

Cards, arrows and pen strokes save locally. Named checkpoints and JSON exports preserve alternate boards. Supabase shared rooms support concurrent edits and cursor presence once the project connection and database setup are installed. Different-field edits merge; edits to the same field require a choice. Shared rooms are not connected to a hosted project yet.

Episode references retain their existing rules. Workshop trigger/effect chains update separate proposal counters. A drawn arrow cannot settle an invoice. Custom costs are labelled assumptions and do not alter the episode source or historical evidence.

The [board schema and CMS plan](whiteboard/CMS.md) separate source records, object definitions, scenarios, narrative beats, board layouts and run inputs. The five in-game views remain Work, Cash, Information, Control and People; the three board views organise design discussions.

### Accessibility

Keyboard equivalents; visible focus; a nonspatial object list; independent text scaling; labels and patterns for status; reading pause; reduced motion; adjustable audio; no hover-only evidence; reliable back history. At small widths, switch between world and inspector with an explicit return. Mobile reading is an initial target; full mobile management controls are not yet scoped.

## 06. Art & sound

Isometric pixel art based on Madwell’s offices, with RCT-style scale and object controls. Buildings, props and people share one renderer. Interface text uses Geist and Geist Mono.

### Visual system

<!-- figure:art-package -->

The animated cover is a separately composed 36-second scene: a foreground Chrysler circuit, exposed Johnson interior, bakery route, pacing pedestrian and flags. Its clock pauses offscreen and respects reduced motion. [Download the hero GIF](previews/art-hero.gif).

### References

<!-- figure:art-references -->

### Office architecture

<!-- figure:office-references -->

The component system is accepted; building forms, scene density and colours remain adjustable. The sites use office features documented in Matt Fry’s portfolio. Porter, Boerum and Johnson identify places; department assignments are separate.

### Boerum street study

<!-- figure:boerum-study -->

<!-- figure:margin-walk -->

The anonymous fedora walker repeats six traversals: left, right, moonwalk left, right, left, moonwalk right. Each traversal takes 5.4 seconds, followed by a 0.6-second pause. Both Boerum views use the same cycle; reduced motion and the pause control still apply.

### Architecture study

<!-- figure:office-study -->

Repeated facade bays, cutaway rooms and occupied workstations establish scale. The park combines these with planted courts. In Episode 01, placing production near the dock saves one handoff interval. The [next playtest](#production/current-focus) checks whether players notice and understand that effect.

### Office discoveries

<!-- figure:park-discoveries -->

### Scale and material

<!-- figure:art-scale -->

Draw the world on an integer pixel grid. Render text and controls separately so they scale without enlarging the sprites. Check the roof, entrance and interior at native size before adding surface detail.

### Component kit

<!-- figure:art-components -->

The kit and catalogue share a register of 44 objects, 136 atlas frames and eight categories. Each entry links to its source notes, variants and downloads. Animated entries show an isolated loop; frame sheets show the saved poses.

L-05 is the Voila bakery truck, associated with Porter. Its invented route includes a four-second loading stop and a 28-second circuit. PR-04 is the generic supplier van used in the fictional episode. Johnson’s orange stair remains inside B-03. These are separate components with separate uses.

### Assembly

<!-- figure:art-assembly -->

### World and interface

<!-- figure:art-world -->

Select a site or landmark to open its sprite, source photograph and interpretation. Courtyard controls switch installations. Each vehicle has run/park controls; **Play motion / Pause motion** controls the shared clock. These interactions change the art study only.

Each building has visible **Exterior / Interior** previews. The inspector consistently shows the selected sprite, source photograph and park interpretation. The **Practice documents** tray opens C-07 independently of building selection and returns to the same park state. Work, Cash, Information, Control and People views operate in Episode 01 and have a separate [relationship study](#interface/five-views). Architectural browsing does not use those tabs.

The park combines sites and objects from different photographs in an invented arrangement. The photographs do not establish permanent installations. The [standalone park builder](../test/index.html) allows free placement of objects, people and event loops, with local saving and GIF export. It has fixed terrain and no pathfinding or economy. Episode 01 separately models production and handoff timing.

### Interface materials

<!-- figure:art-material-system -->

| Material | Fields shown | Interaction |
|---|---|---|
| Ruled invoice | Supplier, obligation, amount and terms | Open the obligation; pin its related bank extract |
| Carbon copy | Platform label, saved version, effective and recorded times | Switch v1/v2 without overwriting either snapshot |
| Perforated strip | Dated bank movements and the extract’s limits | Pin alongside the invoice or saved record |
| Numbered form | Entity, period, revision and fields | Future binding opens the original page and line; the current specimen is unbound |
| Ruled note | Player interpretation and linked record IDs | Edit a question; preserve it while switching documents |
| File tabs and terminal index | Record identity and relationships | Change document while retaining the selected object |

Use RCT’s object-inspector pattern: select an object, inspect its details and return to the map. The material study has one reader and one pinned comparison, both in fixed positions.

Keep each platform label with its dated record. An invoice states an obligation; a bank extract reports movements. When an original source is linked, open it unchanged in a separate viewer.

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

<!-- figure:margin-components -->

The worktable and shipping crate use the same anchors in the component kit, park and playable episode. An asset change should update all three.

Prioritise art changes that address recognition or interaction problems found in the [playtest](#production/current-focus).

Episode 01 reuses the renderer for one workshop and a fictional economy. Campaign engine selection and a full animation set are still open. Edit the procedural drawings to change the current assets.

Sound is not implemented. A later pass should use footsteps, fabrication, paper handling and deliveries; reading and essential state changes must remain clear with sound off.

Source images and third-party game art stay in the reference board. Supplied PZ mods remain craft references with their stated reuse restrictions. The [OpenRCT2 graphics helper](https://github.com/OpenRCT2/Blender-RCT-Graphics) documents a historical sprite workflow; its Blender 2.79 dependency makes it a reference, not the proposed production setup. The [supplied tile mod](https://steamcommunity.com/workshop/filedetails/?id=2337452747) is likewise a construction reference, not an asset license for this game.

## 07. Build & test

Test the ordinary scenario with six to eight participants, without coaching. Episode 01 is built; comprehension, session timing and campaign structure still need testing. Source verification continues separately.

<!-- figure:current-deliverables -->

### Current focus

**Workshop tool · Supabase setup pending.** The [design whiteboard](whiteboard/index.html) is built and tested locally, including concurrent edits and conflicts. Install its database schema, connect the selected Supabase project and check a shared session with two participants. The workshop supports design discussion; it does not satisfy the uncoached playtest below.

**P2 · Ordinary-work proof — ready for uncoached playtesting.** The [playable episode](episode-01/index.html) includes an ordinary scenario with no returned payment. Both production plans complete; staffing and bay placement change the outcome. Automated engine checks and browser playthroughs cover their transitions. Participant comprehension and interest have not been tested.

<!-- figure:ordinary-work-proof -->

Run the ordinary scenario first with six to eight participants of varied game/accounting familiarity. Allow three minutes without coaching. Observe plan selection, bay recognition, staff reassignment and voluntary replay. Ask what changed delivery, what consumed cash, and what remains owed. Then offer the full supplier route and ask them to distinguish the saved Tuesday label from Wednesday’s return.

Review run receipts and observed mistakes before changing the model. Revise P2 if participants need coaching or do not want to try another plan. Findings will determine whether to clarify handoff locations, improve competing-job feedback or reduce the record set. The P3 reconstruction alternative is not yet built.

The full fictional loop is available for testing, but P2 and P3 have not passed participant review. The 12–15 minute session length is a target. Captured demonstrations do not measure participant timing.

**P1 · Source binding — parallel.** Retrieve the original return chain, establish the later observation of the same payment object and bind an ordinary control. Its [release gate](binding/episode-01-draft.md#8-readiness-decision) applies to the historical comparison; it does not block this fictional proof. Additional art studies enter the immediate work only when they solve a demonstrated recognition or interaction problem.


### Architecture

The [whiteboard](whiteboard/index.html) supports facilitated walkthroughs and rule experiments. It reuses the episode reducer and shared art register. Discussion sessions do not substitute for the uncoached P2 playtest. Shared-room deployment still needs the Supabase project connection.

<!-- figure:architecture -->

The episode uses a canvas scene with a DOM interface and a pure transition model. Cash uses integer cents. Save/reopen replays the action log in a versioned namespace; run export includes configuration, current state and outcome. This narrow prototype does not yet have arbitrary timeline branching, document pinning or a general simulation engine.

Separate economic events from their recorded representations. Link returns to payment attempts, reissues to obligations and edits to prior versions. Batch members, partial settlements and repeated attempts require typed links with source locators. Amount, date or journal context alone cannot establish identity. Preserve unsplit amounts until a source supports allocation.

Keep effective time and recorded time. A source correction visibly invalidates dependent narrative and figures. Saves include scenario version, source/data version, seed, decisions, pins, layout and view state. Fictional parameters never write to historical data. Exports state their population and basis.

### Mod boundary

Separate art packs, fictional scenarios and versioned source/document packs. A manifest declares model compatibility, dependencies, license and historical or invented status. Use separate save namespaces and retain provenance. JSON scenarios and replaceable atlases may suffice; Workshop integration and unrestricted scripting are not prototype commitments.

### Source review

<!-- figure:margin-source -->

A complete historical-scene record needs: proposition; event and record dates; source and locator; amount, currency and population; supporting and conflicting evidence; endpoint boundary; source assessment; inspection status; withdrawn predecessors; allowed player action; simulated assumptions; and the argument the mechanic teaches.

Check denominators, identities, periods, populations, quotation context and endpoints as well as arithmetic. The [evidence map](evidence-map.md) lists the unresolved links and discrepancies.

Before enabling a historical scene, obtain source and financial review, test comprehension, and check that interface labels and animations support the intended meaning. Record unresolved disagreements beside the claim. AI review prepares this work; the relevant human reviewers make the release decision.

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

Review one scene across these roles. Define what the player must understand, propose two choices, draw their consequences and test an ordinary counterexample.

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

Use CASE-01 for narrative references and the validation package for source retrieval. Retain conflicting records. The [current focus](#production/current-focus) sets the next task; supporting research does not create additional priorities.

### Change record

| Revision | Change | Status |
|---|---|---|
| 0.16 | Added a design whiteboard with Systems, Story and Structure views, scenario replay, proposal rules, checkpoints and a Supabase collaboration adapter | Shared-room project setup pending; P2 and P1 gates unchanged |
| 0.15 | Copy revised across chapters and references; inline scenes, record extracts and illustrated narrative sequences replace large preview grids; saved-record timing corrected | P2 remains ready for playtest; P1 verification scope unchanged |
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
