const express = require("express");
const mongoose = require("mongoose");
const contactModel = require("./models/contact");

let app = express();

app.use("/",express.static("public"));

app.use(express.json());

//DATABASE

let database = [];
let id = 100;

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/kscontact?retryWrites=true&w=majority&appName=testiklusteri"

console.log(url);

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(err) => console.log("Failed to connect to MongoDB. Reason",err)
)


app.get("/api/contacts",function(req,res) {
	contactModel.find().then(function(contacts) {
		return res.status(200).json(contacts)
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal Server Error"})
	})
})

app.post("/api/contacts",function(req,res) {
	let contact = new contactModel({
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"phone":req.body.phone
	})
	contact.save().then(function(contact) {
		return res.status(201).json(contact);
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal Server Error"})
	})
})

app.delete("/api/contacts/:id",function(req,res) {
	contactModel.deleteOne({"_id":req.params.id}).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal Server Error"})
	})
})

app.put("/api/contacts/:id",function(req,res) {
	let contact = {
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"phone":req.body.phone
	}
	contactModel.replaceOne({"_id":req.params.id},contact).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal Server Error"})
	})
})

app.listen(3000);

console.log("Running in port 3000");