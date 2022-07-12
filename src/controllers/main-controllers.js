const dbUsers = require("../models/Users.js");
const dbProf = require("../models/prof.js");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator")

module.exports = {
  home: (req, res) => {
   res.render("index");
  },

  login: (req, res) => {
    res.render("login");
  },

  loginProcess:(req,res) => {
    const userToLogin = dbUsers.getOneUserByField("email", req.body.email);
    const profToLogin = dbProf.getOneProfByField("email", req.body.email);
    
    if (!userToLogin && !profToLogin) return res.render("login", {
      errors: {
        email: {
          msg: "El usuario no existe",
        },
      },
    });
    
    const user = userToLogin ? userToLogin : profToLogin;
    req.session.userLogged = user;

    let passwordOk = bcryptjs .compareSync(req.body.password, user.password);
    if (!passwordOk) return res.render("login", {
      errors: {
        password: {
          msg: "La contraseña es incorrecta",
        },
      },
    });

    return userToLogin ? res.redirect("/user/detail") : res.redirect("/prof/detail");
  },

  history: (req, res) => {
    res.render("history");
  },

  logout: (req,res) => {
    req.session.destroy();
    return res.redirect("/login")
  },

  register: (req, res) => {
    res.render("register");
  },
  
  createUser: (req, res) => {
    
    res.render("registerUser");
  },
  
  storeUser: (req,res) => {
    const resultValidation= validationResult(req);    
    
    if (resultValidation.errors.length > 0) {
      res.render("registerUser", { 
        errors: resultValidation.mapped(),
        oldData: req.body,                
      })      
    };    
    const users= dbUsers.getAllUsers();
    const newUser = req.body;

    const userInDb = dbUsers.getOneUserByField("email", req.body.email);

    if(userInDb){
      return res.render("registerUser", {
        errors: {
          email: {
            msg: "Este email ya esta registrado"
          }
        },
        oldData: req.body
      })
    }

    const userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password,10),
      avatar: req.file.filename
    }
    if(resultValidation.errors.length == 0){

      dbUsers.createUser(userToCreate);      
      
      res.redirect("/login");
    }
  },  

  createProf: (req, res) => {
    res.render("registerProfesional");
  },

  storeProf: (req,res) => {
    const resultValidation= validationResult(req);  
    
    if (resultValidation.errors.length > 0) {
      res.render("registerprofesional", { 
        errors: resultValidation.mapped(),
        oldData: req.body,                
      })      
    };    

    const prof= dbProf.getAllProf();
    const newProf = req.body;
    const jobsImgArray= req.files['finished-jobs']
    const profileImg = req.files["avatar"];
    const password = req.body.password;

    const profInDb = dbProf.getOneProfByField("email", req.body.email);

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

    if(profileImg){      
      newProf.avatar = profileImg[0].filename;;
    }else{
      newProf.avatar= "profile-user-pic.svg";
    }
    if(jobsImgArray){
       newProf.jobsImgs = jobsImgArray.map(function (img) {
         return img.filename;
       });
    }else{
      newProf.jobsImgs = []
    }
    newProf.password =  bcryptjs.hashSync(password,10);
           
    if (resultValidation.errors.length == 0) {
      dbProf.createProf(newProf);

      res.redirect("/login");
    }
    
  },

};
