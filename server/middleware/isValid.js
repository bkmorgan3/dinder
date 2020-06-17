

module.exports = function (req, res, next) {
  // destructure req.body
  const { email, username, password } = req.body;
  console.log(email, username, password)

  // regex check for proper email format
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  // check for no missing values on signup
  if (req.path === "/signup") {
    console.log('sss', !email.length);
    if (![email, username, password].every(Boolean)) {
      return res.status(403).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  return next();
};