const router = require("express").Router();
const pool = require("../database");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {

  try {
    const user = await pool.query('SELECT username FROM users WHERE user_id =$1', [req.user])
    res.json(user.rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json("Server Error.")
  }
})

module.exports = router;