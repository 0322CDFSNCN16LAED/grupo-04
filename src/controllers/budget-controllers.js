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
};
