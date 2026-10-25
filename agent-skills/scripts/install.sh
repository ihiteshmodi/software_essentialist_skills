#!/usr/bin/env bash
# Install the Essentialist skill pack into a project (or globally).
#   scripts/install.sh /path/to/project          # .agents/skills + .claude/skills symlinks + AGENTS.md + CLAUDE.md
#   scripts/install.sh /path/to/project --copy   # real copies in .claude/skills instead of symlinks
#   scripts/install.sh --global                  # ~/.agents/skills + ~/.claude/skills symlinks (no AGENTS.md)
#   --only=agents  -> only .agents/skills (Codex, Copilot, OpenCode);  --only=claude -> only .claude/skills copies (Claude Code + Copilot)
set -euo pipefail

pack_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
skills_src="$pack_dir/.agents/skills"
mode="link"
target=""
global=0
only=""

for arg in "$@"; do
  case "$arg" in
    --copy) mode="copy" ;;
    --global) global=1 ;;
    --only=agents) only="agents" ;;
    --only=claude) only="claude"; mode="copy" ;;
    -h|--help) sed -n '2,7p' "$0"; exit 0 ;;
    *) target="$arg" ;;
  esac
done

if [[ $global -eq 0 && -z "$target" ]]; then
  echo "usage: install.sh <project-dir> [--copy] | --global" >&2
  exit 1
fi

if [[ $global -eq 1 ]]; then
  agents_dir="$HOME/.agents/skills"
  claude_dir="$HOME/.claude/skills"
else
  target="$(cd "$target" && pwd)"
  agents_dir="$target/.agents/skills"
  claude_dir="$target/.claude/skills"
fi

if [[ "$only" != "claude" ]]; then mkdir -p "$agents_dir"; fi
if [[ "$only" != "agents" ]]; then mkdir -p "$claude_dir"; fi

for skill_path in "$skills_src"/*/; do
  skill_name="$(basename "$skill_path")"
  if [[ "$only" != "claude" ]]; then
    rm -rf "${agents_dir:?}/$skill_name"
    cp -R "$skill_path" "$agents_dir/$skill_name"
  fi
  if [[ "$only" == "agents" ]]; then
    echo "installed: $skill_name"
    continue
  fi

  claude_entry="$claude_dir/$skill_name"
  if [[ -e "$claude_entry" && ! -L "$claude_entry" && "$mode" == "link" ]]; then
    echo "skip: $claude_entry exists and is not a symlink (remove it or use --copy)"
    continue
  fi
  rm -rf "$claude_entry"
  if [[ "$mode" == "copy" ]]; then
    cp -R "$skill_path" "$claude_entry"
  elif [[ $global -eq 1 ]]; then
    ln -s "$agents_dir/$skill_name" "$claude_entry"
  else
    ln -s "../../.agents/skills/$skill_name" "$claude_entry"
  fi
  echo "installed: $skill_name"
done

if [[ $global -eq 1 ]]; then
  echo
  echo "Global skills installed. AGENTS.md is per project: run install.sh <project-dir> or copy $pack_dir/AGENTS.md."
  exit 0
fi

if [[ ! -e "$target/AGENTS.md" ]]; then
  cp "$pack_dir/AGENTS.md" "$target/AGENTS.md"
  echo "created: AGENTS.md"
elif cmp -s "$pack_dir/AGENTS.md" "$target/AGENTS.md"; then
  echo "unchanged: AGENTS.md"
else
  echo "WARNING: $target/AGENTS.md already exists and differs. Not overwritten."
  echo "  Merge manually: append the contents of $pack_dir/AGENTS.md to it."
fi

if [[ ! -e "$target/CLAUDE.md" ]]; then
  cp "$pack_dir/CLAUDE.md" "$target/CLAUDE.md"
  echo "created: CLAUDE.md"
elif grep -q '^@AGENTS.md' "$target/CLAUDE.md"; then
  echo "unchanged: CLAUDE.md already imports AGENTS.md"
else
  echo "WARNING: $target/CLAUDE.md exists without '@AGENTS.md'. Add that line at the top so Claude Code loads the router."
fi

echo
echo "Done. Verify with SETUP.md (type 'essentialist check' in each agent)."
