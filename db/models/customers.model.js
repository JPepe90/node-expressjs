const { Model, DataTypes, Sequelize } = require('sequelize');
const { USERS_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  surname: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  country: {
    allowNull: true,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  uid: {
    field: 'userUid',
    // allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USERS_TABLE,
      key: 'uid',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'update_at',
  }
}

class Customer extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'cid'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
