# Release review · design 0.14 / art 0.10

Reviewed 17 September 2026. [Design document](design-review.html) · [Component kit](design-review.html#art/component-kit) · [Playable episode](episode-01/index.html).

The component kit, catalogue and preview library now share the same 44-object register and display metadata. All 136 atlas frames remain available. Eleven objects have isolated motion previews; buildings present exterior and interior states explicitly. Voila is L-05 in the existing Landmarks category, with its photographic reference alongside the other office discoveries.

## Current release

| Area | Result |
|---|---|
| Component kit | All eight categories; registered IDs, paired building states, isolated motion and direct object/download links |
| Motion | Shared visible-preview playback, pause and reduced-motion support across the reader and libraries; continuous vehicle, cat and shark previews from the scene renderer |
| Catalogue | Original frame sheets, state comparisons, gait loops, motion previews, source metadata and a complete offline ZIP |
| Preview library | One entry per registered object; scenes, architecture, episode captures and document specimens; redundant early specimen cards removed |
| Document | Standalone truck section removed; former bookmarks route to the component; obsolete art task lists consolidated around the current test |
| Episode 01 | Fictional internal/supplier plans, shared staffing, placement, payment responses, five views, saved runs and JSON export; unchanged operating rules |
| Project files | Superseded specifications and research retained under revision 0.13; replaced preview derivatives removed from the current library |

## Verification and limits

[QA](qa/README.md) records checks of registered objects, motion bounds and timing, reader/library playback, reduced motion, navigation, references, source hashes and ZIP contents. Episode captures are rebuilt whenever their shared scene source changes. Static screenshots and authored diagrams stay labelled separately from animation.

This pass changes presentation and documentation, not the case findings or episode economy. Historical interaction remains disabled. The source binding still lacks original return linkage, a later observation of the same payment object, and recipient settlement. The fictional episode has passed implementation checks; participant comprehension, enjoyment and session timing remain unmeasured.

## Current focus

**P2: run the ordinary scenario without coaching**, then offer the full supplier route. Observe staffing, bay placement, record timing, cash/obligation distinctions and voluntary replay. Revise the model or presentation from those findings before P3’s structure comparison. P1 source binding runs in parallel. The GDD’s [production sequence](design-review.html#production/production-sequence) remains the single phase plan.
