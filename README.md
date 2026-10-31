# links

Link na bio. Astro + `expo-glass-effect` (no web, alias para `src/glass/`, que usa `backdrop-filter`). Hospedado no Cloudflare Pages, sem build no servidor: a saída fica **commitada em `public/`**.

- Conteúdo: `src/links.ts` (único lugar). Visual: `src/styles.css`, `src/glass/`.
- `npm run dev` — pré-visualizar · `npm run build` — gera `public/` · `npm test` — valida links/Pix e se `public/` está em dia.
- Fluxo: editar `src/links.ts` → `npm run build` → `npm test` → commit (incluindo `public/`).
