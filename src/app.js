const path = require("path");
const express = require("express");
const session = require("express-session");
const app = express();
const dayjs = require("dayjs");

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

app.use(
  session({
    secret: "es un secreto",
    resave: false,
    saveUninitialized: false,
  })
);
const methodOverride = require("method-override");

app.locals.dateFormat = (date) => {
  return dayjs(date).format("DD-MM-YYYY");
}

app.locals.timeFormat = (time) => {
  return dayjs(time).format("hh:mm A");
}

app.use(userLoggedMiddleware);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));

const mainRouter = require("./routes/main.js");
app.use("/", mainRouter);

const PORT = 3000;
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
