const { validationResult } = require("express-validator");
const db = require("../database/models");

module.exports = {
  addToCart: async (req, res) => {
    const cartDetail = await db.budgRes.findOne({
        where: {
            id: req.params.resId,
        },
        include: [
            "users",
            { association: "budget_request", include: ["req_imgs"] },
        ],
    });
    //console.log(JSON.stringify(cartDetail,null,4));
    res.render("cartDetail", { cartDetail });
  },
  
  storeCartItem: async (req, res) => {
    const cartDetail = await db.budgRes.findOne({
      where: {
        id: req.params.resId,
      },
      include: [
        "users",
        { association: "budget_request", include: ["req_imgs"] },
      ],
    });
    
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length == 0) {
      await db.ShoppingCart.create({
        resId: req.params.resId,
        userId: req.session.userLogged.id,
        dia: req.body.diaTurno,
        horario: req.body.horario,
        metodoPago: req.body.metodoPago,
        estado: "TRABAJO AGENDADO",
      });
      res.redirect("/cart");
    } else {
      res.render("cartDetail", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        cartDetail: cartDetail
      });
    }
  },
  
  cartMain: async (req, res) => {
    const items = await db.ShoppingCart.findAll({
      where: {
        userId: req.session.userLogged.id,
      },
      include: [
        "users",
        {
          association: "budget_response",
          include: [
            "users",
            { association: "budget_request", include: ["req_imgs"] },
          ],
        },
      ],
    });
    console.log(JSON.stringify(items,null,4))
    res.render("cartMain", { items });
  },
  
  editCartItem: async (req, res) => {
    const cartDetail = await db.ShoppingCart.findByPk(req.params.id, {
      include: [
        "users",
        {
          association: "budget_response",
          attributes: ["precioFinal", "duracionTrabajo", "userId"],
          include: [
            "users",
            {
              association: "budget_request",
              attributes: ["tituloSolicitud", "ubicacion"],
              include: ["req_imgs"],
            },
          ],
        },
      ],
    });
    res.render("cartEdit", { cartDetail });
  },
  
  updateCartItem: async (req, res) => {
    const resultValidation = validationResult(req);
    const cartDetail = await db.ShoppingCart.findByPk(req.params.id, {
      include: [
        "users",
        {
          association: "budget_response",
          attributes: ["precioFinal", "duracionTrabajo", "userId"],
          include: [
            "users",
            {
              association: "budget_request",
              attributes: ["tituloSolicitud", "ubicacion"],
              include: ["req_imgs"],
            },
          ],
        },
      ],
    });
    if (resultValidation.errors.length > 0) {
      res.render("cartEdit", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        cartDetail: cartDetail,
      });
    }
    if (resultValidation.errors.length == 0) {
      await db.ShoppingCart.update(
        {
          resId: cartDetail.resId,
          userId: cartDetail.userId,
          dia: req.body.diaTurno,
          horario: req.body.horario,
          metodoPago: req.body.metodoPago,
        },
        {
          where: { id: req.params.id },
        }
      ).then(function () {
        res.redirect("/cart");
      });
    }
  },
  
  cancelCartItem: async (req, res) => {
    await db.ShoppingCart.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/cart");
  },
  
  cartMainProf: async (req, res) => {
    const cartProf = await db.budgRes.findAll({
      where: {
        userId: req.session.userLogged.id,
      },
      include: [
        "shopping_cart",
        "users",
        {
          association: "budget_request",
          include: ["users", "req_imgs"],
        },
      ],
    });
    res.render("cartMainProf", { cartProf });
  },
  
  cartProf: async (req, res) => {
    const estadoSeleccionado = req.query.estado;
    const cartId = req.query.id;

    if (estadoSeleccionado === "ACEPTADO") {
      await db.ShoppingCart.update({
        estado: "TRABAJO CONFIRMADO",
      },{
        where: { id: cartId }
      });
      res.redirect("/cart/prof");
    } else {
      await db.ShoppingCart.update({
        estado: "TRABAJO CANCELADO",
      },{
        where: { id: cartId }
      });
      res.redirect("/cart/prof");
    }
  },
}