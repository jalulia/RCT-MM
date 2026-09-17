from pathlib import Path
import re
root=Path(__file__).resolve().parent.parent
old=(root/'working/archive/GDD-0.1.md').read_text()
def between(a,b): return old.split(a,1)[1].split(b,1)[0].strip()
def section(n): return re.search(rf'^## {n:02d}\. .*?\n(.*?)(?=^## |\Z)',old,re.M|re.S).group(1).strip()
def table(n): return re.search(r'^\|.*(?:\n\|.*)+',section(n),re.M).group(0)
parts=[]
parts.append('''# Agency game — game design document

Revision 0.2 · 16 September 2026 · Proposed design

## 01. Game

Run an agency: arrange production, assign departments, commission suppliers and meet commitments. Conflicting records become part of play when they change a decision about the work.

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

| Proposed rule | Reason |
|---|---|
| Separate work, obligations, cash, records and permissions | The story depends on their differences |
| Persistent staff departments; dated supplier engagements | Employment and external work create different commitments |
| Projects are configurable production clusters | Placement and staffing should affect production |
| Buildings provide capacity, access or a burden | Geography must have a function |
| Preserve selection and period across views | Players need to compare the same object |
| Keep historical and simulated outcomes distinct | A player's choices cannot create evidence |

Open decisions: audience; authority; real-name representation; final art direction; title; public or private distribution. “Mad Money Tycoon” is the working folder name, not a settled title.

## 02. First episode

A $100,000 campaign needs a $12,000 fabricated component. The bill says Paid, but the available bank record shows a debit followed by an equal return. The player must protect delivery while confirmation is pending.

All amounts, schedules and choices in this prototype are invented.

### Fifteen-minute path

<!-- figure:first-episode -->

### Payment states

<!-- figure:payment-lifecycle -->

The workbench opens from the affected project or obligation. It separates terms, payment events and platform records. The player can request processor history or recipient confirmation, then reserve substitute capacity, defer a handoff or change the production sequence. Confirmation may remain pending.

Inspecting and comparing are navigation actions. The consequential choice is the changed commitment or plan they inform.

### Historical comparison

Creative Peaks on CASE-01 p.34 is the proposed historical anchor; valid pooled-payment controls on pp.45–46 sit beside it. Its native chain has not yet been inspected. The historical interaction stays inactive until that source work is complete.

Ask the player to distinguish what their invented run changed from what the historical records establish. If this transition feels detached from the operating problem, revise it before expanding the campaign. See [source issues](evidence-map.md#issues-found-during-this-pass).

## 03. Objects & systems

A project connects people, contracts, places and obligations. These are separate objects even when they share a building or illustration.

### Relationship model

<!-- figure:relationships -->

### Object definitions

'''+table(4)+'''

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

'''+table(6)+'''

Start with one cash balance, five department capacities, one site and a few external commitments. Add a credit facility, currencies or legal entities when the test needs them. Hong Kong data requires explicit HKD/USD fields and sourced conversion rules.

Compute money in integer minor units. Preserve original source precision and record display rounding separately. Aggregate by stated population and economic episode; a platform object and its bank member cannot become two expenses.

### Customization and outcomes

Players can vary facility mix, project placement, department assignments, make/buy choices, schedule slack, contingency reservations and saved production plans. Desk arrangements, document pins, filters and fictional decoration provide expression. Physical distance affects a physical handoff only when modeled; it does not accelerate bank authorization.

Show commitments met, production completed, cash remaining, unresolved obligations and workload strain in the fictional model. Evaluate supported explanations separately. Weighting these into one score is an open design choice.

Allow pause, planning undo, branching and replay. After running an interval, show the action and its consequence. The historical company can close even when the player has successfully understood a system failure. No fraud score or suspect-ranking mechanic is proposed.

## 04. Narrative

Order the campaign by what the player needs to understand. Keep the full chronology available in the record view.

### Chapter sequence

'''+table(7)+'''

Each chapter begins with a normal case, allows a plan, introduces pressure, offers competing readings and resolves only what the records support. Documents enter when they help answer the current question.

### Events

'''+between('### Candidate event cards','### Characters and voice').split('\n\nThese are proposed')[0]+'''

These are proposed decisions and record interactions. Compare, pin and follow do not count as consequential gameplay by themselves. In an operating scenario they must inform a commitment; in reconstruction they must help discriminate between explanations.

### Characters and voice

Use fictional roles with practical constraints: a producer coordinating dependencies; an account lead protecting a promise; a freelancer awaiting confirmation; an operations coordinator finding capacity; a finance approver with a specific permission; a client contact authorized to approve scope. One person can occupy several roles.

Historical representation follows documented roles and actions. Motives and dialogue require sources. Rogers's authority problem must not become an invented suspicion motive, and named account activity must not become authenticated human action. The [cast register](evidence-map.md#cast-organizations-and-authority-over-time) preserves those distinctions.

Dry humor can come from fictional workplace friction. Avoid jokes at the expense of unpaid people and invented quotations from source subjects. “No yappin” remains a source request.

## 05. Interface

Keep the world, selected object and active question in view. Documents open alongside the context that made them useful.

### Five views

<!-- figure:five-views -->

'''+table(8)+'''

Rights and obligations stay in the inspector across views. Preserve the selected object, camera and period. Show event date, record version and availability to the represented role separately. Later discoveries belong to retrospective inspection. Available, received, read and understood are different states; unknown is valid.

### Desk layouts

<!-- figure:desk-layouts -->

Start with two pinned comparisons and one active inspector. Reading pauses the world and retains a return target. A full window manager is outside the first prototype.

### Payment workbench

Use three aligned columns: obligation and terms; bank/processor lifecycle; platform label and version. Stable IDs connect the records. Open it directly from a bill or project; a finance building may also provide access and represent staff-review capacity. The permission model controls actions regardless of entry point.

See the [payment lifecycle](#episode/payment-states) and the [detailed interface research](research/ux.md) for the same interaction at different levels of detail.

### Quantities and evidence

Every quantitative display includes measure, unit, population, period and basis. Keep necessary qualifiers visible; put the exact source locator one step away. Distinguish zero, not applicable, unavailable, not supplied, not inspected and modeled.

A transfer animation ends at the last supported endpoint. Bank movement, information transfer and permission edges use different marks. A named account, job title or access grant cannot stand in for a person's action.

### Accessibility

Keyboard equivalents; visible focus; a nonspatial object list; independent text scaling; labels and patterns for status; reading pause; reduced motion; adjustable audio; no hover-only evidence; reliable back history. At small widths, switch between world and inspector with an explicit return. Mobile reading is an initial target; full mobile management controls are not yet scoped.

## 06. Art & sound

The game world and the document interface need separate visual specifications. World art can use fixed-resolution sprites; text, amounts and controls remain crisp.

### Game art studies

<!-- figure:art-studies -->

These earlier scene studies remain alternatives to test, not approved art. The document's white, black and green system does not settle the game's palette. Compare the same scene and source states before choosing a direction. Full research: [visual craft](research/visual-craft.md).

RCT contributes visible local systems; Poolside.fm a desktop with a coherent identity; Project Zomboid material detail, persistent state and mod-aware construction; Mike Wilks sectional infrastructure. The local garden is a useful semantic precedent: several views expose different properties of the same object.

### Pipeline comparison

<!-- figure:art-pipeline -->

Build one studio, one production module, a worker and a supplier. Fix camera, sun, scale, pivot and ground plane. Test a 2:1 screen grid, two integer zooms and four orientations only where rotation affects play. These are proposed constraints, not original RCT specifications.

For pre-rendering, bake color and optional depth, normal and selection masks; retouch silhouettes by hand. Dither may affect materials or shadows. Financial digits, source text, selection and status marks remain clear.

Compare against simple live orthographic 3D using readability, iteration time, occlusion, file size, performance and the cost of producing the next twenty objects. That result determines the pipeline.

### Assets and mods

The supplied PZ mods are craft references with reuse restrictions. Record author, version, license, attribution, modification and redistribution terms for any acquired asset. Align scale, bevels, silhouettes, lighting and texture frequency across packs.

RCT sprites, PZ tiles, logos and source-document images are not automatically available as production assets. The research distinguishes inspected material from proposed procurement. Final representation depends on the distribution decision.

### Sound and motion

Use fabrication, studio hum, footsteps, deliveries and paper handling to establish ordinary work. Short cues communicate state changes. Soften or pause the world when reading; repeated notices should not become alarms.

Animate a handoff, a shrinking queue, an idle room or a pending request. Cash pulses require a declared simulated or observed transfer; information has a different motion. Music remains optional until the loop works. Sound must not imply guilt where the record remains open.

## 07. Build & test

Choose the campaign and engine after one complete episode has passed source and play tests.

### Architecture

<!-- figure:architecture -->

The first prototype can use a small canvas/SVG scene with a DOM interface. Engine selection follows measured scene complexity and art needs.

An event has an economic identity and a representation identity. Returns reference an attempt; reissues reference an obligation; edits reference prior versions. Use typed, sourced many-to-many links for batch members, partial settlements, repeated attempts and multi-client records. Shared amount/date or journal context does not establish identity. Do not invent fractional client allocations for unsplit objects.

Keep effective time and recorded time. A source correction visibly invalidates dependent narrative and figures. Saves include scenario version, source/data version, seed, decisions, pins, layout and view state. Fictional parameters never write to historical data. Exports state their population and basis.

### Mod boundary

Separate art packs, fictional scenarios and versioned source/document packs. A manifest declares model compatibility, dependencies, license and historical or invented status. Use separate save namespaces and retain provenance. JSON scenarios and replaceable atlases may suffice; Workshop integration and unrestricted scripting are not prototype commitments.

### Source review

A complete historical-scene record needs: proposition; event and record dates; source and locator; amount, currency and population; supporting and conflicting evidence; endpoint boundary; source assessment; inspection status; withdrawn predecessors; allowed player action; and simulated assumptions.

Check both arithmetic and meaning: denominator, identity, period, population, quotation context and endpoint. The current [evidence map](evidence-map.md) records unresolved routes and discrepancies; this design pass does not certify the case.

Each historical scene needs source/financial, gameplay-comprehension and interface-semantics review. AI review is preparation for the relevant human/source authority. Record disagreements beside the claim and hold the affected historical interaction until resolved.

### Production sequence

<!-- figure:production-plan -->

'''+table(14)+'''

Estimate after the first source-bound slice using verified scenes, unique transitions, assets and review effort. Exhibit volume is still unknown.

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

'''+table(15)+'''

Start with six to eight participants with different management-game and financial familiarity. These are diagnostic sessions. Record behavior and mistaken explanations; avoid instructions that teach the answer immediately before testing it.

### Workshop decisions

1. First audience and the understanding they should leave with.
2. Whether agency means fictional operations, historical discovery or explicit alternative history.
3. Current authority of CASE-01 and location of native exhibits/corrections.
4. Three objects whose ordinary operation should be enjoyable.
5. Legitimate transaction paired with the first adverse example.
6. Art direction tested on the same scene at the same scale.

The first three require Julia's input. Synthetic interaction and public craft work can continue meanwhile.

### Change record

| Revision | Change | Status |
|---|---|---|
| 0.2 | One reader sequence; first episode moved forward; relationships, lifecycles, views and production stages drawn; document typography and navigation rebuilt | Proposed design; presentation revised from Julia's review |
| 0.1 | Source orientation, ontology, alternate structures, research, interface paths, art studies and process | Initial proposal; source limits remain in the evidence map |

Source changes must update affected scenes and figures. Superseded decisions remain in revision history rather than competing in the active specification.
''')
text='\n\n'.join(parts)
(root/'GDD.md').write_text(text)
print({'words':len(text.split()),'bytes':len(text.encode())})
