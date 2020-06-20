const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const homepage = require("./routes/homepage");
// const cafeRoutes = require("./routes/cafeRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/auth", authRoutes);
app.use("/api/homepage", homepage);
// app.use("/api/cafes", cafeRoutes)


app.use((req, res, next) => {
  let err = new Error("Not Found")
  err.status = 404;
  next(err);
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
