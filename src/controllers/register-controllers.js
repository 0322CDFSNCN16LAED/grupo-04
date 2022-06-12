const path = require("path");
const db = require("../data/db.js");


module.exports= {
  register: (req, res) => {
    res.render("register");
  },
  //* create user*//
  registerUser: (req, res) => {
    
    res.render("registerUser");
  },
  //*store user*//
  store: (req,res) => {
    const users= db.getAllUsers();
    const newUser = req.body;
    if (users.length) {
          newUser.id = users[users.length - 1].id + 1;
      } else {
          newUser.id = 1;
      }
      newUser.image = "profile-user-pic.svg";

      users.push(newUser);

      db.saveAll(users);

      res.redirect("/login");
  },
  

  registerProfesional: (req, res) => {
    res.render("registerProfesional");
  },
};

