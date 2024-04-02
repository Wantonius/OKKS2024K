/*const express = require("express");
const mongoose = require("mongoose");
const shoppingRoute = require('./routes/shoppingroute.js');
*/

import express from 'express';
import mongoose from 'mongoose';
import shoppingRoute from './routes/shoppingroute.js';

let app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/okksshopping?retryWrites=true&w=majority&appName=testiklusteri"

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(err) => console.log("Failed to connect to MongoDB. Reason",err)
)

app.use("/api",shoppingRoute);

app.listen(3000);

console.log("Running in port 3000");
