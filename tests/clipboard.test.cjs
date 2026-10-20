const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

const html = readFileSync(`${__dirname}/../public/index.html`, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  .replace(/const k="[^"]*"/, 'const k="chave-de-teste"');

function page(clipboard) {
  const message = { textContent: 'Mensagem inicial' };
  const button = {};
  const timers = new Map();
  let timerId = 0;
  runInNewContext(script, {
    document: { getElementById: id => id === 'pix' ? button : message },
    navigator: { clipboard },
    setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
    clearTimeout(id) { timers.delete(id); },
  });
  return { button, message, timers };
}

test('copia a chave e restaura a mensagem após o aviso', async () => {
  const view = page({ async writeText(value) { assert.equal(value, 'chave-de-teste'); } });
  await view.button.onclick();
  assert.equal(view.message.textContent, 'Chave copiada: chave-de-teste');
  assert.equal(view.timers.size, 1);
  [...view.timers.values()][0]();
  assert.equal(view.message.textContent, 'Mensagem inicial');
});

test('exibe a chave quando a permissão de cópia é negada', async () => {
  const view = page({ async writeText() { throw new Error('Permissão negada'); } });
  await view.button.onclick();
  assert.equal(view.message.textContent, 'Chave Pix (telefone): chave-de-teste');
  assert.equal(view.timers.size, 0);
});

test('exibe a chave quando a API de cópia não existe', async () => {
  const view = page(undefined);
  await view.button.onclick();
  assert.equal(view.message.textContent, 'Chave Pix (telefone): chave-de-teste');
});

test('uma cópia antiga não apaga a chave exibida após falha mais recente', async () => {
  let finishFirst;
  let calls = 0;
  const view = page({ writeText() {
    if (++calls === 1) return new Promise(resolve => { finishFirst = resolve; });
    return Promise.reject(new Error('Permissão negada'));
  } });
  const first = view.button.onclick();
  await view.button.onclick();
  finishFirst();
  await first;
  for (const callback of view.timers.values()) callback();
  assert.equal(view.message.textContent, 'Chave Pix (telefone): chave-de-teste');
  assert.equal(view.timers.size, 0);
});

test('uma falha antiga não sobrescreve o sucesso da tentativa mais recente', async () => {
  let failFirst;
  let calls = 0;
  const view = page({ writeText() {
    if (++calls === 1) return new Promise((resolve, reject) => { failFirst = reject; });
    return Promise.resolve();
  } });
  const first = view.button.onclick();
  await view.button.onclick();
  failFirst(new Error('Permissão negada'));
  await first;
  assert.equal(view.message.textContent, 'Chave copiada: chave-de-teste');
  assert.equal(view.timers.size, 1);
});

test('duas cópias sobrepostas mantêm somente o temporizador mais recente', async () => {
  const finish = [];
  const view = page({ writeText: () => new Promise(resolve => finish.push(resolve)) });
  const first = view.button.onclick();
  const second = view.button.onclick();
  finish[0]();
  await first;
  finish[1]();
  await second;
  assert.equal(view.message.textContent, 'Chave copiada: chave-de-teste');
  assert.equal(view.timers.size, 1);
});
