const { body } = require("express-validator");
const dayjs = require("dayjs");

module.exports = {
  cartValidations: [
    body("diaTurno").custom((value, { req }) => {
      let today = dayjs(new Date()).format("YYYY-MM-DD");
      let inputDate = req.body.diaTurno;
      const valid = today < inputDate;
      if (valid == false) {
        throw new Error("Debes seleccionar una fecha válida");
      }
      return true;
    }),
    body("horario").custom((value, { req }) => {
      let minHour = "08:00"
      let maxHour = "20:00"
      let inputTime = req.body.horario;
      if (inputTime < minHour || inputTime > maxHour) {
        throw new Error("Debes seleccionar un horario entre las 8:00 y las 20:00 horas");
      }
      return true;
    }),
    body("metodoPago")
      .notEmpty()
      .withMessage("Debes seleccionar un método de pago"),
  ],
};
