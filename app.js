const path = require("path");
const express = require("express");

const app = express();

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Estamos corriendo en el puerto " + PORT);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/productDetail", (req, res)=> {
    res.sendFile(path.join(__dirname, "views/productDetail.html"));
});

app.get("/shoppingCart", (req, res)=> {
    res.sendFile(path.join(__dirname, "views/shoppingCart.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});