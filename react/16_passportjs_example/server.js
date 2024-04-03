const express = require("express");
const mongoose = require("mongoose");
const apiroute = require("./routes/apiroute");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoStore = require("connect-mongo");

let app = express();

app.use(express.json());

//MONGO CONNECTION

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/passporttest?retryWrites=true&w=majority&appName=testiklusteri"

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(err) => console.log("Failed to connect to MongoDB. Reason",err)
)

//SESSION MANAGEMENT

app.use(session({
	name:"passport-test",
	resave:false,
	secret:"NotNormallyInCode",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60},
	store:mongoStore.create({
		mongoUrl:url,
		collectionName:"sessions"
	})
}))

//PASSPORT

app.use(passport.initialize());
app.use(passport.session());

passport.use("local-login",new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
},function(req,username,password,done) {
	userModel.findOne({"username":username}).then(function(user) {
		if(!user) {
			return done(null,false);
		}
		bcrypt.compare(password,user.password,function(err,success) {
			if(err) {
				return done(err);
			}
			if(!success) {
				return done(null,false);
			}
			return done(null,user);
		})
	}).catch(function(err) {
		return done(err);
	})
}))

app.listen(3000);

console.log("Running in port 3000");