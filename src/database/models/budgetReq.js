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
  };
  const config = {
    tableName: "budget_request",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const budgetReq = sequelize.define(alias, cols, config);

  budgetReq.associate = (models) => {
      budgetReq.belongsTo(models.Users, {
          foreignKey: 'userId',
          as: 'users'
      });
  }

  return budgetReq;
};
