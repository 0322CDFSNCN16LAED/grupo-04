const fs = require("fs");
const path = require("path");

const budgetReqPath = path.join(__dirname, "../data/budgetRequest-db.json");
const budgetResPath = path.join(__dirname, "../data/budgetResponse-db.json");
const cartPath = path.join(__dirname, "../data/cart-db.json");

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

  generateBudgReqId: function () {
    let allBudg = this.getAllBudgetReq();
    let lastBudg = allBudg.pop();
    if (lastBudg) {
      return lastBudg.reqId + 1;
    }
    return 1;
  },

  generateBudgResId: function () {
    let allBudg = this.getAllBudgetRes();
    let lastBudg = allBudg.pop();
    if (lastBudg) {
      return lastBudg.resId + 1;
    }
    return 1;
  },

  createBudgReq: function (budgData) {
    let allBudg = this.getAllBudgetReq();
    let newBudg = {
      reqId: this.generateBudgReqId(),
      ...budgData,
    };
    allBudg.push(newBudg);
    return this.saveAllBudgetReq(allBudg);
  },

  createBudgRes: function (budgData) {
    let allBudg = this.getAllBudgetRes();
    let newBudg = {
      resId: this.generateBudgResId(),
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

  getUserReq: function() {
    const budgetReq = this.getAllBudgetReq();
    const userReq = budgetReq.filter(
      (budget) => budget.userId === req.session.userLogged.userId
    );
    return userReq;    
  },

  getProfRes: function() {
    const budgetRes = dbBudget.getAllBudgetRes();
    const profRes = budgetRes.filter(
      budget => budget.userId === req.session.userLogged.userId
    );
    return profRes;
  },

  getAllCartItems: function () {
    return JSON.parse(fs.readFileSync(cartPath, "utf-8"));
  },

  generateCartId: function () {
    let allItems = this.getAllCartItems();
    let lastItem = allItems.pop();
    if (lastItem) {
      return lastItem.reqId + 1;
    }
    return 1;
  },

  saveAllCartItems: function (items) {
    const cartTxt = JSON.stringify(items, null, 4);
    fs.writeFileSync(cartPath, cartTxt);
  },

  createPurchase: function(cartData) {
    let allItems = this.getAllCartItems();
    let newItem = {
      cartId: this.generateCartId(),
      ...cartData,
    };
    allItems.push(newItem);
    return this.saveAllCartItems(allItems);
  }

};
