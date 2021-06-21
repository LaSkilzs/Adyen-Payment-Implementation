'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "text",
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
    );
    Cart.associate = function(models) {
      // associations can be defined here
    };
  Cart.init({
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};