module.exports = (sequelize, DataTypes) => {
  const alias = "Prof";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  };
  const config = {
    tableName: "professionals",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const prof = sequelize.define(alias, cols, config);

  return prof;
};
