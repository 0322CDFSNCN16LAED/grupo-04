const dbBudgets = require("../models/budget.js");
const dbUsers = require("../models/Users");

module.exports = {
  profDetail: (req, res) => {
    res.render("profDetail",{
      user: req.session.userLogged,
    });
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
    
    res.render("inboxProf", { profBudgets });
  },

}