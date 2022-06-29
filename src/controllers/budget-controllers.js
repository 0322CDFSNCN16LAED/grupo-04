const path = require("path");
const dbBudget = require("../models/budget.js");
const dbUsers = require("../models/Users")
module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },

  storeBudgRequest: (req,res) => {
    const requests= dbBudget.getAllBudgetReq();
    const newReq = req.body;
    newReq.userId = req.session.userLogged.userId
    
    const imgRefArray= req.files;
    if(imgRefArray){
      newReq.imgReferencia = imgRefArray.map(function(img){
        return img.filename;
      });
    } else {
      newReq.imgReferencia = [];
    }
    
    dbBudget.createBudgReq(newReq);
    res.redirect("/");
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
    dbBudget.createBudgRes(newRes);

    res.redirect("/");
  },

  detail: (req,res) => {
    const budgetsReq = dbBudget.getAllBudgetReq();
    const userReq = budgetsReq.filter(
      (budget) => budget.userId === req.session.userLogged.userId
    );
    const budgets = dbBudget.getAllBudgetRes();
    const profRes = budgets.filter(
      budget => budget.userId === req.session.userLogged.userId
    );
    res.render("budgetDetail", { userReq, profRes } );
  }

};
