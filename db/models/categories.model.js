const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIES_TABLE = 'categories';
const CategoriesSchema = {
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
    unique: true,
    type: DataTypes.STRING
  },
  image: {
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
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'update_at',
  }
};

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categories',
      timestamp: false
    }
  }
}

module.exports = { CATEGORIES_TABLE, CategoriesSchema, Categories };
