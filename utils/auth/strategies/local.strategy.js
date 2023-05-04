const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const AuthService = require('./../../../api/services/auth.service');
const servicioAuth = new AuthService();
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (username, password, done) => {
  try {
    const userData = await servicioAuth.getUserLocal(username, password);
    done(null, userData);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;
