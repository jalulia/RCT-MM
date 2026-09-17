# Current verification

Design 0.13 / art 0.10. The reader, playable episode, art hero, truck route, catalogue and download libraries are checked together. Prior specifications and review captures are retained in the archive.

| Record | Scope |
|---|---|
| `release-checks.json` | Authored/published links, shared phase records, versions, source hashes, catalogue counts, episode capture provenance and every sprite ZIP member |
| `episode-engine-checks.json` | Both ordinary plans, placement timing, staffing conflict, returned cash, permission, one reissue, substitute obligations, valid pooling and exact replay |
| `episode-browser-checks.json` | Visible-control playthroughs, available documents, pause/return, five views for both selections, export/reload, file URL, mobile width and keyboard focus |
| `reader-browser-checks.json` | 38 reader route/viewport checks; image loading, overflow and art-hero pause/reduced motion |
| `library-browser-checks.json` | Preview, archive and catalogue at desktop/mobile widths |
| `voila-checks.json` | 640 route samples, building/Solarium clearance, bounds, loading stop, sixteen headings, loop continuity, moving selection target and unchanged Johnson cutaway |
| `interaction-checks.json` | Art explorer: truck selection, motion pause, practice-document return and GIF download |
| `refinement-checks.json` | 136 atlas frames, source hashes and renderer timing; L-05 recorded as a replacement |
| `sprite-gif-checks.json` | Boerum choreography, decoded samples and 36-second duration |
| `../assets/sprite-catalogue/gif-validation.json` | Catalogue GIF dimensions, alpha, decoded pixels and sequence timing |
| `external-link-responses.json` | Earlier external-source access audit; no new source authentication |

`previews/episode/manifest.json` identifies browser captures, timing, dimensions, labels and runtime source hashes. The run receipts retain the actual actions and model state. Authored diagrams are labelled separately from screenshots. The map cycle holds the economic state while sampling scenic motion. The art hero uses its own 36-second presentation clock; the study truck route remains 32 seconds.

## Repeat checks

Run `npm run build:art`, `npm run build`, then `npm run check`. A shared renderer change requires rebuilding PNGs, GIFs, atlas manifests and the sprite ZIP. The GDD phase table generates the reader’s production diagram.

For fresh episode captures, serve the repository on port 8769, install Chromium with `npx playwright install chromium`, and run `npm run capture:episode`. Set `MMT_PREVIEW_URL` to a different episode URL if needed. `MMT_CHROMIUM` accepts a compatible local executable. The capture script operates the visible controls, exports the runs and produces five sequences, nine stills and three diagrams. Python/Pillow encodes GIFs and checks decoded size/timing. The Node capture tools require the declared Playwright development dependency.

Run `npm run check:browser` against the same server for reader/library checks. `MMT_SITE_URL` can point to another Design directory URL. Browser screenshots live here; published, captioned previews live in the preview library.

These are implementation checks, not participant research. No claim is made about uncoached comprehension, enjoyment or measured session duration. P2’s next gate is the uncoached ordinary-work test. P1 source binding remains parallel and historical interaction remains disabled.
