# Setup: Essentialist Skill Pack

23 skills + one router (`AGENTS.md`) that make coding agents follow the Software Essentialist method: clarify the theoretical guesses first (plan mode, human-approved), then build autonomously with tests from the spec (agent mode), then review and small, typed commits.

## What is in the pack
| Path | Purpose | Read by |
|---|---|---|
| `AGENTS.md` | Router: core stance, phase → skill table, who decides what, guardrails | VS Code Copilot, Codex, OpenCode, Claude Code (v2.1.277+, when no `CLAUDE.md` exists) |
| `CLAUDE.md` | One line, `@AGENTS.md`, so Claude Code always loads the router | Claude Code |
| `.agents/skills/<name>/` | The 23 skills (real files) | Codex, VS Code Copilot, OpenCode |
| `.claude/skills/<name>` | Symlinks to the same skills | Claude Code (Copilot also reads this folder) |
| `TRIGGER-TESTS.md` | Prompts for every skill, each naming the skill that must load, plus a results log | you |
| `scripts/install.sh` | Installs the pack into a project or globally | you |
| `scripts/validate-skills.mjs` | Checks frontmatter, sizes, links, symlinks, routing, trigger-test coverage | you |

## 1. Install into a project (recommended)
```bash
cd "<path>/agent-skills"
./scripts/install.sh /path/to/your-project            # .agents/skills + .claude/skills symlinks + AGENTS.md + CLAUDE.md
./scripts/install.sh /path/to/your-project --copy     # real copies in .claude/skills (Windows, or repos that don't keep symlinks)
./scripts/install.sh /path/to/your-project --only=agents   # Codex + Copilot only
./scripts/install.sh /path/to/your-project --only=claude   # Claude Code + Copilot only (copies)
```
- Existing `AGENTS.md` or `CLAUDE.md` files are **never overwritten**. The script prints what to merge: append this `AGENTS.md` to yours, and make sure your `CLAUDE.md` starts with `@AGENTS.md`.
- Use only `AGENTS.md` for Copilot instructions. Don't also keep a `.github/copilot-instructions.md` with conflicting rules.
- Commit `AGENTS.md`, `CLAUDE.md`, `.agents/skills/` and `.claude/skills/` so teammates and cloud agents get them.

Manual equivalent:
```bash
cp -R agent-skills/.agents agent-skills/AGENTS.md agent-skills/CLAUDE.md /path/to/your-project/
mkdir -p /path/to/your-project/.claude/skills
cd /path/to/your-project && for skill_dir in .agents/skills/*/; do skill_name=$(basename "$skill_dir"); ln -s "../../.agents/skills/$skill_name" ".claude/skills/$skill_name"; done
```

## 2. Install globally (optional)
```bash
./scripts/install.sh --global      # ~/.agents/skills (Codex + Copilot) and ~/.claude/skills symlinks (Claude Code + Copilot)
```
`AGENTS.md` is per project. Copy it into each project, or run the project install.

## 3. Validate the pack after editing a skill
```bash
node scripts/validate-skills.mjs   # must print OK
```

## 4. Confirm it works in each tool
Open a **fresh session** in the project root each time. Then:

### VS Code (GitHub Copilot)
1. Chat view → type `/skills` (opens Configure Skills), or run **Chat: Open Customizations** → Skills tab. You should see the 23 skills.
2. If a skill is listed twice (once from `.agents/skills`, once from `.claude/skills`), reinstall with `--only=agents` for Copilot-only projects. Both copies are identical, so leaving it is harmless.
3. Type `essentialist check`. The reply should list the phases and skill names from `AGENTS.md`.
4. Ask a smoke-test prompt (below). Expand the response's **References / Used** list: it should show `AGENTS.md` and the matching `SKILL.md`.
5. If `AGENTS.md` isn't picked up, check the setting `chat.useAgentsMdFile` is enabled. For a monorepo opened at a sub-folder, enable `chat.useCustomizationsInParentRepositories`.

### Codex (CLI or IDE extension)
1. Run `codex` in the project root.
2. Run `/skills`. You should see the 23 skills from `.agents/skills`.
3. Type `essentialist check`. It should list the phases and skills.
4. Invoke one explicitly: `$clarify-requirements I want to add password reset`.
5. If a skill is missing, restart Codex (it caches the list). Check `~/.codex/config.toml` has no `[[skills.config]] enabled = false` entry for it.

### Claude Code
1. Run `claude` in the project root.
2. Run `/context`. Under **Memory files** you should see `CLAUDE.md`, with `AGENTS.md` imported.
3. Run `/skills`. You should see the 23 project skills.
4. Type `essentialist check`. Then run `/clarify-requirements I want to add password reset`.
5. Check frontmatter with `claude plugin validate .claude/skills` (Claude Code v2.1.233+).
6. If `AGENTS.md` doesn't load, a `CLAUDE.local.md` may be hiding it. Keep the `@AGENTS.md` line at the top of `CLAUDE.md`.

### OpenCode (manual)
OpenCode reads `AGENTS.md` natively, and loads skills from `.opencode/skills/`, `.claude/skills/` and `.agents/skills/` (project), plus `~/.config/opencode/skills/`, `~/.claude/skills/` and `~/.agents/skills/` (global). **Skill names must be unique across all of those folders**, so install only one copy:
```bash
./scripts/install.sh /path/to/project --only=agents    # .agents/skills + AGENTS.md + CLAUDE.md
```
or by hand:
```bash
cp agent-skills/AGENTS.md /path/to/project/
mkdir -p /path/to/project/.agents/skills
cp -R agent-skills/.agents/skills/. /path/to/project/.agents/skills/
```
If the project also has `.claude/skills` (because you use Claude Code too), start OpenCode with `OPENCODE_DISABLE_CLAUDE_CODE_SKILLS=1` to skip that folder.

Verify:
1. Run `opencode` in the project root.
2. Ask "Which skills are available?". It lists the skills from its `skill` tool (the 23 names).
3. Type `essentialist check`.
4. Ask a smoke-test prompt. The agent should call `skill({ name: "clarify-requirements" })` before answering.
5. Skill missing? Check `SKILL.md` is uppercase, the name is unique, and no `"skill"` permission in `opencode.json` denies it.

### Any other agent (manual, generic)
The skills follow the open Agent Skills format (`<name>/SKILL.md` with only `name` + `description` frontmatter), so most agents can use them as-is.
1. **Router**: find the file the agent always loads (`AGENTS.md` for most tools; otherwise its rules file, e.g. `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/*.mdc`, `.windsurfrules`). Put the contents of `AGENTS.md` there, or a line telling it to read `AGENTS.md`.
2. **Skills**: copy `.agents/skills/` into the folder the agent scans for skills (check its docs; `.agents/skills` is the cross-tool default). Copy only once if it scans several folders, to avoid duplicate names.
3. **No skill support?** Keep the skills in `.agents/skills/` and add this to the router file:
   ```markdown
   When the routing table names a skill, read `.agents/skills/<skill>/SKILL.md` with your file tool before acting,
   and follow its links to `references/` only when the skill says to.
   ```
4. **Verify**: fresh session → `essentialist check` → one smoke-test prompt → confirm it read the right `SKILL.md`.

## 5. Smoke-test prompts (same in every tool)
| Prompt | Expected skill(s) | Expected behaviour |
|---|---|---|
| "I want to add password reset to the app" | `clarify-requirements` | Asks role/goal/example questions in small batches. No code. Proposes `docs/design/…` and a `.feature` file |
| "Event storm the checkout flow" | `domain-discovery` | Asks for one concrete scenario first. Produces a command/event table with contexts |
| "Should we split billing into a microservice?" | `monolith-vs-microservices` | Defaults to a modular monolith. Asks which NFR justifies a split |
| "Implement the approved password-reset feature" | `fa2str-workflow` (+ `test-strategy`, `tdd-test-writing`) | Writes the acceptance test and use-case tests from the scenarios first, sees them fail, then builds through all scenarios without stopping. Ends with a final report |
| "Add a fake email service for the tests" | `test-doubles-and-contracts` | A hand-written fake in its own file, plus a contract spec |
| "Build the todo page in React" | `frontend-architecture` | Presenter/view model, controller, gateway. No fetch or validation inside the component |
| "After an order is placed, email the customer and update stock" | `event-driven-decoupling` | `OrderPlaced` event + handlers + failure path. No chained awaits |
| "Review my changes and commit" | `code-review` → `commit-discipline` | A pass/fail table, then a local `feat(...)` / `fix(...)` / `refactor(...)` commit, no push |
| "Call the shipping provider's API to get delivery quotes" | `operational-resilience` | A gateway role + actor with a timeout, a retry policy for temporary failures only, and a written fallback decision |
| "Add request logging and a health check" | `observability-and-config` | Structured logs with a request id; separate liveness and readiness; config read once in the composition root |
| "Add an admin endpoint to delete users" | `security-baseline` (+ `layering-and-composition`) | Route classified as privileged; auth and permission checks wired; non-revealing errors; soft delete as a state |
| "Rename this variable to `total`" (negative test) | none | Just does it. No planning questions |

The full set, 3 prompts per skill plus 1 neighbour prompt each naming the skill that must load, is in [TRIGGER-TESTS.md](./TRIGGER-TESTS.md).

A skill appearing in the list only proves discovery. To measure whether it actually triggers on the prompts it should (and not on the ones it shouldn't), run each prompt with the skill on and off. Claude Code: set it to `"off"` in `skillOverrides`. Codex: use `[[skills.config]] enabled = false`.

## Troubleshooting
| Symptom | Fix |
|---|---|
| Skill never triggers | Put the user's words in the `description` (keep the key use case first, ≤350 chars). Check `name` == folder name. Quote descriptions containing `: `. Run the validator |
| Skill loads but is ignored later in a long session | Re-invoke it (`/name` or `$name`). Long conversations get compacted, so the most important rules sit at the top of each `SKILL.md` |
| Router not followed | Run `essentialist check`. If it fails, `AGENTS.md` isn't loaded (see the per-tool steps above) |
| Hard rule must hold every time (e.g. run tests before commit) | Skills and `AGENTS.md` guide; they don't enforce. Add a hook (Claude Code hooks, VS Code agent hooks, or CI) for hard guarantees |
| Descriptions get truncated | Too many skills installed globally. Keep this pack per project, or turn off unused skills |
