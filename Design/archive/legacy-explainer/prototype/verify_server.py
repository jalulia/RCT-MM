#!/usr/bin/env python3
"""verify_server.py — optional live-verify helper for the Madwell dossier.

Per the _Tools/PLAN.md spec: a ~30-line local helper that lets the dossier's
verify.py console re-execute findings live instead of replaying the cache.

Usage:
    pip install flask
    python3 verify_server.py --package "/path/to/The Madwell Architecture"
Then open the dossier; the console will use http://127.0.0.1:5077 when present.

Static deploys (GitHub Pages etc.) simply never reach this; cached mode is
the default and the shipped truth.
"""
import argparse, subprocess, re
from flask import Flask, request, jsonify

ap = argparse.ArgumentParser()
ap.add_argument("--package", required=True, help="path to 'The Madwell Architecture'")
ap.add_argument("--port", type=int, default=5077)
args = ap.parse_args()

app = Flask(__name__)
ID_RE = re.compile(r"^(P1|[ABC]\.[0-9][0-9A-Za-z.]{0,10})$")

@app.post("/verify")
def verify():
    fid = (request.json or {}).get("id", "").strip()
    if not ID_RE.match(fid):
        return jsonify(ok=False, out=f"invalid finding id: {fid!r}"), 400
    p = subprocess.run(
        ["python3", "verify.py", "--only", fid],
        cwd=args.package, capture_output=True, text=True, timeout=300,
    )
    return jsonify(ok=p.returncode == 0, out=(p.stdout + p.stderr))

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=args.port)
