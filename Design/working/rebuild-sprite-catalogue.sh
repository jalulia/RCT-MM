#!/bin/sh
set -eu
mmt_script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
mmt_node=${MMT_NODE:-node}
mmt_python=${MMT_PYTHON:-python3}
"$mmt_node" "$mmt_script_dir/export-sprite-catalogue.cjs"
"$mmt_node" "$mmt_script_dir/check-refinement.cjs"
"$mmt_python" "$mmt_script_dir/export-preview-gifs.py"
"$mmt_python" "$mmt_script_dir/export-catalogue-gifs.py"
"$mmt_python" "$mmt_script_dir/package-sprite-catalogue.py"
