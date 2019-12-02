const Pool = require("pg").Pool;
let url =
	"postgres://kpbrjtvt:tmU2ixXRIwrYp1_uBqvugQbY18KfYQwi@otto.db.elephantsql.com:5432/kpbrjtvt";
const pool = new Pool({
	connectionString: url
});

const verifyUser = (req, res, next) => {
	let arr = [req.body.user];
	let queryforPass = `SELECT "password" FROM "Users" WHERE "user" = $1`;
	pool.query(queryforPass, arr, (err, result) => {
		if (err) console.log("no result for user found");
		// console.log(result.rows[0].password);
		if (result.rows[0].password === req.body.pass) {
			// console.log("pass");
			return next();
		}
		return res.send("Not Verified");
	});
};

const createUser = (req, res, next) => {
	let arr = [req.body.user, req.body.password];
	let queryForSignup = `INSERT INTO "users" ("user","password") VALUES ($1,$2)`;
	pool.query(queryForSignUp, arr, (err, result) => {
		if (err) console.log("QUERY NOT FOUND");
		return next();
	});
};

module.exports = {
	verifyUser,
	createUser
};
