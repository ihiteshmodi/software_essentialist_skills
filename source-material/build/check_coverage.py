import csv
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOTES = ROOT / "notes"
MANIFEST = ROOT / "transcripts_wrapped" / "_manifest.tsv"


def normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9]", "", text.lower())


with open(MANIFEST, encoding="utf-8") as fh:
    manifest = {int(r["lesson"]): r for r in csv.DictReader(fh, delimiter="\t", quoting=csv.QUOTE_NONE)}

failures = []
for lesson, row in sorted(manifest.items()):
    matches = sorted(NOTES.glob(f"{lesson:02d}-*.md"))
    if len(matches) != 1:
        failures.append((lesson, f"expected 1 notes file, found {len(matches)}"))
        continue
    body = matches[0].read_text(encoding="utf-8")
    lines_match = re.search(r"Lines read:\**\s*(\d+)\s*/\s*(\d+)", body)
    if not lines_match or int(lines_match.group(1)) != int(row["lines"]):
        failures.append((lesson, f"lines read mismatch: {lines_match.group(0) if lines_match else 'missing'} vs {row['lines']}"))
    final_match = re.search(r"Final line[^:]*:\**\s*[\"“](.+?)[\"”]\s*$", body, re.MULTILINE)
    expected_tail = normalize(row["last_line"])[-25:]
    if not final_match or expected_tail not in normalize(final_match.group(1)):
        failures.append((lesson, "final line mismatch or missing"))

print(f"checked {len(manifest)} lessons, {len(failures)} failures")
for lesson, reason in failures:
    print(f"  L{lesson}: {reason}")
