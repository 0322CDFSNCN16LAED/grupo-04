module.exports = (sequelize, DataTypes) => {
  const alias = "Rubro";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rubro: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  };
  const config = {
    tableName: "rubros",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const rubros = sequelize.define(alias, cols, config);

  return rubros;
};
