const path = require("path");
const dbBudget = require("../models/budget.js");

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
    const budgetToShow = requests.find((request) => request.reqId == req.params.reqId);
    res.render("budgetResponse", { budgetToShow: budgetToShow });
  
  },

  storeBudgResponse: (req,res) => {
    const responses= dbBudget.getAllBudgetRes();
    const newRes = req.body;
    newRes.profId= req.session.userLogged.profId

    dbBudget.createBudgRes(newRes);

    res.redirect("/");
  },

};
