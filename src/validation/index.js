const Joi = require("joi");

module.exports = Joi.object({
  // must be type string, no whitespace, min 1, max 35 chars and required;
  forename: Joi.string().trim().min(1).max(35).required(),
  surname: Joi.string().trim().min(1).max(35).required(),
  // must be type string, no whitespace, valid email and required;
  email: Joi.string().trim().email().required(),
  // must be type string, no whitespace, min 8, max 12 chars and required;
  password: Joi.string().trim().min(8).max(12).required(),
});
