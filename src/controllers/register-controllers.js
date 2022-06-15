const path = require("path");
const db = require("../data/db.js");


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
    const users= db.getAllUsers();
    const newUser = req.body;
    if (users.length) {
      newUser.id = users[users.length - 1].id + 1;
    } else {
      newUser.id = 1;
    }
    if(req.file) {
      newUser.image = req.file.filename;     
      
      users.push(newUser);
      
      db.saveAllUsers(users);
      
      res.redirect("/login");
    }else{
      newUser.image = "profile-user-pic.svg";      
    }    
  },  

  createProf: (req, res) => {
    res.render("registerProfesional");
  },

  storeProf: (req,res) => {
    const prof= db.getAllProf();
    const newProf = req.body;
    const jobsImgArray= req.files['finished-jobs']
    const profileImg = req.files["profile-img"];

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
        prof.push(newProf);

        db.saveAllProf(prof);

        res.redirect("/login");
    },  
};

