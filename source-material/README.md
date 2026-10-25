# Source Material

Everything the skills in `../agent-skills/` were built from. **Not needed to install or use the skills.** Keep it to trace a skill back to its source, rebuild the guide, or regenerate skills later.

| Path | What it is |
|---|---|
| `transcription_outputs/` | Raw lesson transcripts (95 lessons, `.txt`) |
| `transcripts_wrapped/` | The same transcripts, line-wrapped, plus `_manifest.tsv` (lesson list) |
| `notes/` | One study note per lesson (`01-…md` to `95-…md`) plus `_topic_map.md` |
| `build/` | Scripts that produce the guide: `wrap_transcripts.py`, `build.py`, `check_coverage.py`, `template.html`, `sections/` (guide fragments), `_digest.txt` |
| `software-essentialist-guide.html` | The finished course guide (single HTML file). Skill `Sources:` lines cite its section ids |
| `fastapi-genai-skillset/` | An earlier, FastAPI + GenAI skill pack. Its framework-neutral, non-GenAI parts were imported into `agent-skills/` (see the `Sources:` lines of `operational-resilience`, `observability-and-config`, `security-baseline`) |
| `trigger-tests.csv`, `trigger-tests-rerun.csv` | Results of running `../agent-skills/TRIGGER-TESTS.md` in VS Code Copilot |

## Rebuilding the guide
The scripts resolve folders relative to this directory, so run them from here:
```bash
cd source-material
python3 build/wrap_transcripts.py   # transcription_outputs → transcripts_wrapped + notes folder
python3 build/build.py              # build/sections + template → software-essentialist-guide.html
python3 build/check_coverage.py     # every lesson has a note and is cited (expects "0 failures")
```

## Copyright
The transcripts, notes and guide are derived from a paid course (Khalil Stemmler's *Software Essentialist*). Keep this repository private, and don't redistribute these files.
