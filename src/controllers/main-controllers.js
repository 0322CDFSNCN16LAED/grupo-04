const path = require("path");
const dbUsers = require("../models/Users.js");
const dbProf = require("../models/prof.js");
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
  inbox: (req, res) => {
    const budgets = db.getAllBudgetReq();
    const profBudgets = budgets.filter(
      budget => budget.rubro === req.session.userLogged.rubro
    );

    const renderBudget = (budgetToShow) => {
      res.render("budgetResponse", { budgetToShow });
    }

    res.render("inbox", { profBudgets, renderBudget });
  },
  history: (req, res) => {
    res.render("history");
  },
  logout: (req,res) => {
    req.session.destroy();
    return res.redirect("/login")
  }

};
