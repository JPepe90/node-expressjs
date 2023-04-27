'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customers.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.group('Inicio Migracion -----------------');
    console.log('Tabla:', CUSTOMER_TABLE);
    console.log('Creando la Tabla Customers con las asociaciones a Users...');
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    console.log('Migracion Finalizada -----------------')
    console.groupEnd('Inicio Migracion');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
