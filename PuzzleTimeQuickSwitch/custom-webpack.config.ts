import type { Configuration } from 'webpack';

module.exports = {
  entry: { background: { import: 'src/content.ts', runtime: false } },
} as Configuration;
