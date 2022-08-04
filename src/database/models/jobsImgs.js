module.exports = (sequelize, DataTypes) => {
  const alias = "JobImg";
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
    tableName: "jobs_imgs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const jobImg = sequelize.define(alias, cols, config);

  jobImg.associate = (models) => {
    jobImg.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  };

  return jobImg;
};
