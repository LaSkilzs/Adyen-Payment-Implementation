const cartsController = require('../controllers')

module.exports = app => {
    app.get("/", (request, response) =>
    response.status(200).send({
      message: "Welcome to the Event Admin Panel!"
    })
  );
}

