const pool = require("../database")

const verifyUser = (req, res, next) => {
	console.log("req.body", req.body)

	let queryforPass = `SELECT password FROM dinders WHERE username = '${req.body.user}'`;
	pool.query(queryforPass, (err, result) => {
		if (err) console.log("no result for user found");
		// console.log(result.rows[0].password);
		console.log("result", result.rows)
		if (result.rows[0].password === req.body.pass) {
			console.log("pass", req.body.pass);
			return next();
		}
		return res.send("Not Verified");
	});
};

const createUser = (req, res, next) => {
	let arr = [req.body.user, req.body.password];
	let queryForSignup = `INSERT INTO dinders (username,password) VALUES ($1,$2)`;
	pool.query(queryForSignUp, arr, (err, result) => {
		if (err) console.log("QUERY NOT FOUND");
		return next();
	});
};

module.exports = {
	verifyUser,
	createUser
};
