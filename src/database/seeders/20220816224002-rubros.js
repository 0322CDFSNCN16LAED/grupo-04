'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("rubros", [
     {
       nombre: "Electricista",
     },
     {
       nombre: "Gasista",
     },
     {
       nombre: "Pintor",
     },
     {
       nombre: "Plomero",
     },
     {
       nombre: "Albañil",
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("rubros", null, {});
  }
};
