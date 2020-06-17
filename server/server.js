const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
