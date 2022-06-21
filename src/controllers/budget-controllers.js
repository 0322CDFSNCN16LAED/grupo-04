const path = require("path");
const db = require("../data/db.js");

module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },

  storeBudgRequest: (req,res) => {
    const requests= db.getAllBudgetReq();
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
    db.saveAllBudgetReq(requests);
    res.redirect("/");
  },

  response: (req, res) => {
    res.render("budgetResponse");
  },

  storeBudgResponse: (req,res) => {
    const responses= db.getAllBudgetRes();
    const newRes = req.body;

    if (responses.length) {
      newRes.id = responses[responses.length - 1].id + 1;
    } else {
      newRes.id = 1;
    }

    responses.push(newRes);
    db.saveAllBudgetRes(responses);

    const budgetToShow = responses.find((response) => response.id == req.params.id);
    res.render("budgetResponse", { budgetToShow: budgetToShow });

    res.redirect("/");
  },

  //storeBudgResponse: (req,res)=>{

  //}
};
