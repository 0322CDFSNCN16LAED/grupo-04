'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.createTable("users", {
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
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(500),
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
      isProf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.STRING(500),
      },
      address: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
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

  async down (queryInterface, Sequelize) {    
     await queryInterface.dropTable('users');     
  }
};
