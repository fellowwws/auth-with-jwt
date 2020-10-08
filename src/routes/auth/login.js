const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../database/connect");

const users = db.get("users");
users.createIndex("email");

module.exports = function (req, res) {
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
};
