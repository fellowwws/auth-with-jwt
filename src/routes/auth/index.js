const express = require("express");
const signup = require("./signup");
const login = require("./login");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
