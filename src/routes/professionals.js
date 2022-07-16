const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const profControllers = require("../controllers/prof-controllers");

router.get("/detail", authMiddleware, profControllers.profDetail)
router.get("/edit/:id", authMiddleware, profControllers.editProfProfile);

router.get("/inbox", authMiddleware, profControllers.inboxProf);

module.exports = router;