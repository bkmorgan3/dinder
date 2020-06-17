const Pool = require("pg").Pool;
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.DB_URL
});

module.exports = {
  query: (text, params, cb) => {
    console.log("executed query", text)
    return pool.query(text, params, cb)
  }
}