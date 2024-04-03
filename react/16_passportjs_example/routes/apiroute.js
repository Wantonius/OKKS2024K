const express = require("express");

const router = express.Router();

router.get("/greeting",function(req,res) {
	return res.status(200).json({"Message":"Hello "+req.session.user})
})

module.exports = router;