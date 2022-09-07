const express = require("express");
const router = express.Router();

const apiControllers = require("../controllers/api-controllers");

router.get("/users", apiControllers.users);
router.get("/users/:id", apiControllers.userDetail);
router.get("/budgets", apiControllers.budgets);
router.get("/budgets/:id", apiControllers.budgetDetail);

module.exports = router;