# v15 — structural overhaul · component-by-component critique → execution

*Brief re-read: not air on the same skeleton — a different skeleton. Each component critiqued, then rebuilt. Designer × UX pair; two QA rounds before presenting. Pixel-grain tactility kept to choice moments. No content touched — fidelity is frozen; this is structure, chrome, and layout language.*

The through-diagnosis: **every plate is a centered single column with the same stamp at the top.** That one decision makes the whole thing read as "a long article," no matter how good the figures are. To look *quite* different, the page has to stop being centered and start being **drawn** — an instrument with a margin, a coordinate system, and openers that announce.

---

## Component 1 — Global layout / spine
**Now:** centered `max-width:1200px` column; floating right-edge dot-nav; content has no left axis.
**Critique:** symmetrical centering is the single most generic choice on the page. The references (Vert, Radio Robida, Obys) all hang content off a **left axis** with asymmetric negative space. There is no persistent sense of *where you are* in the document except a 0–9 dot column most readers won't parse.
**Execution:** a **fixed left margin spine** (a drawing's trim block) — running plate folio set large, a vertical section index, and a tick ruler. Rendered in `mix-blend-mode:difference` white so it auto-inverts over paper, manila, and ink-deep with no per-band logic. Content shifts right onto a real left axis; full-bleed bands still bleed under the floating spine. The floating dot-nav is retired into the spine. This single move re-reads the entire document as an instrument.

## Component 2 — Topbar
**Now:** full-width fixed bar, wordmark + DOC code + stake-chips + READ counter — busy, competes with the spine it will now sit beside.
**Critique:** too much chrome at the top; the READ counter and stake-chips and doc-code all shout at once.
**Execution:** thin it to a **hairline running header** — wordmark left, a single live coordinate (current plate title) center-right, READ % right. Stake-chips (EXIT +615D / CH.7) move down into the spine where countdowns belong. Quieter, coordinated with the spine.

## Component 3 — Plate openers
**Now:** ghost numeral behind a `title / slash / kicker` stamp — identical on all ten plates.
**Critique:** sameness kills pacing; the reader never feels a new movement begin. The ghost numeral is decorative, not structural.
**Execution:** a **title-card opener** — full-bleed top hairline, then on the left axis a large index numeral and the title on a shared baseline, a mono **coordinate line** beneath (`PLATE 04 · OUTFLOW · §2.2 · 8 RAILS`), generous drop. The numeral becomes wayfinding, not wallpaper. Consistent skeleton, but it *announces*.

## Component 4 — Contents / manifest (NEW)
**Now:** none — you go cover → straight into the equation.
**Critique:** a dossier of this density with no contents page is a navigational and editorial miss; the references all have an index/schedule moment, and it's the easiest place to set a fresh tone.
**Execution:** a **manifest plate** after the cover — the ten plates as a typeset index (numeral · title · one-line · finding tag), each a jump link, set asymmetrically against open space. Reads like Radio Robida's schedule. Doubles as nav and as a statement of scope.

## Component 5 — Section rhythm / dividers
**Now:** two ink dividers; good but isolated.
**Critique:** the act structure (I/II/III) is asserted in the dividers but invisible elsewhere — the spine should carry it.
**Execution:** spine index groups the plates under ACT I / II / III; dividers keep their weight; the manifest shows the acts. Structure now legible everywhere.

## Component 6 — Type system
**Now:** Schibsted 300/700 lockups + mono; solid, kept.
**Critique:** the lockup trick (one bold word) is now predictable across every title; mono labels are slightly timid in tracking.
**Execution:** keep the families; push the **coordinate-label system** harder (wider tracking, consistent `· ` joinery, uppercase) so the mono becomes the connective tissue of the instrument; reserve the 300/700 lockup for the masthead + dividers, and let plate titles run a single weight against the big index numeral so the numeral carries the contrast instead. Fresh, less formulaic.

## Component 7 — Tactility
**Now:** pixel grain on dark moments (good, from last pass).
**Execution:** keep as-is; add the faintest grain to the spine trim so the margin feels printed, not screen-drawn. Nothing more — restraint per brief.

## QA protocol
Batch the CSS + chrome, then structural markup (openers, manifest, spine nav), then JS (scrollspy → spine + header coordinate). Parse structure + `node --check` + fidelity after each batch. Screenshot 1500 / 390. Verify: difference-blend legibility over paper/manila/ink-deep; bands don't collide with the spine; openers don't double the old stamp; manifest links resolve; nothing content-bearing moved. Fix before present.
