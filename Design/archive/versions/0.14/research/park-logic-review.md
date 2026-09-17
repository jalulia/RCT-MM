# Park interactions

Checked against design 0.14 / art 0.10, 17 September 2026. This separates implemented scenic interactions from proposed operating behavior. The original 0.5 review is archived. These observations concern architecture, objects and interface behavior, not the verification of financial claims.

**Make the campus an assembled industrial pleasure ground.** Three distinctive sites, a few improbable furnishings, visible human occupation and one clear circulation system will carry more character than additional lawn, identical trees or miniature signs. The attraction is getting close to the objects and seeing how the place works. Every landmark does not need to mint revenue.

## Three interaction studies

### 1. White Chrysler: display loop and object inspection

The long white car occupies an invented paved circuit with a planted island and boarding apron. The visible loop makes it a small attraction. The delivery van remains a separate asset with a different purpose; neither vehicle carries case money or documents through the scene.

**Implemented:** select the Chrysler through the scene or landmark list, inspect the office photograph, and switch between the parked state and running circuit. Its catalogue entry exposes 16 orientations. The global motion control freezes the current animation time; **Park the Chrysler** instead returns it to a designated parked point. Opening the practice record pauses world motion. No passenger boarding, attraction revenue, personal collection cabinet or evidence-point reward is implemented.

![The complete invented Chrysler circuit](../assets/sprite-catalogue/objects/L-10/default.png)

**Why it earns its space:** a memorable moving landmark supplies orientation and a miniature spectacle. It gives the player a reason to explore close-up art without requiring a modal interruption. The visible closed loop makes its decorative purpose intelligible.

**Limit:** the photographs establish a white car as furnishing. Its motion and outdoor display are design fiction. Do not animate it travelling between named offices: seeing a similar car in different source photographs does not establish a relocation history. No passenger icons for clients, suppliers or transfers. The car carries the car.

### 2. Coral gathering booth

**Implemented:** the current booth is Porter’s coral gathering furniture: pale divider, orange upholstery, table and visible supports. It appears inside Porter and in the courtyard’s **Booths** layout. This is not the trailer/service booth proposed in the earlier review. No trailer was verified in the inspected office galleries.

![The current coral gathering booth](../assets/sprite-catalogue/objects/M-03/default.png)

Episode 01 places the physical handoff decision in the workshop: near-dock or shared-floor production. It changes delivery timing without turning the gathering booth into a service counter.

**Limit:** a parcel is a physical deliverable. Documents, approval rights and money do not travel at walking speed. Do not label an ambient queue “unpaid suppliers” or turn a booth visit into payment confirmation.

### 3. Johnson interior and the Porter delivery route

Johnson’s cutaway retains its connected orange stair, mezzanine, central white birch and office cat. Each building has paired **Exterior / Interior** previews. The external stair overlook duplicated that feature and has been retired.

L-05 now contains the Voila delivery truck. Supplied context identifies Porter’s former bakery use; the classic step van and its service loop are inventions. A four-second loading stop gives the vehicle a readable purpose. Its sixteen orientations share the catalogue renderer. It can run or remain parked; the global motion control pauses both vehicles and people.

**Why it earns its space:** the truck adds a distinct moving silhouette and a trace of the site’s earlier use. The service road stays clear of the guest paths and building footprints. Johnson’s architecture can be understood through its own interior view.

**Limit:** neither route changes money, authority, evidence or production state. The operating episode has its own project selection and save/reopen behavior. Essential objects remain reachable through the object list.

## Scene arrangement

The current campus has three named site modules, selectable landmarks, paved aprons, a circulation grid and planted areas. Johnson sits forward with an open sightline; its sign is on the forecourt, and tall foreground trees have been removed. Supernova sits apart from the stag so both silhouettes remain visible. Boerum, Porter and Johnson use different architectural forms; the old creative/production/accounts aliases survive only as internal specimen keys. They are not the displayed site taxonomy.

The art hero is a separate composed arrangement. Both scenes are composites of sites and objects from different photographs, not maps of historically adjacent offices. Source associations remain attached to each object. Further layout changes follow recognition and interaction findings from the [current test](#production/current-focus).

## Selection and meaning

Keep three levels explicit:

| Selected thing | Inspector answers | Must not imply |
|---|---|---|
| Site module | Which architectural source, which spaces, which modeled occupancy? | Address = department or legal entity |
| Scenic object | What is it, what can be changed, which source inspired it? | Furnishing = transaction or evidence |
| Project/department assignment | Which work, people, capacity and commitments? | A permanent project building or one department per site |

Selecting Porter should not rename the inspector “Accounts.” Departments can occupy several modules and share one. Entity boundaries belong to the relevant view and dated records, not a fence added around a roof. A collectible is an inspected visual object, never a recovered case exhibit by default.

## Current behavior and remaining gaps

1. **Building and landmark selection exist.** Six visible exterior/interior choices cover three sites. The landmark list covers all eight selectable scenic objects; selecting the inflatable restores its courtyard layout. Buildings use polygon hit regions and landmarks use proximity regions. Individual workstations, the shark and the interior birch are not separately selectable.
2. **The inspector keeps one structure.** Every selection shows its sprite, source photograph, observed source features and park interpretation. The financial fixture has a separate, persistent **Practice documents** entry. It is not assigned to a real office.
3. **Sites and departments are separated.** Building controls and signs identify Boerum, Porter and 266 Johnson. The art explorer has no allocation editor. The separate episode allocates two shared staff units, without simulating all five departments. Shirt colour does not establish employment status.
4. **Animation demonstrates occupation and spectacle.** Walking, the circuit and shark motion do not advance work, cash, queues or records. The Interface chapter demonstrates the relationship model; Episode 01 implements all five views for its narrow operating scenario.
5. **Reading has a return path.** Opening the practice documents pauses motion and replaces the explorer with the document desk. **Return to park** restores selection, exterior/interior state, courtyard, focus and scroll position. Motion stays paused. Episode 01 saves its action history; the art explorer is not a saved simulation.

## Next steps: acceptance checks

Use these checks where they support the [P2 ordinary-work proof](#production/current-focus). Extra objects and alternate layouts are optional studies, not prerequisites for that proof.

* With labels hidden, can a viewer distinguish the street frontage, long hall and stair/tree volume?
* Can they select a landmark and its associated site without repeatedly selecting the wrong object? Test workstation selection only after it exists.
* After switching the courtyard layout, can they state what changed?
* Can they find Johnson’s interior directly and distinguish the bakery’s invented scenic route from an operating delivery?
* Can every inspection and route preview be reached with motion disabled and without pixel hunting?

The implemented interactions make the park worth inspecting and show how its component system works. The gathering booth and courtyard controls remain scenic; Episode 01 implements the handoff consequence.
