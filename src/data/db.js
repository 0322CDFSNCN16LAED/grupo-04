const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname,"./users-db.json");
const profFilePath = path.join(__dirname,"./professionals-db.json");
const budgetReqPath = path.join(__dirname,"./budgetRequest-db.json");
const budgetResPath = path.join(__dirname,"./budgetResponse-db.json");

module.exports = {
  getAllUsers: function () {
    return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  },

  getAllProf: function () {
    return JSON.parse(fs.readFileSync(profFilePath, "utf-8"));
  },

  saveAllUsers: function (products) {
    const usersTxt = JSON.stringify(products, null, 4);
    fs.writeFileSync(usersFilePath, usersTxt);
  },

  saveAllProf: function (products) {
    const profTxt = JSON.stringify(products, null, 4);
    fs.writeFileSync(profFilePath, profTxt);
  },

  getOne: function (id) {
    return this.getAll().find((p) => p.id == id);
  },

  getIndex: function (id) {
    return this.getAll().findIndex((p) => p.id == id);
  },

  deleteUser: function (id) {
    return this.getAllUsers().filter((p) => p.id != id);
  },

  deleteProf: function (id) {
    return this.getAllProf().filter((p) => p.id != id);
  },

  getAllBudgetReq: function (){
    return JSON.parse(fs.readFileSync(budgetReqPath, "utf-8"));
  },

  getAllBudgetRes: function (){
    return JSON.parse(fs.readFileSync(budgetResPath, "utf-8"));
  },

  saveAllBudgetReq: function(budgets){
    const budReqTxt = JSON.stringify(budgets, null, 4);
    fs.writeFileSync(budgetReqPath, budReqTxt);
  },

  saveAllBudgetRes: function(budgets){
    const budResTxt = JSON.stringify(budgets, null, 4);
    fs.writeFileSync(budgetResPath, budResTxt);
  },

};
