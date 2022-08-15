const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { sequelize } = require("../database/models");
const { QueryTypes } = require("sequelize");

module.exports = {
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
    const userInDb = await db.User.findOne({
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
      await db.User.create({
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename,
      }).then(function () {
        res.redirect("/login");
      });
    }
  },
  userDetail: async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    res.render("userDetail", {
      user: user,
    });
  },
  editUserProfile: (req, res) => {
    const userToEdit = req.session.userLogged;

    res.render("editUser", { user: userToEdit });
  },
  updateUserProfile: async (req, res) => {
    let userId = req.session.userLogged.id;     
    let newData = {
      ...req.body,
      avatar: req.file.filename      
    };    
    await db.User.update(newData,{
      where: {
        id: userId,
      },
    });
    req.session.userLogged = await db.User.findByPk(userId);
    res.render("userDetail",{user:req.session.userLogged});
  },
  inboxUser: async (req, res) => {
    const userId = req.session.userLogged.id;
    const budgets = await db.budgReq.findAll({
      where: {
        userId: userId,
      },
      include: [
        "req_imgs",
        "budget_response",
        { association: "budget_response", include: ["users"] },
      ],
    });
    res.render("inboxUser", { budgets });
  },
};
