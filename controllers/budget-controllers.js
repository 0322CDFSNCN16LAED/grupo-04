const path = require("path");

module.exports = {
  request: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/budgetRequest.html"));
  },
  response: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/budgetResponse.html"));
  },
};
