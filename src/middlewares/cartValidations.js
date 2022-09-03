const path = require("path");
const { body } = require("express-validator");
const dayjs = require("dayjs");
module.exports = {
  //WIP
  cartValidations: [
    body("diaTurno").custom((value, { req }) => {
      var d = new Date(); 
      var inputDate = req.body.diaTurno
     
     console.log("comparison date - " + d );
     console.log("input date - " + inputDate);
   if (date < inputDate.getTime()) console.log("valid date");
      else console.log("invalid date");
   }),

    body("horario")
      .notEmpty()
      .withMessage("Debes completar tu apellido")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El apellido debe tener al menos dos caracteres"),
    body("metodoPago")
      .notEmpty()
      .withMessage("Debes seleccionar un método de pago"),
  ],
};
