const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models")

module.exports = {
  loginValidations: [
    body("email").custom(async (value) => {
      return await db.User.findByEmail(value).then((user) => {
        if (!user) {
          return Promise.reject("email no existe");
        }
      });
    }),
    body("password").custom((value, { req }) => {
      if (value !== req.body.passwordConfirmation) {
        throw new Error("Password confirmation is incorrect");
      }
    }),
  ],
};
