const express = require("express");
const router = express.Router();

const budgetControllers = require("../../controllers/api/budgetApiControllers");

router.get("/", budgetControllers.budgets);
router.get("/:id", budgetControllers.budgetDetail);

module.exports = router;