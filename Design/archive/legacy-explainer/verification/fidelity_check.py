#!/usr/bin/env python3
"""Fidelity checker: every $ figure / % / quote / vq-flagged facsimile string in
prototype/index.html must appear verbatim in the source corpus. Run from Mad Money root."""
import re, html as H, unicodedata, sys
SRC_FILES = ["The Madwell Architecture/Summary.md","The Madwell Architecture/Receipts.md",
 "The Madwell Architecture/START_HERE.md","The Madwell Architecture/Instructions.txt",
 "The Madwell Architecture/Executive_Summary.md","The Madwell Architecture/README.md",
 "_Tools/_Claude Cowork/verification/verify_run_2026-06-10_summary.txt"]
def norm(s):
    s = unicodedata.normalize('NFKC', s).replace('**','').replace('*','')
    for a,b in [('’',"'"),('‘',"'"),('“','"'),('”','"'),('—','-'),('–','-'),
                ('…','...'),(' ',' '),('−','-'),('≈','~'),('×','x'),('·','.')]:
        s = s.replace(a,b)
    return re.sub(r'\s+',' ', s)
src = norm("\n".join(open(f, encoding='utf-8', errors='ignore').read() for f in SRC_FILES))
proto = open("_Tools/_Claude Cowork/prototype/index.html", encoding='utf-8').read()
ok = True
def check_fragments(t, tag):
    global ok
    for f in [x.strip(' .;:,"') for x in t.split('...') if len(x.strip())>5]:
        if f and f not in src: print(tag+" FAIL:", f[:110]); ok = False
# quoted material
for raw in re.findall(r'<div class="q">(.*?)<span class="who">', proto, re.S) + re.findall(r'&ldquo;(.*?)&rdquo;', proto, re.S):
    check_fragments(norm(re.sub(r'<[^>]+>',' ', H.unescape(raw))).strip().strip('"').strip(), "QUOTE")
# vq-flagged facsimile strings
for m in re.finditer(r'<(span|div)\b[^>]*class="[^"]*\bvq\b[^"]*"[^>]*>(.*?)</\1>', proto, re.S):
    body = re.sub(r'<br\s*/?>', ' ', m.group(2))
    check_fragments(norm(re.sub(r'<[^>]+>','', H.unescape(body))).strip().strip('"').strip(), "VQ")
# figures
text = norm(H.unescape(re.sub(r'<[^>]+>',' ', re.sub(r'<style.*?</style>|<script.*?</script>','',proto,flags=re.S))))
for f in sorted(set(re.findall(r'(?:HK\$|\$)\s?[\d][\d,]*(?:\.\d+)?(?:M|K)?', text))):
    if f not in src and f.rstrip('M') not in src and ('$('+f.lstrip('$')+')') not in src:
        print("FIGURE FAIL:", f); ok = False
for p in sorted(set(re.findall(r'\d+(?:\.\d+)?%', text)) | set(re.findall(r'\d+(?:\.\d+)?x\b', text))):
    if p not in src: print("PCT FAIL:", p); ok = False
print("FIDELITY:", "PASS" if ok else "FAIL")
sys.exit(0 if ok else 1)
