const socket = io("http://localhost:3000");

function senduser() {
	socket.emit("adduser","testuser");
}