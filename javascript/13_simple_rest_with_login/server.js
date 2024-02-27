const express = require("express");
const shoppingRoute = require("./routes/shoppingroute");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

let app = express();

app.use(express.json());

//LOGIN DATABASES

const registeredUsers = [];
const loggedSessions = [];
const time_to_live_diff = 3600000;

//HELPER AND MIDDLEWARE

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({"Message":"Username already in use"})
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal Server Error"})
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		console.log(user);
		registeredUsers.push(user);
		return res.status(201).json({"Message":"Register Success"})
	})
})

app.use("/api",shoppingRoute);

app.listen(3000);

console.log("Running in port 3000");