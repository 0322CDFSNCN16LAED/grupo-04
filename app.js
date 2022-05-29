const path = require("path");
const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Estamos corriendo en el puerto " + PORT);
});

const mainRouter = require("./routes/main.js");

const productsRouter = require ("./routes/products.js");

const budgetRouter = require("./routes/budget.js");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);

app.use("/product", productsRouter);

<<<<<<< HEAD
app.use("/budget", budgetRouter);






=======
//app.set("view engine", "ejs");
>>>>>>> f28f9bf6ecdc02d73109e6306588df9d79efd79b
