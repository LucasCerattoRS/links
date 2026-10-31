import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// Saida em public/ (commitada): o Cloudflare Pages continua com "sem build, output = public".
// expo-glass-effect so renderiza View no web; o alias troca pelo shim com a mesma API.
export default defineConfig({
  integrations: [react()],
  publicDir: 'assets',
  outDir: 'public',
  vite: { resolve: { alias: { 'expo-glass-effect': fileURLToPath(new URL('./src/glass/index.tsx', import.meta.url)) } } },
});
