# Mad Money Tycoon

Design review **0.16** · original art library **0.10** · 17 September 2026.

Start with the [design document](Design/design-review.html). It contains the current game proposal, narrative, object model, interface, art studies, source scope and build plan.

- [Design whiteboard](Design/whiteboard/index.html): Systems, Story and Structure views; step the episode, sketch rules, save checkpoints and share through Supabase rooms after project setup.
- [Component kit](Design/design-review.html#art/component-kit): all eight categories, paired building states and isolated motion.
- [Standalone park builder](test/index.html): place objects, people and looping events; save locally and download a GIF.
- [Play Episode 01](Design/episode-01/index.html): full fictional loop and ordinary control.
- [Preview library](Design/previews/index.html): current scenes, motion, architecture and document specimens; PNG and GIF downloads.
- [Sprite catalogue](Design/assets/sprite-catalogue/index.html): 44 objects, 136 frame slots, 11 isolated motion previews, transparent frames and sheets.
- [Complete sprite ZIP](Design/assets/sprite-catalogue/mad-money-sprite-catalogue.zip).
- [Archive](Design/archive/index.html): superseded versions, studies, review captures and quarantined construction files.
- [Release review](Design/RELEASE-REVIEW.md): reconciliation, scope and validation.

## Current status

The fictional first episode is playable: choose a production plan and work bay, allocate shared staff, run half-day intervals, inspect available records and respond to a returned payment. The ordinary scenario provides a successful supplier control. Five views, run persistence, JSON export and separate delivery/cash/obligation outcomes are implemented. The architecture explorer, animated art hero and standalone park builder are separate scenic tools. The reader uses inline scenes, animated objects and document extracts alongside the relevant text. The component kit, object catalogue and preview library share one register; animated objects play in place with pause and reduced-motion support.

**Next: [P2 uncoached ordinary-work playtest](Design/design-review.html#production/current-focus).** Engine and browser checks pass; participant comprehension and session timing have not been measured. P4’s fictional loop is built early for testing. P3’s structure comparison and the full campaign remain open. The [P0–P7 sequence](Design/design-review.html#production/production-sequence) is maintained in the GDD and generates the reader’s phase diagram.

Historical source binding remains at selected-export-field level. Original statements, identity links and recipient settlement remain open. Historical gameplay is disabled. The public design review does not publish or depend on the external validation corpus. Its inventory retains exact source filenames, hashes and locators.

## Where changes belong

| Area | Current source | Published output |
|---|---|---|
| Playable episode | `Design/episode-01/` | Episode runtime, captured playthroughs and run receipts |
| Game design | `Design/GDD.md` | `Design/design-review.html` |
| Evidence scope and corrections | `Design/evidence-map.md` | Reader’s Evidence chapter |
| Exact binding observations | `Design/binding/` | Binding and inventory reference pages |
| Supporting research | `Design/research/*.md` | Reader’s research pages |
| Drawing functions and interactions | `Design/working/` | Reader, current previews, sprite exports |
| Object registration | `Design/working/sprite-registry.cjs` | Catalogue, sheets and frame manifest |
| Whiteboard | `Design/whiteboard/` | Workshop views, scenario adapter, persistence and collaboration schema |
| Current version/status | `Design/project.json` | Release metadata and documentation |
| Previous work | `Design/archive/` | Archive index; never imported as current content |

`Design/working/` contains maintained build/runtime sources, not an unsorted work bin. The only archived code used by a current check is the explicitly retained 0.7 renderer baseline for before/after comparison. One-off patch scripts are archived and are not build commands.

## View locally

Open `index.html`, or run `python3 -m http.server 8000` from this folder. The reader, episode, park builder and local whiteboard require no build, login or external font service. Shared whiteboard rooms use Supabase; project connection and database setup are pending. See [board setup](Design/whiteboard/CMS.md).

## Rebuild

Requires Node 22 or newer and Python 3.10 or newer.

```sh
npm ci
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -r requirements.txt
npm run build:art
npm run build
npm run check
```

The complete art command redraws PNGs and atlases, regenerates the two Boerum loops, exports every catalogue GIF, refreshes its ZIP and renders current scene previews. `npm run build` compiles the reader and library indexes. Browser-rendered document specimens are retained previews. `npm run capture:reading` rebuilds the small inline-scene GIFs and PNGs. Episode captures are rebuilt with `npm run capture:episode` while the local server is running on port 8769; install the capture browser with `npx playwright install chromium` first. `MMT_PREVIEW_URL` can select another server; `MMT_CHROMIUM` can select a compatible installed browser. Capture scope and procedures are in `Design/qa/README.md`.

GIFs have a limited palette. Still images, state comparisons, turntables and animated gaits are labelled separately. PNG is the source image. The fedora’s loop is left, right, moonwalk left, right, left, moonwalk right: 36 seconds, including endpoint holds.

## GitHub Pages

Set Pages to **Deploy from a branch → main → / (root)**. The root entry opens the reader; all site links work below `/RCT-MM/`. `.nojekyll` keeps the static asset paths intact. No GitHub Actions build is required.

## Sources and reuse

Original code-drawn sprites contain no RCT or Project Zomboid game graphics. Photography, supplied visual references, the reconstruction and other source documents retain their own authorship and rights; their inclusion in a design review grants no downstream reuse licence. See [attribution](ATTRIBUTION.md). The sprite ZIP contains original art, metadata and Geist fonts only.
