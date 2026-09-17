# Current verification

Design 0.10 / art 0.9. These results cover the current reader and export system. Earlier checks are in the archive.

| Record | What it checks |
|---|---|
| `release-checks.json` | Published internal links, anchors, assets, metadata, source hashes, catalogue counts and ZIP integrity |
| `reader-browser-checks.json` | Contents plus 16 reader routes at 1512 × 1050 and 390 × 844; page width and image loading |
| `library-browser-checks.json` | Previews, archive, catalogue and supplied references at desktop/mobile widths |
| `interaction-checks.json` | Six exterior/interior choices, eight landmarks, scene controls, document return and source previews |
| `sprite-gif-checks.json` | Decoded samples, dimensions and 36-second timing for both Boerum scene GIFs |
| `refinement-checks.json` | All 121 frames against atlas rectangles; previous-object changes; source hashes and local render timing |
| `external-link-responses.json` | HTTP responses from 47 external references; access denial is not interpreted as a missing source |
| `../assets/sprite-catalogue/gif-validation.json` | GIF decoding, dimensions, transparency, timing and palette/pixel checks |

`reader-*.png` and the library captures are current review screenshots, not additional asset variants. `episode-documents.png` records the complete three-document layout.

## Repeat checks

Use the dependency and rebuild instructions in the root README. Run `npm run check` after rebuilding. The Boerum test verifies the six legs, travel direction versus facing, glide poses, endpoint holds, loop boundary and both script load orders. The sprite check uses the explicitly retained 0.7 renderer as its visual-change baseline.

For browser checks, open the rebuilt page in a fresh load. Changing only a URL fragment does not reload an already open document. Visit the contents and every route in `working/reader-map.json` at both viewport sizes. Load each visible page’s images before checking width and broken images. Scroll within intentionally bounded diagrams and tables rather than interpreting their internal scroll areas as page overflow.

Check the catalogue’s categories and search, GIF play/stop, one actual GIF download, and the ZIP. In the reader, compare v1/v2, confirm effective and recorded dates and the record index change together, open the separate form specimen, and return from the document reader to the selected site. Check courtyard, all six exterior/interior choices and Chrysler controls. Repeat the relevant checks when those components change.

## Refresh document previews

The five document PNGs in `previews/documents/` are actual browser captures of the live HTML components, not generated illustrations.

1. Rebuild the reader. Open Art & sound → Interface materials at 1512 × 1050, browser scale 1, and wait for local Geist fonts.
2. Use the invoice, saved record, bank events, form and note tabs in figure A07. Save the selected `.dm-paper` component as a PNG, without the surrounding browser or controls. Use the rendered element’s bounding rectangle and capture beyond the viewport if needed.
3. Capture the saved record at v2. Do not enter personal notes. The note is an editable session specimen; reloading restores its supplied text.
4. Save as `invoice.png`, `record-v2.png`, `bank-events.png`, `form-reader.png`, and `player-note.png` in `previews/documents/`.
5. Run `npm run build` to regenerate their GIFs and library entries. Inspect both forms at reading size and confirm no field, amount or qualifier is clipped.

No browser automation is required to view the checked-in site. The browser captures must be refreshed deliberately after changing their source components; the build cannot manufacture a new verified screenshot.
