const path = require("path");

module.exports = {
    home: (req,res) => {
        res.render("index");
    },
    login: (req, res)=> {
        res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    },
    registerProfesional: (req, res) => {
        res.render("registerProfesional");
    },
    inbox: (req, res) => {
        res.render("inbox");
    },
};