const db = require("../models");
const Cart = db.carts;
const Op = db.Sequelize.Op;

// Create and Save a new cart
exports.create = (req, res) => {
  // Create a Cart
  const cart = {
    productid: req.body.productid,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  };

  // Save Cart in the database
  Cart.create(cart)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cart."
      });
    });
};

// Retrieve all carts from the database.
exports.findAll = (req, res) => {
    Cart.findAll({ attributes: ["id", "productid", "name", "price", "quantity"] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cart items."
        });
      });
};


// Update a cart by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Cart.update({
        quantity: request.body.quantity || cart.quantity,
        createdAt: cart.createdAt,
        updatedAt: new Date()
      },
      { where: { id: request.params.id } })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cart was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cart with id=" + id
        });
      });
};

// Delete a cart with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cart.destroy({
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
};


