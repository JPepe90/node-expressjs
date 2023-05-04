'use strict';
const { UserSchema, USERS_TABLE } = require('../models/user.model');
const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.group('Inicio Migracion -----------------');
    console.log('Tabla:', USERS_TABLE);
    console.log('Creando columna en Users...');
    await queryInterface.addColumn(USERS_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    });
    console.log('Migracion Finalizada -----------------')
    console.groupEnd('Inicio Migracion');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USERS_TABLE, 'recovery_token');
  }
};
