

module.exports = function (req, res, next) {
  // destructure req.body
  const { email, username, password } = req.body;

  // regex check for proper email format
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  // check for no missing values on signup
  if (req.path === "/signup") {
    if (![email, username, password].every(Boolean)) {
      return res.status(403).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.json("Missing Credentials");
    }
  }

  return next();
};