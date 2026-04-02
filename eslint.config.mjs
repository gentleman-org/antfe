import { defineConfig } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    ignores: ['public/sw.js', 'public/sw*.js'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
]);
