const express = require("express");
const router = express.Router();

const registerControllers = require("../controllers/register-controllers");

router.get("/", registerControllers.register);

router.get("/user", registerControllers.registerUser);
router.post("/user", registerControllers.store);

router.get("/profesional", registerControllers.registerProfesional);
router.post("/profesional", registerControllers.registerProfesional);

module.exports = router;
