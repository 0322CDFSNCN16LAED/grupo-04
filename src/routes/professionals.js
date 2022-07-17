const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../middlewares/registerMulter");
const upload = multer({ storage });

const authMiddleware = require("../middlewares/authMiddleware");
const profControllers = require("../controllers/prof-controllers");

const registerMiddlewares = require("../middlewares/registerValidations");
const ProfValidations = registerMiddlewares.ProfValidations;

router.get("/detail", authMiddleware, profControllers.profDetail)
router.get("/edit/:id", authMiddleware, profControllers.editProfProfile);
router.put("/update/:id",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "finished-jobs", maxCount: 20 },
  ]),
  ProfValidations,
  profControllers.updateProfProfile
);

router.get("/inbox", authMiddleware, profControllers.inboxProf);

module.exports = router;