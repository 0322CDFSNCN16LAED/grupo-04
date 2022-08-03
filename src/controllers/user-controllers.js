const dbBudgets = require("../models/budget.js");

const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  createUser: (req, res) => {
    res.render("registerUser");
  },

  storeUser: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("registerUser", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    const userInDb = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userInDb) {
      return res.render("registerUser", {
        errors: {
          email: {
            msg: "Este email ya esta registrado",
          },
        },
        oldData: req.body,
      });
    } else if (resultValidation.errors.length == 0) {
      await db.User.create({
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename,
      }).then(function () {
        res.redirect("/login");
      });
    }
  },
  userDetail: (req, res) => {
    res.render("userDetail", {
      user: req.session.userLogged,
    });
  },
  editUserProfile: (req, res) => {
    const userToEdit = req.session.userLogged;

    res.render("editUser", { user: userToEdit });
  },
  updateUserProfile: (req, res) => {
    
  },
  inboxUser: (req, res) => {
    const budgetsReq = dbBudgets.getAllBudgetReq();
    const userReq = budgetsReq.filter(
      (budget) => budget.userId === req.session.userLogged.userId
    );
    const budgets = dbBudgets.getAllBudgetRes();
    const profRes = budgets.filter(
      (budget) => budget.userId === req.session.userLogged.userId
    );

    res.render("inboxUser", { profRes, userReq });
  },
};