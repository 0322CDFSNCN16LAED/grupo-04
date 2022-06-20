const express = require("express");
const router = express.Router();
const multer = require("multer");

const userControllers = require("../controllers/user-controllers");

router.get("/detail",userControllers.userDetail)
router.get("/prof/detail",userControllers.profDetail)

router.get("/profile", userControllers.profileUser);
router.post("/profile/edit",userControllers.editUserProfile)

router.get("/prof/profile", userControllers.profileProf);
router.post("/prof/profile/edit", userControllers.editProfProfile);


module.exports = router;
