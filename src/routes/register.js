const express = require("express");
const router = express.Router();

const registerControllers = require("../controllers/register-controllers");

router.get("/", registerControllers.register);

//*create and store user*//
router.get("/user", registerControllers.createUser);
router.post("/user", registerControllers.storeUser);

//* create and store prof *//
router.get("/prof", registerControllers.createProf);
router.post("/prof", registerControllers.storeProf);

module.exports = router;
