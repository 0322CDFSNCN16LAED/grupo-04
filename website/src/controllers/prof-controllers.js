const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const dayjs = require("dayjs");

module.exports = {
  createProf: async (req, res) => {
    const allRubros = JSON.parse(
      JSON.stringify(await db.Rubro.findAll(), null, 4)
    ).map((rubro) => rubro.nombre);

    res.render("registerProfesional", { rubros: allRubros });
  },

  storeProf: async (req, res) => {
    const resultValidation = validationResult(req);
    const allRubros = JSON.parse(
      JSON.stringify(await db.Rubro.findAll(), null, 4)
    ).map((rubro) => rubro.nombre);

    if (resultValidation.errors.length > 0) {
      return res.render("registerProfesional", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        rubrosData:
          typeof req.body.rubro === "string"
            ? [req.body.rubro]
            : req.body.rubro,
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
        return res.render("", { error });
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
    const userId = req.params.id;
    const user = await db.User.findByPk(userId, {
      include: ["rubros", "jobsImg"],
    });
    const userJobImgs = user.jobsImg.map((img) => img);
    const userRubros = user.rubros.map((rubro) => rubro.nombre);

    res.render("profDetail", {
      user: user,
      rubros: userRubros.join(", "),
      imgs: userJobImgs,
    });
  },

  editProfProfile: async (req, res) => {
    const userToEdit = req.session.userLogged;
    const user = await db.User.findByPk(userToEdit.id, {
      include: ["rubros", "jobsImg"],
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
      imgs: userJobImgs,
    });
  },
  updateProfProfile: async (req, res) => {
    const oldData = req.session.userLogged;
    const user = await db.User.findByPk(oldData.id, {
      include: ["rubros", "jobsImg"],
    });
    const jobsImgArray = req.files["finished-jobs"];

    const profToCreate = {
      name: req.body.name,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      DNI: req.body.DNI,
      avatar: req.body.avatar ? req.file.filename : oldData.avatar,
    };
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
            userId: oldData.id,
          };
        })
      );
    }
    await db.User.update(profToCreate, {
      where: {
        id: req.session.userLogged.id,
      },
    });
    req.session.userLogged = await db.User.findByPk(oldData.id);

    res.redirect("/");
  },

  inboxProf: async (req, res) => {
    const userId = req.session.userLogged.id;
    const user = await db.User.findByPk(userId, {
      include: ["rubros"],
    });
    const userRubros = user.rubros.map (rubro => rubro.nombre)    
    const budg = await db.budgReq.findAll({
      where: {
        rubroNombre: {
          [db.Sequelize.Op.in]: user.rubros.map((rubro) => rubro.nombre),
        },
      },
      attributes: ["id", "tituloSolicitud", "urgenciaTrabajo", "ubicacion","rubroNombre"],
      include: [
        {
          association: "req_imgs",
          attributes: ["img"],
        },
        {
          association: "users",
          attributes: ["name", "lastName"],
        },
        {
          association: "budget_response",
          attributes: ["estado", "userId"],
          include: ["shopping_cart"],
        },
      ],
      order: [["urgenciaTrabajo", "ASC"]],
    });
    const budgWithImgs = budg.filter((budget) => {
      if ((budget.dataValues.budget_response[0] == undefined) == true) {
        return budget;
      } else {
        if (
          (budget.dataValues.budget_response[0].userId !=
            req.session.userLogged.id &&
            budget.dataValues.budget_response[0].shopping_cart == null) ||
          budget.dataValues.budget_response[0].userId !=
            req.session.userLogged.id ||
          budget.dataValues.budget_response[0].shopping_cart == null
        ) {
          return budget;
        }
      }
    });
    
    const electricista = budgWithImgs.filter( budget => 
      budget.rubroNombre == "Electricista")
    const plomero = budgWithImgs.filter(
      (budget) => budget.rubroNombre == "Plomero"
    );
    const pintor = budgWithImgs.filter(
      (budget) => budget.rubroNombre == "Pintor"
    );
    const gasista = budgWithImgs.filter(
      (budget) => budget.rubroNombre == "Gasista"
    );
    const albañil = budgWithImgs.filter(
      (budget) => budget.rubroNombre == "Albañil"
    );    
    res.render("inboxProf", { budgWithImgs });
  },

  inboxProfResponses: async (req, res) => {
    const responses = await db.budgRes.findAll({
      where: { userId: req.session.userLogged.id },
      include: [
        {
          association: "budget_request",
          attributes: ["tituloSolicitud", "urgenciaTrabajo", "ubicacion"],
          include: [
            {
              association: "req_imgs",
              attributes: ["img"],
            },
            {
              association: "users",
              attributes: ["name", "lastName"],
            },
          ],
        },
      ],
      order: [["updated_at", "DESC"]],
    });
    // console.log(JSON.stringify(responses, null, 4));
    res.render("inboxProfResponses", { responses });
  },
  history: async (req, res) => {
    const cartHistory = await db.budgRes.findAll({
      where: {
        userId: req.session.userLogged.id,
      },
      include: [
        {
          association: "shopping_cart",
          where: {
            estado: "TRABAJO CONFIRMADO",
          },
          include: ["users"],
        },
        {
          association: "budget_request",
          include: ["users"],
        },
      ],
    });
    res.render("historyProf", { cartHistory, dayjs });
  },
};
