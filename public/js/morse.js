const MORSE_CODE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.',
  H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.',
  Ñ: '--.--', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
  U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
  5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '$': '...-..-', '@': '.--.-.'
};

const TEXT_CODE = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([character, code]) => [code, character])
);

function normalizeCharacter(character) {
  if (character === 'Ñ') return 'Ñ';
  if (character === '¡') return '!';
  if (character === '¿') return '?';
  return character.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function textToMorse(text) {
  const trimmedText = text.trim();
  if (!trimmedText) throw new Error('Escribe un mensaje antes de convertirlo.');

  return trimmedText.split(/\s+/u).map((word) => Array.from(word).map((character) => {
    const normalizedCharacter = normalizeCharacter(character.toLocaleUpperCase('es'));
    const code = MORSE_CODE[normalizedCharacter];
    if (!code) throw new Error(`El carácter «${character}» no está admitido.`);
    return code;
  }).join(' ')).join(' / ');
}

export function morseToText(morse) {
  const trimmedMorse = morse.trim();
  if (!trimmedMorse) throw new Error('Escribe código Morse antes de convertirlo.');

  const words = trimmedMorse.split('/');
  if (words.some((word) => !word.trim())) {
    throw new Error('Usa / entre palabras y evita separadores vacíos.');
  }

  return words.map((word) => word.trim().split(/\s+/u).map((code) => {
    const character = TEXT_CODE[code];
    if (!character) throw new Error(`El código «${code}» no es válido.`);
    return character;
  }).join('')).join(' ');
}