'use strict';
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.group('Inicio Migracion -----------------');
    console.log('Tabla:', ORDER_PRODUCT_TABLE);
    console.log('Creando la Tabla Orders...');
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    console.log('Migracion Finalizada -----------------')
    console.groupEnd('Inicio Migracion');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
