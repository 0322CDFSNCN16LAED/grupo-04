const { validationResult } = require("express-validator");
const db = require("../database/models");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../database/models");

module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },

  storeBudgRequest: async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.render("BudgetRequest", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const newReq = req.body;
    newReq.estado = "PRESUPUESTO ENVIADO"
    req.session.userLogged
      ? (newReq.userId = req.session.userLogged.id)
      : res.redirect("/login");

    const imgRefArray = req.files;

    if (resultValidation.errors.length == 0) {
      const budgetReqCreated = await db.budgReq.create(newReq);

      if (imgRefArray) {
        const refImgs = imgRefArray.map(function (img) {
          return img.filename;
        });

        await db.ReqImgs.bulkCreate(
          refImgs.map(function (img) {
            return {
              img: img,
              reqId: budgetReqCreated.id,
            };
          })
        );
        res.redirect("/");
      }
    }
  },

  response: async (req, res) => {
    const budgetToShow = await db.budgReq.findOne({
      where: {
        id: req.params.reqId,
      },
      include: ["req_imgs", "users"],
    });
    const imgs = budgetToShow.req_imgs.map((img) => {
      return img.img;
    });
    const userToShow = budgetToShow.users;

    res.render("budgetResponse", {
      budgetToShow: budgetToShow,
      userToShow: userToShow,
      img: imgs,
    });
  },

  storeBudgResponse: async (req, res) => {
    const newRes = req.body;
    newRes.reqId = req.params.reqId;
    newRes.userId = req.session.userLogged.id;
    newRes.estado = "PRESUPUESTO RESPONDIDO"
    await db.budgRes.create(newRes);

    res.redirect("/");
  },

  viewDetail: async (req, res) => {
    const userId = req.session.userLogged.id;

    const userReq = await db.budgReq.findOne({
      where: {
        userId: userId,
      },
      include: ["req_imgs"],
    });
    const profRes = await db.budgRes.findAll({
      where: {
        id: req.params.resId,
      },
    });
    // console.log(JSON.stringify(profRes, null, 4));

    const reqImgs = userReq.req_imgs.map((img) => img.img);

    res.render("budgetDetail", { userReq, reqImgs, profRes });
  },

  addToCart: async (req, res) => {
    const cartDetail = await db.budgRes.findOne({
      where: {
        id: req.params.resId,
      },
      include: [
        "budget_request",
        "users",
        { association: "budget_request", include: ["req_imgs"] },
      ],
    });
    //console.log(JSON.stringify(cartDetail,null,4));

    res.render("cartDetail", { cartDetail });
  },

  storeCartItem: async (req, res) => {
    await db.ShoppingCart.create({
      resId: req.params.resId,
      userId: req.session.userLogged.id,
      dia: req.body.diaTurno,
      horario: req.body.horario,
      metodoPago: req.body.metodoPago,
      estado: "TRABAJO AGENDADO",
    });
    res.redirect("/budget/cart");
  },

  cart: async (req, res) => {
    const items = await db.ShoppingCart.findAll({
      where: {
        userId: req.session.userLogged.id,
      },
      include: [
        "budget_response",
        {
          association: "budget_response",
          attributes: ["precioFinal", "userId"],
          include: [ "users",
            "budget_request",
            { association: "budget_request", attributes: ["tituloSolicitud"], include: ["req_imgs"] },
          ],
        },
      ],
    });
    console.log(JSON.stringify(items,null,4));
    res.render("cartMain", { items });
  },

  editCartItem: async (req, res) => {
    const cartDetail = await db.ShoppingCart.findByPk(req.params.id, {
      include: [
        "budget_response", "users",
        {
          association: "budget_response",
          attributes: ["precioFinal", "duracionTrabajo", "userId"],
          include: [ "users",
            "budget_request",
            { association: "budget_request", attributes: ["tituloSolicitud", "ubicacion"], include: ["req_imgs"] },
          ],
        },
      ],
    });
    //console.log(JSON.stringify(cartDetail,null,4));

    res.render("cartEdit", {cartDetail})
  },

  updateCartItem: async (req, res) => {
    await db.ShoppingCart.update({
      ...req.body,
    },{
      where: { id: req.params.id }
    });
    res.redirect("/budget/cart");
  },

  destroyCartItem: async (req, res) => {
    await db.ShoppingCart.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect("/budget/cart")
  },
};
