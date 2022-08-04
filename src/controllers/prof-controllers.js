const dbBudgets = require("../models/budget.js");
const dbProf = require("../models/prof")
const { QueryTypes } = require('sequelize');
const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { sequelize } = require("../database/models");

module.exports = {
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

    const profInDb = await db.User.findOne({
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

    newProf.avatar = profileImg
      ? profileImg[0].filename
      : "profile-user-pic.svg";

    const jobsImgs = jobsImgArray
      ? jobsImgArray.map(function (img) {
          return img.filename;
        })
      : [];

    newProf.password = bcryptjs.hashSync(password, 10);

    if (resultValidation.errors.length == 0) {
      const rubros = req.body.rubro;
      let userCreated = undefined;
      try {
        userCreated = await db.User.create({ ...newProf, isProf: true });
      } catch (error) {
        console.log("Error al crear usuario: ", error);
        return;
      }
      try {
        await userCreated.setRubros(rubros);
      } catch (error) {
        userCreated.destroy();
        return;
      }
      try {
        if (jobsImgs) {
          await db.JobImg.bulkCreate(
            jobsImgs.map(function (img) {
              return {
                img: img,
                userId: userCreated.id,
              };
            })
          );
        }
      } catch (error) {
        userCreated.destroy();
        return;
      }
      res.redirect("/login");
    }
  },
  profDetail: async (req, res) => {   
    
    res.render("profDetail", {
      user: req.session.userLogged,
    });
  },

  editProfProfile: (req, res) => {
    const userToEdit = req.session.userLogged;

    res.render("editProf", { user: userToEdit });
  },
  updateProfProfile: (req, res) => {
    const oldData = req.session.userLogged;
    const profToCreate = {
      ...req.body,
      password: req.body.password
        ? bcryptjs.hashSync(req.body.password, 10)
        : oldData.password,
      avatar: req.body.avatar ? req.file.filename : oldData.avatar,
    };
    if (resultValidation.errors.length == 0) {
      dbProf.createProf(profToCreate);

      res.redirect("/prof/detail");
    }
  },

  inboxProf: async (req, res) => {
    const userId = req.session.userLogged.id;
    const rubros = await sequelize.query(
      `SELECT rubroNombre FROM rubrousers WHERE userId=${userId}`,
      { type: QueryTypes.SELECT }
    );   
   const userRubros = rubros.map(function(rubro){
    return rubro.rubroNombre;
   })

   const profBudgets = await sequelize.query(
      `SELECT * FROM budget_request WHERE rubroNombre in ('${userRubros.join("','")}')`,
      { type: QueryTypes.SELECT }
    );   
    
    res.render("inboxProf",{ profBudgets });
  },
};