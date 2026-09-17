# Park interactions — current study and next tests

Checked against revision 0.8, 16 September 2026. This separates implemented scenic interactions from proposed operating behavior. The original 0.5 review is archived. These observations concern architecture, objects and interface behavior, not the verification of financial claims.

**Make the campus an assembled industrial pleasure ground.** Three distinctive sites, a few improbable furnishings, visible human occupation and one clear circulation system will carry more character than additional lawn, identical trees or miniature signs. The attraction is getting close to the objects and seeing how the place works. Every landmark does not need to mint revenue.

## Three interaction studies

### 1. White Chrysler: display loop and object inspection

The long white car occupies an invented paved circuit with a planted island and boarding apron. The visible loop makes it a small attraction. The delivery van remains a separate asset with a different purpose; neither vehicle carries case money or documents through the scene.

**Implemented:** select the Chrysler through the scene or landmark list, inspect the office photograph, and switch between the parked state and running circuit. Its catalogue entry exposes 16 orientations. The global motion control freezes the current animation time; **Park the Chrysler** instead returns it to a designated parked point. Opening the practice record pauses world motion. No passenger boarding, attraction revenue, personal collection cabinet or evidence-point reward is implemented.

![The complete invented Chrysler circuit](../assets/sprite-catalogue/objects/L-10/default.png)

**Why it earns its space:** a memorable moving landmark supplies orientation and a miniature spectacle. It gives the player a reason to explore close-up art without requiring a modal interruption. The visible closed loop makes its decorative purpose intelligible.

**Limit:** the photographs establish a white car as furnishing. Its motion and outdoor display are design fiction. Do not animate it travelling between named offices: seeing a similar car in different source photographs does not establish a relocation history. No passenger icons for clients, suppliers or transfers. The car carries the car.

### 2. Coral gathering booth; proposed service frontage

**Implemented:** the current booth is Porter’s coral gathering furniture: pale divider, orange upholstery, table and visible supports. It appears inside Porter and in the courtyard’s **Booths** layout. This is not the trailer/service booth proposed in the earlier review. No trailer was verified in the inspected office galleries.

![The current coral gathering booth](../assets/sprite-catalogue/objects/M-03/default.png)

**Next steps — optional route study:** design a separate service counter with **Court side** and **Service side** access. Show the two frontage states and a physical handoff route preview. Reserve enough clear ground for both choices; one might be shorter for the workshop, the other easier to reach from the entrance. A parcel-carrying worker could demonstrate the route. None of these controls or route consequences is currently implemented.

**Later operating use:** if physical handoffs enter the prototype, let this choice alter only a stated carrying distance or reserved handoff slot. The player chooses which work to place near which access point. The route need not be a new path-laying system.

**Why test it:** a reversible layout decision could make the RCT pleasure of arranging entrances and service edges consequential at a small scale.

**Limit:** a parcel is a physical deliverable. Documents, approval rights and money do not travel at walking speed. Do not label an ambient queue “unpaid suppliers” or turn a booth visit into payment confirmation.

### 3. Orange stair and tree: an overlook that reveals the assembly

The current orange overlook is a separate park landmark derived from Johnson’s stair and mezzanine. Johnson’s cutaway also contains an orange mezzanine and a tree/planter. Porter’s Solarium is a different source association and a separate invented glass pavilion. These objects do not establish one historical room or shared floor plan.

**Implemented:** select the overlook and use **Inspect Johnson interior** to select Johnson and remove its roof. Building controls retain the site selection while showing or hiding the shell. The separate assembly demonstration exposes construction stages. **Next steps:** test a unified shell/occupation/structure control if it adds useful information; individual workstations and interior trees are not independently selectable, and no object collection cabinet or return bookmark exists yet.

**Why it earns its space:** the player learns the place by taking it apart and putting it back together. The exaggerated overlook can feel like an observation attraction without pretending to be an actual ride. It also demonstrates the modular art system rather than hiding it under a finished roof.

**Limit:** the overlook changes visibility, not authority or historical knowledge. A higher camera grants no access to private records. Tree, rail and meeting room are separate objects; none stands in for a company. Keep essential interactions reachable in the object list even with the roof on.

## Current arrangement and a layout alternative to test

The current campus has three named site modules, independent department-occupancy text, selectable landmarks, paved aprons, a circulation grid and planted areas. Boerum, Porter and Johnson use different architectural forms; the old creative/production/accounts aliases survive only as internal specimen keys. They are not the displayed site taxonomy.

The remaining alternative is a denser street-and-court arrangement:

* **Foreground proposal:** joined Boerum frontage, continuous pavement and the anonymous pacing pedestrian.
* **Middle proposal:** shared court, Chrysler loop and a separate service apron. Test clear sightlines to entrances before adding an optional service counter.
* **Rear proposal:** Porter hall and Johnson stair/tree volume, with taller objects positioned to preserve foreground visibility. Keep material and architecture separate from department assignments.

This is a **composite design study**, not a map of historically adjacent or simultaneously occupied offices. State that once beside the scene and retain each source association in its site inspector. Do not invent roads, real travel times or tenancy chronology between the modules. Compressing and recombining architecture is acceptable; changing its evidentiary meaning is not.

Compare that proposal with the current arrangement using label-free recognition, object selection and visible entrances. Preserve the miniature attractions and greenery that make it a park. A future service counter needs an intelligible handoff edge; the existing gathering booth needs seating access. They solve different spatial problems.

## Selection and meaning

Keep three levels explicit:

| Selected thing | Inspector answers | Must not imply |
|---|---|---|
| Site module | Which architectural source, which spaces, which modeled occupancy? | Address = department or legal entity |
| Scenic object | What is it, what can be changed, which source inspired it? | Furnishing = transaction or evidence |
| Project/department assignment | Which work, people, capacity and commitments? | A permanent project building or one department per site |

Selecting Porter should not rename the inspector “Accounts.” Departments can occupy several modules and share one. Entity boundaries belong to the relevant view and dated records, not a fence added around a roof. A collectible is an inspected visual object, never a recovered case exhibit by default.

## Current behavior and remaining gaps

1. **Building and landmark selection exist.** Buildings use polygon hit regions; landmarks use proximity regions with priority over buildings. The keyboard-accessible lists cover all three sites and seven landmarks. Inflatable L-08 is scene-selectable in its layout but has no equivalent landmark-list button; the shark, workstations and interior tree are not separately selectable. Dense overlap still needs a selection test.
2. **The financial fixture is scoped to Porter.** Only B-02 opens C-07/O-19. Boerum and Johnson give site information; landmarks give photograph/interpretation information. The site remains selected when a landmark is inspected.
3. **Sites and departments are separated.** Building controls and signs use Boerum, Porter and Johnson. Occupancy text may name several teams; no allocation editor is implemented. Shirt colour remains insufficient to establish employment status.
4. **Animation demonstrates occupation and spectacle.** Walking, the circuit and shark motion do not advance work, cash, queues or records. The five views—Work, Cash, Information, Control and People—show static fixture distinctions.
5. **Reading has a return path.** The practice document pane pauses motion, disables the covered scene controls and returns focus/scroll context on close. It does not automatically resume motion. A production prototype still needs durable pins, bookmarks and save behavior.

## Next steps: acceptance checks

* With labels hidden, can a viewer distinguish the street frontage, long hall and stair/tree volume?
* Can they select a landmark and its associated site without repeatedly selecting the wrong object? Test workstation selection only after it exists.
* After switching the courtyard layout, can they state what changed? Test the separate service-frontage proposal only after its two routes are implemented.
* After using the overlook, do they understand it changed the view rather than their permissions?
* Can every inspection and route preview be reached with motion disabled and without pixel hunting?

The implemented interactions make the park worth inspecting and show how its component system works. The optional service-frontage study proposes a later operational consequence; the present gathering booth and courtyard controls do not simulate one.
