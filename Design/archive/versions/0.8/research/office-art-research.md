# Office architecture: source study and sprite translation

16 September 2026. Research for the accepted pixel component system. This brief changes the architectural vocabulary; it does not reopen the camera, renderer or overall direction. Companion pixel studies now apply these observations to Porter and Boerum; the assembled park now uses these site forms and office-derived landmarks.

## The useful change

The current freestanding cottages should become adapted industrial places: long masonry shells, tall metal window grids, visible roof infrastructure, and large, deliberate interior insertions. The actual offices already contain distinctive game-scale forms: orange stair rails, timber room-boxes, an indoor tree, booth seating and a white car. They need selective reduction into sprites, not an extra layer of random texture.

**Keep:** the established projection, shared person/door scale, hard pixel edges, modular construction, material ramps and persistent staff. **Change:** roof silhouettes, facade rhythm, exterior ground treatment, interior landmarks and the relationship between buildings. RCT familiarity comes from readable, richly assembled places; it does not require a village of pitched roofs.

## Evidence and attribution

- **65 Porter — primary public + local.** [Matt Fry’s project page](https://mattfryed.com/65porter) identifies his work across concept, interiors, architectural design, fabrication management and art, and separately credits PSF Projects Architecture DPC as architects. [PSF’s project page](https://www.psfprojects.com/workplace/madwell-creative-agency) credits its team, Millwright’s millwork collaboration, and photographer Zach Pontz. These are compatible contributions, not competing claims. The portfolio lists 2019–2021 and 21,000 sq ft; the architect lists 22,000 sq ft; [Work Design’s 2023 project report](https://www.workdesign.com/2023/10/take-a-tour-of-madwells-brooklyn-offices-by-psf-projects/) lists completion in 2022. Keep the scopes attached to their sources; none is needed as an exact sprite dimension.
- **266 Johnson — primary public + local.** [Matt’s project page](https://mattfryed.com/266-johnson) describes adapting an adjacent marble-storage warehouse after growth at Boerum, with custom desks/furniture and his oversight of construction. It lists interior design, design direction and project management, 2015–2016. The project page does not state a photographer. Filenames elsewhere containing a photographer’s name are insufficient to assign every image in the set.
- **Boerum — user-identified street view; interiors still unresolved.** Julia subsequently identified the three adjoining brick-and-glass frontages in her supplied street-view screenshot. It provides a facade reference: brick lower walls, pale metal glazing grids, tall upper glass, narrow entries and a sidewalk tree. The capture date, measured footprint and full roof layout remain unknown. Her requested fedora-clad pedestrian pacing outside is a scene vignette; no identity or case role is inferred. [NYC’s North Brooklyn report](https://www.nyc.gov/assets/planning/download/pdf/plans-studies/north-brooklyn-vision-plan/north-brooklyn-full-low.pdf), printed p.66 / PDF page 86, discusses the Boerum space and its adjacent expansion together. Its photograph shows white partitions with square openings and a high warehouse ceiling, strongly resembling the documented Johnson interior. It has no room/address caption. It is not adequate evidence for a separate Boerum facade or floor plan. Matt’s role at Boerum remains user-provided context; a separate Boerum project credit was not located in this bounded search.

The verified local archive is `/Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/`. Its project JSON records map local image paths to public Squarespace source URLs. The archive is a source copy, not proof that every photograph is licensed for redistribution. Use the photographs as credited review references; make original game assets from the observations below.

## Four images for the reader board

All four were opened and visually inspected. Present them as a small architectural argument in this order: shell → internal construction → occupation → signature landmark. Do not crop out the feature named in the annotation.

| Image and exact local path | What is visibly present | Annotation for the board | Credit/provenance |
|---|---|---|---|
| [65 Porter exterior](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/65porter/04-1_8504217.jpg>) | Broad charcoal wall; brick, ribbed block and stucco share one paint colour; tall dark-framed glazing; deeply recessed paired doors; shallow parapet lines; concrete pavement, hydrant and bollards. | **One colour, several materials.** Use masonry changes and window proportions to articulate a long industrial shell. | Matt Fry portfolio local copy, linked to live Porter project; same photograph appears on PSF’s project page. Photography: Zach Pontz per PSF project credit. |
| [65 Porter working hall](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/65porter/11-4-capture0005-142.jpg>) | White exposed beams and ducts; raw pale timber volumes; orange doorway recess; white workstations with coloured uprights and screens; dense desk occupation; plants. | **A building inside a building.** The timber volumes remain distinct from the shell and stop below the industrial ceiling. | Matt Fry portfolio local copy; matching image on PSF project page. Photography: Zach Pontz. |
| [65 Porter kitchen / gathering area](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/65porter/16-9-capture0016-245.jpg>) | Very tall black glazing; white roof frame and skylights; coral/orange booth structures; pale tile dividers; blue table supports; broad planted seating edge; a white car beyond the railing. | **Colour belongs to constructed objects.** The booths, plant edge and window grid make a recognisable gathering place at small scale. | Matt Fry portfolio local copy; matching image on PSF project page. Photography: Zach Pontz. |
| [266 Johnson mezzanine and central tree](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/266-johnson/01-6a0a9246.jpg>) | Orange metal stair and mezzanine rail; black-framed upper meeting room; exposed white roof; indoor tree below a skylight; long desks; a white Chrysler in the hall. | **One strong landmark beats ten decorative props.** Orange circulation, the tree and the long car identify this place before any label. | Matt Fry portfolio, 266 Johnson project. Photographer not stated on the inspected page. |

Do not label any of these four as Boerum. Do not silently assign the Porter photography credit to Johnson.

## Boerum street reference

Julia identifies these three adjoining frontages as the Boerum offices. Keep them joined along the sidewalk, rather than separate lawn plots. Brick, pale glazing grids and the tree create a different street character from Porter’s charcoal frontage.

[Open the supplied street view](../assets/office-references/boerum-user-street-view.png). User-supplied screenshot of Google street imagery; capture date not established. Use as a local review reference. The screenshot itself is not a game texture.

The requested pedestrian is an anonymous man in a fedora pacing along the frontage, turning at each end. This is ambient motion, not a source claim about a person’s actions or knowledge. Keep the loop pauseable, stationary under reduced-motion preferences, and stopped when the scene is hidden.

## What to build from the photographs

These are proposed game translations, not measured reconstructions. Full footprints and roof plans have not been established.

| Kit element | Specific next-pass construction | Source basis / limit |
|---|---|---|
| Industrial shell | A long, low-parapet masonry volume assembled from repeated bays. Vary bay widths and glass heights; use an inset entrance and a narrow dark shadow at the lintel. Make it materially substantial enough to support a tall internal hall. | Porter exterior. The exact roof shape behind the parapet is not established by the frontal photo. |
| Roof family | Replace the cottage gable and generic blue sawtooth with broad shallow roof planes, parapet returns and distinct raised skylight units. Use a roof section that can be hidden to reveal the interior landmark. Keep utility details grouped. | Skylights and exposed roof members are directly visible in both office sets. Skylight positions in the sprite are a compositional proposal. |
| Window kit | Two tall industrial grids, one broad black meeting-room window and a glazed double entrance. A 1-pixel dark mullion, brighter outer reveal and restrained glass ramp will do more than a repeated flat blue square. | Porter exterior, Johnson mezzanine and Porter room-boxes. |
| Interior insert | Pale timber box with vertical battens, a black-framed window and a deeply coloured doorway recess. It sits below the shell roof, with a visible gap above. Make two lengths from the same bay. | Porter working hall and close view linked below. |
| Vertical circulation | Thin orange stair stringers and guardrail, grey tread tops, dark gaps between risers. This can be a reusable stair/landing unit with a clear silhouette at normal zoom. | Johnson mezzanine. Preserve its orange material identity even if the operating department changes. |
| Workstation | Long white or pale desk top, charcoal screen, pale under-desk storage, single coloured divider/upright. Combine pairs into rows; vary personal props sparingly. | Porter working hall and Johnson desks. Current solitary brown school-desk forms should be replaced. |
| Social module | A rectangular coral booth with a pale tall divider; a curved or straight planter-seat edge; pale round tables with blue supports. Use one dominant shape per module. | Porter gathering area. Booth shape survives reduction better than many miniature accessories. |
| Interior landmark | A relatively airy indoor tree in a substantial white planter beneath a visible roof opening; optional white long-body car as a distinctive nonfunctional furnishing. | Both office sets show the car; Johnson shows the central tree clearly. Seeing the same-looking car in both sets is not, by itself, a documented relocation history. |
| Street edge | Concrete sidewalk adjoining the facade, asphalt/service paving, a hydrant or bollards, occasional tree pits. Retain planted pockets as deliberate places rather than a continuous lawn apron around every building. | Porter exterior; placement beyond the photographed frontage is a game-layout proposal. |

The room modules can serve different departments. Do not equate “Accounts” with one architectural style or make a real street address synonymous with a department. Place and operational function remain separate objects in the design.

## Colour and material rules

Extend the current palette with material-specific ramps. The following are **proposed pixel colours judged by eye**, not sampled paint specifications:

- **Painted industrial masonry:** dark charcoal `#343A3A`, middle `#52595A`, lit `#777F7D`. Brick and ribbed block share the ramp but differ in sparse directional marks. Preserve wall planes before drawing mortar.
- **White-painted structure:** shadow `#9CAAA9`, middle `#CCD2CC`, light `#ECEBDD`. Reserve the brightest value for lit edges; the entire roof must not become an undifferentiated white patch.
- **Pale timber:** `#92724C`, `#C7A569`, `#E4CD96`. Broad panel colour and widely spaced battens at scene scale; wood grain appears only in the enlarged inspection view.
- **Orange metal / coral upholstery:** metal `#8B372B`, `#D9512D`, `#F17A47`; upholstery may be softer but retains a separate shadow face. Keep this as a visible material, not the universal alert colour.
- **Glass and painted metal accents:** subdued blue/green panes, near-black frames, limited teal and dusty pink furnishings. Deep green plants provide organic contrast against the white hall.

Use colour in large, meaningful objects: rail, booth, inset, door, divider. Do not tint whole buildings by department. Saturation can approach RCT’s clarity without turning every facade into a sweet shop.

## Assembly and proof sequence

1. **Shell test:** one long facade bay, one tall window, one parapet corner, one skylight. Assemble one building at the current native sprite resolution before adding props. At normal zoom it should read as an adapted urban industrial building.
2. **Interior test:** reveal one timber volume and an orange stair. Keep the same camera, person and floor scale. The building must read with the label removed.
3. **Occupation test:** two work rows, four visible staff states and one shared gathering module. Screens, seated bodies and circulation must remain separable; open floor area is a route, not an empty lawn substitute.
4. **Scene test:** replace the even village spacing with a compact street edge and shared interior/service circulation. Keep enough greenery and local colour for the established RCT world. A grim grey warehouse district would lose the office photographs just as surely as the cottages did.

A close architectural crop is valuable only if the normal-size sprite carries the same identity. The reader now shows the sources beside Porter shell, interior and component studies, plus Boerum’s frontage and pacing loop. Johnson’s stair remains a separate component to develop; it is not inserted into Porter. Avoid another finished overview that hides whether the components improved.

## Supporting inspected images and research record

- [Porter timber volume close view](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/65porter/14-7_8504070.jpg>): vertical battens, orange recess, black window, room top below main ceiling. Particularly useful while drawing the insert module.
- [Porter long circulation aisle](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/65porter/12-5-capture0001-163.jpg>): circulation is framed by room-volumes, signs, white ducts and red service piping; these are not free-standing houses.
- [Johnson partitions](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/266-johnson/02-6a0a9010.jpg>): tall white planes with square openings establish sightlines without closing off the whole hall.
- [Johnson tree, bar and stair](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/266-johnson/04-6a0a9253.jpg>): material and scale relationships for a roof-off interior.
- [Johnson before adaptation](</Users/juliacompton/Documents/Matt/_Mode Mode/Matt / Mode Mode/MattfryedCom/media/266-johnson/09-img_4227.jpg>): industrial roof and shell were already present; crates and storage describe the earlier state, not the finished office.
- [NYC report, local PDF](<office-assets/nyc-north-brooklyn-full-low.pdf>) and [full-page visual inspection](<office-assets/nyc-north-brooklyn-printed-p66.png>): printed p.66 is PDF page 86. The full page preserves its framing and avoids inventing a photo-specific credit. No individual photographer is credited on the inspected page.

Additional Porter images visually checked: `06-_8504017.jpg`, `07-_8504052.jpg`, `09-2-capture0003-307.jpg`, `10-3-capture0006-323.jpg`, `18-capture0001-178.jpg`, `20-capture0022-126.jpg`, `21-capture0034-227.jpg`. Additional Johnson images checked: `03-4r8a8644-edit.jpg`, `05-795b4451.jpg`.

Provenance: local assets were read from the verified portfolio archive; public project pages were checked on 16 September 2026. The older context spine describes Mode Mode as GitHub-only; the actual local archive and its source mapping establish the files used here. No modification to that separate project was made. This was architectural research only; no case records were uploaded or used as public search material.
