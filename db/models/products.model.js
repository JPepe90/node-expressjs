const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIES_TABLE } = require('./categories.model');

const PRODUCTS_TABLE = 'products';
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.INTEGER
  },
  image: {
    allowNull: true,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  categoryId: {
    field: 'category_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    references: {
      model: CATEGORIES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  description: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.TEXT
  },
  isBlock: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    field: 'is_block',
    type: DataTypes.BOOLEAN
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

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Categories, {
      as: 'categories',
      foreignKey: 'id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamp: false
    }
  }
}

module.exports = { PRODUCTS_TABLE, ProductSchema, Product };
