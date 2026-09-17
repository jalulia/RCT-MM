# Mad Money Tycoon — Cold Onboarding for Gameplay Testing and Optimization

**Audience:** Grok or another coding/research agent arriving with no prior context  
**Working target:** Prototype 2, Design 0.12 / Art 0.10  
**Canonical game entry:** `index.html`  
**Regression entry:** `gameplay-test.html`

---

## 1. Your assignment

Act as the lead gameplay-test integrator. Run the current prototype, recruit several distinct expert perspectives, test repeated gameplay loops, identify failures, and make small evidence-based improvements. Optimize for **understandable consequential play**, not more features, spectacle, or historical accusation.

You must do all of the following:

1. Read the current design and release constraints before editing.
2. Literally inspect the rendered game and supplied visual assets; filenames and prose are not substitutes for looking.
3. Play the Make, Buy, revise, replay, inspection, view-switching, and document-return loops repeatedly.
4. Use multiple specialist agents or clearly separated expert passes.
5. Distinguish observed defects from preferences and hypotheses.
6. Change one gameplay variable or interaction cluster at a time.
7. Re-run automated and human-style tests after every meaningful change.
8. Preserve the semantic boundaries described below.
9. Deliver an optimization report, changed-file inventory, test evidence, and unresolved risks.

Do not redesign the game from scratch. The immediate goal is to evaluate and strengthen the existing **P2 ordinary-work proof**.

---

## 2. Product concept

The player occupies a fictional agency operations role with limited authority. They arrange production, reserve capacity, commission suppliers, inspect records, and protect commitments. The game is interested in distinctions that management interfaces often collapse:

- work is not automatically revenue;
- a campaign budget is not available cash;
- an invoice is an obligation, not proof of settlement;
- posted cash and usable liquidity differ;
- a platform label is a dated record, not universal truth;
- access or capability does not prove a person performed an action;
- historical records and player-created simulation outcomes must remain separate.

The preferred structure is an operating game linked to bounded historical reconstruction, but that larger structure is not decided. This prototype tests whether ordinary management play works before investigation or historical content is expanded.

### Current P2 question

Can an uncoached player understand, choose, run, revise, and compare two viable production plans in roughly three minutes—and explain the resulting tradeoff in delivery, capacity, and cash commitment?
## 3. Current playable scenario

All operating values below are invented test values.

### Shared setup

- Campaign: **C-07 — Product Launch**
- Deliverable/obligation: **O-19 — fabricated component**
- Supplier: **S-08**
- Campaign budget: **$100,000 ceiling; explicitly not cash**
- Posted/available cash: **$48,000**
- Shared-shop capacity: **16 hours for the interval**
- Physical handoff due: **Thursday, 16:00**

### Plan A — Make internally

- Uses 12 shop hours
- Models $6,400 internal cost
- O-19 is ready Wednesday
- Leaves four shop hours
- The competing eight-hour job queues by four hours
- Posted cash remains $48,000 in this proof

### Plan B — Buy from S-08

- Creates a $12,000 supplier obligation
- Has a two-day lead
- Delivers Thursday at Porter’s service edge
- Preserves all 16 shop hours for the competing job
- Leaves $36,000 usable liquidity
- Posted cash remains $48,000 until a supported movement occurs

Both plans deliver. The intended decision is a tradeoff, not a hidden correct answer.

### Expected progression

1. Select Make or Buy.
2. Run an interval.
3. Inspect the first consequence.
4. Keep the plan or revise it.
5. If revised, run the new plan’s consequence before completion.
6. Complete Thursday delivery.
7. Replay with the alternative plan.
8. Compare what changed and what did not.

A previous defect skipped the revised plan’s consequence and jumped to completion. The current logic tracks the plan that actually ran. Treat regression of this behavior as a blocker.

---

## 4. Resource map

Work from the `prototype-v2/` directory.

### Current implementation

| Resource | Purpose |
|---|---|
| `index.html` | Canonical current playable |
| `index-latest.html` | Named checkpoint matching the canonical entry |
| `latest.js` | Current state, interactions, progression and persistence |
| `latest.css` | Current responsive UI and visual semantics |
| `gameplay-test.html` | Browser regression harness that drives the real UI |
| `QA.md` | Adoption scope, structural checks and P2 assumptions |
| `latest-design/assets/` | Current campus scenes, cutaways, icons and Voila art |
| `latest-design/documents/` | Current document-material specimens |
| `latest-design/fonts/` | Geist and Geist Mono font files |

### Authoritative design package

Start with:

- `Codex Visual Updates GDD/README.md`
- `Codex Visual Updates GDD/Design/GDD.md`
- `Codex Visual Updates GDD/Design/RELEASE-REVIEW.md`
- `Codex Visual Updates GDD/Design/project.json`
- `Codex Visual Updates GDD/Design/qa/README.md`
- `Codex Visual Updates GDD/Design/previews/index.html`
- `Codex Visual Updates GDD/Design/previews/manifest.json`
- `Codex Visual Updates GDD/Design/design-review.html`

Use `Design/research/ux.md`, `systems.md`, and `park-logic-review.md` when investigating a relevant problem. Do not turn optional research ideas into immediate requirements.

### Legacy comparison only

`index-clean.html`, `app-v2-clean.js`, `style-v2-clean.css`, `app.js`, `style.css`, and `V2-feedback-review-Design/` are prior work. Do not silently restore their chronology-first UI or old art. Consult them only when a regression comparison has a specific purpose.
## 5. Running and inspecting the prototype

Preferred local setup:

```bash
cd Mir-Zero-Machine-Tycoon/prototype-v2
python3 -m http.server 8000
```

Open:

- Game: `http://localhost:8000/index.html`
- Regression harness: `http://localhost:8000/gameplay-test.html`
- Design review: `http://localhost:8000/Codex%20Visual%20Updates%20GDD/Design/design-review.html`
- Preview library: `http://localhost:8000/Codex%20Visual%20Updates%20GDD/Design/previews/index.html`

Use a real browser at desktop and narrow widths. Capture screenshots at representative states. Inspect browser console errors, network failures, focus behavior, overflow, image loading and local persistence. If using browser automation, do not limit evaluation to DOM assertions; retain screenshots and inspect them visually.

The regression harness should check the real interface for:

- Make loop capacity consequence and delivery;
- Buy loop liquidity consequence and delivery;
- mid-run revision consequence before completion;
- repeated alternative-plan progression;
- object and view continuity;
- independent courtyard state;
- document reading pause and return;
- budget/cash language;
- inactive historical scope.

Clear only the `mmt-design-012` local-storage namespace when resetting this prototype.

---

## 6. Non-negotiable design semantics

Do not ship a change that violates these rules:

1. **Budget ≠ cash.** C-07’s $100,000 is a ceiling, never starting cash.
2. **Obligation ≠ payment ≠ settlement.** Do not animate or label an endpoint that is not supported.
3. **Posted cash ≠ usable liquidity.** A reservation may reduce usable funds before cash moves.
4. **Activity ≠ revenue.** Busy buildings and completed work do not prove recognized revenue.
5. **Record ≠ claim.** A saved label remains within its version and timestamp.
6. **Capability ≠ execution.** Permission, ownership, seniority, account name, or job title does not prove a human action.
7. **Fiction ≠ history.** Player outcomes cannot rewrite historical events or create evidence.
8. **Unknown is valid.** Missing information must not be silently converted into zero, failure, guilt, or success.
9. **Sites ≠ departments or companies.** Porter is a place, not “the Accounts building.”
10. **Physical distance affects physical handoffs only when modeled.** It does not accelerate authorization or banking.
11. **Green means active control. Pink means record copy.** Neither color is a truth or verdict signal.
12. **Documents preserve context.** Reading pauses motion and returns to the same selected object, view, period and scene.
13. **Historical interaction remains inactive** until its claim-specific source gates are met.

If optimization pressure conflicts with these rules, preserve the rule and redesign the interaction.

---

## 7. Visual and interaction model

The current art is an original integer-grid pixel system informed by RCT-scale spatial logic. Text and controls remain crisp DOM elements rather than pixel-rendered text.

Required current visual facts:

- Boerum, Porter and 266 Johnson are distinct office-derived sites.
- Johnson retains yellow brick, orange internal stair/mezzanine, central white birch and cat.
- Voila/S-08 uses Porter’s service edge.
- The retired external orange overlook must not return.
- Base, event, booth and garden courtyard arrangements are independent scenery choices.
- Exterior/interior architecture controls are not the five operational views.
- Operational views are Work, Cash, Records/Information, Control and People.
- The same selected object and period should survive view switches.
- Spatial selection has a nonspatial object-list equivalent.

Test readability at native scene scale, scaled desktop size and narrow layout. Avoid adding decoration until selection, blocked work and handoff states are legible.
## 8. Multi-agent expert test team

Use separate agents if available. Otherwise perform explicitly separated passes and do not let one pass overwrite another’s observations.

### A. Gameplay systems designer

Evaluate decision quality, causal clarity, pacing, replay value and whether both plans remain viable. Ask: does the player make a meaningful commitment, or merely choose text before a predetermined explanation?

### B. Economy/accounting semantics reviewer

Audit every number and label. Track budget, cost, obligation, posted cash, usable liquidity, capacity, due date and settlement separately. Flag double counting or category collapse as blockers.

### C. UX and information-architecture researcher

Run an uncoached first-use pass. Record hesitations, wrong clicks, navigation loss and false inferences. Check that the active question, world, selected object and consequence remain available.

### D. Management-game player

Test curiosity, agency, tension and desire to try the alternative. Identify where the loop feels like a tutorial, filing exercise or binary quiz instead of management play.

### E. Accessibility specialist

Test keyboard access, visible focus, text scaling, reduced motion, contrast, labels independent of color, dialog focus/return, and narrow-screen world/inspector navigation. No evidence may be hover-only.

### F. Visual/UI art director

Literally compare the running prototype with Art 0.10 previews. Check pixel scaling, scene cropping, hierarchy, selection marks, density, cutaway states, typography, and whether overlays damage the supplied art.

### G. QA automation engineer

Run deterministic loops, persistence/reload, rapid repeated clicks, invalid ordering, plan revision, dialog interruption, resizing and reset. Capture exact reproduction steps and expected versus actual state.

### H. Adversarial semantics/red-team reviewer

Try to produce prohibited inferences: budget-as-cash, paid-as-settled, activity-as-revenue, access-as-action, missing-as-fraud, or fiction-as-history. Recommend the smallest copy or interaction correction.

### I. Producer/integrator

Deduplicate findings, resolve conflicts against the GDD, prioritize by player harm, approve narrow experiments and maintain the test ledger.

No agent may claim user evidence from its own simulated persona. Agent passes generate hypotheses and implementation checks; comprehension claims require actual participants.

---

## 9. Required gameplay test matrix

Run each sequence from a clean state and again after reload.

| ID | Sequence | Required outcome |
|---|---|---|
| L1 | Make → run → keep → finish | Delivery; four hours remain; competing job queues; posted cash unchanged |
| L2 | Buy → run → keep → finish | Delivery; 16 hours preserved; $12,000 committed; $36,000 usable |
| L3 | Make → run → revise to Buy → run → finish | Buy consequence appears before completion |
| L4 | Buy → run → revise to Make → run → finish | Make consequence appears before completion |
| L5 | Finish Make → replay Buy → finish | Clean new interval; no stale capacity or delivery state |
| L6 | Finish Buy → replay Make → finish | Same in reverse |
| L7 | Select object → switch all five views | Identity, scene and period retained; view-specific question changes |
| L8 | Change courtyard → inspect building interior/exterior | Scenery and architecture states remain independent |
| L9 | Pause → open/close documents | Reading stays paused after return |
| L10 | Play → open/close documents | Reading pauses; prior play state restores after return |
| L11 | Open every document tab | Correct specimen, title, caption and semantic warning |
| L12 | Save/reload at choose, consequence and finish states | Coherent controls and state after reload |
| L13 | Keyboard and reduced-motion pass | All core actions reachable; motion not required for meaning |
| L14 | 1440px, 1000px, 760px and phone width | No hidden core consequence or unusable inspector |
| L15 | Rapid plan switching and repeated Run clicks | No skipped consequence, duplicate completion or impossible totals |

For every failure record: build/revision, viewport, starting state, exact actions, observed result, expected result, severity, screenshot/console evidence and suspected subsystem.
## 10. Optimization protocol

### Phase 1 — Baseline

Run the regression harness and full matrix without editing. Capture baseline screenshots and timings. Write down what the interface actually does before proposing changes.

### Phase 2 — Diagnose

Classify findings:

- **Blocker:** wrong state, skipped consequence, semantic falsehood, inaccessible core action, data loss.
- **Major:** player cannot explain the tradeoff, loses context, or cannot complete/replay reliably.
- **Moderate:** avoidable hesitation, weak feedback, poor responsive behavior.
- **Minor:** polish with no material effect on understanding or agency.

Separate defect, usability observation, design hypothesis and personal preference.

### Phase 3 — Experiment

For each major hypothesis specify:

- target behavior;
- smallest proposed change;
- predicted player effect;
- possible semantic/accessibility regression;
- test that would falsify the prediction.

Prefer changing sequencing, state feedback, consequence visualization, labels or timing before adding systems. Do not optimize by revealing a “best” plan; preserve a genuine tradeoff.

### Phase 4 — Re-test

After each change:

1. run `gameplay-test.html`;
2. run L1–L6 in both directions;
3. run the directly affected matrix rows;
4. verify all non-negotiable semantics;
5. inspect screenshots, not only assertions;
6. test reload and reset;
7. compare against baseline.

### Phase 5 — Participant protocol

For eventual human sessions, use six to eight participants only as a diagnostic sample, not a statistical acceptance threshold. Avoid coaching. Ask participants to think aloud only if that does not distort timing.

After play, ask:

1. What did the $100,000 represent?
2. What changed when you chose S-08?
3. Did cash move, or was it committed?
4. Why did the competing job change?
5. Which plan would you try next, and why?
6. What did the invoice establish?
7. What did the saved V2 record establish—and not establish?
8. What was fictional, and what was historical?

Recurring false inferences stop expansion. Do not convert a tiny sample into a pass percentage.

---

## 11. Recommended metrics

Treat metrics as diagnostic evidence, not automatic design truth.

- Time to first valid plan
- Time to first interval run
- Time to completed delivery
- Percentage who voluntarily replay the other plan
- Number of plan revisions before completion
- Wrong or dead clicks
- View switches and document openings
- Ability to state the capacity tradeoff
- Ability to distinguish posted from usable cash
- Ability to identify budget as a ceiling
- Ability to distinguish obligation from settlement
- Context-loss incidents
- Keyboard completion success
- Mobile/narrow completion success

Do not optimize solely for speed. A slightly slower choice can be better if the player understands and owns the consequence.

---

## 12. Change discipline

- Keep `index.html` canonical.
- Keep `index-latest.html` synchronized if the checkpoint is retained.
- Modify `latest.js` and `latest.css`; do not route the canonical page back to legacy files.
- Do not edit authoritative GDD claims merely to match a prototype bug.
- Preserve current assets unless a measured recognition problem justifies change.
- Add tests for every fixed progression defect.
- Use stable IDs and integer minor units for money if the model expands.
- Keep source images/native evidence separate from themed summaries.
- Avoid a full window manager; one active document and one pinned comparison are enough.
- Do not introduce historical names, motives, dialogue or actions without appropriate source binding and review.
- Document invented values in UI and test records.

If you add automation, prefer a reproducible browser test directory and a single documented command. Include viewport screenshots and console/network checks.
## 13. Required final deliverables

Return all of the following:

1. **Executive gameplay finding:** Is the P2 loop understandable and worth replaying?
2. **Baseline evidence:** test run, screenshots, console/network status and matrix results.
3. **Agent/expert reports:** one concise section per perspective, including disagreements.
4. **Prioritized issue ledger:** severity, evidence, reproduction and owner.
5. **Optimization hypotheses:** prediction and falsification test.
6. **Implemented changes:** exact files and why each changed.
7. **Post-change results:** baseline comparison and regression evidence.
8. **Semantic audit:** explicit confirmation of all 13 non-negotiable rules.
9. **Accessibility audit:** keyboard, focus, motion, color independence, scaling and narrow layout.
10. **Remaining risks:** especially simulated-agent limits and questions needing human participants.
11. **Recommendation:** continue P2 iteration, proceed to P3 structure comparison, or stop and revise the core management loop.

Use this issue format:

```markdown
### [Severity] Short issue title
- Build/view: Design 0.12 / Art 0.10, viewport
- Starting state:
- Steps:
- Observed:
- Expected:
- Player/semantic impact:
- Evidence:
- Proposed smallest fix:
- Regression test:
```

Use this final decision format:

```markdown
## Gate recommendation
- Decision: ITERATE P2 | READY FOR HUMAN P2 TEST | READY FOR P3 | STOP/REDESIGN
- Evidence:
- Conditions:
- Unresolved blockers:
- Next smallest experiment:
```

---

## 14. Definition of done

This assignment is done only when:

- both plans and both revision directions complete reliably;
- replay begins from a coherent clean interval;
- the revised plan never skips its consequence;
- the player can see delivery, capacity and cash-commitment effects;
- selection and context survive views, documents and reload;
- automated tests pass and screenshots have been visually inspected;
- core play works by keyboard and with reduced motion;
- no semantic boundary has been collapsed;
- observed problems and simulated-agent opinions are clearly distinguished;
- the next decision is supported by evidence rather than enthusiasm.

The central test is simple: **does the player want to try the other viable plan, and can they accurately explain what changed?** If not, improve the management loop before adding investigation, more attractions, more buildings, or historical content.
