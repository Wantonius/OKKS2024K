const express = require("express");

let app = express();

app.use(express.json());

app.use(function(req,res,next) {
	console.log("Hi, I am a filter");
	return next();
})

//DATABASE

let database = [];
let id = 100;

/*DATA MODEL
{
	"type":string,
	"count":number,
	"price":number,
	"id":number
}
*/

/* REST API
	GET - /api/shopping Hae kaikki ostokset
	POST - /api/shopping Lisää uusi ostos
	DELETE - /api/shopping/:id Poista :id:llä varustettu ostos
	PUT - /api/shopping/:id Muokkaa :id:llä varustettua ostosta
*/

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
})

app.listen(3000);

console.log("Running in port 3000");