const express = require("express");
const router = express.Router();
const multer = require("multer");

const budgetControllers = require("../controllers/budget-controllers");

router.get("/request", budgetControllers.request);
router.get("/response", budgetControllers.response);

module.exports = router;
