const express = require("express");
const router = express.Router();

const mainControllers = require("../controllers/main-controllers");

router.get("/", mainControllers.home);

router.get("/login", mainControllers.login);

router.get("/register", mainControllers.register);

router.get("/registerProfesional", mainControllers.registerProfesional);

router.get("/inbox", mainControllers.inbox);

module.exports = router;