const express = require("express");
const router = express.Router();

const mainControllers = require("../controllers/main-controllers");

router.get("/", mainControllers.home);
router.get("/login", mainControllers.login);
router.get("/inbox", mainControllers.inbox);
router.get("/history", mainControllers.history);
router.get("/profile/user", mainControllers.profileUser);
router.get("/profile/profesional", mainControllers.profileProfesional);

module.exports = router;