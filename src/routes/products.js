const express = require("express");
const router = express.Router();
const multer = require("multer");

const productsControllers = require("../controllers/products-controllers");

router.get("/detail/:id", productsControllers.detail);
router.get("/cart/:id", productsControllers.cart);

module.exports = router;