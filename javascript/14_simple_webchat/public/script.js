const socket = io("http://localhost:3000");
const messageForm = document.querySelector(".chatbox form");
const messageList = document.querySelector("#messagelist");
const userList = document.querySelector("#users");
const chatInput = document.querySelector(".chatbox input");

let users = [];
let messages = [];

socket.on("message", message => {
	messages.push(message);
	updateMessages();
})

socket.on("users", (_users) => {
	users = _users;
	updateUsers();
})

function updateUsers() {
	userList.textContent = "";
	for(let i=0;i<users.length;i++) {
		let node = document.createElement("li");
		let textnode = document.createTextNode(users[i]);
		node.appendChild(textnode);
		userList.appendChild(node);
	}
}

function updateMessages() {
	messageList.textContent = "";
	for(let i=0;i<messages.length;i++) {
		let node = document.createElement("li");
		let userText = document.createElement("p");
		let messageText = document.createElement("p");
		userText.textContent = messages[i].user;
		messageText.textContent = messages[i].message;
		node.append(userText,messageText);
		messageList.appendChild(node);
	}
}

function messageSubmitHandler(e) {
	e.preventDefault();
	let message = chatInput.value;
	socket.emit("message",message);
	chatInput.value = "";
}

messageForm.addEventListener("submit",messageSubmitHandler);

function startChatting() {
	let usernumber = Math.floor(Math.random*10000);
	let username = "User"+usernumber;
	socket.emit("adduser",username);
}

startChatting();