const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// Conexion con postgres
// const pool = require('../../libs/postgres.pool') // La reemplazamos por sequelize
const { models } = require('../../libs/sequelize');

class UsersService {
  constructor() {
    this.usersBase = [];
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
    const hashPw = await bcrypt.hash(data.password, 10); // Encriptando la pw
    const newUser = {
      ...data,
      password: hashPw,
      // createdAt: Date.now()
    };
    const result = await models.User.create(newUser);
    delete newUser.password; // elimino el pw de la respuesta de la api
    return newUser;
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
      attributes: {exclude: ['password', 'recoveryToken']},
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
    delete usr.dataValues.recoveryToken;
    delete usr.dataValues.password;
    return usr.dataValues;
  }

  async findUid(uid) {
    const userid = await models.User.findByPk(uid);
    if (!userid) {
      throw boom.unauthorized();
    }
    return userid;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({where: { email: email }});
    if (!user) {
      throw boom.unauthorized(); // no es buena practica informar que no se encontro el mail
    }
    return user;
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
