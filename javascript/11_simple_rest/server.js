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

app.post("/api/shopping",function(req,res) {
	let item = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"id":id
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
})

app.delete("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10)
	let tempDatabase = database.filter(item => item.id !== tempId);
	database = tempDatabase;
	return res.status(200).json({"Message":"Success"})
})

app.put("/api/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10)
	let item = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"id":tempId
	}
	for(let i=0;i<database.length;i++) {
		if(item.id === database[i].id) {
			database.splice(i,1,item)
			return res.status(200).json({"Message":"Success"})
		}
	}
	return res.status(404).json({"Message":"Not found"})
})

app.listen(3000);

console.log("Running in port 3000");