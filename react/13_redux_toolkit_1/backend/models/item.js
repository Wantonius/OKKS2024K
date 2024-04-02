/*
const mongoose = require("mongoose");
*/
import mongoose from 'mongoose';

let Schema = mongoose.Schema({
	type:String,
	count:Number,
	price:Number
})

//module.exports = mongoose.model("Item",Schema);

export default mongoose.model("Item",Schema);