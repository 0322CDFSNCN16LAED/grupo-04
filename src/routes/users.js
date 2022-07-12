const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const userControllers = require("../controllers/user-controllers");

router.get("/detail", authMiddleware, userControllers.userDetail);
router.get("/profile",authMiddleware, userControllers.profileUser);
router.post("/profile/edit",userControllers.editUserProfile)
router.get("/inbox", authMiddleware, userControllers.inboxUser);

module.exports = router;