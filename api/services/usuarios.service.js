const boom = require('@hapi/boom');
// const faker = require('@faker-js/faker').faker; // import para el metodo generate de practicas

// Conexion con postgres
// const pool = require('../../libs/postgres.pool') // La reemplazamos por sequelize
const { models } = require('../../libs/sequelize');

class UsersService {
  constructor() {
    this.usersBase = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    //(desuso) Generar array con info para practicas con faker
    for (let i = 0; i < 50; i++) {
      this.usersBase.push({
        uid: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newUser = {
      ...data,
      createdAt: Date.now()
    };
    const result = await models.User.create(newUser);
    return result;
  }

  async getAll() {
    // Metodo por query con sequelize
    // const query = 'SELECT * FROM users'
    // const [data, metadata] = await sequelize.query(query);
    // return {
    //   data,
    //   metadata
    // };

    // Metodo con ORM con sequelize
    const result = models.User.findAll({
      include: ['customer'],
    });
    return result;
  }

  async search(param) { // NO UTILIZADA!
    const params = param;
    const llaves = Object.keys(params);
    const valores = Object.values(params);

    const result = this.usersBase.filter(e => {
      return llaves.every(v => {
        return valores.includes(e[v]);
      });
    });
    return result;
  }

  async findOne(param) {
    const clave = Object.keys(param)[0];
    console.log({param,clave,valor: param[clave]});
    let usr;
    switch (clave){
      case 'uid':
        usr = await this.findUid(param[clave]);
      break;
      case 'email':
        usr = await models.User.findOne({where:param});
      break;
      default:
        throw boom.conflict('La busqueda especifica debe hacerse por ID o email');
    }
    return usr.dataValues;
  }

  async findUid(uid) {
    const userid = await models.User.findByPk(uid);
    if (!userid) {
      throw boom.notFound('Usuario no encontrado');
    }
    return userid;
  }

  async update(uid, data) {
    const userid = await this.findUid(uid);
    const rta = await userid.update(data);
    return rta;
  }

  async delete(uid) {
    const userid = await this.findUid(uid);
    const rta = await userid.destroy(uid);
    return rta;
  }
}

module.exports = UsersService;
