const path = require("path");
const { body } = require("express-validator");
const dayjs = require("dayjs");
module.exports = {
  cartValidations: [
    body("diaTurno").custom((value, { req }) => {
      var today = dayjs(new Date()).format("YYYY-MM-DD");
      var inputDate = req.body.diaTurno;
      const valid = today < inputDate;
      if (valid == false) {
        throw new Error("Debes seleccionar una fecha valida");
      }
      return true;
    }),
    body("metodoPago")
      .notEmpty()
      .withMessage("debes seleccionar un metodo de pago"),
  ],
};
