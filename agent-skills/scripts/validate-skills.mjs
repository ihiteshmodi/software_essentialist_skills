#!/usr/bin/env node
// Validates the skill pack: frontmatter, sizes, links, Claude symlinks, routing, trigger-test coverage.
import { readdirSync, readFileSync, existsSync, lstatSync, realpathSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(packDir, '.agents', 'skills');
const claudeDir = join(packDir, '.claude', 'skills');
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DESC_TARGET = 350;
const DESC_MAX = 1024;
const BODY_TARGET = 250;
const BODY_MAX = 500;

const errors = [];
const warnings = [];

function parseFrontmatter(text) {
  const lines = text.split('\n');
  if (lines[0] !== '---') return null;
  const end = lines.indexOf('---', 1);
  if (end === -1) return null;
  const fields = {};
  for (const line of lines.slice(1, end)) {
    const match = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1).replace(/''/g, "'");
    }
    fields[match[1]] = value;
  }
  return { fields, body: lines.slice(end + 1) };
}

function checkLinks(file, text) {
  for (const [, target] of text.matchAll(/\]\((\.\/[^)#\s]+)/g)) {
    if (!existsSync(resolve(dirname(file), target))) errors.push(`${file}: broken link ${target}`);
  }
}

const skillNames = readdirSync(skillsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

for (const name of skillNames) {
  const skillFile = join(skillsDir, name, 'SKILL.md');
  const rel = `.agents/skills/${name}/SKILL.md`;
  if (!existsSync(skillFile)) { errors.push(`${rel}: missing`); continue; }
  const text = readFileSync(skillFile, 'utf8');
  const parsed = parseFrontmatter(text);
  if (!parsed) { errors.push(`${rel}: no frontmatter`); continue; }
  const { fields, body } = parsed;
  const extra = Object.keys(fields).filter((k) => !['name', 'description'].includes(k));
  if (extra.length) errors.push(`${rel}: non-portable frontmatter keys ${extra.join(', ')}`);
  if (fields.name !== name) errors.push(`${rel}: name "${fields.name}" != folder "${name}"`);
  if (!NAME_RE.test(name) || name.length > 64) errors.push(`${rel}: invalid name`);
  const desc = fields.description ?? '';
  if (!desc) errors.push(`${rel}: missing description`);
  if (desc.length > DESC_MAX) errors.push(`${rel}: description ${desc.length} > ${DESC_MAX}`);
  else if (desc.length > DESC_TARGET) warnings.push(`${rel}: description ${desc.length} > target ${DESC_TARGET}`);
  if (/: /.test(desc) && !/^description:\s*['"]/m.test(text)) errors.push(`${rel}: description has ": " but is unquoted`);
  if (body.length > BODY_MAX) errors.push(`${rel}: body ${body.length} lines > ${BODY_MAX}`);
  else if (body.length > BODY_TARGET) warnings.push(`${rel}: body ${body.length} lines > target ${BODY_TARGET}`);
  if (!/^Sources:/m.test(text)) errors.push(`${rel}: missing "Sources:" line`);
  checkLinks(skillFile, text);

  const refsDir = join(skillsDir, name, 'references');
  if (existsSync(refsDir)) {
    for (const ref of readdirSync(refsDir)) {
      const refFile = join(refsDir, ref);
      checkLinks(refFile, readFileSync(refFile, 'utf8'));
      if (!text.includes(`./references/${ref}`)) warnings.push(`${rel}: references/${ref} is never linked`);
    }
  }

  const claudeEntry = join(claudeDir, name);
  if (!existsSync(claudeEntry)) errors.push(`.claude/skills/${name}: missing`);
  else if (lstatSync(claudeEntry).isSymbolicLink() && realpathSync(claudeEntry) !== realpathSync(join(skillsDir, name))) {
    errors.push(`.claude/skills/${name}: symlink points elsewhere`);
  }
}

if (existsSync(claudeDir)) {
  for (const entry of readdirSync(claudeDir)) {
    if (!skillNames.includes(entry)) errors.push(`.claude/skills/${entry}: no matching .agents skill`);
  }
}

for (const file of ['AGENTS.md', 'CLAUDE.md']) {
  if (!existsSync(join(packDir, file))) errors.push(`${file}: missing`);
}
if (existsSync(join(packDir, 'AGENTS.md'))) {
  const router = readFileSync(join(packDir, 'AGENTS.md'), 'utf8');
  for (const name of skillNames) {
    if (!router.includes(name)) errors.push(`AGENTS.md: skill ${name} not routed`);
  }
}
const triggerFile = join(packDir, 'TRIGGER-TESTS.md');
if (!existsSync(triggerFile)) errors.push('TRIGGER-TESTS.md: missing');
else {
  const triggers = readFileSync(triggerFile, 'utf8');
  for (const name of skillNames) {
    if (!new RegExp(`^### ${name}$`, 'm').test(triggers)) errors.push(`TRIGGER-TESTS.md: no section for ${name}`);
  }
}

console.log(`skills: ${skillNames.length}`);
warnings.forEach((w) => console.log(`WARN  ${w}`));
errors.forEach((e) => console.log(`ERROR ${e}`));
console.log(errors.length ? `FAILED (${errors.length} errors)` : 'OK');
process.exit(errors.length ? 1 : 0);
