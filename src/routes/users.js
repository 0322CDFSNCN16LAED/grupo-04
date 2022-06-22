const express = require("express");
const router = express.Router();
const multer = require("multer");

const authMiddleware = require("../middlewares/authMiddleware");
const userControllers = require("../controllers/user-controllers");

router.get("/detail", authMiddleware, userControllers.userDetail);
router.get("/prof/detail", authMiddleware, userControllers.profDetail)

router.get("/profile",authMiddleware, userControllers.profileUser);
router.post("/profile/edit",userControllers.editUserProfile)

router.get("/prof/profile",authMiddleware, userControllers.profileProf);
router.post("/prof/profile/edit",authMiddleware,userControllers.editProfProfile);


module.exports = router;
