const path = require("path");
const dbBudget = require("../models/budget.js");

module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },

  storeBudgRequest: (req,res) => {
    const requests= dbBudget.getAllBudgetReq();
    const newReq = req.body;

    if (requests.length) {
      newReq.id = requests[requests.length - 1].id + 1;
    } else {
      newReq.id = 1;
    }

    const imgRefArray= req.files;
    if(imgRefArray){
      newReq.imgReferencia = imgRefArray.map(function(img){
        return img.filename;
      });
    } else {
      newReq.imgReferencia = [];
    }

    requests.push(newReq);
    dbBudget.saveAllBudgetReq(requests);
    res.redirect("/");
  },

  response: (req, res) => {
    const responses = dbBudget.getAllBudgetReq(); 
    const budgetToShow = responses.find((response) => response.id == req.params.id);
    console.log(budgetToShow)
    res.render("budgetResponse", { budgetToShow: budgetToShow });
  
  },

  storeBudgResponse: (req,res) => {
    const responses= dbBudget.getAllBudgetRes();
    const newRes = req.body;

    if (responses.length) {
      newRes.id = responses[responses.length - 1].id + 1;
    } else {
      newRes.id = 1;
    }

    responses.push(newRes);
    dbBudget.saveAllBudgetRes(responses);

    res.redirect("/");
  },

  //storeBudgResponse: (req,res)=>{

  //}
};
