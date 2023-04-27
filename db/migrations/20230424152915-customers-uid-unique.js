'use strict';
const { DataTypes } = require('sequelize');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customers.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userUid', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
