const pool = require ('../database.js');
const uuidv4 = require('uuid/v4');
const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  if (req.headers.cookie === undefined) return next()
  const queryForCookie = `SELECT * from sessions WHERE "cookieId" = '${req.headers.cookie.slice(13)}'`
  pool.query(queryForCookie, (err, result)=> {
    if (result === undefined) return next();
    if (err) return next(err);
    res.locals.cookie = result.rows[0];
    res.locals.verified = 'verified';
    console.log('in the cookie verifier', res.locals)
    return next();
  });
};

sessionController.startSession = (req, res, next) => {
  let cookie = uuidv4();
  const queryForCookie = `INSERT INTO sessions ("cookieId", "user") VALUES ('${cookie}', '${req.body.user}') ON CONFLICT ("user") DO UPDATE SET "cookieId" = '${cookie}'`;
  pool.query(queryForCookie, (err, result) => {
    if (err) return next(err);
    res.cookie('dinderCookie', cookie, { httpOnly: true });
    return next();
  });
};

sessionController.signOut = (req, res, next) => {
  const queryForCookie = `DELETE FROM sessions WHERE "user" = '${req.body.user}'`;
  pool.query(queryForCookie, (err, result) => {
    if (err) return next(err);
    res.locals.signedOut = 'signedOut';
    return next();
  });
};

module.exports = sessionController;