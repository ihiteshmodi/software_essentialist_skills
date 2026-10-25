#!/usr/bin/env bash
# Runs the same phases as .github/workflows/pipeline.yml on your machine, stopping at the first failure.
set -euo pipefail

lab_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
compose_file="$lab_dir/06-walking-skeleton/docker-compose.yml"
cd "$lab_dir"

phase() { printf '\n=== %s ===\n' "$1"; }

phase "1 · Commit phase"
npm run typecheck
npm run test:unit

phase "2 · Acceptance phase"
if docker info >/dev/null 2>&1; then
  trap 'docker compose -f "$compose_file" down -v >/dev/null 2>&1 || true' EXIT
  docker compose -f "$compose_file" up -d --build --wait
  APP_URL=http://localhost:3000 npm run test:e2e
else
  echo "Docker is not running: falling back to the skeleton on plain Node (less production-like)."
  data_dir="$(mktemp -d)"
  PORT=3100 DATA_DIR="$data_dir" node 06-walking-skeleton/src/main.ts &
  server_pid=$!
  trap 'kill "$server_pid" 2>/dev/null || true; rm -rf "$data_dir"' EXIT
  for _ in $(seq 1 30); do curl -sf http://localhost:3100/health >/dev/null && break; sleep 0.5; done
  APP_URL=http://localhost:3100 npm run test:e2e
fi

phase "3 · Deploy"
if [[ "${DEPLOY:-no}" == "yes" ]]; then
  bash 07-deployment-delivery/scripts/deploy.sh production
else
  echo "All gates passed. Deploy is a separate, deliberate step: DEPLOY=yes npm run pipeline:local"
fi
