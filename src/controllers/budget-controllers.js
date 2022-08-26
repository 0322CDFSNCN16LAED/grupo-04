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
      include: ["req_imgs"],
    });
    const imgs = budgetToShow.req_imgs.map((img) => {
      return img.img;
    });
    console.log(JSON.stringify(imgs, null, 4));
    //console.log(JSON.stringify(request,null,4))
    // const imgs = await sequelize.query(
    //   `SELECT reqId, img FROM req_imgs WHERE reqId in (${request.id})`,
    //   { type: QueryTypes.SELECT }
    // );

    const userToShow = await db.User.findOne({
      where: {
        id: budgetToShow.userId,
      },
    });
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
    console.log(JSON.stringify(profRes,null,4));

    const reqImgs = userReq.req_imgs.map((img) => img.img);
    

    res.render("budgetDetail", { userReq, reqImgs, profRes });
  },

  addToCart: async (req, res) => {
    const user = await db.User.findOne({
      where: {
        id: req.session.userLogged.id,
      },
    });
    const budgetToShow = await db.budgRes.findOne({
      where: {
        id: req.params.resId,
      },
      include: ["budget_request", "users"],
    });
    const reqImg = await db.ReqImgs.findOne({
      where: {
        reqId: budgetToShow.reqId,
      },
    });
    res.render("cartDetail", { user, budgetToShow, reqImg: reqImg.img });
  },

  storeCartItem: async (req, res) => {
    const resId = await db.budgRes.findByPk()

    const shop = await db.ShoppingCart.create({
      resId: req.params.resId,
      userId: req.session.userLogged.id,
      dia: req.body.diaTurno,
      horario: req.body.horario,
      metodoPago: req.body.metodoPago,
      estado: "",
    })
    console.log(JSON.stringify(shop, null, 4))
    res.redirect("/budget/cart");
  },

  cart: async (req, res) => {
    const userId = req.session.userLogged.id;

    const userReq = await db.budgReq.findOne({
      where: {
        userId: userId,
      },
      include: ["budget_response", "req_imgs"],
    });
    console.log(JSON.stringify(userReq, null, 4))

    const reqImgs = userReq.req_imgs.map((img) => img.img);
    console.log(JSON.stringify(reqImgs, null, 4))
    const profRes = userReq.budget_response.filter((response) => response.id == req.params.resId);
    console.log(JSON.stringify(profRes, null, 4))
    
    const items = await db.ShoppingCart.findAll({
      where: {
        userId: req.session.userLogged.id,
      }
    })
    console.log(JSON.stringify(items, null, 4))

    res.render("cartMain", { items });
  },
};
