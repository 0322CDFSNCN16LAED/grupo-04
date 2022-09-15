"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const budgetReqs = [];
    const budgReqImgs = [];
    const Rubros = await db.Rubro.findAll();
    const Users = await db.User.findAll({
      where: { isProf: 0 },
    });
    const ReqImgsArray = [
      "imgref-1659569610773.jpg",
      "imgref-1659569610819.jpg",
      "imgref-1659569610867.jpg",
      "imgref-1659578473661.jpg",
      "imgref-1659578473718.jpg",
      "imgref-1659578473768.jpg",
      "imgref-1659578689909.jpg",
      "imgref-1659578689953.jpg",
      "imgref-1659649359444.jpg",
      "imgref-1659649359492.jpg",
      "imgref-1659649359537.jpg",
      "imgref-1659802344310.jpg",
      "imgref-1659802344347.jpg",
      "imgref-1659802344389.jpg",
      "imgref-1659802376471.jpg",
      "imgref-1659802376489.jpg",
      "imgref-1659804122459.jpg",
      "imgref-1659804122478.jpg",
      "imgref-1659804122486.jpg",
      "imgref-1659805896637.jpg",
      "imgref-1659814100279.jpg",
      "imgref-1659814100312.jpg",
      "imgref-1659814100323.jpg",
      "imgref-1659814137833.jpg",
      "imgref-1659814137854.jpg",
      "imgref-1659901881187.jpg",
      "imgref-1659901881218.jpg",
    ];
    const UrgTrabajoArray = ["Lo antes posible", "Esta semana", "Este mes"];

    Array(250)
      .fill(0)
      .forEach((_, i) => {
        const randomUserId = Users[Math.floor(Math.random() * Users.length)];
        const randomRubro = Rubros[Math.floor(Math.random() * Rubros.length)];
        const randomUrgTrabajo =
          UrgTrabajoArray[Math.floor(Math.random() * UrgTrabajoArray.length)];
        const randomImg =
          ReqImgsArray[Math.floor(Math.random() * ReqImgsArray.length)];

        const randomBudgReq = {
          id: i + 1,
          tituloSolicitud: faker.lorem.words(5),
          userId: randomUserId.id,
          rubroNombre: randomRubro.nombre,
          detalleSolicitud: faker.lorem.paragraphs(3),
          urgenciaTrabajo: randomUrgTrabajo,
          ubicacion:
            faker.address.streetAddress() +
            ", " +
            faker.address.city() +
            ", " +
            faker.address.state(),
          estado: "PRESUPUESTO ENVIADO",
          created_at: new Date(),
          updated_at: new Date(),
        };
        budgetReqs.push(randomBudgReq);
        budgReqImgs.push({
          reqId: randomBudgReq.id,
          img: randomImg,
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    await queryInterface.bulkInsert("budget_request", budgetReqs);
    await queryInterface.bulkInsert("req_imgs", budgReqImgs);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("req_imgs", null, {});
    await queryInterface.bulkDelete("budget_request", null, {});
  },
};
