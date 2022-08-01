module.exports = (sequelize, DataTypes) => {
  const alias = "ShoppingCart";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    resId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "budget_response",
        },
        key: "id",
      },
      allowNull: false,
    },
    dia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horario: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    metodoPago: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  };
  const config = {
    tableName: "shopping-cart",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
  const shopCart = sequelize.define(alias, cols, config);
  //adaptar asociacion
  /*jobImg.associate = (models) => {
    jobImg.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  };*/

  return shopCart;
};
