const path = require("path");

module.exports = {
    home: (req,res) => {
        res.render(path.join(__dirname, "../views/index.ejs"));
    },
    login: (req, res)=> {
        res.render(path.join(__dirname, "../views/login.ejs"));
    },
    register: (req, res) => {
        res.render(path.join(__dirname, "../views/register.ejs"));
    },

};