const path = require("path");
const db = require("../models/Users.js");

module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },

  storeBudgRequest: (req,res) => {
    const newReq = req.body;
    const requests= db.getAllBudgetReq();

    if (requests.length) {
      newReq.id = requests[requests.length - 1].id + 1;
    } else {
      newReq.id = 1;
    }

    //newReq.image = "profile-user-pic.svg";
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

    //newRes.image = "profile-user-pic.svg";
    responses.push(newRes);
    db.saveAllBudgetRes(responses);
    res.redirect("/");

    const budgetToShow = responses.find((response) => response.id == req.params.id);
    res.render("budgetResponse", { budgetToShow: budgetToShow });

  },
};
