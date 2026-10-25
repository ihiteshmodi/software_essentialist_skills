#!/usr/bin/env bash
# Placeholder deploy step: replace the echo with your platform's deploy command (fly, render, ECS, k8s…).
set -euo pipefail

target_env="${1:?usage: deploy.sh <environment>}"
release="${RELEASE_TAG:-$(git rev-parse --short HEAD 2>/dev/null || date +%s)}"

echo "Deploying essentials-skeleton:${release} to ${target_env}"
echo "(placeholder: no real deployment target configured)"
