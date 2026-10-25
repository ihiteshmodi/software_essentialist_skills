# Essentialist Skill Pack

Agent skills that make coding agents (VS Code Copilot, Codex, Claude Code, OpenCode, …) follow the Software Essentialist method: clarify the problem before writing code, build from tests written against an approved spec, review against the course checklists, and commit in small, typed steps.

- **Install and verify:** [SETUP.md](./SETUP.md)
- **Router the agent always reads:** [AGENTS.md](./AGENTS.md)
- **Skills:** [.agents/skills/](./.agents/skills/) (mirrored as symlinks in `.claude/skills/`)

## Folder map
| Path | What it is | Active when installed? |
|---|---|---|
| `AGENTS.md`, `CLAUDE.md` | Router + Claude Code shim | Yes |
| `.agents/skills/<name>/` | 23 skills (`SKILL.md` + `references/`) | Yes |
| `.claude/skills/<name>` | Symlinks to the same skills for Claude Code | Yes |
| `TRIGGER-TESTS.md` | Sample prompts per skill (should load / should not) to check skills trigger correctly | Testing aid |
| `scripts/install.sh`, `scripts/validate-skills.mjs` | Install into a project; validate after edits | Tooling |
| `templates/hooks/`, `templates/architecture-tests/` | Enforcement templates, **not installed yet** (see below) | No |

## Working agreements

### Plan mode vs agent mode
| | Who decides | What happens |
|---|---|---|
| **Plan mode** | Human approves | Theoretical guesses (who / why / what), the `.feature` file with acceptance scenarios, and hard-to-reverse architecture choices. Humans own the spec. |
| **Agent mode** | Agent, autonomously | Builds through every FA²STR loop without stopping, even while tests are red. Stops only when a scenario is ambiguous or contradicted, an unsettled hard-to-reverse decision appears, a test could only pass by changing an approved scenario, or the same failure survives two different fixes. |
| **After agent mode** | Human reviews | The final report: scenarios → tests, anything skipped, decisions, open questions. Plus `code-review` passed and commits made. |

### TDD for agents
Strict micro-step TDD (one example per loop, fake it, climbing the transformation priority premise, a commit per micro-step) is a *learning* discipline for humans. For agents, what matters is:
- **Required:** tests written from the approved scenarios *before* the code they verify; every new test seen failing once (red for the right reason); every scenario ends with a passing test; responsibility-style test names; refactor on the third repeat; refactors never mixed with behavior changes.
- **Optional:** one example per loop, fake it / TPP, committing every micro-step. Agents may batch the scenarios of one use case and use the obvious implementation.

Why test-first stays: tests written after the code describe what the code does, not what was asked, so they pass even when the code is wrong.

### Commit messages
| Prefix | Use for | Example |
|---|---|---|
| `feat(scope):` | New observable behavior | `feat(tickets): place an order for several tickets` |
| `fix(scope):` | Wrong behavior corrected (start with a failing test that reproduces it) | `fix(users): treat emails case-insensitively` |
| `refactor(scope):` | Structure changed, behavior identical | `refactor(tickets): extract group discount into pricing` |
| *(plain message)* | Everything else: tests only, docs, `.feature` wording, dependencies, CI, config, formatting | `Add OrdersRepository contract spec` |

Commit only on green. Behavior and structure changes never share a commit. Never push or rewrite shared history without the user's approval.

## Pending: hooks and architecture tests (to add later)
Skills and `AGENTS.md` are **guidance**: agents follow them most of the time but can drift, especially in long sessions. Two mechanisms turn the most important rules into **enforcement**. The templates are in `templates/` and are deliberately **not** in any folder an agent reads, so nothing is active until you copy them.

### Hooks
A hook is a shell command the agent tool runs automatically at a lifecycle point (before a tool call, when the agent tries to finish, …). Exit code `2` blocks the action, and the message on stderr is shown to the agent.

| Template | Event | Enforces |
|---|---|---|
| `templates/hooks/guard-git.sh` | Before every shell command (`PreToolUse`) | No `git push`, `--no-verify`, `git reset --hard` or `git commit --amend` without the user |
| `templates/hooks/require-green.sh` | When the agent tries to finish (`Stop`) | The task isn't done while the fast test suite is red. Runs `npm test` by default; set `ESSENTIALIST_TEST_CMD` for other stacks (`go test ./...`, `cargo test`, `pytest -q`). Lets the agent stop on the second attempt (`stop_hook_active`) so it can report instead of looping |
| `templates/hooks/claude-settings.json` | Wiring for Claude Code (VS Code also reads this file) | Registers both scripts |
| `templates/hooks/vscode-essentialist.json` | Wiring in VS Code's `.github/hooks/` format | Same, for teams that prefer `.github/hooks/` |

What it looks like (Claude Code / VS Code `.claude/settings.json`):
```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [{ "type": "command", "command": "bash .agents/hooks/guard-git.sh", "timeout": 10 }] }
    ],
    "Stop": [
      { "hooks": [{ "type": "command", "command": "bash .agents/hooks/require-green.sh", "timeout": 600 }] }
    ]
  }
}
```

To enable later, in a target project:
1. Copy `templates/hooks/guard-git.sh` and `require-green.sh` to `<project>/.agents/hooks/`.
2. Claude Code (and VS Code): merge `claude-settings.json` into `<project>/.claude/settings.json`. Or VS Code only: copy `vscode-essentialist.json` to `<project>/.github/hooks/`. Use one of the two in VS Code, not both, or the hooks run twice.
3. OpenCode and Codex have their own hook/plugin systems: call the same two scripts from them.
4. Verify: ask the agent to `git push`. It must be blocked. Break a test and ask it to finish. It must be told the task isn't done.

Hooks complement CI, they don't replace it: the pipeline (`walking-skeleton-delivery`) is still the gate nobody can bypass.

### Architecture tests
An architecture test is an ordinary test that checks the **structure** of the code instead of its behavior, so layer rules from the skills fail the build when broken. Example in practice: `essentials-lab/04-composition/after/tests/architecture.spec.ts`.

`templates/architecture-tests/architecture.spec.ts` (TypeScript + Vitest/Jest) checks:
- domain and application code import no framework, database, network or filesystem module;
- domain and application code never call `new Date()`, `Date.now()`, `Math.random()` or `randomUUID()` (inject a `Clock` / ID generator);
- only the composition root (`main.ts`, `compose.ts`) reads `process.env`;
- the domain never imports from application, infrastructure or web code;
- use cases never construct infrastructure (`new Sqlite…`, `new Http…`, `new InMemory…`).

To enable later: copy it to `<project>/tests/architecture.spec.ts` and adjust `LAYERS`, `COMPOSITION_ROOTS` and `FRAMEWORK_IMPORTS` to the project's tree. It then runs in the commit phase with the other fast tests. Other stacks have dedicated tools for the same rules: dependency-cruiser (JS/TS), ArchUnit (Java/Kotlin), ArchUnitNET (.NET), import-linter (Python).

## Maintaining the pack
- Edit skills in `.agents/skills/` only (the `.claude/skills/` entries are symlinks).
- Keep each `SKILL.md` portable: frontmatter `name` + `description` only, description ≤ 350 characters with the key use case first, the most important rules at the top, details in `references/`.
- Run `node scripts/validate-skills.mjs` after every change. It must print `OK`.
- Adding or renaming a skill: add its routing row to `AGENTS.md` and its prompts to `TRIGGER-TESTS.md` (the validator checks both). Changing a description: re-run that skill's trigger prompts.
- Every skill ends with a `Sources:` line listing what it came from: course articles (`software-essentialist-guide.html` ids) and, for the production-readiness material, `fastapi-genai-skillset → <skill>/<file>` (meaning `fastapi-genai-skillset/fastapi-<skill>/references/<file>.md`, or `SKILL.md`). Only the framework-neutral, non-GenAI parts of that pack were imported, without its code examples.
