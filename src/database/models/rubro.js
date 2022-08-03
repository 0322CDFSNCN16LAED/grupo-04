module.exports = (sequelize, DataTypes) => {
  const alias = "Rubro";
  const cols = {
    nombre: {
      type: DataTypes.STRING(500),
      allowNull: false,
      primaryKey: true,
    },
  };
  const config = {
    tableName: "rubros",
    timestamps: false
    
  };
  const Rubro = sequelize.define(alias, cols, config);

  Rubro.associate = (models) => {
    Rubro.belongsToMany(models.User, {
      as: "user",
      through: "rubroUsers",
      foreignKey: "rubroNombre",
      otherKey: "userId",
      timestamps: false,
    });
    Rubro.hasMany(models.budgReq, {
      as: "budget-request",
      foreignKey: "rubroNombre",
    });
  };

  return Rubro;
};
