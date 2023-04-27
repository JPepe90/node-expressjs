const { Model, DataTypes, Sequelize } = require('sequelize');

const USERS_TABLE = 'users';
const UserSchema = {
  uid: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  username: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    unique: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  image: {
    allowNull: true,
    autoIncrement: false,
    primaryKey: false,
    type: DataTypes.STRING
  },
  isBlock: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: false,
    field: 'is_block',
    type: DataTypes.BOOLEAN
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'uid'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USERS_TABLE, UserSchema, User };
