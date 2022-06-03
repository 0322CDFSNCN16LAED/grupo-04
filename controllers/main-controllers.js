const path = require("path");

module.exports = {
  home: (req, res) => {
    res.render("index");
  },
  login: (req, res) => {
    res.render("login");
  },
  inbox: (req, res) => {
    res.render("inbox");
  },
  history: (req, res) => {
    res.render("history");
  },
};