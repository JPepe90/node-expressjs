'use strict';

const { UserSchema, USERS_TABLE } = require('../models/user.model');
const { ProductSchema, PRODUCTS_TABLE } = require('../models/products.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USERS_TABLE, UserSchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USERS_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
  }
};
