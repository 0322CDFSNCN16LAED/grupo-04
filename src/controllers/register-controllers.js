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

    newUser.image = "profile-user-pic.svg";
    users.push(newUser);
    db.saveAllUsers(users);
    res.redirect("/login");
  },

  createProf: (req, res) => {
    res.render("registerProfesional");
  },

  storeProf: (req,res) => {
    const prof= db.getAllProf();
    const newProf = req.body;

    if (prof.length) {
      newProf.id = prof[prof.length - 1].id + 1;
    } else {
      newProf.id = 1;
    }

    newProf.image = "profile-user-pic.svg";
    prof.push(newProf);
    db.saveAllProf(prof);
    res.redirect("/login");
  },
};

