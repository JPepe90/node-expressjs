const boom = require('@hapi/boom');
const faker = require('@faker-js/faker').faker;
// const { object } = require('joi');

class UsersService {
  constructor() {
    // this.uid,
    // this.username,
    // this.email,
    // this.isBlock
    this.usersBase = [];
  }

  generate() {
    for (let i = 0; i < 50; i++) {
      this.usersBase.push({
        uid: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
    // console.log(this.usersBase);
  }

  create(data) {
    /*
    uid
    username
    email
    */
    const newUser = {
      uid: faker.datatype.uuid(),
      ...data
    };
    this.usersBase.push(newUser);

    return newUser;
  }

  getAll() {
    return this.usersBase;
  }

  search(param) {
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

  findOne(param) {
    const clave = Object.keys(param)[0];
    if (clave === 'username'){
      throw boom.conflict('La busqueda especifica debe hacerse por ID o email');
    }

    const user = this.usersBase.find(item => item[clave] === param[clave]);
    if (user){
      return user;
    } else {
      throw boom.notFound('Usuario no encontrado');
    }
  }

  update(uid, data) {
    const userIndex = this.usersBase.findIndex(item => item.uid === uid);

    if (userIndex === -1) {
      throw boom.notFound('Usuario no encontrado');
    }

    const user = this.usersBase[userIndex];
    this.usersBase[userIndex] = {
      ...user,
      ...data,
    }
    return this.usersBase[userIndex];
  }

  delete(uid) {
    const userIndex = this.usersBase.findIndex(item => item.uid === uid);

    if (userIndex >= 0) {
      this.usersBase.splice(userIndex, 1);
      return true;
    } else {
      throw boom.notFound('Usuario no encontrado');
    }
  }
}

module.exports = UsersService;
