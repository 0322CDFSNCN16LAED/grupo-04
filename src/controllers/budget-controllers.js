const path = require("path");
const db = require("../data/db.js");

module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },

  storeUserRequest: (req,res) => {
    const requests= db.getAllBudgetReq();
    const newReq = req.body;
    console.log(newReq);

    if (requests.length) {
      newReq.id = requests[requests.length - 1].id + 1;
    } else {
      newReq.id = 1;
    }

    //newReq.image = "profile-user-pic.svg";
    requests.push(newReq);
    db.saveAllUsers(requests);
    res.redirect("/");
  },

  response: (req, res) => {
    res.render("budgetResponse");
  },
};
