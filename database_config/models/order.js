'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.Product, {
      //   as: 'product',
      //   foreignKey: 'productId',
      //   constraints: true,
      //   targetKey: 'id',
      // })
      Order.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
        constraints: true,
        targetKey: 'id',
      })
    }
  }
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.DECIMAL(38, 12),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'cancelled', 'processing', 'shipped', 'delivered'),
      allowNull: false,
      defaultValue: 'pending',
    },
    items: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true,
    paranoid: true,
  });
  return Order;
};