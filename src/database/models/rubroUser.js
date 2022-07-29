module.exports = (sequelize, DataTypes) => {
  const alias = "RubroUsers";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },   
  };
  const config = {
    tableName: "rubroUsers",
    timestamps: false,
  
  };
  const rubroUser = sequelize.define(alias, cols, config);

  return rubroUser;
};
