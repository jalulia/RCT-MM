# Agency game — design manual

Revision 0.1 · 16 September 2026 · Research and design proposal

Working folder: Mad Money Tycoon. This is not a naming decision. The design below is a set of arguments and tests, not an approved production specification. Its factual basis and unresolved source problems are recorded in [the evidence map](evidence-map.md). Research reports supply the longer rationale: [systems](research/systems.md), [interface](research/ux.md), and [visual craft](research/visual-craft.md).

## 01. The game worth testing

**Build and run a place that makes things. Learn why the work happening there, the money available to it, the records describing it, and the people allowed to act can diverge.**

The agency must be a worthwhile little world before it becomes a case. Players arrange production, cultivate repeatable ways of working, manage commitments, and see people make commercials, objects, events and campaigns. A client win matters because it brings an interesting production problem, not because another logo appears on a revenue generator.

The disturbance is specific: a supplier is waiting although the bill says Paid; a busy studio looks much smaller in a financial report; a title changes while a permission does not; a returned transfer persists in an owner's history. These are situations to navigate. A stream of revelations with an OK button is not a management game, however good the allegations are.

The first design question is whether that ordinary production loop is satisfying. The second is whether inspecting conflicting records changes a decision. If either answer is no, more story will not fix it.

### Intended experience

Competence, attachment, curiosity, pressure, and the satisfaction of finding a precise explanation. The player should sometimes improve a schedule, sometimes preserve a relationship, and sometimes have to say “the record stops here.” None of these needs a morality meter.

### Provisional audience and scope

Until Julia answers the audience question, design for curious adults who have played a management game but do not know agency accounting, with optional depth for people close to the case. This is a working assumption. The actual court, tax and transaction materials are not yet available here, so the historical script is not ready for production.

Initial target: desktop browser, mouse and keyboard, pauseable single-player sessions. Test a 12–15 minute slice before estimating campaign length. A 45–90 minute authored first arc is a possibility to evaluate, not a production promise. Reading time, appetite for management, and source-review cost will determine the eventual size.

## 02. Design commitments and open choices

| Status | Decision | Reason / reopening condition |
|---|---|---|
| Strong recommendation | Separate work, economic rights, records, cash and permissions | The source's mechanisms depend on their differences |
| Strong recommendation | Departments as persistent staff; suppliers as engagements | Recurring employment and external obligations have different economics |
| Strong recommendation | Projects as configurable production clusters | They are the object the player helps create |
| Strong recommendation | Buildings provide capacity, access or a meaningful burden | Decorative geography must not imply a financial causal relationship |
| Strong recommendation | One selected object survives every view switch | Comparison is otherwise needlessly difficult |
| Strong recommendation | Historical data and simulated outcomes remain distinguishable | Player agency must not manufacture evidence |
| Open | Operating campus versus reconstruction park | Compare both using one episode before campaign commitment |
| Open | Audience and player role | These govern disclosure, tone, challenge and source depth |
| Open | Degree of counterfactual freedom | Julia's choice; do not assume the player can rewrite named people's actions |
| Open | Final art direction, title, public/private distribution | Style tiles and a source-backed audience decision come first |
| Open | Real names versus selected fictional counterparts | Must be consistent across characters, dialogue, documents and claims |

No work in this pass changes the original references. No publication is proposed here. The browser artifact is a local design review, not the game.

## 03. Two structures to compare

### A. Operating campus

The player occupies a fictional operations desk. They can plan work and make commitments within bounded authority. Their campus is expressive: project arrangements, reusable production plans, department staffing, a small number of facility choices and a few personal touches. Financial and information constraints arrive through the consequences of work.

On the narrative path, each tested mechanism leads into a short, required historical anchor using the same object relationships. The deeper dossier remains optional. The anchor must state what the source reports, what remains open, and what the invented run did not change; it cannot be a detachable footnote. A simulated run may change its own outcome. It cannot change the historical record or pretend to establish an unseen endpoint. Once a run diverges from a historical setup, the future must be explicitly authored fiction.

**Best at:** management pleasure, care for the workforce, repeat play, familiar tycoon rhythm.

**Risk:** the player may think the original people had the same information and freedom, or that getting a better score disproves the historical account. The design must distinguish actual permissions and known facts from invented challenge conditions.

### B. Reconstruction park

The player arranges a present-day reconstruction. They activate episodes, trace relationships, compare versions and decide what a supported account can say. Space carries the history: a project, a studio, a payment desk and an off-map company become linked objects.

**Best at:** the interactive-infographic ambition, deep records, honest uncertainty, source navigation.

**Risk:** it becomes elaborate filing. Agency must involve discriminating explanations, choosing useful records and building intelligible comparisons, not finding the next glowing document.

### Comparative test

Use the same returned-payment episode and the same amount of source information. In A, the immediate problem is preserving delivery while resolving settlement. In B, it is explaining what the surviving records do and do not establish. Observe which produces voluntary experimentation and accurate understanding. Do not merge both into a large campaign merely to avoid choosing.

Working preference: A as the playable spine, B as the linked record view, with short historical anchors inside each narrative chapter. A separate sandbox may omit them; the story path may not. Preference is not approval. The synthetic prototype can test that pairing without pretending its invented schedule happened at Madwell.

## 04. Ontology: what things are

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

Employment may be salaried, hourly or otherwise structured; “fixed cost” is a useful initial management approximation, not a claim about every actual employee. Benefits create recurring obligations rather than a generic happiness bonus. A freelance creative can appear repeatedly without becoming payroll staff.

Clients and vendors can share the visitor animation system. They cannot share the same economic behavior. One commissions work; the other supplies it. A courier is an engagement attached to a handoff. An artist collaboration may add a rights/licensing component as well as work. A production company may also be affiliated. Relationships carry those distinctions.

A freelancer's tax form is a dated reporting artifact, not an admission ticket. Form/reporting responsibility can depend on recipient and payment method. The [IRS's 2024 instructions](https://www.irs.gov/pub/irs-prior/i1099mec--2024.pdf) distinguish employment wages and card/network reporting. Historical forms must follow their own year; this reference does not establish the treatment of every case payment.

### Space, company and pack

“Office Space” is a useful build-menu category or content collection. It is not the root data model. McKibbin, Boerum, 266 Johnson, Colorado, Porter and Hong Kong need separate answers to: what place; occupied by whom; leased or owned by which entity; when; providing what capacity; imposing what burden; relevant to which episode?

An affiliated company such as Starfish can participate in work, contracts and transfers while occupying the same site or remaining off-map. A property company can hold an asset without producing campaigns. Give them distinct objects even if they share an illustration.

Only place a site if spatial choice affects capacity, access, dependency or understandable geography. Otherwise use an off-map address. Do not build six empty districts to accommodate six names.

## 05. Core loops and meaningful verbs

### The ordinary loop

**Accept scope → reserve capacity → commission external work → produce → obtain acceptance → invoice/collect/pay → review.**

This is a work-cycle diagram, not a cash-order rule. Deposits, media commitments, payroll and supplier payments may precede delivery, acceptance or client collection. Each step needs a visible consequence. Accepting scope reserves future time. A specialist may shorten work but require a deposit and longer notice. An internal team offers continuity but competes with another project. Acceptance unlocks a contractual milestone; it does not magically settle an invoice.

Three clocks drive the initial simulation: production time, commitment due dates, and cash settlement. Later record-view clocks describe posting and editing without slowing ordinary play into a bookkeeping exercise.

### The inquiry loop

**Notice a consequential conflict → inspect the relevant object → compare representations → identify a useful record → narrow the explanation → adjust the plan.**

Ordinary supported transactions should be handled in batches. Inquiry attaches to an exception that affects a commitment or a historical question. The player is not employed to click 10,499 bills.

### The longer loop

A portfolio of projects gradually increases coordination demands. Players save successful production plans, choose where to add capacity, learn which commitments tolerate delay, and recognize where authority or information blocks action. Historical chapters introduce a new distinction only after its underlying objects are familiar.

### What is customizable

Facility mix; project placement within available space; department assignments; selected make/buy choices; schedule slack; contingency reservations; saved plan templates; desk arrangements; pinned documents; view filters; names and decoration in fictional scenarios. These choices must change something perceptible or be clearly expressive.

Do not simulate walking distance for payments merely because RCT has paths. A physical handoff can have a location. Bank authorization does not get faster when its building is closer to production.

## 06. Economy and systems

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

Initial economy is deliberately small: one cash balance, one credit facility only if needed by the test, five department capacities, a handful of external commitments, one site. Add currencies and legal entities only when their distinctions are being taught. Hong Kong requires explicit HKD/USD fields and sourced conversion rules; a common '$' label is unacceptable.

Use integer minor units for computational money; store original precision and display rounding separately. Never round a source and later treat the rounded result as source-exact. Aggregate by declared population and economic episode. A platform object and its bank member must not become two expenses.

### Scoring and failure

Show a small outcome panel: commitments met, production completed, cash remaining, unresolved obligations, workload strain in the fictional model, and quality of supported explanations. Do not turn them into one authoritative score until testing shows that weighting is useful and defensible.

A management failure can be instructive without being humiliating. Allow pause, branch, undo during planning and replay from a checkpoint. Once an interval runs, show the action history and consequence rather than a surprise penalty. Do not punish slower readers.

The historical closure is not a boss to beat. Discovering a system failure may be a successful research outcome while the historical company still closes. “Fraud found” is not a currency, and naming a suspect is not a high-score strategy.

## 07. Narrative architecture

The campaign should teach dependency rather than march through every date with equal weight. Its record view can always expose the full chronology.

| Chapter proposal | First experience | New distinction | Historical anchor in CASE-01 | Requires before script lock |
|---|---|---|---|---|
| 1. The work | Deliver a small production using staff and a supplier | Work / cost / fee / receipt | pp.1–6, 56 | One complete contract/job chain |
| 2. The desk | Responsibility without the permission to finish a task | Role / access / authority | pp.10–16 | Dated access and correspondence exhibits |
| 3. The report | A busy campus has two different financial portraits | Activity / presentation | pp.17–22 | Native workbooks and audience versions |
| 4. The payment | A label and cash lifecycle disagree | Obligation / attempt / settlement | pp.28–29, 33–34 | Adverse chain plus legitimate controls |
| 5. The other company | Cash travels while a debt stays | Entity / site / benefit / burden | pp.23–27, 48–49 | Corrected property/affiliate source manifest |
| 6. The handover | New ownership, incomplete control, changed records | Ownership / administration / version | pp.29–38 | Settlement, platform and migration records |
| 7. After closing | The world stops producing; documents continue changing | Operational time / record time | pp.39–40 | Bounded audit windows and account attribution |

Within each chapter: establish a normal case, let the player make a plan, introduce pressure, provide a small number of competing readings, resolve only what the records support, and return to the working place. Documents enter because they can help answer a current question.

### Candidate event cards

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

These are proposed mechanics and record interactions, not claims that the player choices occurred. Compare, pin and follow are inspection verbs; they do not count as consequential gameplay by themselves. In operating scenarios, each must inform a commitment, schedule, contingency or supported finding. In the record view, they support an explanation without pretending to change history. Relief, tax and employee-benefit episodes are later specialist modules. They should not become simple optimization minigames until their legal/financial rules and source populations are reviewed.

### Characters and voice

For fictional rehearsal, use characters defined by work and constraints: the producer keeping three dependencies aligned; the account lead protecting a promise; the freelancer waiting for confirmation; the operations coordinator who knows where the spare capacity is; the finance approver with a narrowly specified permission; the client contact who can approve scope but cannot accelerate treasury.

A person can occupy several of these roles. No sneering CFO archetype, omniscient heroic founder, or comic offshore accountant. In historical scenes, use documented roles and actions. Real-person motives and dialogue require sources. The source specifically distinguishes Rogers's authority problem from an invented fraud-suspicion motive, and named account activity from authenticated human acts.

Dry humor belongs in the friction of a fictional workplace and the design of objects. It does not belong in jokes about unpaid people or a made-up quote from a real participant. “No yappin” remains a source request, not dialogue to improvise.

## 08. Interface and view system

The basic arrangement is a large world with a persistent inspector, a compact view strip, a time control and a shallow desk. The computer metaphor earns its place by letting the player keep a document open while comparing the world it describes.

| View | Question | Primary marks | Prohibited inference |
|---|---|---|---|
| Work | What is happening; what blocks it? | Project stages, capacity, dependencies | Activity equals revenue |
| Cash | What moved and how far is it supported? | Bank events, attempts, returns, known endpoints | Paid equals settled; batch equals beneficiary |
| Information | Which record, which version, from where? | Lineage, comparisons, missing links | Failed export equals destruction |
| Control | Who could do which action then? | Dated grants, approval chains, system boundaries | Capability proves execution |
| People | Who supplies work and bears interruption? | Department commitments, employment/engagement links | Model strain proves a real person's feelings |

Rights and obligations remain visible in the inspector across views. Debt is not merely the negative counterpart of a cash animation. The same project remains selected, in the same place and period, when the view changes. When a historical role is represented, label event date, record version, and “available to this role at this point” separately. Evidence found later belongs to retrospective inspection and cannot silently inform an earlier decision. Document availability does not prove the person read or understood it; unknown remains unknown.

Every quantitative display carries measure, unit, population, period and basis. Necessary qualifiers are visible without hovering. The detailed source locator can be one step away. Separate zero, not applicable, unavailable, not supplied, not yet inspected and modeled.

### Three desk arrangements

1. **World + inspector:** plan and watch activity; one selected object and its practical next actions.
2. **Compare:** two records plus the same object's context, with retained and changed fields marked separately.
3. **Read:** comfortable long-form text with a persistent return target, source provenance and personal notes.

Do not implement a literal unrestricted window manager. Test two pinned comparisons and one active inspector before adding more. An infinite pile of windows would faithfully reproduce office work. That is not a recommendation.

### Payment workbench

Three columns: obligation and terms; bank/processor lifecycle; platform label and version. Connect them through stable IDs. A finance building can open this workbench and represent staff review capacity. Every bill or project also opens it directly. Permissions are enforced by the model, not by walking to a kiosk.

The first wireframes and three detailed paths are in [the interface research](research/ux.md). The local design review contains a compact clickable version: it is a layout/semantics study with invented data, not a banking simulation.

### Accessibility and continuity

Keyboard equivalent for every action; visible focus; nonspatial object list; independent text scaling; labels plus patterns for status; pause while reading; reduced motion; adjustable sound; no hover-only evidence; reliable back/navigation history. At small widths, show world or inspector with explicit return instead of squeezing both into illegibility. Mobile is a reading/review target initially, not a promised full management-control target.

## 09. Visual direction and production craft

The world and the desk need different resolutions. Small pre-rendered people, machinery and buildings can retain RCT's legibility. Documents, amounts and controls should remain crisp at normal reading size. “8-bit” is not an art specification.

The three researched directions are evaluated in [visual craft](research/visual-craft.md) and the accompanying style tiles. Initial preference is a warm institutional campus: compact production buildings, confident signs, olive/ink/paper surfaces, selective bright equipment, and restrained physical depth in the desk. The alternatives test a print-production character and a cooler systems-oriented atmosphere. The same source states must remain legible under all three.

**Reference extraction:** RCT supplies a place that can be watched and diagnosed; Poolside.fm suggests a designed instrument with personality; institutional corporate design supplies hierarchy; Project Zomboid supplies material specificity, persistent state and mod-aware craft; Mike Wilks supplies sectional glimpses of infrastructure. None is a skin to apply wholesale. The local garden supplies an especially useful precedent: define a semantic field once, then let multiple renderings expose different properties.

### Proposed pipeline test

Model one small studio, one production module, a person and a visiting supplier. Render fixed orthographic views with a common sun, ground plane, pivot and pixel scale. Bake a color pass and, only if useful, depth/normal/selection masks. Compare a plain atlas with selective depth-aware shading. Retouch silhouettes and critical edges by hand.

Start with a 2:1 screen-grid study, a fixed camera, four orientations only where rotation has gameplay value, and two integer zoom levels. These are proposed constraints to test, not claims about original RCT technical parameters. Lighting must not obscure hit targets or status marks. Dither belongs on world materials or shadows if it improves the image; never apply it to financial digits or source text.

Compare that pipeline against simple live orthographic 3D using the same scene. Evaluate readability, art iteration time, occlusion, file size, performance and the cost of producing the next twenty objects. Choose the cheapest pipeline that preserves the intended image. Do not build a shader system before discovering whether the player's main view needs it.

### Asset procurement and rights

The linked PZ mods are craft references with their own restrictions. Their availability in a workshop does not grant reuse in this game. Use licensed general-purpose assets only as a blockout or explicitly cleared base; record author, version, license, attribution, redistribution and modification terms. Avoid a mixed pack look by matching scale, bevels, silhouettes, lighting and texture frequency before adding content.

No RCT sprites, PZ tiles, third-party logos, screenshots or source-document images become production assets by default. The research report distinguishes what was inspected from what is proposed. Any final real-name/reference strategy belongs to the distribution decision.

## 10. Sound, motion and atmosphere

Build a small sound vocabulary around work: fabrication rhythm, studio hum, footsteps, deliveries, paper handling and restrained system feedback. The world should sound productive before it sounds tense. Use short state-change cues; repeated notices must not become alarms. Pause or soften the world when a long record is open.

Animation communicates transitions: a dependency handed off, a queue thinning, a room going idle, a permission request pending. Cash-flow pulses require an observed/simulated transfer with declared status; information edges use a visibly different motion. Unknown endpoints end visibly. They do not disappear into cinematic fog.

Music is optional until the loop works. No casino soundtrack, “sinister finance” sting or escalating dread tied to an unproved inference. Tension can come from a deadline and a quiet machine.

## 11. The first 15 minutes to prototype

Everything in this scenario is invented. The actual case comparison is separately labelled and fixed.

| Time budget to test | Player activity | What we learn from the test |
|---|---|---|
| 0–3 minutes | Review a $100,000 campaign, choose a production plan, place its cluster and reserve departments | Can the player form an intention without reading a manual? |
| 3–6 | Run an interval; resolve an ordinary capacity conflict; watch a deliverable progress | Is the management enjoyable with no anomaly? |
| 6–9 | Supplier component waits; inspect a $12,000 obligation labelled Paid; find debit and equal return | Can the player distinguish label, attempt and settlement? |
| 9–12 | Reserve substitute capacity, defer a handoff or revise sequence while requesting useful confirmation | Does inquiry change an operating decision? |
| 12–15 | Compare a legitimate pooled payment, review the run, then examine a short source-bound historical anchor | Can the player transfer the distinction without calling everything fraud? |

Confirmation can remain pending. The player need not solve the whole payment history to make a sensible contingency plan. An unrelated record request should explain its limited use instead of returning “wrong answer.”

The source-backed historical analogue is Creative Peaks on p.34, paired with the valid pooling controls on pp.45–46. The narrative-path transfer check asks the player to distinguish what their run changed from what the historical records establish. If that handoff feels like homework bolted onto the game, revise the chapter seam before proceeding. It is not ready for a certified historical scene until its native chain is inspected.

## 12. Technical architecture to support the design

Do not select a full engine during this research pass. The first prototype can use a modest canvas/SVG scene and DOM interface. Decide between a dedicated 2D engine and a renderer only after measuring scene complexity and art requirements.

Keep five components independent:

1. **Source archive and claims:** immutable input snapshots, locators, corrections and review states.
2. **Historical objects and events:** source-bound identities, relationships, versions and uncertainty.
3. **Scenario model:** invented parameters, allowed actions, seeded events, outcome rules and replay history.
4. **Presentation:** world sprites, view projections, document rendering and accessible lists.
5. **Review tools:** claim coverage, changed-source impact, source-to-scene links and exportable comparisons.

An event has an economic identity and a representation identity. Returns reference the attempt they reverse. Reissues reference the obligation they try to settle. Later edits reference prior record versions. Use typed, sourced many-to-many allocation links: one batch can support several obligations, one obligation can have partial settlements and several attempts, and one record can span multiple clients. Do not invent fractional client allocations for unsplit multi-client objects, or treat shared journal context as transaction identity. Use effective time and recorded time rather than overwriting a row. A source correction must invalidate dependent narrative copy and diagrams visibly.

A save records scenario version, data/source version, random seed, decisions, pins, layout and view state. Fictional parameters never write into the historical dataset. An export identifies its selected population and basis; it does not fabricate a grand total from overlapping surfaces.

### Modding and expansion

Plan a small data boundary now: art packs; fictional scenario packs; independently versioned document/source packs. A mod manifest declares compatible model version, dependencies, license and whether data are historical or invented. Test mods in a separate save namespace. Loading a mod must never overwrite provenance or make invented content look source-certified.

Do not promise Steam Workshop or unrestricted scripting for a browser prototype. JSON scenarios and replaceable atlases may be enough. The useful lesson from tile mods is reusable components with known dependencies, not an early commitment to a distribution platform.

## 13. Accuracy process

Zero error is a standard to work toward, not a claim that follows from careful prose. The reconstruction contains a source-route mismatch and differences that require native records. This pass identifies them; it does not certify the whole case.

For each historical scene, complete one record: proposition; event and record dates; source and exact locator; amount/currency/population; supporting and conflicting evidence; endpoint boundary; source's assessment; our inspection status; withdrawn predecessors; player action; simulated assumptions; and the argument the mechanic teaches.

Checks must include arithmetic and meaning. A number can be copied perfectly into the wrong denominator. A quote can be verbatim and still omit its resolution. A same-date/same-amount join can connect two distinct transfers. The current PDF itself includes those warnings.

Require three reviews at each historical scene gate: source/financial interpretation, gameplay comprehension, and interface semantics. An AI research agent's review is preparatory work; it does not substitute for the relevant human/source authority. Disagreement is recorded beside the scene, with the unresolved claim left inactive rather than quietly resolved for narrative convenience.

## 14. Production plan and decision gates

| Phase | Work and concrete output | Proceed only when | Work that can run alongside it |
|---|---|---|---|
| 0. Source orientation — this pass | Corpus inventory, full chapter coverage, 48-technique routing, corrections, draft GDD, research and style options | Julia can see the assumptions and challenge the architecture | Public precedent research and art-pipeline comparison |
| 1. Source binding | Acquire manifests and first episode's native exhibits; build claims and lifecycle records | No unresolved numeric/identity claim is needed by that episode | Synthetic capacity prototype; sprite readability study |
| 2. Ontology workshop | Map a contract, site, entity, employee, supplier, obligation, payment and record through one complete job | Same object can survive all views without changing meaning | Two competing player-role storyboards |
| 3. Paper/clickable playtest | Test operating-campus and reconstruction-park versions of one episode | Players can choose and explain consequences; ordinary play has appeal | Art style tiles and document legibility tests |
| 4. Thin playable slice | 12–15 minute loop, limited placeable objects, one conflict and one valid control | No systematic confusion about money/state/provenance; players voluntarily try a second plan | Source work on next chapter; pipeline cost benchmark |
| 5. Campaign outline lock | Sequence learning prerequisites, historical anchors, permissions, events and ending | Each chapter earns a new distinction and has source coverage | Additional art and sound studies only for approved objects |
| 6. Production | Author episodes, assets and software against the chosen model | Each scene passes semantic and source review | Accessibility, saves, performance, mod boundary |
| 7. Release preparation | Audience-specific editing, attribution, rights, packaging and distribution checks | Known review findings resolved; version and source scope explicit | Optional read-only infographic export |

Do not attach calendar estimates to unknown exhibit volume. After the first source-bound slice, estimate by verified scene count, unique state transitions, unique assets and review effort. Repeated mechanics are cheap; repeated source adjudication may not be.

### Division of work

The source editor maintains claims, corrections and narrative coverage. The systems designer owns actions, state transitions and incentives. The UX designer owns continuity, disclosure, comparison and accessible paths. The art/technical-art designer owns scale, camera, asset grammar and readable states. The developer implements the agreed model and replay tools. One integrator checks that all five are still describing the same object.

Workshop each scene with all relevant roles before producing it: source editor explains the exact distinction; systems proposes two decisions; UX draws the path; art identifies what can be shown without false inference; developer identifies hidden state and cost. Then deliberately test a legitimate counterexample. This is the useful design meeting; a moodboard presentation alone will not do it.

## 15. Test plan

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

Start with six to eight participants spanning management-game and financial familiarity. These are diagnostic sessions, not statistical validation. Record behavior and mistaken explanations, not just whether participants liked the look. Keep the instructions short enough that they do not teach the answer immediately before testing it.

## 16. Why these precedents matter

RCT contributes diagnosable local systems, meaningful scenario constraints and reusable construction. Doug Church's 1999 design tools provide intention and visible consequence. MDA links a rule to the behavior and experience it produces. Jenkins supplies spatial narrative beyond cutscenes. Period HCI supplies direct manipulation, comparison and organized windows. Each is applied to a concrete choice in the research reports, not cited as a style badge.

A useful counterweight is Miguel Sicart's [Against Procedurality](https://gamestudies.org/1103/articles/sicart_ap): a designer's rules do not exhaust what play means. Here that means preserving expression, alternative plans and the player's ability to question a model. A game that rewards agreement with an author has a very efficient plot and very little inquiry. This is a design inference from the critique, not an empirical claim about what this game will teach.

## 17. Decisions for the next workshop

1. Who is the first audience, and what should they be able to explain afterward?
2. What can the player change: operations in invented scenarios, discovery in the historical record, or an explicit alternative history?
3. Is CASE-01 the current narrative authority, and where are its native exhibits and current correction manifest?
4. Which three objects deserve to be enjoyable before any case material appears?
5. Which ordinary, legitimate transaction will sit beside the first adverse example?
6. Which visual direction makes the same scene easiest to understand and worth watching?

The first three questions are with Julia. The remaining three can be worked through using the research and review artifact now.

## 18. Change record

| Revision | Change | Basis | Status |
|---|---|---|---|
| 0.1 | Initial ontology, alternate architectures, full GDD structure, first paths, source issues, research, art options and phased plan | User request; CASE-01; old reference comparison; public primary research; technique-library studies | Proposed; not approved |

Future entries should say what changed and what it affects. When a source changes, update affected scenes and diagrams as well as the prose. Keep rejected or superseded decisions outside the current specification, linked for provenance rather than left competing on the same page.
