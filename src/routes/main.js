const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../middlewares/registerMulter");
const upload = multer({storage});

const authMiddleware = require("../middlewares/authMiddleware")
const guestMiddleware = require("../middlewares/guestMiddleware");
const mainControllers = require("../controllers/main-controllers");

const registerMiddlewares = require("../middlewares/registerValidations");
const userValidations = registerMiddlewares.userValidations;
const ProfValidations = registerMiddlewares.ProfValidations;

const budgetRouter = require("./budget.js");
const usersRouter = require("./users.js");
const profRouter = require("./professionals.js");

router.use("/budget", budgetRouter);
router.use("/user", usersRouter);
router.use("/prof", profRouter);

router.get("/", mainControllers.home);
router.get("/login",guestMiddleware, mainControllers.login);
router.post("/login", mainControllers.loginProcess);
router.get("/logout", mainControllers.logout);
router.get("/history", authMiddleware, mainControllers.history);

router.get("/register",guestMiddleware, mainControllers.register); 
router.get("/register/user", mainControllers.createUser);
router.post("/register/user", upload.single("avatar"), userValidations, mainControllers.storeUser);

router.get("/register/prof", mainControllers.createProf);
router.post("/register/prof",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "finished-jobs", maxCount: 20}
  ]),
  ProfValidations,
  mainControllers.storeProf
);

module.exports = router;