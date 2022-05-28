const path = require("path");

module.exports = {
    home: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/index.html"));
    },
    login: (req, res)=> {
        res.sendFile(path.join(__dirname, "../views/login.html"));
    },
    register: (req, res) => {
        res.sendFile(path.join(__dirname, "../views/register.html"));
    },

};