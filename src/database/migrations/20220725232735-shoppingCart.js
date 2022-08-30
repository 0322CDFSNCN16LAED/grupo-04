"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("shopping_cart", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      resId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "budget_response",
          },
          key: "id",
        },
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
      dia: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      horario: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      metodoPago: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      estado: {
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
    await queryInterface.dropTable("shopping_cart");
  },
};
