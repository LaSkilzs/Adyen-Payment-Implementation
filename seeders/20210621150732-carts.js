'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return await queryInterface.bulkInsert('Carts', 
     [
       {
       productID: 7,
       name: "Panasonic Battery",
       price: "14.99",
       quantity: 3,
       image: 'https://i5.walmartimages.com/asr/807f7df2-4339-426f-ad31-202c958a2788.f57634cd87be2764e55d59e6de7b5ab7.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff',
       createdAt: new Date(),
       updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Carts', null, {});
  }
};
