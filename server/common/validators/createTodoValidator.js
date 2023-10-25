const { body } = require("express-validator");

const createValideFilter = [
  body("title").trim().notEmpty(),
  body("complited").trim().isBoolean(),
  body("desc").optional().trim().notEmpty(),
];

module.exports = createValideFilter;
