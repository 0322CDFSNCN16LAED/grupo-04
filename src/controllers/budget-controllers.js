const { validationResult } = require("express-validator");
const db = require("../database/models");

module.exports = {
  request: async (req, res) => {
    const rubros = await db.Rubro.findAll();
    res.render("budgetRequest", { rubros });
  },

  storeBudgRequest: async (req, res) => {
    if (!req.session.userLogged) {
      res.redirect("/login");
    }
    const resultValidation = validationResult(req);
    const rubros = await db.Rubro.findAll();
    if (resultValidation.errors.length > 0) {
      res.render("BudgetRequest", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        rubros: rubros,
      });
    }

    const imgRefArray = req.files;

    if (resultValidation.errors.length == 0 && req.session.userLogged) {
      const budgetReqCreated = await db.budgReq.create({
        ...req.body,
        estado: "PRESUPUESTO ENVIADO",
        userId: req.session.userLogged.id,
      });

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
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.render("BudgetResponse", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        budgetToShow: budgetToShow,
        userToShow: userToShow,
        img: imgs,
      });
    }

    if (resultValidation.errors.length == 0) {
      await db.budgRes.create({
        ...req.body,
        reqId: req.params.reqId,
        userId: req.session.userLogged.id,
        estado: "PRESUPUESTO RESPONDIDO",
      });

      res.redirect("/");
    }
  },

  viewDetail: async (req, res) => {
    const budgetDetail = await db.budgRes.findOne({
      where: {
        id: req.params.resId,
      },
      include: [
        "budget_request",
        "users",
        "shopping_cart",
        { association: "budget_request", include: ["req_imgs"] },
      ],
    });
    res.render("budgetDetail", { budgetDetail });
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
    const today = new Date();

    //console.log(JSON.stringify(cartDetail,null,4));

    res.render("cartDetail", { cartDetail, today });
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

  cartMain: async (req, res) => {
    const items = await db.ShoppingCart.findAll({
      where: {
        userId: req.session.userLogged.id,
      },
      include: [
        "users",
        "budget_response",
        {
          association: "budget_response",
          attributes: ["precioFinal", "userId"],
          include: [
            "users",
            "budget_request",
            { association: "budget_request", include: ["req_imgs"] },
          ],
        },
      ],
    });
    res.render("cartMain", { items });
  },

  editCartItem: async (req, res) => {
    const cartDetail = await db.ShoppingCart.findByPk(req.params.id, {
      include: [
        "budget_response",
        "users",
        {
          association: "budget_response",
          attributes: ["precioFinal", "duracionTrabajo", "userId"],
          include: [
            "users",
            "budget_request",
            {
              association: "budget_request",
              attributes: ["tituloSolicitud", "ubicacion"],
              include: ["req_imgs"],
            },
          ],
        },
      ],
    });
    const today = new Date();
    res.render("cartEdit", { cartDetail, today });
  },

  updateCartItem: async (req, res) => {
    const resultValidation = validationResult(req);
    const today = new Date();
    const cartDetail = await db.ShoppingCart.findByPk(req.params.id, {
      include: [
        "budget_response",
        "users",
        {
          association: "budget_response",
          attributes: ["precioFinal", "duracionTrabajo", "userId"],
          include: [
            "users",
            "budget_request",
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
        today: today,
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
        res.redirect("/budget/cart");
      });
    }
  },

  destroyCartItem: async (req, res) => {
    await db.ShoppingCart.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/budget/cart");
  },

  cartMainProf: async (req, res) => {
    const cartProf = await db.budgRes.findAll({
      where: {
        userId: req.session.userLogged.id,
      },
      include: [
        "shopping_cart",
        "budget_request",
        "users",
        {
          association: "shopping_cart",
          where: {
            estado: "TRABAJO AGENDADO",
          },
        },
        {
          association: "budget_request",
          include: ["users", "req_imgs"],
        },
      ],
    });
    res.render("cartMainProf", { cartProf });
  },

  cartProf: async (req, res) => {
    await db.ShoppingCart.upsert({
      estado: "TRABAJO CONFIRMADO",
    });
    //WIP
    res.redirect("/budget/cart/prof");
  },
};
