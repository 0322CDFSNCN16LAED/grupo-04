const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  home: (req, res) => {
    res.render("index");
  },

  login: (req, res) => {
    res.render("login");
  },

  loginProcess: async (req, res) => {
    const resultValidation = validationResult(req);
    const userToLogin = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (resultValidation.errors.length > 0) {
      return res.render("login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    if (userToLogin) {
      const isProf = userToLogin.isProf == 1;

      const profToLogin = isProf == true ? userToLogin : "";

      const user = profToLogin ? profToLogin : userToLogin;

      req.session.userLogged = user;

      return profToLogin
        ? res.redirect("/prof/inbox")
        : res.redirect("/user/inbox");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
  },

  register: (req, res) => {
    res.render("register");
  },
  newPassword: (req, res) => {
    res.render("changePassword");
  },
  addNewPassword: async (req, res) => {
    const user = req.session.userLogged;
    const oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    const repeatNewPass = req.body.repeatNewPassword;

    const compareOldP = oldPassword
      ? bcryptjs.compareSync(oldPassword, user.password)
      : "";
    const compareNewPass = newPassword ? newPassword === repeatNewPass : "";
    compareOldP === true && compareNewPass === true
      ? (user.password = bcryptjs.hashSync(newPassword, 10))
      : "";
    await db.User.update(user, {
      where: {
        id: user.id,
      },
    });
    req.session.destroy();
    return res.redirect("/login");
  },
  funcionamiento: (req, res) => {
    res.render("funcionamiento");
  },
};
