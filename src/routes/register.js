const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../middlewares/registerMulter")
const upload = multer({storage})

const registerControllers = require("../controllers/register-controllers");

const registerMiddlewares = require("../middlewares/registerValidations");
const userValidations = registerMiddlewares.userValidations;
const ProfValidations = registerMiddlewares.ProfValidations;

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
