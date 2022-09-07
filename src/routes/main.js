const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../middlewares/registerMulter");
const upload = multer({ storage });

const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const mainControllers = require("../controllers/main-controllers");
const loginMiddleware = require("../middlewares/loginValidations")
const loginValidations = loginMiddleware.loginValidations

const apiRouter = require("./api.js");
const budgetRouter = require("./budget.js");
const cartRouter = require("./cart.js");
const usersRouter = require("./users.js");
const profRouter = require("./professionals.js");

router.use("/api", apiRouter);
router.use("/budget", budgetRouter);
router.use("/cart", cartRouter);
router.use("/user", usersRouter);
router.use("/prof", profRouter);

router.get("/", mainControllers.home);
router.get("/funcionamiento", mainControllers.funcionamiento);
router.get("/login", guestMiddleware, mainControllers.login);
router.post("/login",loginValidations, mainControllers.loginProcess);
router.get("/logout", mainControllers.logout);
router.get("/history", authMiddleware, mainControllers.history);
router.get("/register", guestMiddleware, mainControllers.register);
router.get("/newPassword", authMiddleware, mainControllers.newPassword);
router.post("/newPassword", mainControllers.addNewPassword);

module.exports = router;
