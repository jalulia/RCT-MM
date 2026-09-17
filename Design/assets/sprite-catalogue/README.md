# Mad Money Tycoon — sprite catalogue

44 objects · 136 frames · 8 categories · art revision 0.10.

Open `index.html`. The catalogue works offline, with category filters, search, individual frame downloads, object sheets and GIF controls. Every registered frame and sheet also has a GIF download; available sequences distinguish gait loops, saved-pose samples, state comparisons and orientation studies. The Design document, Previews and Archive navigation links open the parent project and are not included in the standalone ZIP.

For reliable browser downloads, use GitHub Pages or the local server described in the project README. Direct `file://` access may open an image instead of downloading it.

## Previews

- `previews/boerum-street-loop.gif` — 960 × 540, 36 seconds, 10 fps. The 320 × 180 source is enlarged exactly 3×.
- `previews/boerum-closeup-loop.gif` — 960 × 300, 36 seconds, 10 fps. The actor is enlarged exactly 6×; the labels describe direction and facing.
- Order: left, right, moonwalk left, right, left, moonwalk right. Each leg travels for 5.4 seconds and holds for 0.6 seconds.
- The GIF frame rate samples the live animation. Normal gait has 7 poses per second; moonwalk has 8. The two previews repeat indefinitely. Visible animation previews play automatically. Pause previews stops them across the page; reduced motion starts with still posters.

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

Add or change objects in `Design/working/sprite-registry.cjs`; renderers are shared with the game art study. The catalogue, reader component kit and preview library read the generated manifest, including a shared `display` choice for each object. New registered objects therefore appear on all three surfaces. Run `npm run build` after rebuilding the catalogue. Source files remain in the project, outside the export ZIP.

## Scope

This is the current art-study library, with one camera and an incomplete animation set. Buildings and several attractions are composite assemblies. A roof-off state is included for each building. The saved shark/cat poses remain atlas samples; their main previews sample continuous scene motion. Object IDs are art-library IDs, not case-record identifiers.

Original code-drawn art only; no source photography or third-party game graphics. Document UI remains HTML and live text. Catalogue typography uses the existing project's Geist and Geist Mono font files, included separately under `fonts/` with their SIL Open Font License.

L-05 is the Voila delivery truck. Its 16 atlas orientations and turntable remain available; its main preview shows the isolated 32-second delivery loop, including the four-second loading stop. L-01 and L-10 show the car and complete circuit in motion. Johnson retains its interior orange stair. Full-scene animations are in the main preview library. Voila livery is drawn from supplied branding references; no trademark rights are granted.
