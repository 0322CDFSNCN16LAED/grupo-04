const path = require("path");
const db = require("../models/Users.js");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = {
  home: (req, res) => {
   res.render("index");
  },
  login: (req, res) => {
    res.render("login");
  },
  loginProcess:(req,res) => {
    let userToLogin;
    if (db.getOneProfByField("email", req.body.email)){

      userToLogin = db.getOneProfByField("email", req.body.email);
    }else {
      userToLogin = db.getOneUserByField("email", req.body.email)
    }; 

   if(userToLogin){
    let passwordOk = bcryptjs .compareSync(req.body.password,userToLogin.password);
    if(passwordOk) {
      delete userToLogin.password;
      req.session.userLogged = userToLogin;
      if(userToLogin.rubro){
        return res.redirect("/user/detail")
      }else{
        return res.redirect("/user/prof/detail")
      }
    }
    return res.render("login", {
      errors: {
        password: {
          msg: "La contraseña es incorrecta",
        },
      },
    });
   }else {
    return res.render("login", {
      errors: {
        email: {
          msg: "no se encuenbtra este email en nuestra base de datos",
        },
      },
    });
   }  
  },   
  inbox: (req, res) => {
    res.render("inbox");
  },  
  history: (req, res) => {
    res.render("history");
  },

};
