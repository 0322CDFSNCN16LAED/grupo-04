const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../middlewares/registerMulter");
const upload = multer({ storage });

const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const mainControllers = require("../controllers/main-controllers");

const budgetRouter = require("./budget.js");
const usersRouter = require("./users.js");
const profRouter = require("./professionals.js");

router.use("/budget", budgetRouter);
router.use("/user", usersRouter);
router.use("/prof", profRouter);

router.get("/", mainControllers.home);
router.get("/login", guestMiddleware, mainControllers.login);
router.post("/login", mainControllers.loginProcess);
router.get("/logout", mainControllers.logout);
router.get("/history", authMiddleware, mainControllers.history);

router.get("/register", guestMiddleware, mainControllers.register);

router.get("/newPassword", authMiddleware, mainControllers.newPassword);
router.post("/newPassword", mainControllers.addNewPassword);

module.exports = router;
