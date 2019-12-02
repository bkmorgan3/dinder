const express = require("express");

const favoritesControllers = require("../controllers/favoritesController");

const router = express.Router();

// get favorites
router.post("/fav", favoritesControllers.getFavorites, (req, res) => {
	return res.status(200).json(res.locals.favorites);
});

// add favorites
router.post("/", favoritesControllers.addFavorite, (req, res) => {
	return res.status(200).json("Success: favorite is added.");
});

// delete favorites
router.delete("/", favoritesControllers.deleteFavorite, (req, res) => {
	return res.status(200).json("Success: favorite is deleted.");
});

module.exports = router;
