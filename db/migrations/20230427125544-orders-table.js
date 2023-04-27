'use strict';
const { OrderSchema, ORDERS_TABLE } = require('../models/orders.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.group('Inicio Migracion -----------------');
    console.log('Tabla:', ORDERS_TABLE);
    console.log('Creando la Tabla Orders...');
    await queryInterface.createTable(ORDERS_TABLE, OrderSchema);
    console.log('Migracion Finalizada -----------------')
    console.groupEnd('Inicio Migracion');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDERS_TABLE);
  }
};
