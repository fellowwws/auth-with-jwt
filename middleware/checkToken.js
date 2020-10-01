const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authorizationHeader = req.get("authorization");

  if (authorizationHeader) {
    const [prefix, token] = authorizationHeader.split(" "); // ["Bearer", "Xbg63sS..."]

    if (!token || prefix !== "Bearer") {
      res.status(400).json({ message: "Bad request" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ message: "Authentication failed" });
      }

      req.user = decoded;
      next();
    });
  }
}

module.exports = checkToken;
