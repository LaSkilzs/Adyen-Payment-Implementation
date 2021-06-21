const Cart = require('../models').Cart;
const { Op } = require("sequelize");

// Create and Save a new cart item
module.exports = {
  async create(request, response) {
    console.log('body', request)
    let testcart = {productID: 7, name: "IPHONE 8", quantity: 1, price: "999.99"}
    try {
      const cart = await Cart.create({
        name: testcart.name,
        productID: testcart.productID,
        quantity: testcart.quantity,
        price: testcart.price.toString()
      });
      response
        .status(201)
        .send({
          cart,
          message: "Cart was created",
        });
    } catch (e) {
      console.log("error", e);
      response.status(400).send(e);
    }
  },
  // Retrieve all carts from the database.
  async findAll(req, res){
    await Cart.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cart items."
        });
      });
  },
      // Delete a cart with the specified id in the request
       async delete(req, res){
          const id = req.params.id;
      
          await Cart.destroy({
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Cart was deleted successfully!"
                });
              } else {
                res.send({
                  message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete Cart with id=" + id
              });
            });
      }
}