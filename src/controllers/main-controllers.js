const path = require("path");
const dbUsers = require("../models/Users.js");
const dbProf = require("../models/prof.js");
const dbBudgets = require("../models/budget.js");
const bcryptjs = require("bcryptjs");

module.exports = {
  home: (req, res) => {
   res.render("index");
  },
  login: (req, res) => {
    res.render("login");
  },
  loginProcess:(req,res) => {
    const userToLogin = dbUsers.getOneUserByField("email", req.body.email);
    const profToLogin = dbProf.getOneProfByField("email", req.body.email);
    
    if (!userToLogin && !profToLogin) return res.render("login", {
      errors: {
        email: {
          msg: "El usuario no existe",
        },
      },
    });
    
    const user = userToLogin ? userToLogin : profToLogin;
    req.session.userLogged = user;

    let passwordOk = bcryptjs .compareSync(req.body.password, user.password);
    if (!passwordOk) return res.render("login", {
      errors: {
        password: {
          msg: "La contraseña es incorrecta",
        },
      },
    });

    return userToLogin
      ? res.redirect("/user/detail")
      : res.redirect("/user/prof/detail");
  },   
  inboxProf: (req, res) => {
    const budgets = dbBudgets.getAllBudgetReq();
    const profBudgets = budgets.filter(
      budget => budget.rubro === req.session.userLogged.rubro
    );

    const renderBudget = (budgetToShow) => {
      res.render("budgetResponse", { budgetToShow });
    }

    res.render("inboxProf", { profBudgets, renderBudget });
  },
  inboxUsers: (req, res) => {
    const budgets = dbBudgets.getAllBudgetRes();
    const profBudgets = budgets.filter(
      budget => budget.userId === req.session.userLogged.userId
    );

    const renderBudget = (budgetToShow) => {
      res.render("budgetResponse", { budgetToShow });
    }

    res.render("inboxUsers", { profBudgets, renderBudget });
  },
  history: (req, res) => {
    res.render("history");
  },
  logout: (req,res) => {
    req.session.destroy();
    return res.redirect("/login")
  }

};
