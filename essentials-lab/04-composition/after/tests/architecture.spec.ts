import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? sourceFiles(join(dir, entry.name)) : entry.name.endsWith('.ts') ? [join(dir, entry.name)] : [],
  );
const filesMatching = (pattern: RegExp) =>
  sourceFiles(srcDir).filter((file) => pattern.test(readFileSync(file, 'utf8'))).map((file) => relative(srcDir, file));

// Architecture tests: the wiring rules are checked, not just hoped for.
describe('composition rules', () => {
  it('knows only the process entry point reads environment variables', () => {
    expect(filesMatching(/process\.env/)).toEqual(['main.ts']);
  });

  it('knows use cases never touch the database driver', () => {
    expect(filesMatching(/node:sqlite/).every((file) => !file.startsWith('modules'))).toBe(true);
  });

  it('knows use cases never construct infrastructure themselves', () => {
    expect(filesMatching(/new (Sqlite|Http|InMemory|Fake)\w+\(/).sort()).toEqual(['compose.ts']);
  });
});
