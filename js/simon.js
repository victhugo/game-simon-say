function getElementByKeyCode(keyCode) {
	return document.querySelector(`[data-key="${keyCode}"]`)
}