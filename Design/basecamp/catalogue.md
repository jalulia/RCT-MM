# mad money · basecamp · wip

## record types

- presentation studies: formats for reading, arranging and comparing case material.
- game concepts: proposals for the player’s activity, objectives and progression.
- playable scenarios: implemented situations with fixed rules, resources and outcomes.
- design tools: applications for composing scenes, editing relationships and testing rules.
- agency models: limits on what the player knows, controls and can change.

## implementation stages

- outlined: central activity identified; detailed rules remain open.
- specified: rules or structure described; a complete runtime is not available.
- implemented: an interactive artifact exists; its scope is stated separately.

## design foundations

### purpose · open

the intended effect of the game beyond completing a session.

what should the game help people understand, experience or do?

### audience · open

the people the game is designed for, including their knowledge and context of play.

who is playing, and what do they already know?

### format · open

the medium and session structure through which play happens.

which activities need a simulation, a reconstruction interface or a tabletop format?

### player role · open

the position from which the player receives information and takes action.

is the player an operator, an investigator or a participant in another defined role?

### agency · open

the information, permissions and outcomes the player can change.

which events remain fixed, and which respond to player decisions?

### session outcome · open

the conditions that end play and the result presented at closeout.

what constitutes completion, success or failure for the chosen concept?

## e01 · forensic explainer

presentation studies / implemented

a chaptered case account organized as diagrams, tables and records.

activity: read / trace / compare

scope: chapter navigation and evidence diagrams

availability: archived presentation

test question: can readers trace an explanation to its supporting records?

unresolved scope: presentation only; no management economy or player-controlled outcome.

revision: presentation study · 2026-06

sequence: chapter → diagram → source

sources: s16

preview: concept diagram · chaptered evidence presentation · schematic · previews/e01.svg

## e02 · specimen world + component bench

presentation studies / implemented

case material arranged as draggable paper, terminals and interactive specimens, with a separate component inspector.

activity: arrange / inspect / calculate

scope: paper, terminal and component interactions

availability: reference only

test question: which document interactions make dense information easier to examine?

unresolved scope: visual interactions and calculations; no production schedule or management economy.

revision: material study · 2026-06

sequence: artifact → interaction → inspection

sources: s17

preview: concept diagram · paper, terminal and component formats · schematic · previews/e02.svg

## e03 · agency as a park

game concepts / outlined

an agency represented as a park: departments, client and supplier visitors, sites and placeable work.

activity: place / manage / inspect

scope: spatial management concept

availability: design outline

test question: which objects require placement, and which belong in a record view?

unresolved scope: the placement model must distinguish projects, sites and legal entities.

revision: concept · 2026-09

sequence: place → watch → adjust

sources: s21, s02

preview: scene animation · agency-as-park · architectural and scenic interpretation · previews/art-hero.gif

## e04 · operating campus

game concepts / specified

run a fictional agency through staffing, production, suppliers and commitments. investigate problems when they affect delivery.

activity: plan / assign / deliver

scope: staffing, production and supplier decisions

availability: partial implementations

test question: does routine management sustain attention before an investigation begins?

unresolved scope: the portfolio, department and facility systems exceed the scope of the current scenarios.

revision: design 0.1–0.16

sequence: accept work → reserve capacity → produce → review

sources: s01, s19

preview: illustrative animation · workshop activity · 8-second illustration; episode state held · previews/reading-workshop.gif

## e05 · reconstruction park

game concepts / specified

arrange a reconstruction, compare records and test which explanations the evidence supports.

activity: trace / compare / explain

scope: record comparison and explanation building

availability: specification only

test question: does comparing evidence create meaningful choices?

unresolved scope: a standalone reconstruction scenario is not available.

revision: design 0.1–0.16

sequence: conflict → records → explanation → boundary

sources: s01, s04

preview: concept diagram · reconstruction and record comparison · schematic · previews/e05.svg

## e06 · operating game + historical anchors

game concepts / specified

combine fictional management chapters with short comparisons against fixed historical records. deeper case reading is optional.

activity: operate / compare / reflect

scope: operating campus with reconstruction interludes

availability: specification only

test question: does the historical comparison improve understanding of the preceding run?

unresolved scope: the complete campaign and historical interactions are unbuilt.

revision: design 0.1–0.16

sequence: fictional run → case comparison → next chapter

sources: s01, s04

preview: concept diagram · management chapters and historical comparisons · schematic · previews/e06.svg

## e07 · 28-quarter chronology campaign

game concepts / specified

a 28-quarter campaign with dated unlocks, relationship tests and progression after each required relationship is mapped.

activity: unlock / compare / advance

scope: dated progression and relationship gates

availability: runtime unavailable

test question: does timeline progression support discovery or only delay access?

unresolved scope: the campaign runtime is unavailable. the prototype 2 runtime contains the shorter make/buy scenario.

revision: campaign specification

sequence: quarter → records → relationship → next quarter

sources: s09

preview: concept diagram · 28-quarter campaign structure · schematic · previews/e07.svg

## e08 · prototype 2 · make or buy

playable scenarios / implemented

choose between shared shop capacity and supplier cash. run each plan, inspect the tradeoff and revise. both plans can deliver.

activity: choose / run / revise

scope: capacity and cash tradeoff

availability: alternate branch

test question: can players understand and replay the capacity–cash tradeoff without guidance?

unresolved scope: a short staged scenario; no half-day production calendar.

revision: prototype 2 · dc8050b

sequence: choose plan → see tradeoff → revise → compare

- opening cash: $48,000
- time model: short staged proof
- internal work: 12 of 16 shop hours
- internal cost: $6,400 modeled; no debit
- supplier: $12,000 reserved; posted cash unchanged
- other job: 8 hours; make queues 4
- payment conflict: not on playable path
- main question: capacity vs usable cash

sources: s07, s08

preview: interface capture · make/buy scenario · opening interface · previews/prototype-2.png

## e09 · ordinary-work-first practice

playable scenarios / implemented

schedule production through half-day turns, shared staffing and work-bay choices. the supplier payment succeeds.

activity: allocate / produce / hand off

scope: staff allocation, bay placement and make/buy choice

availability: alternate branch

test question: do staffing and placement create useful choices without a payment conflict?

unresolved scope: eight half-day intervals; no returned-payment investigation in the default scenario.

revision: ordinary-1 · 88daf3c

sequence: plan → staff + bay → half-day turns → closeout

- opening cash: $40,000
- time model: up to 8 half-day intervals
- internal work: 4 fabrication + 2 pack units
- internal cost: $4,000 materials
- supplier: $12,000; clean receipt tuesday am
- other job: 3 units due tuesday am
- payment conflict: ordinary only
- main question: crew + bay + make/buy

sources: s10, s11

preview: interface capture · ordinary production · opening interface · previews/ordinary-work.png

## e10 · episode 01 · the handoff

playable scenarios / implemented

complete a production job while resolving a returned payment. request records, obtain approval, reissue payment or arrange substitute production.

activity: operate / inspect / respond

scope: production and payment conflict; ordinary control available

availability: main

test question: does record inspection change an operating decision?

unresolved scope: fictional values and responses. historical comparison is disabled; participant comprehension and session length are unmeasured.

revision: episode 01 · design 0.16

sequence: production → payment conflict → response → closeout

- opening cash: $40,000
- time model: up to 12 half-day intervals
- internal work: 6 fabrication + 2 pack units
- internal cost: $4,000 materials
- supplier: $12,000; return or ordinary control
- other job: 3 units due tuesday pm
- payment conflict: full route + ordinary control
- main question: delivery decisions under a payment conflict

sources: s05, s06

preview: gameplay capture · returned payment → approval → handoff · condensed playthrough · previews/episode-supplier-run.gif

## e11 · standalone park builder

design tools / implemented

place, move and remove objects, people and looping events. compose a scene and export a gif.

activity: place / compose / animate

scope: placement, animation and scene export

availability: main

test question: which arrangements improve spatial readability and interaction?

unresolved scope: scene composition only; object placement has no financial or production effects.

revision: park builder · 4fbf10c

sequence: object → placement → scene → gif

sources: s14, s13

preview: interface capture · park builder · placement interface · previews/park-builder.png

preview: scene animation · shared park objects · composed animation loop · previews/art-hero.gif

## e12 · design whiteboard

design tools / implemented

edit shared records through systems, story and structure views. draw connections, replay scenario rules and save checkpoints.

activity: sketch / connect / replay

scope: scene-independent game design board

availability: main; room setup pending

test question: can a group test relationships and assumptions while keeping rules distinct from notes?

unresolved scope: shared rooms require a configured supabase project. notes and drawn connections have no effect unless assigned a rule.

revision: whiteboard · design 0.16

sequence: objects + notes → rules / beats → replay → discussion

sources: s12

preview: interface sequence · systems → story → structure · three views of shared records · previews/board-views.gif

## e13 · tabletop game

game concepts / outlined

a tabletop alternative to the tycoon format, with monopoly as a reference for board-based play.

activity: mechanics undefined

scope: tabletop format; mechanics open

availability: design outline

test question: which shared activity and outcome should the tabletop format support?

unresolved scope: player count, actions, ownership rules, turn structure and victory conditions are undefined.

revision: tabletop concept

sources: s22

preview: concept diagram · tabletop format · mechanics undefined · schematic · previews/e13.svg

## e14 · bounded historical role

agency models / outlined

play a role within a historical sequence. available information, authority and local actions are constrained by that role.

activity: act within known limits

scope: bounded actions within fixed history

availability: design outline

test question: what could this role know, authorize and change at each point?

unresolved scope: permitted actions and their effects are undefined. no historical-role scenario is implemented.

revision: agency outline

sequence: dated access → local choice → fixed history

sources: s21

preview: concept diagram · bounded agency within fixed history · schematic · previews/e14.svg

## e15 · open counterfactual management

agency models / outlined

manage a fictionalized situation in which interventions can produce different outcomes.

activity: change outcomes

scope: interventions with variable outcomes

availability: design outline

test question: which outcomes should player decisions be able to change?

unresolved scope: the extent of control, available interventions and relationship to historical events are undefined.

revision: agency outline

sequence: fictional setup → intervention → new outcome

sources: s21

preview: concept diagram · interventions with variable outcomes · schematic · previews/e15.svg

## relationships

- operating game + historical anchors combines operating campus: management chapters
- operating game + historical anchors combines reconstruction park: historical comparison
- prototype 2 · make or buy tests operating campus: capacity and cash
- ordinary-work-first practice tests operating campus: ordinary production
- episode 01 · the handoff tests operating campus: production under payment conflict
- standalone park builder supports agency as a park: spatial composition
- design whiteboard uses episode 01 · the handoff: episode rules for replay

## interaction studies

### what gets placed?

- clients, offices and affiliated companies as possible attractions
- projects as work clusters; sites, clients and legal entities kept distinct

proposed taxonomy; only small scenarios implemented

sources: s21, s02

### billpay: kiosk or workbench?

- a spatial kiosk or a separate mini-game
- a record and payment workbench; only physical handoffs use distance

workbench direction implemented in episode 01

sources: s21, s02, s05

### one world, several views

- interactive infographic showing money, information and control
- work / cash / information / control / people with retained selection

implemented with different scope in each playable

sources: s21, s04, s08

### three desk arrangements

- a 1990s desktop for records and discoveries
- world + inspector; compare two records; read with a return target

interface proposal with working record drawers and material studies

sources: s03, s05

### office-space collection

- mckibbin, boerum, johnson, porter, colorado and hong kong as a pack
- site identity separate from occupancy, department, ownership and obligations

three office-derived buildings developed; full site economy unbuilt

sources: s21, s02

### small attractions and easter eggs

- office photographs become landmarks and possible activities
- chrysler loop, fedora moonwalk, cat, cutaways, courtyard variants and voila route

scenic interactions; no economic or evidence rewards attached

sources: s13

### sandbox extensions and mods

- extension packs and reusable content
- stable object types, scenario settings and separate source records

data boundaries proposed; no general mod platform built

sources: s21, s12, s01

## sources

### s01 · initial design manual

design 0.1

- operating campus: fictional production and resource management.
- reconstruction park: compare records and build a supported explanation.
- combined concept: management chapters followed by historical comparisons.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/archive/versions/0.1/GDD-0.1.md

### s02 · initial object model

design 0.1

- a project coordinates deliverables, labor and supplier requirements.
- a site supplies space and facilities. occupancy connects it to an organization over time.
- a legal entity holds accounts, contracts, assets and obligations.
- a payment attempt has its own settlement state. a record documents a claim about that state.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/archive/versions/0.1/GDD-0.1.md

### s03 · three desk arrangements

design 0.1

- world + inspector: retain a selected object while showing its records.
- comparison: place related records side by side.
- reading: open a document with a return point to the prior task.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/archive/versions/0.1/GDD-0.1.md

### s04 · current game proposal

design 0.16

- the operating concept covers staffing, suppliers, delivery and cash commitments.
- the reconstruction concept covers conflicting records and supported explanations.
- historical comparison has separate access and evidence requirements.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/GDD.md

### s05 · episode 01 implementation

main · af17388

- the scenario advances in half-day intervals.
- production, cash, records and permissions constrain the available responses.
- the returned-payment route and ordinary control are separate scenario settings.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/episode-01/README.md

### s06 · episode 01 rules

design 0.16

- opening cash: $40,000.
- internal production: six fabrication units, two packing units and $4,000 materials.
- supplier commitment: $12,000.
- a three-unit display job is due tuesday afternoon. the run permits up to twelve half-day intervals.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/GDD.md

### s07 · prototype 2 runtime

add/prototype-v2-playable · 88daf3c

- opening cash: $48,000.
- internal plan: twelve of sixteen shop hours and $6,400 modeled cost.
- supplier plan: $12,000 reserved; posted cash remains unchanged.
- the competing eight-hour job queues four hours under the internal plan.

https://github.com/jalulia/RCT-MM/blob/88daf3c1bb1f24f249689b8a8bf9eefa7f49a20a/prototype-v2/latest.js

### s08 · prototype 2 evaluation criteria

branch build · design 0.12 / art 0.10

- the core decision is shared capacity versus usable cash.
- plan comparison requires a visible consequence for the second job.
- the scenario tests whether the tradeoff can be understood and replayed without guidance.

https://github.com/jalulia/RCT-MM/blob/88daf3c1bb1f24f249689b8a8bf9eefa7f49a20a/prototype-v2/QA.md

### s09 · earlier campaign integration note

revision 1 · describes an earlier runtime

- the campaign spans twenty-eight quarters.
- dated records unlock as the timeline advances.
- relationship checks gate progression to the next quarter.
- the campaign runtime is unavailable.

https://github.com/jalulia/RCT-MM/blob/88daf3c1bb1f24f249689b8a8bf9eefa7f49a20a/prototype-v2/VISUAL_INTEGRATION.md

### s10 · ordinary-work-first practice

ordinary-1 · branch 88daf3c

- two staff units are available per half-day.
- internal production requires four fabrication and two packing units, plus $4,000 materials.
- the $12,000 supplier route settles successfully.
- staff allocation and work-bay placement affect delivery.

https://github.com/jalulia/RCT-MM/blob/88daf3c1bb1f24f249689b8a8bf9eefa7f49a20a/ordinary-work/README.md

### s11 · ordinary practice checks

recorded 17 september 2026; not a participant test

- model checks cover production, staffing, bay placement and ordinary payment.
- automated checks establish runtime behavior. participant comprehension and session length remain unmeasured.

https://github.com/jalulia/RCT-MM/blob/88daf3c1bb1f24f249689b8a8bf9eefa7f49a20a/ordinary-work/VERIFY.md

### s12 · whiteboard / cms boundary

design 0.16

- a record has one identity across systems, story and structure views.
- rules, narrative beats, objects and notes are distinct types.
- scenario effects are evaluated by the episode rules.
- local saves and shared rooms use separate persistence mechanisms.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/whiteboard/CMS.md

### s13 · park interaction studies

checked in source against design 0.15

- a spatial object represents a site, facility, work cluster or landmark.
- physical handoffs can depend on distance.
- payment and information relationships need explicit states and permissions.
- scenic routes and small animations have no economic effects.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/research/park-logic-review.md

### s14 · published tools and build inventory

design 0.16 / art 0.10

- the design reader presents the current specification.
- the episode is a production and payment scenario.
- the park builder composes scenes. the whiteboard edits and replays relationships.
- the sprite catalogue and preview library provide shared visual assets.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/README.md

### s15 · existing production sequence

design 0.16 · operating-game proposal

- p2: test the ordinary production loop without instruction.
- p3: compare operating and reconstruction structures.
- p4: evaluate the full fictional episode.
- purpose, audience and format remain separate design decisions.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/GDD.md

### s16 · early forensic explainer plan

archived june 2026 precursor

- the presentation organizes a case account into chapters.
- diagrams show relationships, timelines and flows.
- source records support the explanatory sequence.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/archive/legacy-explainer/00_PLAN.md

### s17 · specimen-world design brief

brief says june 2026 · adjacent presentation work

- documents become movable paper, terminals and interactive specimens.
- a component bench isolates reusable controls and material treatments.
- the presentation has no production calendar or management economy.

sources/s17.html

### s18 · retained design 0.3

design 0.3 · retained copy

- design 0.3 retains the early operating and reconstruction alternatives.
- the retained copy has the same gameplay text as the archived 0.3 specification.

sources/s18.html

### s19 · systems research proposals

current research; larger economy proposed

- projects compete for staff, facilities and supplier capacity.
- contracts create commitments before cash movement.
- deliveries depend on both production and handoffs.
- information and authority restrict which corrective actions are available.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/research/systems.md

### s20 · design revision history

design 0.1–0.16

- design 0.1–0.16 covers the operating concept, episode rules, art system and authoring tools.
- alternate-branch scenarios retain separate schedules and resource values.
- revision numbers identify artifacts; they do not define a single gameplay sequence.

https://github.com/jalulia/RCT-MM/blob/af17388216d8897600be507dc53b841070d4130c/Design/GDD.md

### s21 · spatial game model

design outline

- agency-as-park: placeable work and sites, departments as staff, client and supplier visitors.
- bill-payment interface: a spatial kiosk or a record workbench.
- player agency: bounded actions within history or variable outcomes in a fictionalized scenario.

sources/s21.html

### s22 · purpose, audience and format

design outline

- purpose defines the intended effect. audience defines who the game serves.
- format defines the medium and session structure.
- tabletop play is an alternative with undefined mechanics. monopoly is a reference.
- player role, agency and session outcomes remain open.

sources/s22.html

## unresolved scope

- earlier simulation workspaces: two earlier workspaces are referenced, but their implementations are unavailable.
- 28-quarter campaign: a campaign specification exists; the matching runtime is unavailable.
- tabletop rules: player count, actions, ownership, turn structure and session outcomes remain undefined.
- participant testing: comprehension, session timing and replay interest remain unmeasured.
