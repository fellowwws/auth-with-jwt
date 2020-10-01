const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../database/connect");
const users = db.get("users");
users.createIndex("email");

const router = express.Router();

const schemaA = Joi.object({
  // must be type string, no whitespace, min 1, max 35 chars and required;
  forename: Joi.string().trim().min(1).max(35).required(),
  surname: Joi.string().trim().min(1).max(35).required(),
  // must be type string, no whitespace, valid email and required;
  email: Joi.string().trim().email().required(),
  // must be type string, no whitespace, min 8, max 12 chars and required;
  password: Joi.string().trim().min(8).max(12).required(),
});

const schemaB = Joi.object({
  // must be type string, no whitespace, valid email and required;
  email: Joi.string().trim().email().required(),
  // must be type string, no whitespace, min 8, max 12 chars and required;
  password: Joi.string().trim().min(8).max(12).required(),
});

router.post("/signup", (req, res) => {
  const validated = schemaA.validate(req.body);

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
});

router.post("/login", (req, res) => {
  const validated = schemaB.validate(req.body);

  if (validated.error) {
    res.status(400).json({ message: validated.error.message });
  }

  users.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "Incorrect email address or password" });
    }

    const plaintextPassword = req.body.password;
    const hashedPassword = user.password;

    bcrypt.compare(plaintextPassword, hashedPassword).then((match) => {
      if (match === true) {
        const payload = {
          id: user._id,
          name: {
            first: user.forename,
            last: user.surname,
          },
          email: user.email,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
          (error, token) => {
            if (error) {
              res.status(500).json({ message: error.message });
            } else {
              res.status(200).json({ token });
            }
          }
        );
      } else {
        res
          .status(401)
          .json({ message: "Incorrect email address or password" });
      }
    });
  });
});

module.exports = router;
