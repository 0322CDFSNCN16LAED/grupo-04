const dbBudgets = require("../models/budget.js");

const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { sequelize } = require("../database/models");
const { QueryTypes } = require("sequelize");
const prof = require("../models/prof.js");

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
  userDetail: (req, res) => {
    res.render("userDetail", {
      user: req.session.userLogged,
    });
  },
  editUserProfile: (req, res) => {
    const userToEdit = req.session.userLogged;

    res.render("editUser", { user: userToEdit });
  },
  updateUserProfile: (req, res) => {},
  inboxUser: async (req, res) => {
    const user = req.session.userLogged.id;
    const userRequest = await sequelize.query(
      `select * from budget_request where userId = ${user}`,
      { type: QueryTypes.SELECT }
    );
    const profRes = await sequelize.query(
      `select * from budget_response bres join budget_request breq on bres.reqId = breq.id and breq.userId = ${user} join users u on bres.userId = u.id `,
      { type: QueryTypes.SELECT }
    );
    const imgs = await sequelize.query(
      `select img,reqId from req_imgs ri join budget_request br on br.id = ri.reqId and br.userId = ${user}`,
      { type: QueryTypes.SELECT }
    );
    userRequest.forEach(function (req) {
      req.responses = [];
      req.img = imgs
        .filter(function (img) {
          if (img.reqId === req.id) {
            return img.img;
          }
        })
        .map(function (req) {
          return req.img;
        });
    });
    profRes.forEach(function (res) {
      const req = userRequest.filter((req) => req.id === res.reqId);
      if (req && req.length > 0) {
        const index = userRequest.indexOf(req[0]);
        if (index !== -1) userRequest[index].responses.push(res);
      }
    });
    res.render("inboxUser", { userRequest });
  },
};
