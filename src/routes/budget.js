const express = require("express");
const router = express.Router();
const multer = require("multer");

const budgetControllers = require("../controllers/budget-controllers");

//Usuario carga y envía solicitud de presupuesto
router.get("/request", budgetControllers.request);
router.post("/", budgetControllers.storeUserRequest);

//Profesional carga y envía presupuesto del trabajo que pidió el usuario
router.get("/response", budgetControllers.response);

module.exports = router;
