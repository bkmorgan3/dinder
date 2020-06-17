const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const homepage = require("./routes/homepage");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/homepage", homepage)

app.use((req, res, next) => {
  let err = new Error("Not Found")
  err.status = 404;
  next(err);
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
