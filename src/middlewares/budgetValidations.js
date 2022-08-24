const { Console } = require("console");
const { body } = require("express-validator");
const path = require("path");

module.exports = {
  budgReqValidations: [
    body("tituloSolicitud")
      .notEmpty()
      .withMessage("Debes introducir un titulo de tu solicitud"),
    body("detalleSolicitud")
      .notEmpty()
      .withMessage("Debes detallar la solicitud que quieres realizar"),
    body("ubicacion").notEmpty().withMessage("debes introducir una ubicación"),
    body("imgReferencia").custom((value, { req }) => {
      const file = req.files;
      
      const acceptedExtensions = [".gif", ".png", ".tif", ".jpg"];

      if (!file[0]) {
        throw new Error("Debes subir una imagen de perfil");
      } else {
        const fileExtension = file.map((img) => {
          return path.extname(img.originalname);
        });
        fileExtension.forEach((element) => {
          if (!acceptedExtensions.includes(element)) {
            throw new Error(
              `Las extensiones de archivo permitidas son: ${acceptedExtensions.join(
                ", "
              )}`
            );
          }
        });
      }
      return true;
    }),
  ],
};
