const levels =15
let key = generateKeys(levels)

/* 
* Para que funcione map, debemos poner cualquier valor dentro de cada posicion del array (fill(0))
* Creara un array de 15 elementos y para cada elemento 
* manadara llamar a la funcion generateRandomKey
*/
function generateKeys(levels) {									 					
	return new Array(levels).fill(0).map(generateRandomKey) 
}																								 				

function generateRandomKey() {
	const min = 65
	const max = 90
	return Math.round(Math.random() * (max - min) + min)
}

function getElementByKeyCode(keyCode) {
	return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}) {
	const el = getElementByKeyCode(keyCode)
	el.classList.add('active')
	if (opts.success) {
		el.classList.add('success')
	} else if (opts.fail) {
		el.classList.add('fail')
	}
	setTimeout(() => deactivate(el), 500) // No llamar directamente a deactive, si no que una funcion se encargu de eso
}

function deactivate(el) {
	el.className = 'key' // Borra las otras clases, y solo deja clase key
}