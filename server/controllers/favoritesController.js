const Pool = require("pg").Pool;
const pool = new Pool({
	connectionString:
		"postgres://kpbrjtvt:tmU2ixXRIwrYp1_uBqvugQbY18KfYQwi@otto.db.elephantsql.com:5432/kpbrjtvt"
});

// get favorites
const getFavorites = (req, res, next) => {
	arr = [req.body.user];
	pool.query(
		`SELECT * FROM favorites WHERE "user" = $1`,
		arr,
		(error, favorites) => {
			if (error) {
				res.json(error);
			}
			res.locals.favorites = favorites.rows;
			return next();
		}
	);
};

// add favorite
const addFavorite = (req, res, next) => {
	const { name, address, imageURL, yelpid, yelpURL } = req.body.business;
	const user = req.body.user;
	console.log("this is adding favorites", req.body.business, user);

	pool.query(
		`INSERT INTO favorites (name, address, imgurl, yelpid, yelpurl, "user") VALUES ($1, $2, $3, $4, $5, $6)`,
		[name, address, imageURL, yelpid, yelpURL, user],
		error => {
			if (error) {
				res.json(error);
			} else {
				return next();
			}
		}
	);
};

// delete favorite
const deleteFavorite = (req, res, next) => {
	const { _id } = req.body;
	pool.query("DELETE FROM favorites WHERE _id = $1", [_id], error => {
		if (error) {
			res.json(error);
		} else {
			return next();
		}
	});
};

module.exports = {
	getFavorites,
	addFavorite,
	deleteFavorite
};
