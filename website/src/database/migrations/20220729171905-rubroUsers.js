"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rubroUsers", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        allowNull: false,
      },
      rubroNombre: {
        type: DataTypes.STRING(500),
        references: {
          model: {
            tableName: "rubros",
          },
          key: "nombre",
        },
        allowNull: false,
      },
      
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rubroUsers");
  },
};
