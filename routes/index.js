const CartController = require('../controllers/Cart');

module.exports = (app) => {
    app.get('/carts', CartController.findAll);
    app.post('/carts', CartController.create);
    app.delete('/carts/:id', CartController.delete);

    // Create a catch-all route for testing the installation.
    app.all('*', (req, res) => res.status(200).send({
      message: 'Hello World!',
    }));
  };