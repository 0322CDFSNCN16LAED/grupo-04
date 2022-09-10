const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");

module.exports = {
  loginValidations: [
    body("email")
      .notEmpty()
      .withMessage("Debes completar tu email")
      .isEmail()
      .withMessage("Debes escribir un formato de correo válido")
      .custom(async (value, { req }) => {
        const userToLogin = await db.User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (!userToLogin) {
          throw new Error("El usuario no está registrado");
        }
      }),
    body("password")
      .notEmpty()
      .withMessage("Debes introducir tu contraseña")
      .custom(async (value, { req }) => {
        const userToLogin = await db.User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (userToLogin) {
          const password = userToLogin.password;
          let passwordOk = bcryptjs.compareSync(req.body.password, password);
          if (!passwordOk) {
            throw new Error("La contraseña es incorrecta");
          }
        }
      }),
  ],
};
