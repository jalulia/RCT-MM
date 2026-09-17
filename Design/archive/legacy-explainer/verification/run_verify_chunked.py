#!/usr/bin/env python3
"""Resumable driver for verify.py — runs dispatch units one at a time with a
checkpoint, so the full 110-finding verification completes across multiple
45s sandbox calls. Aggregates per-unit reports into /tmp/vreports/."""
import io, json, os, sys, time, contextlib

PKG = "/sessions/eloquent-determined-rubin/mnt/Mad Money/The Madwell Architecture"
STATE = "/tmp/vstate.json"
OUTDIR = "/tmp/vreports"
BUDGET = 18.0  # seconds per call

UNITS = (
    ["P1", "A.1", "A.2", "A.3", "A.6"]
    + ["B.%d" % i for i in range(1, 10)] + ["A.4", "B.10", "B.11", "B.12", "A.5", "B.13"]
    + ["C.1", "B.14"]
    + ["B.%d" % i for i in range(17, 85)]
)

def load_state():
    if os.path.exists(STATE):
        with open(STATE) as f:
            return json.load(f)
    return {"done": []}

def save_state(s):
    with open(STATE, "w") as f:
        json.dump(s, f)

def main():
    os.makedirs(OUTDIR, exist_ok=True)
    os.chdir(PKG)
    sys.path.insert(0, PKG)
    import verify  # heavy imports once per call

    state = load_state()
    start = time.time()
    ran = []
    for unit in UNITS:
        if unit in state["done"]:
            continue
        if time.time() - start > BUDGET:
            break
        buf = io.StringIO()
        argv_backup = sys.argv
        sys.argv = ["verify.py", "--only", unit]
        try:
            with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(io.StringIO()):
                verify.main()
        except SystemExit:
            pass
        except Exception as e:
            buf.write("\nDRIVER-ERROR %s: %r\n" % (unit, e))
        finally:
            sys.argv = argv_backup
        fn = os.path.join(OUTDIR, unit.replace(".", "_") + ".txt")
        with open(fn, "w") as f:
            f.write(buf.getvalue())
        state["done"].append(unit)
        save_state(state)
        ran.append(unit)
    remaining = [u for u in UNITS if u not in state["done"]]
    print("RAN: %s" % ",".join(ran))
    print("REMAINING (%d): %s" % (len(remaining), ",".join(remaining)))

if __name__ == "__main__":
    main()
