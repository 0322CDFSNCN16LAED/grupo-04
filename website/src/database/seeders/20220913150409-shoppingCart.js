"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");
const dayjs = require("dayjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const cart = [];
    const responses = await db.budgRes.findAll({
      include:["budget_request"]
    });
   
    
    const estado = ["ACEPTADO","TRABAJO CONFIRMADO","TRABAJO CANCELADO"];
    const metodoPago = ["efectivo","debito","credito","mercadoPago"];
    Array(100)
      .fill(0)
      .forEach((_, i) => {        
        const randomResponses =
          responses[Math.floor(Math.random() * responses.length)];
        const randomEstado = estado[Math.floor(Math.random() * estado.length)];
        const randomPago = metodoPago[Math.floor(Math.random() * metodoPago.length)];
        
          const randomCart = {
            id: i + 1,
            resId: randomResponses.id,
            userId: randomResponses.budget_request.userId,
            dia: dayjs(faker.date.soon(10)).format("YYYY-MM-DD"),
           
            metodoPago: randomPago,
            estado: randomEstado,

            created_at: new Date(),
            updated_at: new Date(),
          };         
          cart.push(randomCart);
        
      });
    await queryInterface.bulkInsert("shopping_cart", cart);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("shopping_cart", null, {});
  },
};
