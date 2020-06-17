const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/UserController");
const sessionController = require('../controllers/sessionController.js');


router.post("/", usercontroller.verifyUser,sessionController.startSession, (req, res) => {
	res.send("verified");
});
router.post("/create", usercontroller.createUser,sessionController.startSession, (req, res) => {
	res.send("user Created");
});

module.exports = router;
