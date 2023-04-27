const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const result = await models.Order.create(data);
    if (!result) {
      throw boom.conflict('Error al crear la orden de compra');
    }
    return result;
  }

  async addItem(data) {
    const order = await this.findOne(data.oid);
    const result = await models.OrderProduct.create(data);
    if (!result) {
      throw boom.conflict('Error al crear la orden de compra');
    }
    return result;
  }


  async find() {
    const result = await models.Order.findAll();
    return result;
  }

  async findOne(id) {
    const result = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (!result) {
      throw boom.notFound('No se ha encontrado la orden de compra');
    }
    return result;
  }

  async update(id, data) {
    const order = await this.findOne(id);
    const result = await order.update({...data, updatedAt: Date.now()});
    if (!result) {
      throw boom.conflict('Error al actualizar la orden de compra');
    }
    return result;
  }

  async delete(id) {
    const order = await this.findOne(id);
    const result = await order.destroy(id);
    return result;
  }
}

module.exports = OrderService;
