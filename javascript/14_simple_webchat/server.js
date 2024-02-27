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
		console.log(username)
	})
	
});

server.listen(port, () => {
	console.log("Listening in port",port);
})