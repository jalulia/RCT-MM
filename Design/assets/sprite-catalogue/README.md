# Mad Money Tycoon — sprite catalogue

44 objects · 136 frames · 8 categories · art revision 0.10.

Open `index.html`. The catalogue works offline, with category filters, search, individual frame downloads, object sheets and GIF controls. Every registered frame and sheet also has a GIF download; available sequences distinguish gait loops, saved-pose samples, state comparisons and orientation studies. The Design document, Previews and Archive navigation links open the parent project and are not included in the standalone ZIP.

For reliable browser downloads, use GitHub Pages or the local server described in the project README. Direct `file://` access may open an image instead of downloading it.

## Previews

- `previews/boerum-street-loop.gif` — 960 × 540, 36 seconds, 10 fps. The 320 × 180 source is enlarged exactly 3×.
- `previews/boerum-closeup-loop.gif` — 960 × 300, 36 seconds, 10 fps. The actor is enlarged exactly 6×; the labels describe direction and facing.
- Order: left, right, moonwalk left, right, left, moonwalk right. Each leg travels for 5.4 seconds and holds for 0.6 seconds.
- The GIF frame rate samples the live animation. Normal gait has 7 poses per second; moonwalk has 8. The two previews repeat indefinitely. Catalogue playback begins only when selected.

## Sheets and individual objects

- `sheets/refinement-comparison.png` — selected previous/refined objects at matching scale.
- `sheets/catalogue-overview.png` — labelled index, one representative image per object.
- `sheets/*-overview.png` — labelled category indexes.
- `sheets/[category].png` — transparent atlases containing every registered variant.
- `objects/[asset-id]/sprite-sheet.png` — a transparent sheet for one object.
- `objects/[asset-id]/[variant].png` — individual transparent frames.
- `sheets/boerum-animation-labelled.png` — labelled overview of the fedora animation.
- `manifest.json` — IDs, dimensions, top-left atlas rectangles, anchors, bounds, variants, timing and source hashes.

World frames use a 192 × 160 canvas and anchor 96,112. People use 24 × 32 and foot anchor 12,25. Interface icons use their native 16 × 16 canvas. The projection remains 32 × 16. Enlarge by integer factors without smoothing.

The Chrysler has 16 orientations at 22.5° increments. L-10 is the complete invented driving attraction, separate from the L-01 vehicle.

The fedora sheet has eight columns and six rows: walk left (4 frames), walk right (4), moonwalk left (8), moonwalk right (8), idle left (1), idle right (1). Unused cells remain transparent. The manifest identifies populated cells; the sheet is not a single chronological 48-frame animation.

## Updating from the project

Install the dependencies described in the project README, then run `Design/working/rebuild-sprite-catalogue.sh` from the project checkout. It redraws the registered objects from the live park functions, rebuilds every sheet and manifest, encodes and checks the GIFs, and refreshes the ZIP.

Add or change objects in `Design/working/sprite-registry.cjs`; renderers are shared with the game art study. The catalogue reads its data from the generated `catalogue-data.js`, so new registered objects appear automatically. Source files remain in the project, outside the export ZIP.

## Scope

This is the current art-study library, with one camera and an incomplete animation set. Buildings and several attractions are composite assemblies. A roof-off state is included for each building. Sampled shark/cat poses are listed as sampled poses. Object IDs are art-library IDs, not case-record identifiers.

Original code-drawn art only; no source photography or third-party game graphics. Document UI remains HTML and live text. Catalogue typography uses the existing project's Geist and Geist Mono font files, included separately under `fonts/` with their SIL Open Font License.

L-05 is now the Voila delivery truck, with 16 orientations and an orientation-study GIF. The previous external stair is archived. Johnson retains its interior orange stair. The live delivery route and full-scene GIF are in the main preview library. Voila livery is drawn from supplied branding references; no trademark rights are granted.
