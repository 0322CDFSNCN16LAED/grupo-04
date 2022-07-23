'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.createTable("budget_request", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tituloSolicitud: {
        type: DataTypes.STRING(500),
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
      detalleSolicitud: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      rubro: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      urgenciaTrabajo: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      ubicacion: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      imgReferencia: {
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
  async down (queryInterface, Sequelize) {    
    await queryInterface.dropTable('budget_request');     
  }
};
