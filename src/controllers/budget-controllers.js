const path = require("path");

module.exports = {
  request: (req, res) => {
    res.render("budgetRequest");
  },
  response: (req, res) => {
    res.render("budgetResponse");
  },
};
