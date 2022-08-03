const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../middlewares/registerMulter");
const upload = multer({ storage });

const registerMiddlewares = require("../middlewares/registerValidations");
const authMiddleware = require("../middlewares/authMiddleware");
const userControllers = require("../controllers/user-controllers");
const userValidations = registerMiddlewares.userValidations;

router.get("/detail", authMiddleware, userControllers.userDetail);
router.get("/edit/:id", authMiddleware, userControllers.editUserProfile);
router.put("/update/:id", authMiddleware, userControllers.updateUserProfile);
router.get("/inbox", authMiddleware, userControllers.inboxUser);
router.get("/register", userControllers.createUser);
router.post(
  "/register",
  upload.single("avatar"),
  userValidations,
  userControllers.storeUser
);
module.exports = router;