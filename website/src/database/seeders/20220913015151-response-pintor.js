"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const budgetRes = [];
    const requestPintor = await db.budgReq.findAll();
    const Users = await db.User.findAll({
      where: { isProf: 1 },
      include: ["rubros"],
    });
    Array(20)
      .fill(0)
      .forEach((_, i) => {
        const randomUserId = Users[Math.floor(Math.random() * Users.length)];
        const randomRequestPintor =
          requestPintor[Math.floor(Math.random() * requestPintor.length)];
        if (randomUserId.rubros[0].nombre == randomRequestPintor.rubroNombre) {
          const randomBudgRes = {
            id: i + 1,
            reqId: randomRequestPintor.id,
            userId: randomUserId.id,
            materiales: faker.lorem.paragraphs(3),
            precioMateriales: faker.datatype.number({ min: 8000, max: 80000 }),
            manoDeObra: faker.lorem.paragraphs(1),
            precioManoDeObra: faker.datatype.number({ min: 8000, max: 80000 }),
            duracionTrabajo: faker.datatype.number({ min: 10, max: 50 }),
            comentariosTrabajo: faker.lorem.paragraphs(2),
            precioFinal: faker.datatype.number({ min: 80000, max: 200000 }),
            estado: "PRESUPUESTO RESPONDIDO",
            created_at: new Date(),
            updated_at: new Date(),
          };
        }
        console.log(JSON.stringify(budgetRes, null, 4));
      });
    await queryInterface.bulkInsert("budget_response", budgetRes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("budget_response", null, {});
  },
};
