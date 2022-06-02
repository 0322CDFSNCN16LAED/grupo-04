const express = require("express");
const router = express.Router();

const registerControllers = require("../controllers/register-controllers");

router.get("/register", registerControllers.register);

router.get("/login", mainControllers.login);

router.get("/registerUser", mainControllers.registerUser);

router.get("/registerProfesional", mainControllers.registerProfesional);

module.exports = router;
