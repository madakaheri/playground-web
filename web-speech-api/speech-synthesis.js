/**
 * 引数に指定した発話 (SpeechSynthesisUtterance オブジェクト) をキューに追加します。
 * @param {string} text 発話するテキスト
 */
export function speak(text) {
	const utter = new SpeechSynthesisUtterance(text);
	window.speechSynthesis.speak(utter);
}

/**
 * 発話を一時停止します。
 */
export function pause() {
	window.speechSynthesis.pause();
}

/**
 * 一時停止した発話を再開します。
 */
export function resume() {
	window.speechSynthesis.resume();
}

/**
 * キューに残っているすべての発話を削除します。
 */
export function cancel() {
	window.speechSynthesis.cancel();
}

/**
 * 発話中かどうかを返します。
 * @returns {boolean} 発話中の場合 true
 */
export function isSpeaking() {
	return window.speechSynthesis.speaking;
}

/**
 * 発話が一時停止中かどうかを返します。
 * @returns {boolean} 一時停止中の場合 true
 */
export function isPaused() {
	return window.speechSynthesis.paused;
}
