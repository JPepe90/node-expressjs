const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const UserService = require('./usuarios.service');
const userService = new UserService();


class AuthService {
  contructor() {}

  async getUserLocal(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    let userId;
    if (user.id) {
      userId = user.id;
    } else {
      userId = user.uid;
    }
    const payload = {
      sub: userId,
      username: user.username,
      email: user.email,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async getUserByEmail(email) {
    const result = userService.findByEmail(email);
    if (!result) {
      throw boom.unauthorized();
    }
    return result;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.mailUser,
        pass: config.mailPassword // gmail
      }
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }

  async sendRecoveryPassword(email) {

    const user = await this.getUserByEmail(email);
    console.log(user.dataValues);
    const payloadRecovery = {
      sub: user.uid,
    };
    const tokenRecovery = jwt.sign(payloadRecovery, config.jwtSecretRecovery, {expiresIn: '15min'});
    const recoveryLink = `http:localhost:3000/recovery?token=${tokenRecovery}`;
    await userService.update(user.uid, { recoveryToken: tokenRecovery });

    const infoMail = {
      from: 'javier.pepe90@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email de recuperacion de contraseña", // Subject line
      html: `<b>Ingresa a este link para recuperar la contraseña => </b><br>
              <a href:"${recoveryLink}">${recoveryLink}</a>`, // html body
    };

    const result = await this.sendMail(infoMail);
    if (!result) {
      throw boom.conflict('Problemas con el envío de mail')
    }
    return result;
  }

  async passChange(token, newPassword) {
    console.log(token);
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      console.log(payload);
      const user = await userService.findUid(payload.sub); // Este metodo informa si no se encuentra el usuario
      console.log(user);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hashPw = await bcrypt.hash(newPassword, 10);
      await userService.update(user.uid, {
        password: hashPw,
        recoveryToken: null
      });
      return { message: 'Password modificado' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}



module.exports = AuthService;
