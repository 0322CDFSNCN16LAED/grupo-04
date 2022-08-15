const { QueryTypes } = require("sequelize");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { sequelize } = require("../database/models");

module.exports = {
  createProf: async (req, res) => {
    const allRubros = JSON.parse(
      JSON.stringify(await db.Rubro.findAll(), null, 4)
    ).map((rubro) => rubro.nombre);    
    
    res.render("registerProfesional", {rubros: allRubros});
  },

  storeProf: async (req, res) => {
    const resultValidation = validationResult(req);
       const allRubros = JSON.parse(
         JSON.stringify(await db.Rubro.findAll(), null, 4)
       ).map((rubro) => rubro.nombre); 

    if (resultValidation.errors.length > 0) {
      res.render("registerprofesional", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        rubrosData: typeof req.body.rubro === "string" ? [req.body.rubro] : req.body.rubro,
        rubros: allRubros,
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
        rubros: allRubros,
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
    res.render("profDetail", {
      user: req.session.userLogged,
      rubros: userRubros.join(", "),
    });
  },

  editProfProfile: async (req, res) => {
    const userToEdit = req.session.userLogged;
    const user = await db.User.findByPk(userToEdit.id, {
      include: ["rubros","jobsImg"],
    });
    const userJobImgs = user.jobsImg.map((img) => img);
   
    const allRubros = JSON.parse(
      JSON.stringify(await db.Rubro.findAll(), null, 4)
    ).map((rubro) => rubro.nombre);
    const userRubros = user.rubros.map((rubro) => rubro.nombre);

    const rubrosToAppend = allRubros.filter(function (rubro) {
      return !userRubros.includes(rubro);
    });

    res.render("editProf", {
      user: userToEdit,
      rubrosToDelete: userRubros,
      rubrosToAppend: rubrosToAppend,
      imgs: userJobImgs
    });
  },
  updateProfProfile: async (req, res) => {
    const oldData = req.session.userLogged;
    const user = await db.User.findByPk(oldData.id, {
      include: ["rubros", "jobsImg"],
    });    
    const jobsImgArray = req.files["finished-jobs"];
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
    compareOldP === true && newPassword
      ? (profToCreate.password = bcryptjs.hashSync(newPassword, 10))
      : (profToCreate.password = oldData.password);

    req.files["avatar"]
      ? (profToCreate.avatar = req.files["avatar"][0].filename)
      : "";

    const rubrosToAdd = req.body.rubroAdd
      ? typeof req.body.rubroAdd === "string"
        ? [req.body.rubroAdd]
        : req.body.rubroAdd
      : undefined;

    if (rubrosToAdd) await user.addRubros(rubrosToAdd);

    const rubrosToDelete = req.body.rubroDelete
      ? typeof req.body.rubroDelete === "string"
        ? [req.body.rubroDelete]
        : req.body.rubroDelete
      : undefined;

    if (rubrosToDelete) await user.removeRubros(rubrosToDelete);
    
    const jobsImgs = jobsImgArray
      ? jobsImgArray.map(function (img) {
          return img.filename;
        })
      : [];
    if (jobsImgs) {
      await db.JobImg.bulkCreate(
        jobsImgs.map(function (img) {
          return {
            img: img,
            userId:oldData.id,
          };
        })
      );
    }
    await db.User.update(profToCreate, {
      where: {
        id: req.session.userLogged.id,
      },
    });
    req.session.userLogged = await db.User.findByPk(oldData.id)
          
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
      include: ["req_imgs","users"],
     
    }); 
    res.render("inboxProf", { budgWithImgs });
  },
};
