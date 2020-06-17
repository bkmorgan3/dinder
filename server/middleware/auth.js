const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = async (req, res, next) => {
  // destrucure token from header
  const token = req.header("token")
  try {
    // confirm token
    if (!token) {
      return res.status(403).json("Not Authorized");
    }

    const verify = await jwt.verify(token, process.env.SECRET)
    console.log("v", verify)

    req.user = verify.user
  } catch (err) {
    console.error(err)
    return res.status(403).json("You are not authorized.")
  }
  return next()
}