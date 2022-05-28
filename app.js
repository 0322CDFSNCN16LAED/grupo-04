const path = require("path");
const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Estamos corriendo en el puerto " + PORT);
});

const mainRouter = require("./routes/main.js");

const productsRouter = require ("./routes/products.js");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);

app.use("/product", productsRouter);






