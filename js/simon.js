const levels = 15
let keys = generateKeys(levels)

function nextLevel(currentLevel) {
	if (currentLevel == levels) {
		return notice('Ganaste','success')	
	}

	swal({
			title: `Nivel ${currentLevel + 1}`,
			type: 'info',
			timer: 900,
			showConfirmButton: false
		})	

	for (let i = 0; i <= currentLevel; i++) {
		setTimeout(() => activate(keys[i]), 800 + (i+1) * 1000)
	}

	let i = 0
	let currentkey = keys[i]
	window.addEventListener('keydown', onkeydown)

	function onkeydown(ev) {
		if (ev.keyCode == currentkey) {
			activate(currentkey, {success: true})
			i++
			if ( i > currentLevel) { //para pasar de ronda
				window.removeEventListener('keydown', onkeydown)
				setTimeout(() => nextLevel(i),1200)
			}
			currentkey = keys[i]
		} else {
			activate(ev.keyCode, { fail: true })
			window.removeEventListener('keydown', onkeydown)
			
			notice('Perdiste','warning')
		}
	}
}

function notice(title, type) {
	swal({
				title: `${title}!`,
				text: 'Quieres jugar otra vez?',
				type: type,
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Si',
			  cancelButtonText: 'No',
			  closeOnConfirm: true
			}).then(function () {
			  keys = generateKeys(levels)
				nextLevel(0)
			}, function (dismiss) {
			  if (dismiss === 'cancel') {
			    swal(
			      'Bye Bye!',
			      'Vuelve pronto',
			      'info'
			    )
			  }
			})
}

nextLevel(0) // Iniciar juego

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