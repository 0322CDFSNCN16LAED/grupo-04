const path = require("path");
const { body } = require("express-validator");

module.exports = {
  userValidations: [
    body("name").notEmpty().withMessage("Debes introducir un nombre"),
    body("lastName").notEmpty().withMessage("Debes introducir un apellido"),
    body("userName")
      .notEmpty()
      .withMessage("Debes introducir un nombre de usuario"),
    body("email")
      .notEmpty()
      .withMessage("Debes introducir un email")
      .bail()
      .isEmail()
      .withMessage("Debes escribir un formato de correo válido"),
    body("password").notEmpty().withMessage("Debes introducir una contraseña"),
    body("phone").notEmpty().withMessage("Debes introducir un teléfono"),
    body("address").notEmpty().withMessage("Debes introducir una dirección"),
    body("city").notEmpty().withMessage("Debes introducir una ciudad"),
    body("state").notEmpty().withMessage("Debes introducir una provincia"),
    body("zipCode").notEmpty().withMessage("Debes introducir un código postal"),
    body("avatar").custom((value, { req }) => {
      const file = req.file;
      const acceptedExtensions = [".gif", ".png", ".tif", ".jpg"];

      if (!file) {
        throw new Error("Debes subir una imagen de perfil");
      } else {
        const fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(
            `Las extensiones de archivo permitidas son: ${acceptedExtensions.join(
              ", "
            )}`
          );
        }
      }
      return true;
    }),
  ],

  ProfValidations: [
    body("name").notEmpty().withMessage("Debes introducir un nombre"),
    body("lastName").notEmpty().withMessage("Debes introducir un apellido"),
    body("userName")
      .notEmpty()
      .withMessage("Debes introducir un nombre de usuario"),
    body("email")
      .notEmpty()
      .withMessage("Debes introducir un email")
      .bail()
      .isEmail()
      .withMessage("Debes escribir un formato de correo válido"),
    body("password").notEmpty().withMessage("Debes introducir una contraseña"),
    body("phone").notEmpty().withMessage("Debes introducir un teléfono"),
    body("DNI").notEmpty().withMessage("Debes introducir un DNI"),
    body("address").notEmpty().withMessage("Debes introducir una dirección"),
    body("city").notEmpty().withMessage("Debes introducir una ciudad"),
    body("state").notEmpty().withMessage("Debes introducir una provincia"),
    body("zipCode").notEmpty().withMessage("Debes introducir un código postal"),
    body("rubro").notEmpty().withMessage("Debes elegir por lo menos 1 rubro"),
    body("avatar").custom((value, { req }) => {
      var file = req.files.avatar;

      const acceptedExtensions = [".gif", ".png", ".tif", ".jpg"];

      if (!file) {
        throw new Error("Debes subir una imagen de perfil");
      } else {
        file = file[0];
        const fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(
            `Las extensiones de archivo permitidas son: ${acceptedExtensions.join(
              ", "
            )}`
          );
        }
      }
      return true;
    }),
  ],
};
const { check, body } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()

    .withMessage("Ingresar un nombre")
    .bail()

    .isLength({ min: 3 })

    .withMessage("El nombre debe tener mas de dos caracteres"),

  check("email")
    .notEmpty()

    .isEmail()

    .withMessage("Ingresar un email válido"),

  check("contrasenia")
    .isLength({ min: 8 })

    .withMessage("La contrasenia deberia tener un minimo de 8 caracteres"),
];