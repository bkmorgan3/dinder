const express = require("express");
const pool = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const isValidInfo = require("../middleware/isValid")
const authorization = require("../middleware/auth")
require("dotenv").config();

// 401 - unauthenticated, 403 - unauthorized
router.post("/signup", isValidInfo, async (req, res) => {
  // Destructure req.body
  const { email, username, password } = req.body;
  try {
    // Check if user exists
    const user = await pool.query('SELECT email from users WHERE username = $1', [username]);
    console.log('u', user.rows.length)
    if (user.rows.length > 0) {
      return res.status(401).json("User already exists.")
    }

    // bcrypt password
    const salt = await bcrypt.genSalt(10);
    console.log('s', salt)
    const hashed = await bcrypt.hash(password, salt);
    console.log('h', hashed)

    // enter user into DB
    const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING * ', [username, email, hashed]);

    // generate token
    let token = jwt.sign({
      id: newUser.rows[0].user_id,
      username: newUser.rows[0].username,
      email: newUser.rows[0].email
    }, process.env.SECRET
    );
    return res.status(200).json({
      token, username
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json("Server Error.")
  }
})

router.post("/login", isValidInfo, async (req, res) => {
  // destructure body
  const { username, password } = req.body;
  try {
    // Check if user doesnt exits in db
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Login Info")
    }
    // check if pw == db.pw
    let isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json("Invalid Login Info.")
    }

    // Grant a token
    let token = jwt.sign({
      id: user.rows[0].user_id,
      username: user.rows[0].username,
      email: user.rows[0].email
    }, process.env.SECRET, { expiresIn: '1h' }
    )
    return res.status(200).json({ token, username })
  } catch (error) {
    console.error(error)
    return res.status(500).json("Server Error.")
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true)
  } catch (error) {
    console.error(error)
    return res.status(500).json("Server Error.")
  }
})


module.exports = router