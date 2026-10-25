import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "transcription_outputs"
DST = ROOT / "transcripts_wrapped"
DST.mkdir(exist_ok=True)
(ROOT / "notes").mkdir(exist_ok=True)


def lesson_number(file_path: Path) -> int:
    match = re.match(r"\s*(\d+)\)", file_path.name)
    return int(match.group(1)) if match else 0


rows = []
for src_file in sorted(SRC.glob("*.txt"), key=lesson_number):
    text = " ".join(src_file.read_text(encoding="utf-8").split())
    lines = textwrap.wrap(text, width=160, break_on_hyphens=False, break_long_words=False)
    (DST / src_file.name).write_text("\n".join(lines) + "\n", encoding="utf-8")
    rows.append((lesson_number(src_file), src_file.name, len(text), len(lines), lines[-1] if lines else ""))

with open(DST / "_manifest.tsv", "w", encoding="utf-8") as manifest:
    manifest.write("lesson\tfile\tchars\tlines\tlast_line\n")
    for row in rows:
        manifest.write("\t".join(str(v) for v in row) + "\n")

print(f"{len(rows)} files wrapped; total lines {sum(r[3] for r in rows)}; total chars {sum(r[2] for r in rows)}")
