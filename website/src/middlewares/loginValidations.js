const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");

module.exports = {
  loginValidations: [
    body("email")
      .notEmpty()
      .withMessage("Debes completar tu email")
      .isEmail()
      .withMessage("Debes escribir un formato de correo válido"),
    body("password")
      .notEmpty()
      .withMessage("Debes introducir tu contraseña")
  ],
};
