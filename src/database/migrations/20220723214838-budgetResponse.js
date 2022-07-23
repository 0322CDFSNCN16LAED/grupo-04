"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("budget_response", {
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
      profId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "professionals",
          },
          key: "id",
        },
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
      materiales: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      precioMateriales: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mandoDeObra: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      precioManoDeObra: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duracionTrabajo: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      comentariosTrabajo: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      precioFinal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("budget_response");
  },
};
