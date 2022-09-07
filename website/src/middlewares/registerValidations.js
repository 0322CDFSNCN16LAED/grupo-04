const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");

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
      .withMessage("Debes colocar un email")
      .isEmail()
      .withMessage("Debes escribir un formato de correo válido")
      .custom(async (value, { req }) => {
        const userToRegister = await db.User.findAll({
          where: {
            email: req.body.email,
          },
        });
        if (userToRegister.length > 0) {
          throw new Error("El e-mail ingresado ya está registrado");
        }
      }),
    body("password")
      .notEmpty()
      .withMessage("Debes introducir una contraseña")
      .bail()
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos ocho caracteres")
      .bail()
      .isStrongPassword()
      .withMessage("Tu contraseña no es lo suficientemente segura, se requiere más dakka"),
    body("phone")
      .notEmpty()
      .withMessage("Debes completar tu número de teléfono")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Debes introducir un número telefónico válido"),
    body("address")
      .notEmpty()
      .withMessage("Debes completar tu dirección"),
    body("city")
      .notEmpty()
      .withMessage("Debes colocar el nombre de tu ciudad"),
    body("state")
      .notEmpty()
      .withMessage("Debes colocar una provincia"),
    body("zipCode")
      .notEmpty()
      .withMessage("Debes completar tu código postal"),
    body("avatar")
      .custom((value, { req }) => {
        const file = req.file;
        const acceptedExtensions = [".gif", ".png", ".tif", ".jpg", ".jpeg"];
        if (!file) {
          throw new Error("Debes subir una imagen de perfil");
        } else {
          const fileExtension = path.extname(file.originalname);
          if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtensions.join(", ")}`);
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
      .withMessage("Debes escribir un formato de correo válido")
      .custom(async (value, { req }) => {
        const userToRegister = await db.User.findAll({
          where: {
            email: req.body.email,
          },
        });
        if (userToRegister.length > 0 ) {
          throw new Error("El e-mail ingresado ya está registrado");
        }
      }),
    body("password")
      .notEmpty()
      .withMessage("Debes introducir una contraseña")
      .bail()
      .isStrongPassword([
        {
          minLength: 8,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: true,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 10,
          pointsForContainingUpper: 10,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10,
        },
      ])
      .withMessage(`La contraseña debe tener un minimo de 8 caracteres, 1 mayuscula, 1 simbolo y 1 numero`),
    body("phone")
      .notEmpty()
      .withMessage("Debes completar tu número teléfono")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Debes introducir un número telefónico válido"),
    body("DNI")
      .notEmpty()
      .isNumeric()
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
      .withMessage("Debes seleccionar por lo menos 1 rubro"),
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
            throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtensions.join(", ")}`);
          }
        }
        return true;
      }),
  ],
};