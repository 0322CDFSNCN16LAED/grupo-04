module.exports = (sequelize, DataTypes) => {
  const alias = "JobImgs";
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
    }
  };
  const config = {
    tableName: "jobs-img",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const jobImg = sequelize.define(alias, cols, config);

  return jobImg;
};
