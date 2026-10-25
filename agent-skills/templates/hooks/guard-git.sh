#!/usr/bin/env bash
# PreToolUse hook: blocks pushes, history rewrites and skipped checks. Exit 2 = blocked; stderr is shown to the agent.
set -uo pipefail

payload="$(cat)"

block() {
  echo "Blocked by essentialist guard: $1. Ask the user to run it themselves if it is really intended." >&2
  exit 2
}

if grep -Eq 'git[^"]*[[:space:]]push' <<<"$payload"; then block "git push needs explicit user approval"; fi
if grep -Eq -- '--no-verify' <<<"$payload"; then block "skipping hooks/checks (--no-verify) is not allowed"; fi
if grep -Eq 'git[^"]*reset[^"]*--hard' <<<"$payload"; then block "git reset --hard discards work"; fi
if grep -Eq 'git[^"]*commit[^"]*--amend' <<<"$payload"; then block "amending commits rewrites history"; fi

exit 0
