const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const checkToken = require("../middleware/checkToken");

const auth = require("./routes/auth");
// const user = require("./routes/user");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// app.use("/user", checkToken, user);
app.use("/auth", auth);

module.exports = app;
