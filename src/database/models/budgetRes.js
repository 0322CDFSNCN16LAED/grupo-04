const { INTEGER } = require("sequelize");
const { STRING, INET } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const alias = "budgRes";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  };
  const config = {
    tableName: "budget_res",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const budgetRes = sequelize.define(alias, cols, config);

  return budgetRes;
};
