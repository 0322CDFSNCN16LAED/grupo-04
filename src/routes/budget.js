const express = require("express");
const router = express.Router();
const multer = require("multer");

const budgetControllers = require("../controllers/budget-controllers");

//Usuario carga y envía solicitud de presupuesto
router.get("/request", budgetControllers.request);
router.post("/request", budgetControllers.storeBudgRequest);

//Profesional carga y envía presupuesto del trabajo que pidió el usuario
router.get("/response", budgetControllers.response);
router.post("/response", budgetControllers.storeBudgResponse);

module.exports = router;
