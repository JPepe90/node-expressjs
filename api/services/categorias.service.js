const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class CategoriesService {
  constructor() {
    //
  }

  async create(data) {
    const result = await models.Category.create(data);
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
    const result = models.Categories.findByPk(catId);
    if (!result) {
      throw boom.notFound('Categoria no encontrada');
    }
    return result;
  }

  async update(id, data) {
    const catId = await this.models.Categories.findOne(id);
    const result = await models.Categories.update(data);
    return result;
  }

  async delete(id) {
    const catId = await this.findOne(id);
    const result = await this.Categories.destroy(id);
    return result;
  }
}

module.exports = CategoriesService;
