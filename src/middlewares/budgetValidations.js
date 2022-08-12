const { body } = require("express-validator");

module.exports = {
  budgReqValidations: [
    body("tituloSolicitud")
      .notEmpty()
      .withMessage("Debes introducir un titulo de tu solicitud"),
    body("detalleSolicitud")
      .notEmpty()
      .withMessage("Debes detallar la solicitud que quieres realizar"),
      body("ubicacion")
      .notEmpty()
      .withMessage("debes introducir una ubicación")
  ],
};