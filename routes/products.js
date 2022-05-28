const express = require("express");
const router = express.Router();

const productsControllers = require("../controllers/products-controllers");

router.get("/detail", productsControllers.detail);

router.get("/cart", productsControllers.cart);



module.exports = router;
