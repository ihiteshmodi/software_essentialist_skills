#!/usr/bin/env bash
# Stop hook: the agent may not finish while the fast test suite is red.
# Set ESSENTIALIST_TEST_CMD for non-Node projects (e.g. "go test ./...", "cargo test", "pytest -q").
set -uo pipefail

payload="$(cat)"

# Second Stop in a row means the agent already tried to fix things once; let it stop and report.
if grep -Eq '"stop_hook_active"[[:space:]]*:[[:space:]]*true' <<<"$payload"; then exit 0; fi

test_cmd="${ESSENTIALIST_TEST_CMD:-npm test --silent}"

if output="$(bash -c "$test_cmd" 2>&1)"; then
  exit 0
fi

{
  echo "Tests are failing, so the task is not done. Fix them (or report why they cannot pass without changing an approved scenario)."
  echo "Command: $test_cmd"
  echo "$output" | tail -n 40
} >&2
exit 2
