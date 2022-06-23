const fs = require("fs");
const path = require("path");

const profFilePath = path.join(__dirname, "../data/professionals-db.json");


module.exports = {
  getAllProf: function () {
    return JSON.parse(fs.readFileSync(profFilePath, "utf-8"));
  },
  saveAllProf: function (products) {
    const profTxt = JSON.stringify(products, null, 4);
    fs.writeFileSync(profFilePath, profTxt);
  },
  getOneProfByField: function (field, text) {
    return this.getAllProf().find((p) => p[field] == text);
  },
  deleteProf: function (id) {
    let finalProfs = this.getAllProf().filter((p) => p.id != id);
    return this.saveAllUsers(finalProfs);
  },
  generateProfId: function () {
    let allUsers = this.getAllProf();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },
  createProf: function (userData) {
    let allProf = this.getAllProf();
    let newProf = {
      id: this.generateProfId(),
      ...userData,
    };
    allProf.push(newProf);
    return this.saveAllProf(allProf);
  }
}
