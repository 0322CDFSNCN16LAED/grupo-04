const path = require("path");
const express = require("express");
const session = require("express-session");
const app = express();
const dayjs = require("dayjs");

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

const cors = require("cors");

app.use(cors(["localhost:3000"]));

app.use(
  session({
    secret: "es un secreto",
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
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(require("./middlewares/cart"));

const mainRouter = require("./routes/main.js");
const apiUsersRouter = require("./routes/api/usersApi.js");
const apiBudgetsRouter = require("./routes/api/budgetApi.js");

app.use("/", mainRouter);
app.use("/api/users", apiUsersRouter);
app.use("/api/budget", apiBudgetsRouter);
const PORT = 3001;
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
