const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware")
const guestMiddleware = require("../middlewares/guestMiddleware");
const mainControllers = require("../controllers/main-controllers");
const productsRouter = require("./products.js");
const budgetRouter = require("./budget.js");
const registerRouter = require("./register.js");
const usersRouter = require("./users.js");

router.use("/product", productsRouter);
router.use("/budget", budgetRouter);
router.use("/register", registerRouter);
router.use("/user", usersRouter);

router.get("/", mainControllers.home);

router.get("/login",guestMiddleware, mainControllers.login);
router.post("/login", mainControllers.loginProcess);

router.get("/logout", mainControllers.logout);

router.get("/inboxUser", authMiddleware, mainControllers.inboxUser);

router.get("/inboxProf", authMiddleware, mainControllers.inboxProf);

router.get("/history", authMiddleware, mainControllers.history);

module.exports = router;