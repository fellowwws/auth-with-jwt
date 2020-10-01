require("dotenv").config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_NAME: process.env.MONGODB_NAME,
  MONGODB_PASS: process.env.MONGODB_PASS,
};
