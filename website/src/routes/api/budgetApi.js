const express = require("express");
const router = express.Router();

const budgetControllers = require("../../controllers/api/budgetApiControllers");

router.get("/", budgetControllers.budgets);
router.get("/list", budgetControllers.budgetList);
router.get("/response", budgetControllers.budgetResponse);
router.get("/purchased", budgetControllers.budgetPurchased);
router.get("/rubros", budgetControllers.rubros);
router.get("/:id", budgetControllers.budgetDetail);


module.exports = router;