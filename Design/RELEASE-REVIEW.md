# Release review · design 0.10 / art 0.9

Reviewed 16 September 2026. [Open the current design document](design-review.html).

## This revision

The contents index starts at the top of the main column. The left panel groups purpose, source-document preview and three visual shortcuts. Each building has paired exterior/interior previews, with Johnson’s interior initially exposed. The object inspector consistently shows a sprite, reference photograph and interpretation. Practice documents have a separate entry and preserve the park selection on return.

Supernova uses a black-and-silver diner vocabulary with its orbital ornament retained. Johnson’s frontage follows the supplied 2017/2019 Street View captures; the interior contains the orange mezzanine/stair, central white birch and cat. The map clears tall foreground planting and separates Supernova from the stag. Capture dates are not treated as office-occupation dates.

## Editorial reconciliation

The complete GDD, evidence map, six research documents, two binding documents and their rendered figures were read together. Personal callouts, workshop assignments and hanging progress notes were removed from current content. Outstanding work is stated under proposed behaviour, next steps or production gates.

| Issue | Current decision |
|---|---|
| Four-view research conflicted with the implemented interface | Proposed operational views: Work, Cash, Information, Control, People. The art explorer has separate architectural choices. |
| Buildings were still described as departments | Sites, occupants, departments and legal entities remain separate |
| Older content said no export fields had been inspected | Selected first-episode exports have been inspected; original statements and important joins remain unresolved |
| Art proof and operating gameplay were conflated | Site selection, cutaways, document comparison and scenic motion are implemented; the management economy and complete episode remain proposed |
| Supplier and invoice-party labels conflicted | S-08 is the fictional supplier; the practice agency is the contracting party; C-07 is a campaign |
| Saved record dates did not change consistently | v1 is Scheduled / Monday; v2 is Paid / Tuesday; effective and recorded times remain distinct |
| A candidate bank return looked settled in the binding figure | Candidate status and the missing identity join appear beside the event |
| Source links depended on the local computer | Published links are relative within the project or point to the actual external source |

## Showing the system

Six contextual figures now connect the specification to current examples: the park, three payment documents, site/scenery/vehicle objects, the chapter sequence, current outputs and the original evidence page. Research images have captions and catalogue links. The contents page leads directly to the park, catalogue and preview library. Document examples retain selectable text and open the full interactive study.

The visual language remains Geist, white, ink, fresh green and carbon pink. Texture stays inside preview and document materials. Current screenshots are in [QA](qa/README.md).

## Project organization

- [Current previews](previews/index.html): 50 scene, motion, architecture, component and document previews, each with a GIF download.
- [Object catalogue](assets/sprite-catalogue/index.html): 44 objects, 121 frame slots and eight categories. Frame and sheet GIFs accompany the PNG originals. Gait loops, saved-pose sequences, state comparisons and orientation studies are labelled separately.
- [Archive](archive/index.html): earlier source revisions, visual studies, review captures and quarantined construction files. Frozen HTML is retained as source text. Unknown-version captures remain unversioned.
- [Project status](project.json): current versions, entry points, view model and implementation status.
- [Root README](../README.md): viewing, rebuilding, file ownership and GitHub Pages setup.

The complete sprite ZIP includes the catalogue, all registered frames and sheets, GIFs, manifest and font licence. Project navigation outside that ZIP is identified in its README.

## Verification

The release checker verifies local links and anchors, portable asset paths, object counts, renderer hashes, the original reconstruction hash, GIF presence and ZIP integrity. All 34 reader route/viewport checks and eight library/reference viewport checks pass at desktop and mobile widths. A browser GIF download was compared byte-for-byte with its source. Version switching, the separate form specimen, site/record return, roofs, courtyard changes and the Chrysler circuit were exercised. The original six-leg Boerum motion checks and all 121 atlas-frame comparisons pass.

External reference URLs were checked separately: 45 returned successful responses; Nexus Mods and the NYC PDF returned access-denied responses to automated requests. Their supplied links are retained, with no invented replacement. The locally retained NYC reference page remains available.

Detailed results and their limits are recorded in [QA](qa/README.md). These checks establish implementation consistency, not historical truth or user comprehension.

## Remaining work

The next operating prototype must demonstrate allocation, a handoff and its consequences. Recognition, overlap selection and the roof/cutaway relationship still need participant testing. Additional camera views and a complete production animation set are not committed.

Historical interaction remains disabled. Creative Peaks return identity, the October 23 direction conflict, continuous payment-status history and recipient settlement remain open. The external financial validation collection is not included in this repository; its inspected exports retain filenames, hashes and locators in the binding inventory. Publishing the design review does not close those source gaps.
