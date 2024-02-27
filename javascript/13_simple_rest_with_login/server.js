const express = require("express");
const shoppingRoute = require("./routes/shoppingroute");

let app = express();

app.use(express.json());

app.use("/api",shoppingRoute);

app.listen(3000);

console.log("Running in port 3000");