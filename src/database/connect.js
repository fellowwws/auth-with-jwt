const database = require("monk")(
  `mongodb+srv://root:${process.env.MONGODB_PASSWORD}@cluster0.scera.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
);

module.exports = database;
