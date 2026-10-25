# Software Essentialist Skills

Agent skills that make coding agents (VS Code GitHub Copilot, Claude Code, Codex, OpenCode and others) follow the Software Essentialist method:
- clarify who / why / what before writing code;
- build from tests written against an approved spec;
- review against checklists;
- commit in small steps.

It is 23 skills plus one router file (`AGENTS.md`), written to be language-agnostic.

## What's in this repo
| Folder | What it is | Needed to use the skills? |
|---|---|---|
| [`agent-skills/`](./agent-skills/) | The skill pack: `AGENTS.md` router, `.agents/skills/` (23 skills), installer, validator, trigger tests, hook templates | **Yes** |
| [`essentials-lab/`](./essentials-lab/) | TypeScript before/after mini-projects for the 7 physical essentials (vertical slicing, decoupling, composition, testing, walking skeleton, delivery) | No, learning reference only |
| [`source-material/`](./source-material/) | What the skills were built from: lesson transcripts, notes, the course guide HTML and its build scripts, the earlier FastAPI/GenAI skill pack, trigger-test results | No, reference only |

## Requirements
- `bash` (macOS, Linux, or Windows via WSL / Git Bash) to run the installer.
- Node.js 18+ only if you want to run the validator (`validate-skills.mjs`).

## Install into a project (recommended)
**1. Get the pack once** (anywhere on your machine, not inside the target project):
```bash
git clone https://github.com/ihiteshmodi/software_essentialist_skills.git ~/tools/software_essentialist_skills
```

**2. Install it into the project you work on:**
```bash
bash ~/tools/software_essentialist_skills/agent-skills/scripts/install.sh /path/to/your-project --only=agents
```

**3. Commit the installed files in your project** so teammates and cloud agents get them: `AGENTS.md`, `CLAUDE.md`, `.agents/skills/` (and `.claude/skills/` if you installed it).

The installer copies only skill files into your project. It never copies the lab code and never touches your source code.

### Which install option?
| You use | Command (after `install.sh /path/to/your-project`) | Installs |
|---|---|---|
| VS Code Copilot, Codex, or OpenCode | `--only=agents` | `.agents/skills/` + `AGENTS.md` + `CLAUDE.md` |
| Claude Code too (macOS/Linux) | *(no flag)* | the above + `.claude/skills/` as symlinks |
| Claude Code too, on Windows or a repo that can't keep symlinks | `--copy` | the above + `.claude/skills/` as real copies |
| Claude Code only | `--only=claude` | `.claude/skills/` copies + `AGENTS.md` + `CLAUDE.md` |
| Every project on this machine (skills only, no router) | `install.sh --global` | `~/.agents/skills/` + `~/.claude/skills/` |

`AGENTS.md` is per project, so with `--global` you still copy `agent-skills/AGENTS.md` into each project, or run the project install.

### If your project already has `AGENTS.md` or `CLAUDE.md`
The installer never overwrites them. It prints a warning; then:
- **`AGENTS.md`:** append the contents of `agent-skills/AGENTS.md` to yours.
- **`CLAUDE.md`:** make sure its first line is `@AGENTS.md`.

## Check it works
1. Open the project folder itself as the workspace root. Skills and `AGENTS.md` are only read from the root of the open folder.
2. VS Code: run **Developer: Reload Window**, then type `/skills` in Chat. You should see 23 skills.
3. Start a new chat and type `essentialist check`. The reply lists the phases and skill names, which proves `AGENTS.md` is loaded.
4. Try a real prompt, e.g. "I want to add password reset to the app". It should ask who / why / what questions before any code.

Per-tool steps (Claude Code, Codex, OpenCode, any other agent) and troubleshooting: [agent-skills/SETUP.md](./agent-skills/SETUP.md).

## Update to a newer version
```bash
cd ~/tools/software_essentialist_skills && git pull
bash agent-skills/scripts/install.sh /path/to/your-project --only=agents
```
- Skill folders are replaced with the new versions.
- `AGENTS.md` is not overwritten. If you never edited it, copy the new one over: `cp ~/tools/software_essentialist_skills/agent-skills/AGENTS.md /path/to/your-project/`. If you did edit it, merge the changes by hand.
- If a skill was renamed or removed upstream, delete its old folder from `.agents/skills/` yourself.

## Uninstall
From your project, delete the skill folders and the router:
```bash
rm -rf .agents/skills .claude/skills AGENTS.md CLAUDE.md
```
Only delete `AGENTS.md` and `CLAUDE.md` if they came from this pack.

## Install by hand (no bash)
1. Copy `agent-skills/.agents/` into your project root. It is a hidden folder, so use a terminal or show hidden files.
2. Copy `agent-skills/AGENTS.md` into your project root.
3. For Claude Code, also copy `agent-skills/CLAUDE.md`, and copy the skill folders into `.claude/skills/`.

## How it works, in one minute
- **Plan mode (human approves):** the agent clarifies requirements and writes a `.feature` file with acceptance scenarios, plus architecture decisions. You approve them.
- **Agent mode (autonomous):** the agent builds through every scenario test-first without stopping, then reviews against the checklists and commits locally (`feat` / `fix` / `refactor` or a plain message). It never pushes without asking.
- `AGENTS.md` routes each kind of request to the right skill; the skills hold the detailed procedures.

More: [agent-skills/README.md](./agent-skills/README.md) covers working agreements, commit rules, and optional hooks and architecture tests. [agent-skills/TRIGGER-TESTS.md](./agent-skills/TRIGGER-TESTS.md) has prompts for checking that each skill loads.

## Try the lab (optional)
```bash
cd essentials-lab
npm install
npm test             # 117 tests across the 7 labs
```
Each lab has a README explaining its before → after change.

## Editing the skills
Edit files in `agent-skills/.agents/skills/` only; `.claude/skills/` holds symlinks to them. Then run:
```bash
node agent-skills/scripts/validate-skills.mjs   # must print OK
```
