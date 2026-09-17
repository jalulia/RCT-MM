# Visual craft research and direction tests

Research date: 16 September 2026. Working proposals, not an approved art direction. Public research concerns game craft and asset production only; no case material was uploaded or used in public searches.

## Recommendation

Test **Campus 1998** first: a small, carefully modelled agency world with the legibility of a late-1990s management game, inside a custom institutional desktop. Use fixed orthographic renders for the buildings and people, a separate crisp interface for reading, and reversible map views for following work, money, records and authority. The distinctive part should be what the picture lets the player understand.

Keep **Production Floor** as a serious alternative, especially if the game becomes a more explicit interactive infographic. Keep **After Hours** as the third comparison, not the inevitable dark mode. All three must render the same scene and support the same task before any can win. Different content would make the comparison meaningless.

The date in each direction names a visual grammar. It does not relocate the events to the 1990s. A contemporary document remains a contemporary document. A discovered ChatGPT exchange should preserve its real date and source identity, rather than becoming a fabricated message from an old computer.

## What the references actually support

### RCT: modelled objects, controlled projection, very deliberate reduction

Chris Sawyer's own gallery states that most RCT graphics began as 3D models and were pre-rendered at game scale. The enlarged models show geometry and detail that barely survive the final image. The useful lesson is to compose for the final size: roof silhouette, entrance, machinery and movement must read before decorative detail. It is inaccurate to describe this simply as hand-drawn “8-bit art.” [Chris Sawyer, graphics up close](https://www.chrissawyergames.com/feature3.htm)

OpenRCT2's Graphics Helper is a practical reference for locked cameras, lighting and repeatable output. Its published README specifies Blender 2.79 and a scanline renderer; it is not a ready-made add-on for current Blender. Treat its pipeline as reference material. A new project can use current tools, but must demonstrate its own visual consistency. [OpenRCT2 Graphics Helper](https://github.com/OpenRCT2/Blender-RCT-Graphics)

The OpenGraphics ride guide also makes the cost of optionality visible: angles, vehicles and riders multiply the required renders. Its own notice says the described process is outdated. The enduring production lesson is to separate recolour masks, occluding geometry and actors; do not adopt the obsolete instructions as a current build recipe. [OpenGraphics ride guide](https://github.com/OpenRCT2/OpenGraphics/wiki/Building-a-ride)

### Project Zomboid: ordinary things with useful state

The Indie Stone's 2014 account describes a pipeline able to produce both sprite frames and mesh/animation data. Its 2023 engine discussion describes 2D environmental tiles, depth information and cached chunks, with experimental qualifications. Those are dated accounts of development, not a claim that every proposed feature shipped. The lesson for this project is that familiar sprite appearance and richer spatial information can coexist; the world need not become a freely rotating 3D scene to support useful occlusion and lighting. [Sprite of the Living Dead](https://projectzomboid.com/blog/news/2014/01/body-movin/), [Play Your Cardz Right](https://projectzomboid.com/blog/news/2023/02/play-your-cardz-right/)

The two supplied mods are different kinds of reference:

| Supplied reference | Verified identity and terms | Useful design lesson |
|---|---|---|
| [Nexus mod 37](https://www.nexusmods.com/projectzomboid/mods/37) | **Item Icons – Modders Resource**, Incariuz. Page describes 341 icons and four templates. Permission is limited to Project Zomboid mods; some images derive from game assets. | A coherent inventory can distinguish many mundane objects without making each one a spectacle. Study silhouette, container shape and category consistency. Do not import these icons into this game. |
| [Steam item 2337452747](https://steamcommunity.com/workshop/filedetails/?id=2337452747) | **Daddy Dirkie dirks tiles**, mod ID **Diederiks Tile Palooza**. A tile dependency library, not a standalone scenario. Description permits credited use in maps and prohibits redistribution/editing without written permission. A later author comment discusses community continuation, but does not establish permission for this separate game. | A shared building vocabulary supports many authored places. Walls, thresholds, furniture and signs can be recombined while behaviour comes from data. Study it; do not assume Workshop availability grants reuse rights. |

The Steam extraction also exposed incompatible/removed banners alongside the listing. That is insufficient to determine present functionality. No mod was installed or tested.

### Poolside.fm: a designed operating system, not a screenshot of one

In the designers' account, Poolside.fm's target was an invented period operating system, with hand-pixelled icons and carefully handled transitions. That is the right permission to take: keep the recognisable rules of windows, focus, menus, files and workspaces, while designing the shapes and identity specifically for this agency world. Its cocktails and leisure branding have no useful job here. [Design-team account in Communication Arts](https://www.commarts.com/webpicks/poolside-fm)

### Supplied local references

The local JPG is the cover of Mike Wilks's **The Weather Works**. Visually inspected. Major structural bays hold many small mechanisms; pipes and rails make motion inferable; quieter framing keeps the machinery from becoming one undifferentiated tangle. Borrow the hierarchy and the visible handoff between machines, not the book's architecture or illustrations.

The **Garden** HTML was inspected in source and in a browser. Its source maps record type to plant form, status to bloom/coverage, and `produces[]` to roots. In the rendered view, the same outline remains stable while colour plates and readouts change. That is an unusually relevant precedent: form is generated from the taxonomy. Its tiny type and document-sized central figure should not transfer to the game. The playable world needs more space.

- Garden: [local reference](</Users/juliacompton/Downloads/garden-standalone_1.html>).
- Wilks cover: [local reference](</Users/juliacompton/Library/Mobile Documents/com~apple~CloudDocs/ICLOUD-bridge/Codex/Games/Mad Money Tycoon/Refs/095c657c898b32b5a007b263536722ac.jpg>).
- The AVIF map was subsequently decoded and inspected by the integrating review: a forested landscape, sparse built areas and a visible dimetric grid. It is useful for comparing geographic scale and map orientation. Its game identity and relevance to any case location have not been established.

## Three direction specifications

These are design proposals. Palettes are starting values for proofing, not a claim of tested contrast. Interface type remains scalable; world pixels do not dictate text size. IBM Plex is a practical family candidate with Sans, Serif and Mono sources in its official repository; ship the appropriate font licence with whichever files are eventually used. [IBM Plex](https://github.com/IBM/plex)

### A. Campus 1998 — recommended first test

**Character.** A business park designed by someone who believed its stationery. Pleasant at first glance, specific under inspection. Moss lawns, concrete walkways, low offices, furniture just visible through cutaway walls. The dry humour comes from a perfectly ordinary organisation developing increasingly extraordinary plumbing.

**Era grammar.** Late-1990s construction simulation plus a custom corporate workstation. Small, solid, shaded world objects; restrained bevels on genuinely pressable controls; compact tool strips; independent inspectors. Avoid a literal Windows title bar, fake system error icons and large modal interruptions.

| Element | Concrete specification |
|---|---|
| Palette | Paper `#E8E3D4`; ink `#25332F`; lawn `#78936B`; roof `#526657`; concrete `#C7C8B8`; brass `#BBA15C`; brick `#B95740`. Use brass as identity/selection trim, not a universal warning colour. |
| Type | IBM Plex Sans for interface and body; Plex Mono for dates, amounts and short identifiers. 15–16 px reading text at standard desktop scale, tabular numerals. A compact custom pixel face may label signs inside the world only. |
| World materials | Four to six controlled shade steps per material, quiet roof grain, opaque floor plates, small contact shadows. Brick expressed by a few grouped marks; no noisy photo texture. |
| Projection | Proposed 2:1 dimetric ground grid. One fixed view first; four discrete views only if occlusion testing proves necessary. Maintain a generous top surface for rooms and queues. |
| Window furniture | Thin dark keyline, pale inset content, 3 px hard shadow, short hatched focus grip. Active app identified by a side tab and title weight; no bright blue horizontal bar. Close/minimise symbols remain conventional. |
| Icons | 20–24 px functional silhouettes, two or three tones, consistent upper-left light. A folder is a folder; a payment is not a cash-bag mascot. Signs and department symbols use the same drawing discipline. |
| People | Initially 24–32 source pixels tall, tested against 64×32 source-pixel ground tiles. Department encoded by a small badge/garment region plus inspector label; employment relationship never inferred from costume. |
| Motion | Eight-direction walk source, provisional six-frame cycles. Smooth movement between anchored positions; short held poses at meaningful handoffs. Production can look busy without every sprite vibrating. |
| Signature move | A roof lifts to a thin wire outline when its building is selected; the interior and its inbound/outbound queues remain in place. The same roof returns when the inspector closes. |
| Main risk | “Nice little campus” can trivialise human consequences. Fatigue, staffing pressure and unpaid work need clear inspectable states rather than slapstick distress animations. |

**Style-tile contents.** One office with cutaway desks, one outside provider arriving, one waiting work packet, the selected building inspector, a linked document page, and one view switch. Show the same amount/date in the map label and document. Every sample number must be labelled synthetic until sourced data is integrated.

### B. Production Floor — the agency as a printed operating diagram

**Character.** Paste-up boards, job jackets, acetate overlays, press sheets and immaculate registration marks. The agency's own production language becomes the means of reading it. Warmer and more editorial than a terminal; more explicitly diagrammatic than a park.

**Era grammar.** A consciously mixed 1992–1997 prepress workstation: flat work surfaces, palettes, rulers, pinned job windows and print-preview logic. This is an art-direction choice, not a reconstruction of one application.

| Element | Concrete specification |
|---|---|
| Palette | Stock `#EEEBDD`; key `#282621`; cobalt `#3F56A6`; coral `#CF6F66`; citron `#D8D270`; grey-violet `#AAA4B6`. Plates stay low-saturation enough for labels to read. |
| Type | Plex Sans for all controls; Plex Serif for explanatory case-reading panes; Plex Mono for docket metadata. Serif stays in documents, never on 12 px controls. |
| World materials | Modelled forms reduced to three spot-colour families plus stable dark outlines. Very slight grain in large fills; broken hatch only on turned-away faces. No moving paper grain. |
| Projection | The same 2:1 grid as A, simplified roof/floor shapes, broader walkways. Objects can retain silhouette at a much lower detail level. |
| Window furniture | File tabs, ruled separators, punched index strip, 1 px keyline; no ornamental torn-paper edges. Pinned document slips stack at the side of a substantial viewport. |
| Icons | Filled cut-paper silhouettes inside a 24 px cell. Fine single-line registration marks are decorative only; hit targets remain conventional sized. |
| Motion | A plate arrives in two measured steps when a layer view changes. Keyline and text remain fixed. Job packets advance only when the underlying work state changes. |
| Signature move | Control, records and transfers become separate acetate-like overlays over an unchanged map. Showing a second layer adds a named legend; it does not mix colours into an unexplained brown soup. |
| Main risk | The world could feel like a beautifully animated report. Keep people, queues, agency over routing and consequential spatial choices visible; test whether the player still wants to arrange and revisit it. |

The Garden informs the mechanism: registered structure and selectively separated colour. Do not copy its branding, historical prompts or editorial status rules. In particular, a shifted print plate must never imply a falsified document. Texture is not evidence.

### C. After Hours — a compact world inside a precise workstation

**Character.** Blue-green office darkness, pools of task light, warm screens, busy rooms still occupied. The most atmospheric candidate. It should feel like staying late, not like the interface already knows who is guilty.

**Era grammar.** A late-1990s professional workstation with tiled inspectors and instrument panels, rather than a domestic OS imitation. Use clear mode indication and direct manipulation; not hacker glyphs or surveillance theatre.

| Element | Concrete specification |
|---|---|
| Palette | Deep green `#172D2A`; surface `#29443E`; fog `#9CB5A2`; warm document `#E9E2C8`; task light `#D5BC78`; soft rose `#C58378`. |
| Type | Plex Sans for controls and narrative; Plex Mono sparingly for identifiers and time. A bright, warm document pane carries long reading. Do not typeset paragraphs in green monospace. |
| World materials | The same simple forms as A, with independent light/emissive masks. Light falls in small stepped pools. Reflections limited to one or two pixels; no full-scene bloom haze. |
| Projection | Locked orthographic scene; darkened nonselected areas retain silhouettes and labels. Doors, queues and selected routes stay visible. |
| Window furniture | Flat green-grey panels, warm focus line, small square toggles, narrow labelled tracks. Border states replace glowing everything. |
| Icons | Pale single-tone silhouettes with a second tone on active controls. Any bright status uses a shape and label as well as colour. |
| Motion | Mostly still. A task lamp activates when work starts; a printer emits a sheet when a record is produced. A trace can be replayed at deliberate speed. |
| Signature move | The player traces one transaction/work packet; local pools of light reveal its recorded handoffs without changing the map or inventing people who were present. |
| Main risk | Thriller lighting can imply malice before the evidence earns it. Also easiest to make inaccessible. Reject if a neutral interaction reads as sinister, or a route cannot be read with lighting effects disabled. |

## A visual language that survives all three directions

The map must have a declared syntax before artists populate it.

| Thing being represented | Proposed visual rule | What the rule must not imply |
|---|---|---|
| Place | Floor plate/building silhouette; address on selection | That the building is a legal entity, client or account |
| Entity | Boundary/crest/registered-name label around its controlled nodes | That common branding establishes common legal ownership |
| Work | A job packet with stage and capacity demand | That billed revenue equals completed work |
| Person/team | Person markers grouped by department; staffing state in inspector | That every walking figure is a guest, contractor or employee |
| Record | Document object with source, date and version | That a later account is contemporaneous evidence |
| Money | Directed route/transfer trace with amount, date and parties | That physical distance is payment delay, or that any moving dot is money |
| Authority | Boundary plus labelled approval/signing relationship | That awareness, access and legal control are interchangeable |
| Unknown or disputed | Explicit status label and an explainable gap in the relationship | That obscurity, red paint or visual corruption proves misconduct |

Views should change emphasis, not geography. A selected entity, zoom, time interval and open document persist when switching between work, money, records and control. Two views may be compared; four simultaneous bright flow fields will be a screensaver.

Use redundant encodings: money has arrowed double lines and amount labels; work has packets/stage marks; records have document corners and a dotted trail; control has named boundaries and approval links. Palette values can change between themes, but category identity and label wording cannot. A dashed relationship must have one meaning within a view; it cannot mean both “unverified” and “information.”

The supplied screenshot demonstrates a failure to prevent: it places an hours percentage next to an employee-count change without explaining their relationship. Every displayed quantity needs a measure, unit, period, population and source. A neat label can still make a false claim. A player should be able to open the denominator, not just dismiss the announcement.

## Pipeline comparison

All figures below are provisional production specifications, not measurements from a built game.

| Route | Strength | Actual cost | When to use |
|---|---|---|---|
| Draw every sprite by hand | Maximum control over silhouette and edge placement; very compact result | Every angle/state/body variation becomes drawing work; inconsistent perspective is expensive to repair | Bespoke icons, tiny people, exceptional props, final pixel cleanup |
| Model → orthographic sprite sheets | Repeatable projection, interchangeable office kits, cheap recolours, familiar management-game image | Render setup, palette conversion, atlases and sort/occlusion rules need discipline; many directions multiply storage | Preferred base route for buildings, furnishings and repeatable actors |
| Live orthographic 3D | Camera flexibility, cutaways, dynamic light and simple physical depth | More camera/art/performance QA, increased temptation to overmodel, pixel shimmer unless controlled | Choose only if user-controlled rotation or height is central to the actual game |
| Sprites plus optional depth/normal/mask data | Keeps authored image while allowing selected lighting, highlights and occlusion | More asset exports, shader complexity, consistency checks; not a free upgrade | Small technical spike after the basic sprite scene proves useful |

### Recommended production experiment

1. Make one small office kit: floor, two wall directions, doorway, desk, screen, chair, printer and a roof. Add two differently shaped buildings and a few human silhouettes. This is enough to test scale and occlusion.
2. Lock a projection contract. A 2:1 diamond is **dimetric**, with 26.565° ground diagonals; true equal-axis isometric has a different appearance. Do not mix packs with incompatible camera projections and hope the eye forgives it.
3. Start with 64×32 source-pixel floor tiles and 2× integer display, then test a denser 96×48 variant. Keep text in the full-resolution UI. These are competing prototypes, not an instruction to render the whole browser at low resolution.
4. Render base colour, alpha, contact shadow, recolour mask and object/part IDs separately. Store tile anchor, footprint, bounds and occluding parts in a manifest. Roof removal and selection then use the same model data.
5. Reduce using a controlled project palette. Inspect at actual on-screen size. Clean silhouettes and repeating windows by hand. A beautiful 2,000 px model does not rescue a mushy 60 px building.
6. Test movement behind a desk, past a doorway and between two buildings. Split large sprites into sensible front/back parts where required. Only add per-pixel depth if ordinary sorting cannot support the intended interactions.
7. Compare a completely unfiltered render, restrained ordered dither and a restricted light mask. Select by readability and mood; “more effects” is not a criterion.
8. Package geometry and visual definitions independently from case events. A lease, a tenant and a legal entity must be able to change without repainting a building.

Modern Blender is a plausible authoring tool. Orthographic projection removes perspective convergence and is documented by Blender; exact render-version settings still need a local proof. Do not promise the historical RCT helper will run inside a current installation. [Blender projection documentation](https://docs.blender.org/manual/en/4.2/editors/3dview/navigate/projections.html)

### Dither and light: use them where they do a job

The library's W2 implementation genuinely connects shading treatment to scene depth; it adds the ordered threshold before quantization. Its source comments distinguish procedural depth in the example from a real depth texture in the original. Borrow that honesty along with the technique. In an orthographic office map, generic screen height is not a legitimate substitute for visibility, importance or certainty.

For this game, trial a small Bayer pattern only in broad material shading and lighting falloff. Anchor it to the source-pixel grid so camera motion does not turn surfaces into crawling noise. Mask out text, monetary labels, selection outlines, people and documents. Disable it entirely at distant zoom. If the source has already been palette-quantized, avoid applying a second full-screen quantizer that destroys category colours.

Selection may reduce environmental detail around the chosen object, but an alleged entity must not become “corrupted” merely because it is alleged. Visibility and evidence confidence are different variables. Provide a no-texture option and reduced motion; these must preserve the same information.

### Art budgets need multiplication, not optimism

A provisional human set with eight directions, six walk frames and three genuinely different silhouettes already requires 144 frames before idle/work variants. Recolour masks can avoid duplicating every shirt. They cannot make identical silhouettes distinguishable. Department is a functional tag, not a separate fully animated body type.

A 2048×2048 RGBA atlas is 16 MiB uncompressed before mipmaps or extra masks. A second full-size normal/depth texture can erase the apparent savings of “just sprites.” Measure atlas occupancy, rendering time and frame time on the intended browser/hardware before committing to those features.

## Reusable assets: useful starting material, not a visual direction

| Candidate | Verified source | Fit and limits |
|---|---|---|
| Kenney City Kit (Commercial) | [Official pack](https://kenney.nl/assets/city-kit-commercial), 50 files, CC0 at research date | Suitable for projection/scale tests and background city massing. “Commercial” names the building category; the page separately states the licence. Too generic to stand in for every important address unchanged. |
| Kenney Furniture Kit | [Official pack](https://kenney.nl/assets/furniture-kit), 140 files, CC0 | Desk/chair/room blocking candidates. Rescale, recolour and re-render under one rig; inspect silhouettes at target resolution. |
| Kenney Isometric Tiles City | [Official pack](https://kenney.nl/assets/isometric-tiles-city), 128 files, CC0 | Fast 2D projection experiment. Do not mix its existing raster projection directly with a differently rendered 3D office kit. |
| Synty POLYGON Office | [Official pack](https://syntystore.com/products/polygon-office-pack), office props, modular pieces, characters, FBX/OBJ source formats | Broad functional coverage. Stock proportions and faceted surfaces are conspicuous, so use as a kit to art-direct, not a finished identity. No animations included. Paid licence; none purchased. |
| Original RCT/PZ artwork and the supplied mods | Creator/game/mod sources above | Craft references. No assumption that installing a game/mod permits extraction into this separate project. |

Synty's FAQ permits commercial game use subject to the relevant EULA and prohibits reselling the assets as rendered image files. A distributable sprite/mod kit needs a different rights review from a finished game. Use CC0 or commissioned assets for public-facing example packs until the intended distribution is checked. This is why the licence field belongs in the asset manifest. [Synty FAQ](https://syntystore.com/community/faq)

No packs were downloaded or benchmarked in this research pass. Product listings establish availability and stated terms, not suitability or production quality.

## Mod support without turning the case into mush

Use the mod references as architecture clues. Visual kits, maps and authored stories are different extension types.

- A **visual kit** changes furniture/tiles/icons and declares its projection, palette and licence. It cannot silently change a party's legal identity or a transaction amount.
- A **scenario** supplies its own parties, event data, claims and source records under a distinct scenario ID. The supplied case remains a named source dataset, not a loose pile of replaceable strings.
- A **rule variation** can explore a counterfactual with an explicit label and a fresh save identity. It cannot pass itself off as the recorded sequence.
- A **view extension** reads typed state and adds an explanation, overlay or export. The original records remain reachable.

For the first prototype, this means boring but useful structure: namespaced stable IDs, schema versions, separate asset manifests, explicit dependencies and a visible modified-scenario label. It does not mean building a Workshop, scripting sandbox or multiplayer economy now.

## Technique Library extraction record

Local library search and `show` used before source inspection. These records are a snapshot; this research does not claim the hosted library is synchronized.

| Record | Status in library | What was inspected | Proposed use |
|---|---|---|---|
| `tools:w2-depth-aware-dither` | Canonical exploration | Record plus embedded shader; local source hash matches imported record | Cause-driven material treatment; threshold-before-quantization; compare with effects removed |
| `tools:mmd-01` | Unsorted exploration | Record and local entry; hash matches. Referenced original demo was not located in the searched Tools tree | One state model, several views. Concept reference only; not treated as a verified runnable implementation |
| `tools:yos-02` | Unsorted exploration | Record and local entry; hash matches. Referenced original game was not located in the searched Tools tree | Fixed source resolution and named palette; adapt only after a local rendering test |
| `method:institutional-terminal` | Proposed method | Record instructions | Assign world, reading, controls and document metadata distinct jobs before styling |
| Garden standalone | Local supplied artifact | Source mappings and rendered browser screenshot | Stable keyed structure, separate visual layers, record-driven forms |

No project content, old prompts, branding or unaccepted library grades are imported as instructions.

## Next review: three equal tests

Each direction gets one 1440×900 still and a 15–20 second motion sample of the **same synthetic scene**: an office, two departments, one external provider, one job packet, one transfer and a linked source document. Hold layout, labels and figures constant. Then ask the reviewer to locate the provider, describe the work bottleneck, identify who may approve the transfer and open the record supporting it.

Reject a direction if people mistake places for entities, visual texture for uncertainty, or animation for proof that an event happened. Reject a pipeline if changing a named party or address requires repainting the whole scene. Reject a UI if reading the document loses the map, time position or selection.

The art decision should follow those tests. A beige window can be very handsome and still be wrong.

## Accompanying studies and verification

[Open the three-direction contact sheet](</Users/juliacompton/Library/Mobile Documents/com~apple~CloudDocs/ICLOUD-bridge/Codex/Games/Mad Money Tycoon/Design/research/visual-assets/tiles.html>). It holds the same synthetic scene and inspector layout across all three proposals. These are original SVG geometry studies with system-font substitutes, not Blender renders, finished sprites, functional UI or motion tests. Their purpose is to compare palette, figure/ground and document treatment before investing in production art.

All three were rendered and visually inspected in the browser at a 1502 px viewport. The contact sheet has three sections and no horizontal overflow there. A label collision and a background-tree occlusion error were corrected during inspection. The three `*-study.png` files in `visual-assets/` preserve the checked desktop views. Interaction, font deployment, accessibility contrast, alternate screen sizes and a real sprite export remain untested.
