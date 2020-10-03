const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const auth = require("./routes/auth");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
// app.use(cors());
app.use(express.json());

app.use("/auth", auth);

module.exports = app;

// const checkToken = require("../middleware/checkToken");
// const user = require("./routes/user");
// app.use("/user", checkToken, user);
