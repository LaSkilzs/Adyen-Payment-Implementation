module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      productid: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    });
  
    return Cart;
  };
  