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
    body("rubroNombre").notEmpty().withMessage("debes selccionar un rubro"),
    body("urgenciaTrabajo").notEmpty().withMessage("debes selccionar un campo"),
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

  budgResValidations: [
    body("materiales").notEmpty().withMessage("Debes llenar este campo"),
    body("precioMateriales").notEmpty().withMessage("Debes colocar un precio"),
    body("manoDeObra").notEmpty().withMessage("Debes detallar este campo"),
    body("precioManoObra").notEmpty().withMessage("Debes colocar un precio"),
    body("duracionTrabajo")
      .notEmpty()
      .withMessage("Debes detallar la duración de la tarea"),
    body("comentariosTrabajo")
      .notEmpty()
      .withMessage("Debes incluir algunos comentarios"),
    body("precioFinal")
    .notEmpty()
    .withMessage("Debes incluir el precio final"),
  ],
};
