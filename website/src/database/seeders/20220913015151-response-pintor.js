"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const budgetRes = [];
    const requests = await db.budgReq.findAll();
    const Users = await db.User.findAll({
      where: { isProf: 1 },
      include: ["rubros"],
    });
    Array(200)
      .fill(0)
      .forEach((_, i) => {
        const randomUserId = Users[Math.floor(Math.random() * Users.length)];
        const randomRequest =
          requests[Math.floor(Math.random() * requests.length)];
        if (randomUserId.rubros[0].nombre == randomRequest.rubroNombre) {
          const randomBudgRes = {
            id: i + 1,
            reqId: randomRequest.id,
            userId: randomUserId.id,
            materiales: faker.lorem.paragraphs(3),
            precioMateriales: faker.datatype.number({ min: 8000, max: 80000 }),
            manoDeObra: faker.lorem.paragraphs(1),
            precioManoDeObra: faker.datatype.number({ min: 8000, max: 80000 }),
            duracionTrabajo: faker.datatype.number({ min: 10, max: 50 }),
            comentariosTrabajo: faker.lorem.paragraphs(2),           
            estado: "PRESUPUESTO RESPONDIDO",
            created_at: new Date(),
            updated_at: new Date(),
          };
          const res = {...randomBudgRes, precioFinal: randomBudgRes.precioMateriales + randomBudgRes.precioManoDeObra}
          budgetRes.push(res)
        }        
      });
    await queryInterface.bulkInsert("budget_response", budgetRes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("budget_response", null, {});
  },
};
