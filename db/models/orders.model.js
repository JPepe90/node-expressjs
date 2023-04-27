const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customers.model');

const ORDERS_TABLE = 'orders';
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  cid: {
    field: 'customer_id',
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.INTEGER,
    reference: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  pid: {
    allowNull: true,
    autoIncrement: false,
    primaryKey: false,
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
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0)
      }
      return 0;
    }
  }
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'id',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'oid',
      otherKey: 'pid'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'Order',
      timestamp: false
    }
  }
}

module.exports = { ORDERS_TABLE, OrderSchema, Order };
