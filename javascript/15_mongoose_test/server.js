const express = require("express");
const mongoose = require("mongoose");

let app = express();

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/?retryWrites=true&w=majority&appName=testiklusteri"

console.log(url);

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(err) => console.log("Failed to connect to MongoDB. Reason",err)
)

app.listen(3000);

console.log("Running in port 3000");
