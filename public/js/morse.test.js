import test from 'node:test';
import assert from 'node:assert/strict';
import { morseToText, textToMorse } from './morse.js';

test('convierte texto con varias palabras a Morse', () => {
  assert.equal(textToMorse('Hola mundo'), '.... --- .-.. .- / -- ..- -. -.. ---');
});

test('admite eñes, tildes, números y puntuación', () => {
  assert.equal(textToMorse('¡Sí, año 2!'), '-.-.-- ... .. --..-- / .- --.-- --- / ..--- -.-.--');
});

test('descifra Morse y conserva la separación entre palabras', () => {
  assert.equal(morseToText('.... --- .-.. .- / -- ..- -. -.. ---'), 'HOLA MUNDO');
});

test('informa si el texto contiene caracteres no admitidos', () => {
  assert.throws(() => textToMorse('hola 🙂'), /no está admitido/);
});

test('rechaza código Morse inválido y separadores vacíos', () => {
  assert.throws(() => morseToText('.... ..--.-.-'), /no es válido/);
  assert.throws(() => morseToText('... // ---'), /separadores vacíos/);
});

test('valida que ambas entradas no estén vacías', () => {
  assert.throws(() => textToMorse('  '), /Escribe un mensaje/);
  assert.throws(() => morseToText('  '), /Escribe código Morse/);
});