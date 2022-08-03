const bcryptjs = require("bcryptjs");
const db = require("../database/models");


module.exports = {
  home: (req, res) => {
    res.render("index");
  },

  login: (req, res) => {
    res.render("login");
  },

  loginProcess: async (req, res) => {
    const userToLogin = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const profToLogin = await db.User.findOne({
      where: {
        email: req.body.email,
        isProf: true,
      },
    });

    if (!userToLogin)
      return res.render("login", {
        errors: {
          email: {
            msg: "El usuario no existe",
          },
        },
      });
    const user = profToLogin ? profToLogin : userToLogin;

    let passwordOk = bcryptjs.compareSync(req.body.password, user.password);

    if (!passwordOk)
      return res.render("login", {
        errors: {
          password: {
            msg: "La contraseña es incorrecta",
          },
        },
      });
    req.session.userLogged = user;

    return profToLogin
      ? res.redirect("/prof/detail")
      : res.redirect("/user/detail");
  },

  history: (req, res) => {
    res.render("history");
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
  },

  register: (req, res) => {
    res.render("register");
  }, 
  
};
