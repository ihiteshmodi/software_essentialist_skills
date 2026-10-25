import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e.spec.ts'],
    exclude: ['**/node_modules/**'],
    testTimeout: 15_000,
  },
});
