const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const { body } = require("express-validator");

const storage= multer.diskStorage({
  destination: (req,file,cb) =>{
    if (file.fieldname == "avatar"){
      cb(null,path.join(__dirname,"../../public/images/avatar"));
    } else {
      cb(null, path.join(__dirname, "../../public/images/finished-jobs-images"));
    }
  },
  filename: (req,file,cb) => {
    const newFileName= "user-" + Date.now() + path.extname(file.originalname);
    cb(null,newFileName);
  }
});

const upload = multer({storage})

const registerControllers = require("../controllers/register-controllers");

const userValidations = [
    body("name").notEmpty().withMessage("Debes introducir un nombre"),
    body("lastName").notEmpty().withMessage("Debes introducir un apellido"),
    body("userName").notEmpty().withMessage("Debes introducir un nombre de usuario"),
    body("email")
      .notEmpty().withMessage("Debes introducir un email").bail()
      .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body("password").notEmpty().withMessage("Debes introducir una contraseña"),
    body("phone").notEmpty().withMessage("Debes introducir un teléfono"),
    body("address").notEmpty().withMessage("Debes introducir una dirección"),
    body("city").notEmpty().withMessage("Debes introducir una ciudad"),
    body("state").notEmpty().withMessage("Debes introducir una provincia"),
    body("zipCode").notEmpty().withMessage("Debes introducir un código postal"),
    body("avatar").custom((value, { req }) => {
      const file = req.file;
      const acceptedExtensions = [".gif",".png",".tif",".jpg"];
      
      if(!file) {
        throw new Error("Debes subir una imagen de perfil")
      }else {
        const fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
          throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtensions.join(", ")}`);
        }
      }
      return true
    })
];

const ProfValidations = [
  body("name").notEmpty().withMessage("Debes introducir un nombre"),
  body("lastName").notEmpty().withMessage("Debes introducir un apellido"),
  body("userName").notEmpty().withMessage("Debes introducir un nombre de usuario"),
  body("email")
    .notEmpty().withMessage("Debes introducir un email").bail()
    .isEmail().withMessage("Debes escribir un formato de correo válido"),
  body("password").notEmpty().withMessage("Debes introducir una contraseña"),
  body("phone").notEmpty().withMessage("Debes introducir un teléfono"),
  body("DNI").notEmpty().withMessage("Debes introducir un DNI"),
  body("IVA").notEmpty().withMessage("Debes introducir una condición frente al IVA"),
  body("CUIT").notEmpty().withMessage("Debes introducir un número de CUIT"),
  body("rubro").notEmpty().withMessage("Debes introducir un rubro"),
  body("time").notEmpty().withMessage("Debes introducir un horario disponible"),  
  body("avatar").custom((value, { req }) => {
    const file = req.file;
    const acceptedExtensions = [".gif",".png",".tif",".jpg"];
    
    if(!file) {
      throw new Error("Debes subir una imagen de perfil")
    }else {
      const fileExtension = path.extname(file.originalname);
      if(!acceptedExtensions.includes(fileExtension)){
        throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtensions.join(", ")}`);
      }
    }
    return true
  })
];



router.get("/", registerControllers.register);

//*create and store user*//
router.get("/user", registerControllers.createUser);
router.post("/user", upload.single("avatar"), userValidations, registerControllers.storeUser);

//* create and store prof *//
router.get("/prof", registerControllers.createProf);
router.post("/prof",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "finished-jobs", maxCount: 5 }
  ]),
  ProfValidations,
  registerControllers.storeProf);

module.exports = router;
