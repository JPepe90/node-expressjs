const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDERS_TABLE } = require('./orders.model');
const { PRODUCTS_TABLE } = require('./products.model');

const ORDER_PRODUCT_TABLE = 'orders_products';
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  oid: {
    field: 'order_id',
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.INTEGER,
    reference: {
      model: ORDERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  pid: {
    field: 'product_id',
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.INTEGER,
    reference: {
      model: PRODUCTS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    field: 'update_ap',
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
};

class OrderProduct extends Model {
  static associate(models) {
    // this.belongsTo(models.Customer, {
    //   as: 'customer',
    //   foreignKey: 'id',
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamp: false
    }
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
