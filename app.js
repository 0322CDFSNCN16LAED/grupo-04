const path = require("path");
const express = require("express");
const session = require("express-session");
const app = express();

app.use(session({
  secret:"es un secreto",
  resave:false,
  saveUninitialized: false
}));

const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

const mainRouter = require("./src/routes/main.js");
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






