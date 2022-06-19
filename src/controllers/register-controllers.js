const path = require("path");
const db = require("../data/db.js");
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

    if (users.length) {
      newUser.id = users[users.length - 1].id + 1;
    } else {
      newUser.id = 1;
    }
    if(req.file) {
      newUser.image = req.file.filename;     
      
    }else{
      newUser.image = "profile-user-pic.svg";      
    }    
    if(resultValidation.errors.length == 0){

      users.push(newUser);
      
      db.saveAllUsers(users);
      
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

    if(profileImg){      
      newProf.image = profileImg[0].filename;;
    }else{
      newProf.image= "profile-user-pic.svg";
    }
    if(jobsImgArray){
       newProf.jobsImgs = jobsImgArray.map(function (img) {
         return img.filename;
       });
    }else{
      newProf.jobsImgs = []
    }
    if (prof.length) {
            newProf.id = prof[prof.length - 1].id + 1;
        } else {
            newProf.id = 1;
        }  
    
    if (resultValidation.errors.length == 0) {
      prof.push(newProf);

      db.saveAllProf(prof);

      res.redirect("/login");
    }
    
    },  
};

