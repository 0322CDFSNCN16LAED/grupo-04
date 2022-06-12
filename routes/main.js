const express = require("express");
const router = express.Router();

const mainControllers = require("../controllers/main-controllers");
const productsRouter = require("../routes/products.js");
const budgetRouter = require("../routes/budget.js");
const registerRouter = require("../routes/register.js");

router.use("/product", productsRouter);
router.use("/budget", budgetRouter);
router.use("/register", registerRouter);

router.get("/", mainControllers.home);
router.get("/login", mainControllers.login);
router.get("/inbox", mainControllers.inbox);
router.get("/history", mainControllers.history);
router.get("/profile/user", mainControllers.profileUser);
router.get("/profile/profesional", mainControllers.profileProfesional);

module.exports = router;