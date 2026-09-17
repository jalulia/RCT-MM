# Sprite refinement 0.8

The 32 × 16 projection and original pixel renderer are retained. All 43 previous registered objects were redrawn; the complete Chrysler attraction adds one assembly. The catalogue now holds 44 objects and 121 frame slots.

## Source reading

| Object | Detail retained from the photograph | Change to the study |
|---|---|---|
| Chrysler | Long white body, low cabin, sloped glass, four round headlights, chrome belt, recessed wheels, broad rear lamp panel | 16 orientations; a paved driving circuit and boarding apron are invented attraction components |
| Reception | Unequal heights, rounded ends, deep scoops, flecked white surface and plants | Curved sampled geometry with surface lighting; open-air placement invented |
| Cat | Resting tabby, forepaws, lowered head, purple collar | Compact resting profile and restrained tail poses; no identity assigned |
| Coral booth | Coral frame, pale tiled divider, orange upholstery, separate table | Removed unrelated pink blocks; separated cushions, tabletop and supports |
| Stag | Near-frontal black sculpture, broad reflective antlers, four legs | Dark body planes, distinct legs and tapering metallic branches; park plinth invented |
| Inflatable | Blue/red columns, pointed orange/teal caps, yellow entrance frame and netting | Cylindrical inflation, seams and a clear entrance; permanent park placement invented |
| Solarium | Indoor planting and raised white planters | Invented glass pavilion; glints terminate within panes; shadows continue onto planter faces |
| Orange stair | Orange rails, open treads and elevated mezzanine | External overlook remains invented; risers increase toward the deck and rails follow the tread noses |
| Buildings | Boerum’s three brick/glass frontages; Porter’s dark masonry, high curtain-backed windows and recessed entrance; Johnson’s white hall/orange mezzanine | Distinct facades and cutaways; unseen exterior/roof geometry remains a proposal |

Photo sources: [Matt Fry / 65 Porter](https://mattfryed.com/65porter), [Matt Fry / 266 Johnson](https://mattfryed.com/266-johnson), [PSF Projects / Madwell](https://www.psfprojects.com/workplace/madwell-creative-agency), and Julia’s supplied Boerum street image. The local photo mappings remain in `office-art-research.md` and `campus-discoveries.md`.

## Craft references

- [Chris Sawyer / graphics up close](https://www.chrissawyergames.com/feature3.htm): detailed models rendered down to the game’s scale. Applied here as a form-and-lighting principle, with original code-drawn geometry.
- [Mark Inns / isometric car tutorial, 2009](https://markinns.com/archive/isometric-pixel-art-car.html): broad body shading, selective highlights and checking at native size. Applied to the sedan’s panel hierarchy and chrome.
- [Balamoot / Set of carz 2.0, 2009](https://pixeljoint.com/pixelart/47592.htm): a period isometric vehicle catalogue. Research reference only; no pixels or source assets copied.

The reception is a small curved mesh rasterized with surface normals. Car panels use per-pixel depth to prevent trim and glazing from being covered by a later body polygon. Other objects use shaped raster primitives and face-specific ramps. Static sprites are cached at native resolution; labels and document controls remain live HTML. This is still a one-camera art study, not a completed production asset set.

## Verification

Every previous object is compared with the retained 0.7 renderer. Every exported frame is checked against its atlas rectangle. Bounds and source hashes are checked during export. The existing six-leg fedora test verifies facing, motion, endpoint holds and both loading orders. The GIF encoder checks dimensions, timing and sampled decoded pixels.

Recognition is a visual judgment, separate from these mechanical checks. The comparison sheet and live park were inspected against the photo references; 0.7 renderers are retained for review.
