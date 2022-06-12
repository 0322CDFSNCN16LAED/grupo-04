const fs = require("fs");
const path = require("path");


const usersFilePath = path.join(__dirname, "./users-db.json");

const profFilePath = path.join(__dirname,"./profesionals.json")

module.exports = {
  getAllUsers: function () {
    return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  },
  getAllProf: function () {
    return JSON.parse(fs.readFileSync(profFilePath, "utf-8"));
  },
  saveAll: function (products) {
    const fileTxt = JSON.stringify(products, null, 4);

    fs.writeFileSync(usersFilePath, fileTxt);
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
  }
};
