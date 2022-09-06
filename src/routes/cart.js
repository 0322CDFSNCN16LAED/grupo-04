const express = require("express");
const router = express.Router();

const cartControllers = require("../controllers/cart-controllers");
const cartMiddlewares = require("../middlewares/cartValidations");
const cartValidations = cartMiddlewares.cartValidations

//Carrito de compras
router.get("/", cartControllers.cartMain);
router.get("/prof", cartControllers.cartMainProf);
router.post("/prof", cartControllers.cartProf);
router.get("/:resId", cartControllers.addToCart);
router.post("/:resId", cartValidations, cartControllers.storeCartItem);
router.get("/edit/:id", cartControllers.editCartItem);
router.put("/edit/:id", cartValidations, cartControllers.updateCartItem);
router.delete("/edit/:id", cartControllers.destroyCartItem);

module.exports = router;