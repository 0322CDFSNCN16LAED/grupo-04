const dbBudget = require("../models/budget.js");
const dbUsers = require("../models/Users")
const { validationResult } = require("express-validator")

module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },

  storeBudgRequest: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.render("BudgetRequest", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } 
    console.log(resultValidation)
    const newReq = req.body;
    req.session.userLogged ? newReq.userId = req.session.userLogged.userId : res.redirect("/login");

    const imgRefArray = req.files;
    if (imgRefArray) {
      newReq.imgReferencia = imgRefArray.map(function (img) {
        return img.filename;
      });
    } else {
      newReq.imgReferencia = [];
    }
    if (resultValidation.errors.length == 0) {
      dbBudget.createBudgReq(newReq);
      res.redirect("/");      
    }

  },

  response: (req, res) => {
    const requests = dbBudget.getAllBudgetReq(); 
    const users= dbUsers.getAllUsers();

    const budgetToShow = requests.find((request) => request.reqId == req.params.reqId);    
    const userToShow = users.find((user) => user.userId == budgetToShow.userId)
   
    res.render("budgetResponse", { budgetToShow: budgetToShow, userToShow:userToShow });
  },
  
  storeBudgResponse: (req,res) => {
    const requests = dbBudget.getAllBudgetReq();    
    const responses= dbBudget.getAllBudgetRes();
  
    const users = dbUsers.getAllUsers();

    const budgetToShow = requests.find(
      (request) => request.reqId == req.params.reqId
    );
    
    const userToShow = users.find((user) => user.userId == budgetToShow.userId); 
    const newRes = req.body;
    newRes.profId= req.session.userLogged.profId;   
    newRes.userId= budgetToShow.userId;
    newRes.reqId =  budgetToShow.reqId
    dbBudget.createBudgRes(newRes);

    res.redirect("/");
  },

  detail: (req,res) => {
    const budgetReq = dbBudget.getAllBudgetReq();
    const budgetRes = dbBudget.getAllBudgetRes();    
    const test = budgetRes.filter( budget => budget.resId == req.params.resId);

    const userReq = budgetReq.filter(
      (budget) => (budget.userId === req.session.userLogged.userId) && (budget.reqId == test[0].reqId)  
    );
    const profRes = budgetRes.filter(
      budget => (budget.userId === req.session.userLogged.userId) && (budget.resId == req.params.resId) 
    );
    res.render("budgetDetail", { userReq, profRes } );
  },
  
  cart: (req, res) => {
    res.render("productCart");
  }

};
