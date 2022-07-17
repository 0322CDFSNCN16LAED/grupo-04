const dbBudgets = require("../models/budget.js");
const dbUsers = require("../models/Users");
const dbProf = require("../models/prof")
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

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
    const oldData = req.session.userLogged
    const profToCreate = {
      ...req.body,
      password: req.body.password ?  bcryptjs.hashSync(req.body.password,10) : oldData.password,
      avatar: req.body.avatar ? req.file.filename : oldData.avatar
    }
    if(resultValidation.errors.length == 0){

      dbProf.createProf(profToCreate);     
      
      res.redirect("/prof/detail");
    }
  },  
   
  

  inboxProf: (req, res) => {
    const budgets = dbBudgets.getAllBudgetReq();

    const profBudgets = budgets.filter(
      (budget) => budget.rubro === req.session.userLogged.rubro
    );

    res.render("inboxProf", { profBudgets });
  },
};