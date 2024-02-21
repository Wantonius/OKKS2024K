window.onload = function() {
	const form = document.getElementById("form");
	form.addEventListener("submit",submit);
}

function submit(event) {
	event.preventDefault();
	const username_input = document.querySelector("#username");
	const password_input = document.querySelector("#password");
	let user = {
		"username":username_input.value,
		"password":password_input.value
	}
	login(user);
}

async function login(user) {
	const request = {
		"method":"POST",
		"headers":{
			"Content-type":"application/json"
		},
		"body":JSON.stringify(user)
	}
	let response = await fetch("/login",request);
	if(!response) {
		return;
	}
	if(response.ok) {
		console.log("Logged in!")
	} else {
		console.log("Server responded with a status "+response.status+" "+response.statusText)
	}
}