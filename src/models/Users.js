const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users-db.json");


module.exports = {
  getAllUsers: function () {
    return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  },

  saveAllUsers: function (products) {
    const usersTxt = JSON.stringify(products, null, 4);
    fs.writeFileSync(usersFilePath, usersTxt);
  },
  getOneUser: function (id) {
    return this.getAllUsers().find((p) => p.id == id);
  },
  getUserIndex: function (id) {
    return this.getAllUsers().findIndex((p) => p.id == id);
  },
  getOneUserByField: function (field, text) {
    return this.getAllUsers().find((p) => p[field] == text);
  },

  deleteUser: function (id) {
    let finalUsers = this.getAllUsers().filter((p) => p.id != id);
    return this.saveAllUsers(finalUsers);
  },
  generateUserId: function () {
    let allUsers = this.getAllUsers();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
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
};

