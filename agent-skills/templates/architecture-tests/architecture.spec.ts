// Architecture tests: structural rules from the skills, checked like any other test.
// Copy to tests/architecture.spec.ts and adjust LAYERS / COMPOSITION_ROOTS to your tree.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC = join(process.cwd(), 'src');

// Path fragments that identify each layer (feature-first trees keep layers *inside* modules).
const LAYERS = {
  domain: [`${sep}domain${sep}`],
  application: [`${sep}application${sep}`, `${sep}use-cases${sep}`],
  infrastructure: [`${sep}infra${sep}`, `${sep}infrastructure${sep}`, `${sep}web${sep}`],
};
const COMPOSITION_ROOTS = ['main.ts', 'compose.ts'];
const FRAMEWORK_IMPORTS = /from ['"](express|fastify|@nestjs\/[^'"]+|react|vue|next\/[^'"]+|prisma|@prisma\/client|typeorm|mongoose|pg|mysql2|node:sqlite|axios|node:fs|node:http)['"]/;

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(name) && !/\.(spec|test)\.tsx?$/.test(name) ? [full] : [];
  });

const files = sourceFiles(SRC);
const inLayer = (layer: keyof typeof LAYERS) => files.filter((f) => LAYERS[layer].some((part) => f.includes(part)));
const violations = (candidates: string[], pattern: RegExp) =>
  candidates.filter((f) => pattern.test(readFileSync(f, 'utf8'))).map((f) => relative(SRC, f));

describe('architecture rules', () => {
  it('knows domain and application code import no framework, database, network or filesystem', () => {
    expect(violations([...inLayer('domain'), ...inLayer('application')], FRAMEWORK_IMPORTS)).toEqual([]);
  });

  it('knows domain and application code never read the clock or randomness directly', () => {
    expect(violations([...inLayer('domain'), ...inLayer('application')], /new Date\(\)|Date\.now\(\)|Math\.random\(\)|randomUUID\(\)/)).toEqual([]);
  });

  it('knows only the composition root reads environment variables', () => {
    const outsideRoot = files.filter((f) => !COMPOSITION_ROOTS.some((root) => f.endsWith(`${sep}${root}`)));
    expect(violations(outsideRoot, /process\.env/)).toEqual([]);
  });

  it('knows the domain never depends on outer layers', () => {
    expect(violations(inLayer('domain'), /from ['"][^'"]*(application|use-cases|infra|infrastructure|web)\//)).toEqual([]);
  });

  it('knows use cases never construct infrastructure themselves', () => {
    expect(violations(inLayer('application'), /new (Sqlite|Postgres|Prisma|Http|Stripe|Smtp|InMemory|Fake)\w*\(/)).toEqual([]);
  });
});
