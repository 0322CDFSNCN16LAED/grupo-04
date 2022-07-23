module.exports = (sequelize, DataTypes) => {
  const alias = "Users";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userName: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(500),
    },
  };
  const config = {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const users = sequelize.define(alias, cols, config);

  users.associate = (models) => {
    users.hasMany(models.budgReq, {
      foreignKey: "userId",
      as: "budgReq",
    });
   };

  return users;
};
