const dbBudgets = require("../models/budget.js");

module.exports = {
  userDetail: (req, res) => {    
    res.render("userDetail",{
      user: req.session.userLogged,
    });
  },

  profileUser: (req, res) => {
    res.render("profileUser");
  },

  editUserProfile: (req,res) => {
    //código
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