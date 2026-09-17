# Mad Money Tycoon

Design review **0.9** · original art library **0.8** · 16 September 2026.

Start with the [design document](Design/design-review.html). It contains the current game proposal, narrative, object model, interface, art studies, source scope and build plan.

- [Preview library](Design/previews/index.html): current scenes, motion, architecture and document specimens; PNG and GIF downloads.
- [Sprite catalogue](Design/assets/sprite-catalogue/index.html): 44 objects, 121 frame slots, transparent frames, sheets and labelled sequences.
- [Complete sprite ZIP](Design/assets/sprite-catalogue/mad-money-sprite-catalogue.zip).
- [Archive](Design/archive/index.html): superseded versions, studies, review captures and quarantined construction files.
- [Release review](Design/RELEASE-REVIEW.md): reconciliation, scope and validation.

## Current status

This is a working design system and interactive art proof. Site selection, cutaways, courtyard changes, landmark inspectors, document comparison and ambient motion are implemented. The proposed production economy and complete fifteen-minute episode are not implemented.

Historical source binding remains at selected-export-field level. Original statements, identity links and recipient settlement remain open. Historical gameplay is disabled. The public design review does not publish or depend on the external validation corpus. Its inventory retains exact source filenames, hashes and locators.

## Where changes belong

| Area | Current source | Published output |
|---|---|---|
| Game design | `Design/GDD.md` | `Design/design-review.html` |
| Evidence scope and corrections | `Design/evidence-map.md` | Reader’s Evidence chapter |
| Exact binding observations | `Design/binding/` | Binding and inventory reference pages |
| Supporting research | `Design/research/*.md` | Reader’s research pages |
| Drawing functions and interactions | `Design/working/` | Reader, current previews, sprite exports |
| Object registration | `Design/working/sprite-registry.cjs` | Catalogue, sheets and frame manifest |
| Current version/status | `Design/project.json` | Release metadata and documentation |
| Previous work | `Design/archive/` | Archive index; never imported as current content |

`Design/working/` contains maintained build/runtime sources, not an unsorted work bin. The only archived code used by a current check is the explicitly retained 0.7 renderer baseline for before/after comparison. One-off patch scripts are archived and are not build commands.

## View locally

Open `index.html`, or run `python3 -m http.server 8000` from this folder. The checked-in site requires no build, login, backend or external font service.

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

The complete art command redraws PNGs and atlases, regenerates the two Boerum loops, exports every catalogue GIF, refreshes its ZIP and renders current scene previews. `npm run build` compiles the reader and library indexes. Browser-rendered document specimens are retained checked previews; refresh those after changing document components, using the capture procedure in `Design/qa/README.md`.

GIFs have a limited palette. Still images, state comparisons, turntables and animated gaits are labelled separately. PNG is the source image. The fedora’s loop is left, right, moonwalk left, right, left, moonwalk right: 36 seconds, including endpoint holds.

## GitHub Pages

Set Pages to **Deploy from a branch → main → / (root)**. The root entry opens the reader; all site links work below `/RCT-MM/`. `.nojekyll` keeps the static asset paths intact. No GitHub Actions build is required.

## Sources and reuse

Original code-drawn sprites contain no RCT or Project Zomboid game graphics. Photography, supplied visual references, the reconstruction and other source documents retain their own authorship and rights; their inclusion in a design review grants no downstream reuse licence. See [attribution](ATTRIBUTION.md). The sprite ZIP contains original art, metadata and Geist fonts only.
