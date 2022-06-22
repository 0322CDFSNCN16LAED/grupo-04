const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users-db.json");
const profFilePath = path.join(__dirname, "../data/professionals-db.json");
const budgetReqPath = path.join(__dirname, "../data/budgetRequest-db.json");
const budgetResPath = path.join(__dirname, "../data/budgetResponse-db.json");

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

  getOneUser: function (id) {
    return this.getAllUsers().find((p) => p.id == id);
  },
  getOneUserByField: function (field, text) {
    return this.getAllUsers().find((p) => p[field] == text);
  },
  getOneProfByField: function (field, text) {
    return this.getAllProf().find((p) => p[field] == text);
  },

  getUserIndex: function (id) {
    return this.getAllUsers().findIndex((p) => p.id == id);
  },

  deleteUser: function (id) {
    let finalUsers = this.getAllUsers().filter((p) => p.id != id);
    return this.saveAllUsers(finalUsers);
  },

  deleteProf: function (id) {
    let finalProfs = this.getAllProf().filter((p) => p.id != id);
    return this.saveAllUsers(finalProfs);
  },

  getAllBudgetReq: function () {
    return JSON.parse(fs.readFileSync(budgetReqPath, "utf-8"));
  },

  getAllBudgetRes: function () {
    return JSON.parse(fs.readFileSync(budgetResPath, "utf-8"));
  },

  saveAllBudgetReq: function (budgets) {
    const budReqTxt = JSON.stringify(budgets, null, 4);
    fs.writeFileSync(budgetReqPath, budReqTxt);
  },

  saveAllBudgetRes: function (budgets) {
    const budResTxt = JSON.stringify(budgets, null, 4);
    fs.writeFileSync(budgetResPath, budResTxt);
  },
  generateUserId: function () {
    let allUsers = this.getAllUsers();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },
  generateProfId: function () {
    let allUsers = this.getAllProf();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },
  generateBudgId: function () {
    let allBudg = this.getAllBudgetRes();
    let lastBudg = allBudg.pop();
    if (lastBudg) {
      return lastBudg.id + 1;
    }
    return 1;
  },
  createUser: function (userData) {
    let allUsers = this.getAllUsers();
    let newUser = {
      id: this.generateUserId(),
      ...userData,
    };
    allUsers.push(newUser);
    return this.saveAllUsers(allUsers);
  },
  createBudg: function (budgData) {
    let allBudg = this.getAllBudgetReq();
    let newBudg = {
      id: this.generateBudgId(),
      ...budgData,
    };
    allBudg.push(newBudg);
    return this.saveAllBudgetRes(allBudg);
  },
  createProf: function (userData) {
    let allProf = this.getAllProf();
    let newProf = {
      id: this.generateProfId(),
      ...userData,
    };
    allProf.push(newProf);
    return this.saveAllProf(allProf);
  },
  getprofFromBudget: function(budgReq){
    let allProf = this.getAllProf();
    const profAvailable= allBudgetReq.forEach(budget => { allProf.filter(prof => prof.rubro == budget.rubro)       
    });  
    return profAvailable
   }
};

