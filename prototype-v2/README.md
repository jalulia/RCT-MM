# Prototype 2 — ordinary-work proof

Design **0.12** / Art **0.10**. Canonical playable for the Make vs Buy capacity/cash tradeoff (campaign C-07 / obligation O-19).

## Run

From this directory:

```sh
python3 -m http.server 8000
```

Then open:

- Game: http://localhost:8000/index.html
- Regression harness: http://localhost:8000/gameplay-test.html

Or from the repo root:

```sh
python3 -m http.server 8000
```

- Game: http://localhost:8000/prototype-v2/index.html
- Harness: http://localhost:8000/prototype-v2/gameplay-test.html

Clear only the `mmt-design-012` localStorage namespace when resetting this prototype.

## Notes

All operating amounts in this proof are invented. Historical interaction stays inactive. The design reader and art library remain under `/Design/` on the main site.
