const path = require("path");
const { body } = require("express-validator");

module.exports = { //WIP
  cartValidations: [
    body("diaTurno")
      .notEmpty()
      .withMessage("Debes completar tu nombre")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El nombre debe tener al menos dos caracteres"),
    body("horario")
      .notEmpty()
      .withMessage("Debes completar tu apellido")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El apellido debe tener al menos dos caracteres"),
    body("metodoPago")
      .notEmpty()
      .withMessage("Debes seleccionar un método de pago"),
  ]
};
