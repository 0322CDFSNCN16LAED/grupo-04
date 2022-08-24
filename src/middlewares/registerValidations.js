const path = require("path");
const { body } = require("express-validator");

module.exports = {
  userValidations: [
    body("name")
      .notEmpty()
      .withMessage("Debes completar tu nombre")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El nombre debe tener al menos dos caracteres"),
    body("lastName")
      .notEmpty()
      .withMessage("Debes completar tu apellido")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El apellido debe tener al menos dos caracteres"),
    body("userName")
      .notEmpty()
      .withMessage("Debes introducir un nombre de usuario"),
    body("email")
      .notEmpty()
      .withMessage("Debes completar tu email")
      .isEmail()
      .withMessage("Debes escribir un formato de correo válido"), 
    body("password")
      .notEmpty()
      .withMessage("Debes introducir una contraseña")
      .bail()
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos ocho caracteres"),
    body("phone")
      .notEmpty()
      .withMessage("Debes completar tu número de teléfono"),
    body("address")
      .notEmpty()
      .withMessage("Debes introducir tu dirección"),
    body("city")
      .notEmpty()
      .withMessage("Debes completar el nombre de tu ciudad"),
    body("state")
      .notEmpty()
      .withMessage("Debes completar el nombre de tu provincia"),
    body("zipCode")
      .notEmpty()
      .withMessage("Debes introducir tu código postal"),
    body("avatar")
      .custom((value, { req }) => {
        const file = req.file;
        const acceptedExtensions = [".gif", ".png", ".tif", ".jpg"];
        console.log(file);
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
    body("name")
      .notEmpty()
      .withMessage("Debes completar tu nombre")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El nombre debe tener al menos dos caracteres"),
    body("lastName")
      .notEmpty()
      .withMessage("Debes completar tu apellido")
      .bail()
      .isLength({ min: 2 })
      .withMessage("El apellido debe tener al menos dos caracteres"),
    body("userName")
      .notEmpty()
      .withMessage("Debes completar el nombre de usuario"),
    body("email")
      .notEmpty()
      .withMessage("Debes completar tu email")
      .isEmail()
      .withMessage("Debes escribir un formato de correo válido"),
    body("password")
      .notEmpty()
      .withMessage("Debes introducir una contraseña")
      .bail()
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos ocho caracteres"),
    body("phone")
      .notEmpty()
      .withMessage("Debes completar tu número teléfono"),
    body("DNI").
      notEmpty()
      .withMessage("Debes completar tu número de DNI"),
    body("address")
      .notEmpty()
      .withMessage("Debes completar tu dirección"),
    body("city")
      .notEmpty()
      .withMessage("Debes completar el nombre de tu ciudad"),
    body("state")
      .notEmpty()
      .withMessage("Debes completar el nombre de tu provincia"),
    body("zipCode")
      .notEmpty()
      .withMessage("Debes completar tu código postal"),
    body("rubro")
      .notEmpty()
      .withMessage("Debes elegir por lo menos 1 rubro"),
    body("avatar")
      .custom((value, { req }) => {
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
