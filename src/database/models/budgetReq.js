module.exports = (sequelize, DataTypes) => {
  const alias = "budgReq";
  const cols = {
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
    detalleSolicitud: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    rubroNombre: {
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
  };
  const config = {
    tableName: "budget_request",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const budgetReq = sequelize.define(alias, cols, config);

  budgetReq.associate = (models) => {
      budgetReq.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'users'
      });
      budgetReq.belongsTo(models.Rubro, {
        as: "rubros",
        foreignKey: "rubroNombre",
      });
      budgetReq.hasMany(models.ReqImgs, {
        as: "req-imgs",
        foreignKey: "reqId",
      });
  }
  

  return budgetReq;
};
