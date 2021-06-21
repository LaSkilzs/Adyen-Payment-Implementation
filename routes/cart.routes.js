module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/carts", cart.create);
  
    // Retrieve all Tutorials
    router.get("/carts", cart.findAll);
  
    // Update a Tutorial with id
    router.put("/carts/:id", cart.update);
  
    // Delete a Tutorial with id
    router.delete("/carts/:id", cart.delete);
  
    app.use('/', router);
  };