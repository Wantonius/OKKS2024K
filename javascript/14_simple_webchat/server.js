const express = require("express");
const Socket = require("socket.io");
const http = require("http");

const port = 3000;

const app = express();

app.use("/",express.static("public"));

const server = http.createServer(app);

const io = Socket(server,{
	cors:{
		origin:"*",
		methods:["GET","POST"]
	}
});

const users = [];

io.on("connection",(socket) => {
	socket.on("adduser", username => {
		socket.user = username;
		users.push(username);
		io.sockets.emit("users",users);
	})
	
	socket.on("message", message => {
		io.sockets.emit("message",{
			message,
			user:socket.user,
			id:socket.id
		})
	})
	
	socket.on("disconnect", () => {
		if(socket.user) {
			users.splice(users.indexOf(socket.user),1);
			io.sockets.emit("user",users);
		}
	})
	
});

server.listen(port, () => {
	console.log("Listening in port",port);
})