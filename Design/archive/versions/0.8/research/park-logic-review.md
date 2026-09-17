# Park logic review — office landmarks as attractions

16 September 2026 · Bounded review of GDD revision 0.5, `art-system.js`, `pixel-kit.js` and the office architecture research. Recommendations only; no game or shared code changed. No financial sources reviewed for this task.

**Make the campus an assembled industrial pleasure ground.** Three distinctive sites, a few improbable furnishings, visible human occupation and one clear circulation system will carry more character than additional lawn, identical trees or miniature signs. The attraction is getting close to the objects and seeing how the place works. Every landmark does not need to mint revenue.

## Three scenic interactions

### 1. White Chrysler: display loop and object inspection

Place the long white car on a paved display court beside a hall opening, with a deliberately short, clearly visible loop. Keep it out of the delivery lane. The car is a scenic exhibit; the delivery vehicle remains a different asset with a different purpose.

**Art-study action:** select the car, inspect its enlarged sprite, and switch between **Parked** and **Display loop**. Selection marks the object itself, not the enclosing site. The inspector shows the office-photo reference and which features became the sprite: long white body, dark glazing, wheel spacing. A first inspection adds the object to a small personal reference cabinet; it does not award money or evidence points. Stopping the loop preserves its position; reading or reduced-motion mode parks it.

**Why it earns its space:** a memorable moving landmark supplies orientation and a miniature spectacle. It gives the player a reason to explore close-up art without requiring a modal interruption. The visible closed loop makes its decorative purpose intelligible.

**Limit:** the photographs establish a white car as furnishing. Its motion and outdoor display are design fiction. Do not animate it travelling between named offices: seeing a similar car in different source photographs does not establish a relocation history. No passenger icons for clients, suppliers or transfers. The car carries the car.

### 2. Trailer booth: change the handoff frontage

Set the booth near the service apron, with a fold-out counter, a small awning and one conspicuous parcel. It can resemble a fairground concession without becoming the office's bank. Until its particular photographic origin is established, identify it as an original scenic invention in the object inspector.

**Art-study action:** switch its counter between **Court side** and **Service side**. Show the two door/counter states and the corresponding physical handoff path as a dotted preview. A parcel-carrying worker demonstrates the chosen route. Reserve enough clear ground that both options are viable; one is shorter for the workshop, the other easier to reach from the front entrance. This is a route study, with no claimed production simulation behind it.

**Later operating use:** if physical handoffs enter the prototype, let this choice alter only a stated carrying distance or reserved handoff slot. The player chooses which work to place near which access point. The route need not be a new path-laying system.

**Why it earns its space:** a tiny reversible layout decision changes something visible. It brings the RCT pleasure of arranging entrances and service edges into the office setting.

**Limit:** a parcel is a physical deliverable. Documents, approval rights and money do not travel at walking speed. Do not label an ambient queue “unpaid suppliers” or turn a booth visit into payment confirmation.

### 3. Orange stair and tree: an overlook that reveals the assembly

Give the stair a readable landing above the indoor tree. The strong orange zigzag, dark meeting-room frame, white hall structure and tree silhouette should identify this area before its label does. Treat “conservatory” as the game's interpretation of the tree space, not a documented historic room name.

**Art-study action:** select the landing to switch between **Shell**, **Occupied hall** and **Structure**. This uses the accepted roof/cutaway system to reveal three useful layers: the outer building; desks, room-boxes and people; stair, columns and roof opening. The tree remains spatially anchored through all three. Selecting a workstation or the tree replaces the object inspector while retaining the selected site in a breadcrumb. The collected object cabinet can return directly to that same object and camera.

**Why it earns its space:** the player learns the place by taking it apart and putting it back together. The exaggerated overlook can feel like an observation attraction without pretending to be an actual ride. It also demonstrates the modular art system rather than hiding it under a finished roof.

**Limit:** the overlook changes visibility, not authority or historical knowledge. A higher camera grants no access to private records. Tree, rail and meeting room are separate objects; none stands in for a company. Keep essential interactions reachable in the object list even with the roof on.

## Layout critique and proposed arrangement

The current scene has three isolated buildings in lawn plots, equal-status labels and a broad orthogonal path grid. Their silhouettes and functions are coupled to `creative`, `production` and `accounts`. The new architectural shells should break that coupling.

* **Foreground:** a low, joined Boerum-inspired street frontage, with a continuous pavement and its pacing pedestrian. Preserve three adjoining bays rather than three detached cottages. Keep the pedestrian anonymous and ambient.
* **Middle:** a shared court with the Chrysler loop on one edge and trailer/service apron on the other. Leave a clear sightline through the court to the primary entrances. Give occupied corners more detail than circulation space.
* **Rear:** a Porter-inspired long hall and a Johnson-inspired stair/tree volume. Put the tallest elements here so their cutaways do not mask the foreground. Distinguish the dark industrial shell, pale timber insert and orange circulation by form and material, not department colour.

This is a **composite design study**, not a map of historically adjacent or simultaneously occupied offices. State that once beside the scene and retain each source association in its site inspector. Do not invent roads, real travel times or tenancy chronology between the modules. Compressing and recombining architecture is acceptable; changing its evidentiary meaning is not.

Use one main promenade, short entrance branches and a separate service apron. Two or three planted pockets will contrast with masonry better than grass under every wall. The tree should have a deliberate roof opening; the stair should visibly connect two levels; the booth needs a believable counter frontage. These small spatial explanations do more than surface noise.

## Selection and meaning

Keep three levels explicit:

| Selected thing | Inspector answers | Must not imply |
|---|---|---|
| Site module | Which architectural source, which spaces, which modeled occupancy? | Address = department or legal entity |
| Scenic object | What is it, what can be changed, which source inspired it? | Furnishing = transaction or evidence |
| Project/department assignment | Which work, people, capacity and commitments? | A permanent project building or one department per site |

Selecting Porter should not rename the inspector “Accounts.” Departments can occupy several modules and share one. Entity boundaries belong to the relevant view and dated records, not a fence added around a roof. A collectible is an inspected visual object, never a recovered case exhibit by default.

## Concrete implementation pitfalls in the current study

1. **Selection still uses nearest building centre within a fixed radius.** Dense objects will become accidental building clicks. Add explicit object hit areas and front-to-back priority; provide an equivalent object list. Clicking the car should not open the fabrication bill.
2. **All building inspectors currently lead back to C-07/O-19.** Keep the project fixture available, but do not attach it to every scenic object. A tree selection should be allowed to be about the tree.
3. **Department signs still encode the old architecture.** Rename the three primary selectors for site modules and show department occupancy as changeable information inside. Shirt colour also remains insufficient to establish employment status.
4. **Animation currently demonstrates occupation without advancing work.** Preserve that distinction. A moving car or parcel preview is not a production loop merely because it moves.
5. **Cutaway and backdrop must agree.** Reveal the selected interior cleanly; avoid a second roof or large rear object occluding its controls. Retain clear ground-level entry points and selection marks at normal zoom.

## Small acceptance checks

* With labels hidden, can a viewer distinguish the street frontage, long hall and stair/tree volume?
* Can they select the car, parent site and a workstation without repeatedly selecting the wrong object?
* After switching a booth frontage, can they state exactly what changed—and avoid claiming money or authorization moved?
* After using the overlook, do they understand it changed the view rather than their permissions?
* Can every inspection and route preview be reached with motion disabled and without pixel hunting?

These interactions are an art-study expansion. Only the booth placement proposes a later operational consequence, and it remains optional. Their job now is to make the park worth looking around while proving that the scene's objects, paths and selection rules remain intelligible.
