module.exports = (sequelize, DataTypes) => {
  const alias = "User";
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
      type: DataTypes.STRING(500),
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
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isProf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => {
    User.hasMany(models.budgReq, {
      as: "budgReq",
      foreignKey: "userId",
    });
    User.hasMany(models.budgRes, {
      as: "budgRes",
      foreignKey: "userId",
    });
    User.belongsToMany(models.Rubro, {
      as: "rubros",
      through: "rubroUsers",
      foreignKey: "userId",
      otherKey: "rubroNombre",
      timestamps: false,
    });
    User.hasMany(models.JobImg, {
      as: "jobsImg",
      foreignKey: "userId",
    });
  };

  return User;
};
