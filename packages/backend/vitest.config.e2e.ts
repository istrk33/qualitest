import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@src': './src',
      '@test': './test',
    },
    root: './',

    threads: false,
    maxThreads: 1,
    maxConcurrency: 1,
    bail: 1,
    hookTimeout: 60000,
    testTimeout: 60000,
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },

  plugins: [swc.vite()],
});
