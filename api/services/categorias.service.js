const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class CategoriesService {
  constructor() {
    this.categories = [];
  }

  async create(data) {
    console.log(data);
    const result = await models.Categories.create(data);
    console.log(result);
    if (!result) {
      throw boom.conflict('No se pudo crear la categoria');
    }
    return result;
  }


  search() {
    const result = models.Categories.findAll();
    return result;
  }

  findOne(catId) {
    const result = models.Categories.findByPk(catId, {
      include: ['products']
    });
    if (!result) {
      throw boom.notFound('Categoria no encontrada');
    }
    return result;
  }

  async update(id, data) {
    const catId = await this.findOne(id);
    const result = await catId.update(data);
    return result;
  }

  async delete(id) {
    const catId = await this.findOne(id);
    const result = await catId.destroy(id);
    return result;
  }
}

module.exports = CategoriesService;
