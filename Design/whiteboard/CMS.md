# Whiteboard data and CMS boundary

The board is an editable design document. It combines a scenario, a diagram and a replay of player actions. Moving a node changes its layout. Only a rule implemented in the model changes the simulation. Notes, arrows and artwork do not become game rules on their own.

Local boards save in this browser. Shared rooms use the Supabase project configured in the interface; several participants can edit the same board and see each other's cursors. JSON export remains available in either mode. The Share panel copies an edit link. A local recovery copy is kept while editing a shared room; Board → Recover shared draft opens that copy without writing it back to the room. Shared editing requires the included database migration to be installed. The tool does not generate rules with an AI model.

## Current document

| Field | Contents | Authority |
|---|---|---|
| `schemaVersion`, `id`, `title` | Document identity | Board |
| `nodes` | Typed objects, editable parameters, position and optional reference | Board; referenced records remain external |
| `edges` | Flow, prerequisite or information connection | Board; model decides which connections execute |
| `ink`, `viewport` | Strokes and camera position | Presentation only |
| `scenario` | Production plan, placement, access mode, crew and optional dollar assumptions | Simulation settings |
| `runtime.actions` | Ordered actions to replay against the current scenario | Run input |

Node IDs survive renaming and dragging. `ref`, such as `episode:O-19`, identifies an existing episode object. Changing a display title does not change that reference. A source-backed payment record and a note about that payment remain separate node types.

Systems, Story and Structure are views of the same board. Story beats reference gameplay nodes; structural anchors group related nodes through `params.parentId`. View-specific positions can live in `params.positions`. The selected view and camera are local preferences, so one participant can inspect the story while another works on the system diagram.

The engine computes statistics and consequences from the scenario and action list. Derived balances are not saved as editable facts. If the underlying model changes, replay may produce a different result. The current board format is therefore a working scenario, not a permanent audit of a historical run.

Dollar assumptions are named explicitly: `startingCash`, `supplierCost`, `materialsCost` and `payroll`. They are simulation values. Editing them does not alter evidence, bindings or the episode source files.

The action log preserves the episode engine's units. For example, `poolAnswer.value` is an integer in cents, while the editable assumptions above use dollars. The board allows up to 500 actions, 300 nodes, 800 connections and 50,000 ink points.

`board.schema.json` describes the portable format. `store.js` also checks unique IDs, connection endpoints, total ink points, nested values and file size. Imports are validated before use. Version migrations are explicit functions; unknown future versions are rejected.

## Saving and checkpoints

The store writes a revision envelope around the board. Each successful save records a revision number, unique version ID, parent version, browser writer ID and timestamp. It reports storage failures to the interface.

`saveLocked()` serializes writes through the browser's Web Locks API where available. A revision check then rejects a write when another tab has changed the saved board. The interface must let the user export their unsaved work or reload the other tab's version. It must not reload over an active edit automatically. Browsers without Web Locks use optimistic revision checks; that fallback cannot guarantee atomic writes between tabs saving at exactly the same instant.

Named checkpoints are separate snapshots, with a maximum of twelve. Loading one returns a board for review; it does not immediately replace the current save. JSON exports remain the portable backup. Local browser storage can be cleared by the browser or user.

## Future CMS collections

| Collection | Stored data | Referenced by |
|---|---|---|
| Records | Document versions, dates, source locations, evidence status and access limits | Artifacts, bindings and narrative claims |
| Entities | People, organizations, sites and stable identity mappings | Game objects and records |
| Object definitions | Type, parameters, art references and allowed interactions | Scenario instances |
| Rules | Trigger, conditions, effects, scope and model version | Scenario definitions |
| Scenarios | Object instances, starting state, goals and enabled rules | Runs and boards |
| Narrative beats | Order, reveal conditions, player knowledge, anchor and referenced objects | Story view and chapter sequences |
| Gameplay anchors | Parent identity, scope, objectives and child object references | Structure view and scenario planning |
| Boards | Node placement, typed connections, notes, ink and scenario reference | Workshop sessions |
| Runs | Scenario revision, model version, ordered actions and recorded output | Comparisons, tests and replay captures |
| Assets | Object ID, sprite variants, animation timing, attribution and download files | Objects, UI and documentation |

A CMS record gets a stable ID and explicit revisions. Draft, reviewed and published are editorial states; they are not evidence-confidence levels. Evidence status and provenance need their own fields. Publishing a draft creates a revision that existing runs can continue to reference.

Keep the document reader, sprite catalogue, episode and board as views of these collections. A chapter should reference a rule or object by ID rather than maintain its own copy of that definition. Captions may differ by context; IDs, units, dates and status meanings must agree.

## Shared workshops

`collaboration.js` sends small operation sets through three Supabase RPC functions: create a room, read its latest revision and apply a patch. The browser polls about once a second. Presence is temporary and expires after 45 seconds without a heartbeat. Room documents persist in PostgreSQL. This is polling collaboration, not a WebSocket transport.

Each room has a random edit capability. The database stores its SHA-256 hash. Anyone with the edit link can edit that room. The room key stays in the URL fragment and is excluded from exported board JSON. Direct anonymous table access is denied; the RPC functions check the capability before reading or changing a board.

Patches run under a database row lock. They compare each changed field with its previous value. Different nodes, or different fields on one node, can merge. Conflicting changes to the same field stop for review; the local draft and remote version remain available. A run's action list is one atomic field, so two participants cannot accidentally combine incompatible timelines. A mutation ID makes a retry after a dropped connection safe.

The pilot is capped at 100 rooms and 32 active participants per room. Creation is available through the public project API. A production CMS should add account-based room creation, invitations and per-role access. Room capability access does not grant permission to edit the game's evidence or source files.

## Supabase setup

1. Run `supabase.sql` in the selected project's SQL editor. It installs `pg_jsonschema`, private storage tables and the three RPC functions in one transaction.
2. Enter the project URL and **public publishable key** in the whiteboard's shared-room settings. A legacy public `anon` key also works. Do not use a secret key or service-role key.
3. Create a room, copy its edit link and open it in a second browser. Move different nodes in each session, then try editing the same title to check conflict handling.

The migration embeds the portable JSON Schema and adds checks for unique IDs, connection endpoints and payload limits. Keep its embedded schema synchronized with `board.schema.json` when changing the format. Supabase documents [database functions and function permissions](https://supabase.com/docs/guides/database/functions) and [JSON Schema validation](https://supabase.com/docs/guides/database/extensions/pg_jsonschema).

`check-whiteboard-store.cjs` checks local data safety. `check-whiteboard-collaboration.cjs` tests two-client merges, conflicts, presence and uncertain-write retries. Its optional local PostgreSQL harness executes the SQL functions with a structural substitute for `pg_jsonschema`; the full extension and hosted connection must also be checked in the selected Supabase project.
