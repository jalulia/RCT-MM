# Park builder

`index.html` is a complete offline page: the park renderer, font, interaction code and GIF encoder are embedded. Open it directly, or serve this folder. There are no external requests or navigation links.

- Choose **Objects**, **People** or **Events**, then an item. Click inside the park to place it; Escape returns to selection.
- Select and drag an item to move it. Arrow keys nudge it. **Copy**, **Rotate** (vehicles and patrol direction) and **Remove** act on the selection.
- **Interiors** switches all buildings between their roofs and cutaways. **Grid** shows placement coordinates.
- **Undo / Redo** includes placement, moves, removal, rotation, interiors and reset. The layout saves on the current device when local storage is available.
- **Download GIF** renders the current arrangement as a 640 × 384, 36-second, endlessly repeating GIF. It omits controls, selection marks and the grid. Rendering can be cancelled.

This is a free-placement art sandbox. People use short patrols; events repeat locally. It does not simulate the episode economy, collision avoidance or pathfinding. Terrain and paths are fixed; placed objects remain editable.

## Build

From the repository root:

```sh
node Design/working/build-park-builder.cjs
```

Edit `Design/working/park-builder.html`, then rebuild. The builder embeds the current shared `pixel-kit.js`, `park-kit.js` and Geist font. Generated `test/index.html` is the published artifact; it needs no build step on GitHub Pages.

## Verified

Browser checks cover object and person placement, event placement, moving and removing a person, undo/redo, interiors, persistence, desktop/mobile layout and direct `file:` use without external requests. An exported GIF was decoded through all 288 frames: 36,000 ms, infinite loop, 640 × 384.
