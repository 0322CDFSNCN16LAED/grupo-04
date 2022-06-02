const express = require("express");
const router = express.Router();

const registerControllers = require("../controllers/register-controllers");

router.get("/", registerControllers.register);

router.get("/user", registerControllers.registerUser);

router.get("/profesional", registerControllers.registerProfesional);

module.exports = router;
