const dbUsers = require("../models/Users.js");
const dbProf = require("../models/prof.js");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

module.exports = {
  home: (req, res) => {
    res.render("index");
  },

  login: (req, res) => {
    res.render("login");
  },

  loginProcess: (req, res) => {
    const userToLogin = dbUsers.getOneUserByField("email", req.body.email);
    const profToLogin = dbProf.getOneProfByField("email", req.body.email);

    if (!userToLogin && !profToLogin)
      return res.render("login", {
        errors: {
          email: {
            msg: "El usuario no existe",
          },
        },
      });

    const user = userToLogin ? userToLogin : profToLogin;
    req.session.userLogged = user;

    let passwordOk = bcryptjs.compareSync(req.body.password, user.password);
    if (!passwordOk)
      return res.render("login", {
        errors: {
          password: {
            msg: "La contraseña es incorrecta",
          },
        },
      });

    return userToLogin
      ? res.redirect("/user/detail")
      : res.redirect("/prof/detail");
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

  createUser: (req, res) => {
    res.render("registerUser");
  },

  storeUser: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("registerUser", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    const userInDb = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userInDb) {
      return res.render("registerUser", {
        errors: {
          email: {
            msg: "Este email ya esta registrado",
          },
        },
        oldData: req.body,
      });
    } else if (resultValidation.errors.length == 0) {
      await db.Users.create({
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename,
      }).then(function () {
        res.redirect("/login");
      });
    }
  },

  createProf: (req, res) => {
    res.render("registerProfesional");
  },

  storeProf: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("registerprofesional", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const profInDb = await db.Prof.findOne({
      where: {
        email: req.body.email,
      },
    });
    const newProf = req.body;
    const jobsImgArray = req.files["finished-jobs"];
    const profileImg = req.files["avatar"];
    const password = req.body.password;

    if (profInDb) {
      return res.render("registerprofesional", {
        errors: {
          email: {
            msg: "Este email ya esta registrado",
          },
        },
        oldData: req.body,
      });
    }

    newProf.avatar = profileImg ? profileImg[0].filename : "profile-user-pic.svg";
    newProf.jobsImgs = "";
    jobsImgArray.forEach((img, index) => newProf.jobsImgs += index === 0 ? `${img.filename}` : `,${img.filename}`)
  //   newProf.jobsImgs = jobsImgArray ? jobsImgArray.map(function (img) {
  //     return img.filename;
  //  }) : [];

    newProf.password = bcryptjs.hashSync(password, 10);

    if (resultValidation.errors.length == 0) {
      await db.Prof.create(newProf);

      res.redirect("/login");
    }
  },
};
