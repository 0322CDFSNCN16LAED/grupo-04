const dbBudgets = require("../models/budget.js");

module.exports = {
  userDetail: (req, res) => {
    res.render("userDetail",{
      user: req.session.userLogged,
    });
  },

  profDetail: (req, res) => {
    res.render("profDetail",{
      user: req.session.userLogged,
    });
  },

  profileUser: (req, res) => {
    res.render("profileUser");
  },

  editUserProfile: (req,res) => {
    //código
  },

  profileProf: (req, res) => {
    res.render("profileProfessional");
  },

  editProfProfile: (req,res) => {
    //código
  },

  inboxProf: (req, res) => {
    const budgets = dbBudgets.getAllBudgetReq();
    const profBudgets = budgets.filter(
      budget => budget.rubro === req.session.userLogged.rubro
    );
    res.render("inboxProf", { profBudgets});
  },

  inboxUser: (req, res) => {
    const budgetsReq = dbBudgets.getAllBudgetReq();
    const userReq = budgetsReq.filter(
      (budget) => budget.userId === req.session.userLogged.userId
    );
    const budgets = dbBudgets.getAllBudgetRes();
    const profRes = budgets.filter(
      budget => budget.userId === req.session.userLogged.userId
    ); 

    res.render("inboxUser", { profRes,userReq });
  },

}