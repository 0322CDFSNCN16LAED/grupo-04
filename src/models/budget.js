const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users-db.json");
const profFilePath = path.join(__dirname, "../data/professionals-db.json");
const budgetReqPath = path.join(__dirname, "../data/budgetRequest-db.json");
const budgetResPath = path.join(__dirname, "../data/budgetResponse-db.json");

module.exports = {
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
  generateBudgId: function () {
    let allBudg = this.getAllBudgetRes();
    let lastBudg = allBudg.pop();
    if (lastBudg) {
      return lastBudg.id + 1;
    }
    return 1;
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
  getprofFromBudget: function (budgReq) {
    let allProf = this.getAllProf();
    const profAvailable = allBudgetReq.forEach((budget) => {
      allProf.filter((prof) => prof.rubro == budget.rubro);
    });
    return profAvailable;
  },
};
