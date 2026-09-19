# mad money · basecamp (wip)

concepts, scenarios, presentation studies, design tools and agency models.

open `index.html` directly or serve this directory as a static site. search, type and implementation filters, entry links, and json/markdown downloads work without a server.

## data model

`catalogue.json` is the editable source. each record has a stable id, type, implementation stage, activity, scope, availability, test question and source references. types describe what a record is. implementation stages describe how much exists. neither field establishes a selected direction.

- `relations`: typed links between records: combines, tests, supports, uses.
- `decisions`: purpose, audience, format, role, agency and session outcome.
- `mechanisms`: interaction alternatives shared across concepts.
- `sources`: design extracts and original revision links.
- `branches`: separate implementation branches and their scenario ids.

run `python3 refresh.py` after changing the json. this rebuilds `catalogue-data.js`, `catalogue.md` and the source pages. the html, css and interface script are maintained directly.

## publication

published at `Design/basecamp/` in the game repository. the document and whiteboard link to this page. the separate local basecamp is a distribution copy; the repository is the maintained source.

the record ids and the `sources/discussion.html` address are retained. that page now contains the design foundations. source extracts summarize design and implementation; original files remain linked at fixed revisions. local paths and conversation excerpts are excluded.

`previews/` contains interface captures, labelled concept diagrams, gameplay GIFs and scene animations. GIFs play when visible, with a global pause control and reduced-motion support. branch-only playables link to their source; the main episode, scene builder and whiteboard link to their published interfaces. geist fonts retain their licence in `fonts/`.
