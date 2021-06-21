const Cart = require("../db/models").Cart;

module.exports = {
  // GET -- /carts   { get all Cart items }
  async getAllCartItems(request, response) {
    console.log('I was called')
    try {
      const carts = await Cart.findAll({
        attributes: ["id", "productid", "name", "price", "quantity"],
        include: [
          {
            model: Question,
            as: "questions",
            required: false,
            attributes: [
              "id",
              "productid",
              "name",
              "price",
              "quantity"
            ]
          }
        ]
      });
      response.status(201).send({carts: carts, message: "Cart Items were created"});
    } catch (e) {
      console.log(e);
      response.status(500).send(e);
    }
  },

  //POST -- /carts { add new Cart }
  async create(request, response) {
    try {
      const cartItem = await Cart.create({
        name: request.body.name,
        background: request.body.background,
        textColor: request.body.textColor,
        playlistUrl: request.body.playlistUrl
      });
      response
        .status(201)
        .send({
          cart,
          message: "Cart Item was created",
          dataChanged: true,
        });
    } catch (e) {
      console.log("error", e);
      response.status(400).send(e);
    }
  },

  // PUT -- /carts/:id  { update cart by id }
  async update(request, response) {
    try {
      const cart = await Cart.findAll({
        where: { id: request.params.id }
      });

      if (cart) {
        const updatedcart = await Cart.update(
          {
            quantity: request.body.quantity || cart.quantity,
            createdAt: cart.createdAt,
            updatedAt: new Date()
          },
          { where: { id: request.params.id } }
        );
        response.status(201).send({cart: updatedcart, message: "cart was updated"})
      }
    } catch (e) {
      console.log(e);
      response.status(500).send(e);
    }
  },

  //DELETE -- /carts/:id   { remove cart by id}
  async delete(request, response) {
    try {
      const cart = await Cart.findAll({
        where: { id: request.params.id }
      });
      if (cart) {
        Cart.destroy({ where: { id: request.params.id } });
        response
          .status(201)
          .send({
            message: "cart was destroyed",
            dataChanged: true,
          });
      } else {
        response.status(404).send({ message: "cart is not found", dataChanged: true });
      }
    } catch (e) {
      console.log(e);
      response.status(500).send(e);
    }
  }
};
