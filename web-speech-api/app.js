import * as SpeechSynthesis from './speech-synthesis.js';

/**
 * ページ内のテキストを取得します。
 */
function getFullText() {
	const dom = document.getElementById('speak');
	const text = dom.innerText;
	return text;
}

function tokenize(text) {
	const paragraphes = text.split('\n');
	const words = paragraphes.flatMap(paragraph => {
		const sentences = paragraph.split(/(?<=[。．！？])/);
		return sentences.flatMap(sentence => {
			const words = sentence.split(/(?<=[、，。．！？])/);
			return words;
		});
	})
	.filter(word => word !== '');
	return words;
}

const text = getFullText();

window.restart = () => {
	SpeechSynthesis.cancel();
	SpeechSynthesis.speak(text);
};

/**
 * 発話を再生または一時停止します。
 */
window.playOrPause = () => {
	if (SpeechSynthesis.isSpeaking()) {
		if (SpeechSynthesis.isPaused()) {
			SpeechSynthesis.resume();
		} else {
			SpeechSynthesis.pause();
		}
	} else {
		SpeechSynthesis.speak(text);
	}
}
