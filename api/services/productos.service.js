// const faker = require('@faker-js/faker').faker;
const boom = require('@hapi/boom');

// const sequelize = require('../../libs/sequelize');
const { models } = require('../../libs/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    // this.generate();
  }

  // metodos
  generate() { //desuso
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        category: faker.commerce.product(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const result = await models.Product.create(data);
    return result;
  }

  async search() {
    // Metodo query con sequelize
    // const query = 'select * from products';
    // const [data, metadata] = await sequelize.query(query);
    // return data;

    const result = models.Product.findAll({
      include: ['categories']
    });
    return result;
  }

  async findOne(id) {
    const result = await models.Product.findByPk(id);
    if (!result) {
      throw boom.notFound('Producto no encontrado');
    }
    return result;
  }

  async update(id, data) {
    const product = await this.findOne(id);
    const updateProd = await product.update(data);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    return updateProd;
  }

  async delete(id) {
    const product = await this.findOne(id);
    const deleteProd = await product.destroy(id);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    return deleteProd;
  }
}

module.exports = ProductsService;
