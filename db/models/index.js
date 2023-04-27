const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./products.model');
const { Customer, CustomerSchema } = require('./customers.model');
const { Categories, CategoriesSchema } = require('./categories.model');
const { Order, OrderSchema } = require('./orders.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models); // asociacion 1 a 1 con users
  Categories.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  // OrderProduct.associate(sequelize.models); // asociaciones muchos a muchos
}

module.exports = setupModels;
