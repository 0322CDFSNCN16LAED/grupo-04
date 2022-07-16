const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const userControllers = require("../controllers/user-controllers");

router.get("/detail", authMiddleware, userControllers.userDetail);
router.get("/edit/:id", authMiddleware, userControllers.editUserProfile);
router.put("/update/:id", authMiddleware, userControllers.updateUserProfile);
router.get("/inbox", authMiddleware, userControllers.inboxUser);

module.exports = router;