const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const favorites = require('./routes/favorites');
const PORT = 3000;
const login = require('./routes/login.js');
const sessionController = require("./controllers/sessionController.js")

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

app.use('/build', express.static(path.join(__dirname, '../build')));

// route to home page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/signedin', sessionController.isLoggedIn, (req, res) => {
  if (res.locals.verified === 'verified') {
    res.status(200).send(res.locals)
  } else {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
  }
});

app.use('/signout', sessionController.signOut, (req, res) => {
  if (res.locals.signedOut === 'signedOut') {
    res.status(200).send('signedOut')
  }
})

app.use('/signup', login)
//route to login
app.use('/login', login);
// route to favorites
app.use('/favorites', favorites);

app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.use((err,req,res,next) => {
  const defaultErr = {
    message: `Global error handler caught the following error ${err}`,
    status: 400
  }
  const errorObj = Object.assign(err, defaultErr);
  return res.send(errorObj)
})
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
