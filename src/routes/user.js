const express = require("express");
const db = require("../database/connect");
const users = db.get("users");

const router = express.Router();

router.post("/account", (req, res) => {
  users
    .findOneAndUpdate({ _id: req.user.id }, { $set: req.body })
    .then((updatedDoc) => {
      res.status(200).json({ updatedDoc });
    });
});

module.exports = router;
