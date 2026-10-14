import '../css/estilos.css';
import { morseToText, textToMorse } from './morse.js';

const form = document.querySelector('#translator-form');
const source = document.querySelector('#source-text');
const result = document.querySelector('#result-text');
const sourceLabel = document.querySelector('#source-label');
const sourceHint = document.querySelector('#source-hint');
const resultType = document.querySelector('#result-type');
const feedback = document.querySelector('#feedback');
const characterCount = document.querySelector('#character-count');
const copyButton = document.querySelector('#copy-button');
const modeButtons = document.querySelectorAll('.mode-button');
const clearButton = document.querySelector('#clear-button');

let mode = 'text-to-morse';

function setMode(nextMode) {
	mode = nextMode;
	const isTextMode = mode === 'text-to-morse';

	modeButtons.forEach((button) => {
		const isActive = button.dataset.mode === mode;
		button.classList.toggle('is-active', isActive);
		button.setAttribute('aria-pressed', String(isActive));
	});

	sourceLabel.textContent = isTextMode ? 'TU MENSAJE' : 'CÓDIGO MORSE';
	sourceHint.textContent = isTextMode
		? 'Letras, números y signos de puntuación'
		: 'Separa letras con espacios y palabras con /';
	source.placeholder = isTextMode ? 'Escribe aquí…' : 'Ejemplo: .... --- .-.. .-';
	resultType.textContent = isTextMode ? 'CÓDIGO MORSE' : 'TEXTO DESCIFRADO';
	result.value = '';
	feedback.textContent = '';
	feedback.classList.remove('is-error', 'is-success');
	copyButton.disabled = true;
}

function updateCharacterCount() {
	characterCount.textContent = `${source.value.length} / 1000`;
}

modeButtons.forEach((button) => {
	button.addEventListener('click', () => setMode(button.dataset.mode));
});

source.addEventListener('input', () => {
	updateCharacterCount();
	result.value = '';
	feedback.textContent = '';
	feedback.classList.remove('is-error', 'is-success');
	copyButton.disabled = true;
});

source.addEventListener('keydown', (event) => {
	if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
		event.preventDefault();
		form.requestSubmit();
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();

	try {
		const convert = mode === 'text-to-morse' ? textToMorse : morseToText;
		result.value = convert(source.value);
		feedback.textContent = 'Traducción completada.';
		feedback.classList.remove('is-error');
		feedback.classList.add('is-success');
		copyButton.disabled = false;
	} catch (error) {
		result.value = '';
		feedback.textContent = error.message;
		feedback.classList.remove('is-success');
		feedback.classList.add('is-error');
		copyButton.disabled = true;
	}
});

clearButton.addEventListener('click', () => {
	source.value = '';
	result.value = '';
	feedback.textContent = '';
	feedback.classList.remove('is-error', 'is-success');
	copyButton.disabled = true;
	updateCharacterCount();
	source.focus();
});

copyButton.addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText(result.value);
		feedback.textContent = 'Resultado copiado al portapapeles.';
		feedback.classList.remove('is-error');
		feedback.classList.add('is-success');
	} catch {
		feedback.textContent = 'No se pudo acceder al portapapeles en este navegador.';
		feedback.classList.remove('is-success');
		feedback.classList.add('is-error');
	}
});
