import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const modulesDir = join(root, 'src', 'modules');
const NOT_FEATURES = new Set(['domain']);

const featureFolders = () =>
  readdirSync(modulesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((capability) =>
      readdirSync(join(modulesDir, capability.name), { withFileTypes: true })
        .filter((d) => d.isDirectory() && !NOT_FEATURES.has(d.name))
        .map((feature) => ({ capability: capability.name, feature: feature.name })),
    );

describe('feature-first structure', () => {
  it('knows which features exist from the folder tree alone', () => {
    expect(featureFolders()).toEqual(
      expect.arrayContaining([
        { capability: 'users', feature: 'registration' },
        { capability: 'tickets', feature: 'purchasing' },
        { capability: 'tickets', feature: 'my-orders' },
      ]),
    );
  });

  it.each(featureFolders())('knows $capability/$feature has a .feature spec mirrored in tests/', ({ capability, feature }) => {
    expect(existsSync(join(root, 'tests', capability, feature, `${feature}.feature`))).toBe(true);
  });
});
