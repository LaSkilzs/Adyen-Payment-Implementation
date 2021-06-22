const CartController = require('../controllers/Cart');
const PaymentController = require("../controllers/Payment");

module.exports = (app) => {
    app.get('/carts', CartController.findAll);
    app.post('/carts', CartController.create);
    app.delete('/carts/:id', CartController.delete);

    app.post('/api/getPaymentMethods', PaymentController.getPaymentMethod);

  // Create a catch-all route for testing the installation.
  app.all('*', (req, res) => res.status(200).send({
    message: 'Hello World!',
  }));
  };