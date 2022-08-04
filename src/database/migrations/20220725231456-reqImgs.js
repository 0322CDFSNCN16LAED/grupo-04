"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("req_imgs", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      reqId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "budget_request",
          },
          key: "id",
        },
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("req_imgs");
  },
};
