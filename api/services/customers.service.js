const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../../libs/sequelize');

class CustomerService {
  constructor() {
    this.customerBase = [];
  }

  async getAll() {
    const result = await models.Customer.findAll({
      include: ['user'], // asociacion con la tabla usuarios
    });
    return result;
  }

  async getOne(cid) {
    const result = await models.Customer.findByPk(cid, {
      include: ['user']
    });
    if (!result) {
      throw boom.notFound('Customer no encontrado');
    }
    return result;
  }

  async create(data) {
    const hashPw = await bcrypt.hash(data.user.password, 10);
    console.log(hashPw);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hashPw
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(cid, data) {
    const custmr = await this.getOne(cid);
    const result = await custmr.update(data);
    return result;
  }

  async delete(cid) {
    const custmr = await this.getOne(cid);
    const result = custmr.delete(cid);
    return result;
  }
}

module.exports = CustomerService;
