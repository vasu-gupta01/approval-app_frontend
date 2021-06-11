const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
