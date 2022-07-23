"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("professionals", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userName: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      DNI: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IVA: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      CUIT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rubro: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      radioUbicacion: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(500),
      },
      jobsImgs: {
        type: DataTypes.STRING(500),
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
    await queryInterface.dropTable("professionals");
  },
};
