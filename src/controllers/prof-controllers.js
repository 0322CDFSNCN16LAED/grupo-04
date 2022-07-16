const dbBudgets = require("../models/budget.js");
const dbUsers = require("../models/Users");

module.exports = {
  profDetail: (req, res) => {
    res.render("profDetail", {
      user: req.session.userLogged,
    });
  },

  editProfProfile: (req, res) => {
    const userToEdit = req.session.userLogged;

    res.render("editProf", { user: userToEdit });
  },
  updateProfProfile: (req,res) => {
    
  },

  inboxProf: (req, res) => {
    const budgets = dbBudgets.getAllBudgetReq();

    const profBudgets = budgets.filter(
      (budget) => budget.rubro === req.session.userLogged.rubro
    );

    res.render("inboxProf", { profBudgets });
  },
};