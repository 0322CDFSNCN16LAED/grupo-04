const path = require("path");

module.exports = {
  register: (req, res) => {
    res.render("register");
  },
  registerUser: (req, res) => {
    res.render("registerUser");
  },
  registerProfesional: (req, res) => {
    res.render("registerProfesional");
  },
};
