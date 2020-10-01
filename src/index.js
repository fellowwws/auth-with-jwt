const express = require("express");
const path = require("path");
const app = require("./app");

const port = process.env.PORT || 5000;

console.log(__dirname);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
