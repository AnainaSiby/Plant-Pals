const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const { urlencoded } = require("body-parser");
const route = require("./router/routes.js");

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api", route);
app.use(express.static('uploads'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
