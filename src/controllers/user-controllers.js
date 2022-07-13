const dbBudgets = require("../models/budget.js");
const dbUsers = require("../models/Users.js");
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
   const userToEdit = req.session.userLogged;
   
   res.render("editUser",{user:userToEdit})
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