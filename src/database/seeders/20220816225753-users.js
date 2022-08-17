"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");
const bcryptjs = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const userRubros = [];
    const userJobImgs = [];
    const Rubros = await db.Rubro.findAll();
    const JobImgsArray = [
      "user-1659359071195.jpg",
      "user-1659359071210.jpg",
      "user-1659359071218.jpg",
      "user-1659391310831.jpg",
      "user-1659391310831.jpg",
      "user-1659391310953.jpg",
      "user-1659391310953.jpg",
      "user-1659391311027.jpg",
      "user-1659391517796.jpg",
      "user-1659391517874.jpg",
      "user-1659395293985.jpg",
    ];
    const avatarArray = [
      "user-1659358788392.jpg",
      "user-1659358993205.jpg",
      "user-1659359071144.jpg",
      "user-1659391310705.jpg",
      "user-1659395127340.jpg",
      "user-1659397127439.jpg",
      "user-1659569564550.jpg",
      "user-1659571371225.jpg",
      "user-1659649252472.jpg",
      "user-1659649326508.jpg",
      "user-1659804015413.jpg",
      "user-1660000495568.jpg",
    ];
    const avatarImg =
      avatarArray[Math.floor(Math.random() * avatarArray.length)];
    Array(50)
      .fill(0)
      .forEach((_, i) => {
        const isProf = Math.round(Math.random());
        const randomUser = {
          id: i + 1,
          name: faker.name.firstName(),
          lastName: faker.name.lastName(),
          userName: faker.name.firstName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync("1", 10),
          phone: faker.phone.number(),
          DNI: faker.datatype.number({ min: 1000000 }),
          isProf: isProf,
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode(),
          state: faker.address.state(),
          avatar: avatarImg,
          created_at: new Date(),
          updated_at: new Date(),
        };
        users.push(randomUser);
        if (isProf === 1) {
          var rubro = Rubros[Math.floor(Math.random() * Rubros.length)];
          userRubros.push({
            userId: randomUser.id,
            rubroNombre: rubro.nombre,
          });
          const JobImgs =
            JobImgsArray[Math.floor(Math.random() * JobImgsArray.length)];
          userJobImgs.push({
            userId: randomUser.id,
            img: JobImgs,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      });
    await queryInterface.bulkInsert("users", users);
    await queryInterface.bulkInsert("rubrousers", userRubros);
    await queryInterface.bulkInsert("jobs_imgs", userJobImgs);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("budget_response", null, {});
    await queryInterface.bulkDelete("req_imgs", null, {});
    await queryInterface.bulkDelete("budget_request", null, {});
    await queryInterface.bulkDelete("rubrousers", null, {});
    await queryInterface.bulkDelete("shopping-cart", null, {});
    await queryInterface.bulkDelete("jobs_imgs", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
