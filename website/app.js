const path = require("path");
const express = require("express");
const session = require("express-session");
const app = express();
const dayjs = require("dayjs");
require("dotenv").config();
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");

const cors = require("cors");

app.use(cors(["localhost:3000"]));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
const methodOverride = require("method-override");

app.locals.dateFormat = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

app.use(userLoggedMiddleware);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.use(express.static(path.join(__dirname, "./public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(require("./src/middlewares/cart"));

const mainRouter = require("./src/routes/main.js");
const apiUsersRouter = require("./src/routes/api/usersApi.js");
const apiBudgetsRouter = require("./src/routes/api/budgetApi.js");

app.use("/", mainRouter);
app.use("/api/users", apiUsersRouter);
app.use("/api/budget", apiBudgetsRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Estamos corriendo en el puerto " + PORT);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    path: req.path,
    error: err,
  });
});
