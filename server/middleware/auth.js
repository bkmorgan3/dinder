const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = async (req, res, next) => {
  try {
    // destrucure token from header
    const token = req.header("token")
    // confirm token
    if (!token) {
      return res.status(403).json("Not Authorized");
    }

    const verified = await jwt.verify(token, process.env.SECRET)

    req.user = verified.id
  } catch (err) {
    console.error(err)
    return res.status(403).json("You are not authorized.")
  }
  return next()
}