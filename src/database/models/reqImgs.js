module.exports = (sequelize, DataTypes) => {
  const alias = "ReqImgs";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  };
  const config = {
    tableName: "req-imgs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const reqImg = sequelize.define(alias, cols, config);

  return reqImg;
};
