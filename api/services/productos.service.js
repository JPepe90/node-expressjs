const faker = require('@faker-js/faker').faker;
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
  }

  // metodos
  generate() {
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
    // validaciones
    if (!data.name || data.name === "") { return false; }
    if (!data.price || data.price === 0) { return false; }
    if (!data.category || data.category === "") {
      return false;
    } else {
      const newProd = {
        id: faker.datatype.uuid(),
        ...data
      };
      this.products.push(newProd);
      return true;
    }
  }

  search() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1500);
    })
  }

  async findOne(id) {
    const article = this.products.find(item => item.id === id);
    if (article) {
      if (article.isBlock) {
        throw boom.conflict('El producto esta bloqueado');
      }
      return article;
    } else {
      throw boom.notFound('Producto no encontrado');
    }
  }

  async update(id, data) {
    const prodIndex = this.products.findIndex(item => item.id === id);
    if (prodIndex === -1) {
      // throw new Error('Producto no encontrado');
      throw boom.notFound('Producto no encontrado');
    }

    const prod = this.products[prodIndex];
    this.products[prodIndex] = {
      ...prod,
      ...data
    };
    return true;
  }

  async delete(id) {
    const prodIndex = this.products.findIndex(item => item.id === id);
    if (prodIndex >= 0) {
      this.products.splice(prodIndex, 1);
      return true;
    } else {
      throw boom.notFound('Producto no encontrado');
    }
  }
}

module.exports = ProductsService;
