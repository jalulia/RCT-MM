# Prototype 2 · Design 0.12 / Art 0.10 adoption

## Canonical entry

Open `index.html`. It now points to `latest.css` and `latest.js`; `index-latest.html` is the identical named checkpoint. Earlier `index-clean.html` and `app-v2-clean.js` are retained only for comparison.

## Adopted from Codex Visual Updates GDD

- Current Art 0.10 campus, courtyard variants, cutaways, icons, Geist fonts and document specimens are copied under `latest-design/`.
- Updated sites are separate selectable objects: Boerum, Porter and corrected 266 Johnson.
- Voila is represented as supplier S-08’s service/handoff edge. The retired external orange overlook is absent.
- Exterior/interior inspection remains separate from the five operational views.
- Selection, scene and operational view persist during inspection and document reading.
- Practice documents open independently of building selection and return to the same context.
- White invoice, pink saved record, perforated bank strip, note and form study retain distinct meanings.
- Green means active control; pink means record copy. Neither means true, safe or guilty.
- Reading pauses ambient motion. Reduced-motion preference suppresses ambient motion.

## P2 ordinary-work proof

The implemented fictional test uses C-07, O-19 and S-08. The player chooses between two viable plans:

- Make: 12 shared-shop hours, $6,400 modeled internal cost, Wednesday handoff.
- Buy: $12,000 supplier obligation, two-day lead, Thursday handoff.

Both can deliver. The internal plan creates capacity strain; the supplier plan preserves capacity while committing usable liquidity. The $100,000 campaign budget is explicitly a ceiling, not starting cash. Posted cash, usable cash, obligation and settlement are not conflated.

## Structural checks

- Canvas is fixed at 640×360 and scaled by its rendered bounds; pointer hit testing converts back to native coordinates.
- Five view buttons retain the same selected object and scene.
- Four courtyard states use the current supplied PNGs.
- Object list duplicates spatial selection for keyboard/nonspatial access.
- Document tabs load the current supplied specimens.
- Local persistence uses `mmt-design-012`; reset clears only this prototype namespace.
- Desktop, compact desktop and mobile layouts are defined.
- Historical interaction remains inactive and the footer says so.
