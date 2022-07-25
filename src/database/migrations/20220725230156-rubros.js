"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rubros", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      rubro: {
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
    await queryInterface.dropTable("rubros");
  },
};
