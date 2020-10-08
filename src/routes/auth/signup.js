const bcrypt = require("bcrypt");
const schema = require("../../validation");
const db = require("../../database/connect");

const users = db.get("users");
users.createIndex("email");

module.exports = function (req, res) {
  const validated = schema.validate(req.body);

  if (validated.error) {
    res.status(400).json({ message: validated.error.message });
  }

  users.findOne({ email: req.body.email }).then((user) => {
    // if user != undefined, user already exists;
    if (user) {
      res
        .status(409)
        .json({ message: "A user with that email address already exists" });
    } else {
      // hash the password and insert a new user record;
      bcrypt.hash(req.body.password, 10).then((hash) => {
        users
          .insert({
            ...req.body,
            password: hash,
          })
          .then((record) => {
            res
              .status(200)
              .json({ message: "User created successfully: " + record._id });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ message: "Error creating user: " + error.message });
          });
      });
    }
  });
};
