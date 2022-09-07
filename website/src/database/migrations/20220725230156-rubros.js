"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rubros", {
      nombre: {
        type: DataTypes.STRING(500),
        primaryKey: true,        
        allowNull: false,
      },        
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rubros");
  },
};
