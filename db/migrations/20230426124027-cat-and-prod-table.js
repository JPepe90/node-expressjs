'use strict';
const { CATEGORIES_TABLE, CategoriesSchema } = require('../models/categories.model');
const { ProductSchema, PRODUCTS_TABLE } = require('../models/products.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.group('Inicio Migracion -----------------');
    console.log('Tabla:', CATEGORIES_TABLE);
    console.log('Creando la Tabla Categories...');
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
    console.log('Tabla:', PRODUCTS_TABLE);
    console.log('Creando la Tabla Productos...');
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);
    console.log('Migracion Finalizada -----------------')
    console.groupEnd('Inicio Migracion');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
  }
};
