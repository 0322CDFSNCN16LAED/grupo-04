const dbBudget = require("../models/budget");
const dbProfs = require("../models/prof");
const dbUsers = require("../models/Users");
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
    const request = await db.budgReq.findOne({
      where: {
        id: req.params.reqId,
      },
    });
    const requestValues = request.dataValues;

    const imgs = await sequelize.query(
      `SELECT reqId, img FROM req_imgs WHERE reqId in (${request.id})`,
      { type: QueryTypes.SELECT }
    );

    const budgetToShow = {
      ...requestValues,
      img: imgs,
    };
    const userToShow = await db.User.findOne({
      where: {
        id: budgetToShow.userId,
      },
    });
    res.render("budgetResponse", {
      budgetToShow: budgetToShow,
      userToShow: userToShow,
    });
  },

  storeBudgResponse: async (req, res) => {
    const newRes = req.body;
    newRes.reqId = req.params.reqId;
    newRes.userId = req.session.userLogged.id;
    await db.budgRes.create(newRes);

    res.redirect("/");
  },

  detail: async (req, res) => {
    const resId = req.params.resId;
    
    const resp = await db.budgRes.findByPk(resId);
    console.log("hola piero " + resp)
    const reqId = resp.reqId;
    
    const imgs = await sequelize.query(
      `select img from req_imgs ri where reqId = (${reqId})`,
      { type: QueryTypes.SELECT }
    );    
    const budgetToShow = await sequelize.query(
      `select * from budget_request breq join budget_response bres on bres.id = (${resId} and bres.reqId = breq.id)`,
      { type: QueryTypes.SELECT }
    );
    res.render("budgetDetail", { budgetToShow, imgs });
  },

  cartDetail: async (req, res) => {
    const resId = req.params.resId;    
    const budgetToShow = await sequelize.query(
      `select * from budget_request breq join budget_response bres on bres.id = (${resId} and bres.reqId = breq.id)`,
      { type: QueryTypes.SELECT }
    );
    const user = await db.User.findByPk(req.session.userLogged.id)
    const userToShow = user.dataValues
    const profId = budgetToShow[0].userId;
    const prof = await db.User.findByPk(profId);
    const profToShow = prof.dataValues;    
    
    res.render("cartDetail", { budgetToShow, userToShow, profToShow });
  },

  storeCartItem: (req, res) => {
    const budgetReq = dbBudget.getAllBudgetReq();
    const budgetRes = dbBudget.getAllBudgetRes();
    const allProfs = dbProfs.getAllProf();
    const allUsers = dbUsers.getAllUsers();

    const getBudgetRes = budgetRes.filter(
      (budget) => budget.resId == req.params.resId
    );
    const getUserReq = budgetReq.filter(
      (budget) =>
        budget.userId === req.session.userLogged.userId &&
        budget.reqId == getBudgetRes[0].reqId
    );
    const userName = allUsers.filter(
      (user) => user.userId == getUserReq[0].userId
    );
    const getProfRes = budgetRes.filter(
      (budget) =>
        budget.userId === req.session.userLogged.userId &&
        budget.resId == req.params.resId
    );
    const profName = allProfs.filter(
      (prof) => prof.profId == getProfRes[0].profId
    );

    const newItem = {
      profId: profName[0].profId,
      userId: userName[0].userId,
      reqId: getUserReq[0].reqId,
      resId: getBudgetRes[0].resId,
      ...req.body,
    };
    dbBudget.createPurchase(newItem);
    res.redirect("/budget/cart");
  },

  cart: (req, res) => {
    const budgetReq = dbBudget.getAllBudgetReq();
    const budgetRes = dbBudget.getAllBudgetRes();
    const allProfs = dbProfs.getAllProf();
    const allUsers = dbUsers.getAllUsers();
    const allItems = dbBudget.getAllCartItems();

    const userItems = allItems.filter(
      (item) => req.session.userLogged.userId == item.userId
    );
    const getUserReq = budgetReq.filter(
      (budget) => budget.reqId == userItems.reqId
    );
    const userName = allUsers.filter((user) => user.userId == userItems.userId);
    const getProfRes = budgetRes.filter(
      (budget) => budget.resId == userItems.resId
    );
    const profName = allProfs.filter((prof) => prof.profId == userItems.profId);

    res.render("cartMain", {
      userItems,
      getUserReq,
      getProfRes,
      profName,
      userName,
    });
  },
};
