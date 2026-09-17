# Visual integration — revision 1

## What was adopted

The preferred front end is a coupled world/desk system, not a skin. Its pixel art uses a 32×16 isometric projection, source-pixel edges, common anchors, stable person/door scale, material ramps, and large architectural landmarks. Its interface uses live Geist/Geist Mono text, near-black ink, white planes, one-pixel rules, fresh green selection, pink record/action surfaces, dot fields, and hatching for unresolved states.

The game now uses the supplied original `campus.png`, interface icons, and font files directly. They are not pasted into the old blue-window layout. The entire shell was rebuilt so the visual semantics persist between map, inspector, record drawer, puzzles, and responsive states.

## Shared semantics

- **Green:** current selection or active view.
- **Pink:** a record surface or consequential action.
- **Hatch:** unavailable, unresolved, or a state requiring careful interpretation.
- **Solid edge:** a relationship represented as supported in this game layer.
- **Dashed edge:** an incomplete or version-dependent relationship.
- **Broken end:** the trace stops at the last supported address.
- **Gold / red / navy:** designated, BILL, and AMEX measurements. These remain labels, never an automatic sum.

The map depicts place, work, occupation and physical scenery. HTML depicts long text, values, record state and comparison. Motion is reserved for ambient occupation; money and permissions do not travel as animated people or vehicles.

## Information architecture

The old header/toolbars/side windows were replaced by five stable layers:

1. App bar: title, event period, chapter, persistence.
2. View toolbar: Work, Cash, Records, Control and People.
3. Constant strip: selected object, period, view and trail completion.
4. World + inspector: selection persists when the question changes.
5. Record drawer: reading overlays the world without replacing navigation state.

The object list is equivalent to map selection and prevents pixel hunting. The inspector says what a view can establish and, equally importantly, what it cannot. New relationships appear as unfilled dashed nodes. Source trails stay collapsed until requested.

## Gameplay retained and changed

The 28-quarter campaign, dated unlocks, trail completion, relationship tests, save/reset and terminal transfer remain. The tests now present two record surfaces and ask the player to choose the relationship between them. This is still a compact prototype interaction, but it is structurally closer to the eventual comparison workbench than a quiz card.

Progress cannot move beyond a quarter with an unmapped relationship. Historical values never respond to player performance. Mistakes are retained as trail errors; they do not rewrite events.
## Ripple effects addressed

### Projection and scale

The campus remains on a 640×360 native canvas and is displayed at 1×. Narrow layouts scroll instead of introducing arbitrary fractional scaling. Canvas smoothing is disabled. UI text remains resolution-independent HTML.

### Selection

The old nearest-building behavior is replaced by explicit per-object hit centers and a parallel object list. Only visible/available objects participate. View changes preserve object and period.

### Financial animation

The old flowing colored particles were removed. Static orthogonal connectors show represented relationships. A broken connector is used where settlement/endpoint support stops. The decorative car remains an ambient office landmark and is never a carrier of cash, clients or authority.

### Architecture

The campus art keeps department, legal entity and site separate. The composite office setting is not treated as historical geography. Financial mechanisms appear as map annotations over the operating world rather than replacing each office with a themed accounting ride.

### Reading

Opening a quarter pauses time and brings in a pink document drawer. The selected map object, date and active view remain visible underneath. Closing returns to the same state.

### Accessibility and motion

All map objects are reachable in the object list. Controls have visible focus. Keyboard view shortcuts are exposed. Reduced-motion preference stops the ambient car. Documents use live text rather than pixel fonts. Mobile moves the inspector below the map and turns the drawer into a full-screen reading surface.

## Deliberate limits

The supplied campus composite is used as the world base; this pass does not yet instantiate every catalogue object as an independently selectable sprite. Record puzzles still use one relationship choice rather than full drag-and-pin comparison. The next production step should bind independent sprite anchors, roof/cutaway states, and one payment lifecycle workbench while preserving the same semantic system.

## Screenshot-driven revision

The first integrated screenshot showed that formal adherence was not enough: a native 1× canvas became a small island inside a large green viewport, while the inspector and masthead were undersized for their content. The default world is now 2× native pixels in a scrollable close-reading viewport, with an explicit 1× overview. This keeps integer scaling while restoring the campus as the dominant modality. Panel widths, truncation, overlay opacity, loaded-state notices and inspector verbs were revised as a coupled response rather than isolated CSS tuning.
