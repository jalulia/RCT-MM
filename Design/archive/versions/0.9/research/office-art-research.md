# Office architecture: source study and sprite translation

Research checked against revision 0.8, 16 September 2026. The accepted pixel system now includes office-derived architectural shells, cutaways and furnishings. This brief records their source basis and remaining spatial tests. The companion Porter and Boerum studies are architectural studies; the catalogue and assembled park show the current reusable assets.

## Architectural direction

The current buildings use long masonry shells, tall metal window grids, flat roof planes and deliberate interior insertions. The photographs supply distinctive forms: orange stair rails, timber room-boxes, an indoor tree, booth seating and a white car. Revision 0.8 gives the three building families distinct facades and cutaways rather than assigning architecture by department.

The shared projection, person/door scale, hard pixel edges, modular construction and material ramps remain. The park compresses and recombines the architecture to leave room for attractions and visible circulation. Its composite layout is an invention, not a reconstruction of geographically adjacent offices.

![Porter hall with roof, from the current object catalogue](../assets/sprite-catalogue/objects/B-02/roof-on.png)

![The same Porter module with its roof removed](../assets/sprite-catalogue/objects/B-02/roof-off.png)

The same footprint supports both states. The catalogue supplies [Boerum](../assets/sprite-catalogue/index.html#B-01), [Porter](../assets/sprite-catalogue/index.html#B-02) and [Johnson](../assets/sprite-catalogue/index.html#B-03) at native scale and enlarged for inspection.

## Evidence and attribution

- **65 Porter — primary public + local.** [Matt Fry’s project page](https://mattfryed.com/65porter) identifies his work across concept, interiors, architectural design, fabrication management and art, and separately credits PSF Projects Architecture DPC as architects. [PSF’s project page](https://www.psfprojects.com/workplace/madwell-creative-agency) credits its team, Millwright’s millwork collaboration, and photographer Zach Pontz. These are compatible contributions, not competing claims. The portfolio lists 2019–2021 and 21,000 sq ft; the architect lists 22,000 sq ft; [Work Design’s 2023 project report](https://www.workdesign.com/2023/10/take-a-tour-of-madwells-brooklyn-offices-by-psf-projects/) lists completion in 2022. Keep the scopes attached to their sources; none is needed as an exact sprite dimension.
- **266 Johnson — primary public + local.** [Matt’s project page](https://mattfryed.com/266-johnson) describes adapting an adjacent marble-storage warehouse after growth at Boerum, with custom desks/furniture and his oversight of construction. It lists interior design, design direction and project management, 2015–2016. The project page does not state a photographer. Filenames elsewhere containing a photographer’s name are insufficient to assign every image in the set.
- **Boerum — supplied location identification; interiors still unresolved.** The supplied street-view screenshot identifies three adjoining brick-and-glass frontages as the Boerum offices. It provides a facade reference: brick lower walls, pale metal glazing grids, tall upper glass, narrow entries and a sidewalk tree. The capture date, measured footprint and full roof layout remain unknown. The fedora-clad pedestrian is an invented scene vignette; no identity or case role is inferred. [NYC’s North Brooklyn report](https://www.nyc.gov/assets/planning/download/pdf/plans-studies/north-brooklyn-vision-plan/north-brooklyn-full-low.pdf), printed p.66 / PDF page 86, discusses the Boerum space and its adjacent expansion together. Its photograph shows white partitions with square openings and a high warehouse ceiling, strongly resembling the documented Johnson interior. It has no room/address caption. It is not adequate evidence for a separate Boerum facade or floor plan. Matt’s role at Boerum remains supplied context; a separate Boerum project credit was not located in this bounded search.

The verified local archive is the locally retained Matt Fry portfolio copy. Its project JSON records map local image paths to public Squarespace source URLs. The archive is a source copy, not proof that every photograph is licensed for redistribution. Use the photographs as credited review references; make original game assets from the observations below.

## Four architectural references

The four inspected photographs establish shell, internal construction, occupation and signature landmarks. They are shown together in the [office reference board](#art/office-architecture); the source table retains the full-image locators and attribution.

| Image and exact local path | What is visibly present | Annotation for the board | Credit/provenance |
|---|---|---|---|
| [65 Porter exterior](../assets/office-references/porter-exterior.jpg) | Broad charcoal wall; brick, ribbed block and stucco share one paint colour; tall dark-framed glazing; deeply recessed paired doors; shallow parapet lines; concrete pavement, hydrant and bollards. | **One colour, several materials.** Use masonry changes and window proportions to articulate a long industrial shell. | Matt Fry portfolio local copy, linked to live Porter project; same photograph appears on PSF’s project page. Photography: Zach Pontz per PSF project credit. |
| [65 Porter working hall](../assets/office-references/porter-hall.jpg) | White exposed beams and ducts; raw pale timber volumes; orange doorway recess; white workstations with coloured uprights and screens; dense desk occupation; plants. | **A building inside a building.** The timber volumes remain distinct from the shell and stop below the industrial ceiling. | Matt Fry portfolio local copy; matching image on PSF project page. Photography: Zach Pontz. |
| [65 Porter kitchen / gathering area](../assets/office-references/porter-gathering.jpg) | Very tall black glazing; white roof frame and skylights; coral/orange booth structures; pale tile dividers; blue table supports; broad planted seating edge; a white car beyond the railing. | **Colour belongs to constructed objects.** The booths, plant edge and window grid make a recognisable gathering place at small scale. | Matt Fry portfolio local copy; matching image on PSF project page. Photography: Zach Pontz. |
| [266 Johnson mezzanine and central tree](../assets/office-references/johnson-mezzanine.jpg) | Orange metal stair and mezzanine rail; black-framed upper meeting room; exposed white roof; indoor tree below a skylight; long desks; a white Chrysler in the hall. | **One strong landmark beats ten decorative props.** Orange circulation, the tree and the long car identify this place before any label. | Matt Fry portfolio, 266 Johnson project. Photographer not stated on the inspected page. |

Do not label any of these four as Boerum. Do not silently assign the Porter photography credit to Johnson.

## Boerum street reference

The supplied identification associates the three adjoining frontages with the Boerum offices. The street study keeps them joined along the sidewalk. Brick, pale glazing grids and the tree create a different street character from Porter’s charcoal frontage.

[Open the supplied street view](../assets/office-references/boerum-user-street-view.png). User-supplied screenshot of Google street imagery; capture date not established. Use as a local review reference. The screenshot itself is not a game texture.

The anonymous fedora-clad pedestrian follows a six-leg, 36-second loop with two moonwalking legs. This is ambient motion, not a source claim about a person’s actions or knowledge. Pause, reduced-motion and hidden-scene behavior are implemented. The [labelled animation sheet](../assets/sprite-catalogue/sheets/boerum-animation-labelled.png) shows the distinct walking, moonwalking and endpoint poses.

## What the component kit takes from the photographs

These are proposed game translations, not measured reconstructions. Full footprints and roof plans have not been established.

| Kit element | Current translation and retained design rule | Source basis / limit |
|---|---|---|
| Industrial shell | A long, low-parapet masonry volume assembled from repeated bays. Vary bay widths and glass heights; use an inset entrance and a narrow dark shadow at the lintel. Make it materially substantial enough to support a tall internal hall. | Porter exterior. The exact roof shape behind the parapet is not established by the frontal photo. |
| Roof family | Broad mineral-grey roof planes, parapet returns and low raised skylight units. Roof removal exposes the interior. Utility details remain grouped. | Skylights and exposed roof members are directly visible in both office sets. Skylight positions in the sprite are a compositional proposal. |
| Window kit | Two tall industrial grids, one broad black meeting-room window and a glazed double entrance. A 1-pixel dark mullion, brighter outer reveal and restrained glass ramp will do more than a repeated flat blue square. | Porter exterior, Johnson mezzanine and Porter room-boxes. |
| Interior insert | Pale timber box with vertical battens, a black-framed window and a deeply coloured doorway recess. It sits below the shell roof, with a visible gap above. Make two lengths from the same bay. | Porter working hall and close view linked below. |
| Vertical circulation | Thin orange stair stringers and guardrail, grey tread tops, dark gaps between risers. This can be a reusable stair/landing unit with a clear silhouette at normal zoom. | Johnson mezzanine. Preserve its orange material identity even if the operating department changes. |
| Workstation | White slab with a warm ply edge, charcoal screen, coloured supports and a separate chair. Rows use repeated stations with sparse personal props. Storage/divider variations remain possible additions. | Porter working hall and Johnson desks. The current white-worktable component is M-01. |
| Social module | A rectangular coral booth with a pale tall divider; a curved or straight planter-seat edge; pale round tables with blue supports. Use one dominant shape per module. | Porter gathering area. Booth shape survives reduction better than many miniature accessories. |
| Interior landmark | Johnson’s cutaway includes a tree and white planter; the separate Solarium is an invented Porter-derived glass attraction. The Chrysler can be parked or follow its invented circuit. | Both office sets show a white car; Johnson shows the Chrysler and central tree clearly. Similar appearance does not establish a relocation history. |
| Street edge | Concrete sidewalk adjoining the facade, asphalt/service paving, a hydrant or bollards, occasional tree pits. Retain planted pockets as deliberate places rather than a continuous lawn apron around every building. | Porter exterior; placement beyond the photographed frontage is a game-layout proposal. |

The room modules can serve different departments. Do not equate “Accounts” with one architectural style or make a real street address synonymous with a department. Place and operational function remain separate objects in the design.

## Colour and material rules

The renderer uses material-specific ramps and additional face shading. These are **current architectural colour examples judged by eye**, not sampled paint specifications or an exhaustive palette:

- **Painted industrial masonry:** dark `#343C3B`, shadow face `#495451`, lit face `#606B64`, edge `#8A9386`. Tonal courses articulate material without flattening the wall.
- **Pale plaster:** shadow `#7C887C`, middle `#A6B0A1`, lit face `#D1D4C3`, edge `#EEE9D5`. Separate white metal, desk and glazing ramps remain in the component renderer.
- **Pale timber:** `#806746`, `#B99A69`, `#D0B786`, `#E7D5AA`. Broad panels and sparse seam/grain marks carry the material; enlarged inspection exposes the same native pixels.
- **Orange metal / coral upholstery:** metal `#8B372B`, `#D9512D`, `#F17A47`; upholstery may be softer but retains a separate shadow face. Keep this as a visible material, not the universal alert colour.
- **Glass and painted metal accents:** subdued blue/green panes, near-black frames, limited teal and dusty pink furnishings. Deep green plants provide organic contrast against the white hall.

Use colour in large, meaningful objects: rail, booth, inset, door, divider. Do not tint whole buildings by department. Saturation can approach RCT’s clarity without turning every facade into a sweet shop.

## Next steps: spatial and recognition tests

1. **Shell recognition:** use the completed B-01, B-02 and B-03 sprites at native size with labels hidden. Check whether viewers distinguish the brick/glass frontage, dark hall and white workshop.
2. **Interior recognition:** compare each roof-on/off pair at the same camera and scale. Check that timber insert, workstations and Johnson’s mezzanine remain legible without their captions.
3. **Occupation:** test seated work, circulation and handoff states. The present moving people demonstrate scale and occupation, not task completion or four verified work states.
4. **Scene layout:** compare the current composite park with a denser street edge and shared service circulation. Preserve the attraction spaces and planted clearings. This is a layout test, not a decision to replace the theme park with an office replica.

A close architectural crop is valuable only if the normal-size sprite carries the same identity. Johnson’s internal mezzanine and the separate orange overlook are implemented. They remain associated with Johnson; Porter’s coral booth and timber insert retain their own sources. The [current building sheet](../assets/sprite-catalogue/sheets/buildings-overview.png) makes the three roof-on forms directly comparable; individual catalogue entries include their cutaways.

## Supporting inspected images and research record

- [Porter timber volume close view](https://images.squarespace-cdn.com/content/v1/5eb3104d0e74237ec948380b/1732580665719-AHSA5W8HNPW4PQMQNJXM/7_8504070.jpg): vertical battens, orange recess, black window, room top below main ceiling. Particularly useful while drawing the insert module.
- [Porter long circulation aisle](https://images.squarespace-cdn.com/content/v1/5eb3104d0e74237ec948380b/1732580664767-V1LUQQFL74X7NSRVDE4P/5-Capture0001-163.jpg): circulation is framed by room-volumes, signs, white ducts and red service piping; these are not free-standing houses.
- [Johnson partitions](https://images.squarespace-cdn.com/content/v1/5eb3104d0e74237ec948380b/1588805933524-ESIMUYDJ3ISJW1TFDY21/6A0A9010.jpg): tall white planes with square openings establish sightlines without closing off the whole hall.
- [Johnson tree, bar and stair](https://images.squarespace-cdn.com/content/v1/5eb3104d0e74237ec948380b/1588805933333-S98Z2SA4VW4MZMOZJ6H5/6A0A9253.jpg): material and scale relationships for a roof-off interior.
- [Johnson before adaptation](https://images.squarespace-cdn.com/content/v1/5eb3104d0e74237ec948380b/1588805953307-TRHM1FI68WBK1T21PGAY/IMG_4227.jpg): industrial roof and shell were already present; crates and storage describe the earlier state, not the finished office.
- [NYC report, local PDF](<office-assets/nyc-north-brooklyn-full-low.pdf>) and [full-page visual inspection](<office-assets/nyc-north-brooklyn-printed-p66.png>): printed p.66 is PDF page 86. The full page preserves its framing and avoids inventing a photo-specific credit. No individual photographer is credited on the inspected page.

Additional Porter images visually checked: `06-_8504017.jpg`, `07-_8504052.jpg`, `09-2-capture0003-307.jpg`, `10-3-capture0006-323.jpg`, `18-capture0001-178.jpg`, `20-capture0022-126.jpg`, `21-capture0034-227.jpg`. Additional Johnson images checked: `03-4r8a8644-edit.jpg`, `05-795b4451.jpg`.

Provenance: local assets were read from the portfolio archive and matched through its source mapping; public project pages were checked on 16 September 2026. Architectural observations remain separate from case findings. The archive preserves source copies and attribution leads, not a blanket production-use licence.
