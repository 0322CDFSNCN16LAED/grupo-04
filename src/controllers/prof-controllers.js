const dbBudgets = require("../models/budget.js");
const dbProf = require("../models/prof");
const { QueryTypes } = require("sequelize");
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
    const userId = req.session.userLogged.id;
    const rubros = await sequelize.query(
      `SELECT rubroNombre FROM rubrousers WHERE userId=${userId}`,
      { type: QueryTypes.SELECT }
    );
    const userRubros = rubros.map(function (rubro) {
      return rubro.rubroNombre;
    });
    console.log(userRubros);
    res.render("profDetail", {
      user: req.session.userLogged,
      rubros: userRubros.join(", "),
    });
  },

  editProfProfile: async (req, res) => {
    const userToEdit = req.session.userLogged;
    const rubros = await sequelize.query(
      `SELECT rubroNombre FROM rubrousers WHERE userId=${userToEdit.id}`,
      { type: QueryTypes.SELECT }
    );  
    const allRubros = await sequelize.query(
      `SELECT nombre FROM rubros`,
      { type: QueryTypes.SELECT }
    );  
    const rubrosToAppend = allRubros.filter(function(rubro){
      return !rubros.includes(rubro);
    });
    
    res.render("editProf", {
      user: userToEdit,
      rubros: rubros.map(function (rubro) {
      return rubro.rubroNombre;
     }).join(', '),
     rubrosToDelete: rubros,
     rubrosToAppend: rubrosToAppend     
    })
  },
  updateProfProfile: async (req, res) => {
    const oldData = req.session.userLogged;
    const rubros = await sequelize.query(
      `SELECT rubroNombre FROM rubrousers WHERE userId=${oldData.id}`,
      { type: QueryTypes.SELECT }
    );
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;    
    const compareOldP = oldPassword
      ? bcryptjs.compareSync(oldPassword, oldData.password)
      : "";

    const profToCreate = {
      name: req.body.name,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,      
      phone: req.body.phone,
      DNI: req.body.DNI,          
      avatar: req.body.avatar ? req.file.filename : oldData.avatar,
    };
    if(compareOldP === true && newPassword){
      profToCreate.password =  bcryptjs.hashSync(newPassword, 10)
    }else{
      profToCreate.password = oldData.password
    }
    if(req.body.rubroAdd != ""){

    }
    
    req.files["avatar"] ? (profToCreate.avatar = req.files["avatar"][0].filename) : "";
    
    
    await db.User.update(profToCreate, {
      where: {
        id: req.session.userLogged.id,
      },
    });
    req.session.userLogged = await db.User.findByPk(oldData.id)
    console.log(req.session.userLogged)
          
    res.redirect("/");
  },

  inboxProf: async (req, res) => {
    const userId = req.session.userLogged.id;
    const user = await db.User.findByPk(userId, {
      include: ["rubros"],
    });   
    const budgWithImgs = await db.budgReq.findAll({
      where: {
        rubroNombre: {
          [db.Sequelize.Op.in]: user.rubros.map((rubro) => rubro.nombre),
        },
      },
      include: ["req_imgs"],
    });    
    //console.log(JSON.stringify(budgWithImgs, null, 4));  
    res.render("inboxProf", { budgWithImgs });
  },
};
