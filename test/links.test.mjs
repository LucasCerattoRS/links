import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sections, pix } from '../src/links.ts';

const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
const items = sections.flatMap((s) => s.items);

test('links bem formados e sem repetição', () => {
  for (const it of items) {
    assert.match(it.href, /^https:\/\//, it.title);
    assert.ok(it.title && it.sub, it.href);
  }
  assert.equal(new Set(items.map((i) => i.href)).size, items.length, 'href duplicado');
});

test('chave Pix em E.164 e igual ao número do WhatsApp', () => {
  assert.match(pix.chave, /^\+\d{12,13}$/);
  assert.ok(items.some((i) => i.href === `https://wa.me/${pix.chave.slice(1)}`));
});

test('public/index.html está em dia com src/links.ts (rode npm run build)', () => {
  for (const it of items) assert.ok(html.includes(`href="${it.href}"`), `faltando no build: ${it.title}`);
  assert.ok(html.includes(pix.chave));
});
