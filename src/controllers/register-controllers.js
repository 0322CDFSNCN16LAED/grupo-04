const path = require("path");
const db = require("../models/Users.js");
const bcryptjs= require("bcryptjs");
const { validationResult } = require("express-validator")


module.exports= {
  register: (req, res) => {
    res.render("register");
  },
  //* create user*//
  createUser: (req, res) => {
    
    res.render("registerUser");
  },
  //*store user*//
  storeUser: (req,res) => {
    const resultValidation= validationResult(req);    
    
    if (resultValidation.errors.length > 0) {
      res.render("registerUser", { 
        errors: resultValidation.mapped(),
        oldData: req.body,                
      })      
    };    
    const users= db.getAllUsers();
    const newUser = req.body;

    const userInDb = db.getOneUserByField("email", req.body.email);

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

      db.createUser(userToCreate);      
      
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

    const prof= db.getAllProf();
    const newProf = req.body;
    const jobsImgArray= req.files['finished-jobs']
    const profileImg = req.files["avatar"];
    const password = req.body.password;

    const userInDb = db.getOneProfByField("email", req.body.email);

    if (userInDb) {
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
      db.createProf(newProf);

      res.redirect("/login");
    }
    
    },  
};

