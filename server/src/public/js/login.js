function checkCredentials() {
	var email = document.getElementById('emailArea').value
	var password = document.getElementById('passwordArea').value
	var data = {
		email: email,
		password: password,
	}
	fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(res => res.json())
		.then(data => {
			if (data.status !== 'success') {
				setTimeout(() => {
					$('#message').slideUp(2000)
				}, 2000)
				$('#message').html(data).slideDown(1000)
			} else {
				window.location = '/home'
			}
		})
}

function sendCredentials() {
	var name = document.getElementById('nameArea').value
	var email = document.getElementById('emailArea').value
	var password = document.getElementById('passwordArea').value
	var data = {
		name: name,
		email: email,
		password: password,
	}
	fetch('/api/users/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then(res => res.json())
		.then(data => {
			if (data.status !== 'success') {
				setTimeout(() => {
					$('#message').slideUp(2000)
				}, 2000)
				$('#message').html(data).slideDown(1000)
			} else {
				window.location = '/login'
			}
		})
}

function logoutUser() {
	window.location = '/logout'
}

var i = 0
var txt = 'Relive and share your best journeys.'
function typeWriter() {
	if (i < txt.length) {
		document.getElementById('text').innerHTML += txt.charAt(i)
		i++
		setTimeout(typeWriter, 200)
	}
}
