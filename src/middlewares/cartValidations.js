const path = require("path");
const { body } = require("express-validator");
const dayjs = require("dayjs");

module.exports = {
  cartValidations: [
    body("diaTurno").notEmpty().custom((value, { req }) => {
      let today = dayjs(new Date()).format("YYYY-MM-DD");
      let inputDate = req.body.diaTurno;
      const valid = today < inputDate;
      if (valid == false) {
        throw new Error("Debes seleccionar una fecha valida");
      }
      return true;
    }),
    body("horario").notEmpty().custom((value, { req }) => {
      let minHour = dayjs("08:00 AM").format("hh:mm A");
      let maxHour = dayjs("08:00 PM").format("hh:mm A");
      let inputTime = dayjs(req.body.horario).format("hh:mm A");
      console.log(inputTime);
      if (inputTime < minHour || inputTime > maxHour) {
        throw new Error("Debes seleccionar un horario entre las 8:00 AM y las 8:00 PM");
      }
      return true;
    }),
    body("metodoPago")
      .notEmpty()
      .withMessage("Debes seleccionar un método de pago"),
  ],
};
