const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middleware/validator.handler');
const { getUserSchema } = require('../schemas/users.schema');
const AuthService = require('../services/auth.service');
const { valid } = require('joi');
const servicioAuth = new AuthService();

const router = express.Router();
// ###################################################################
// ENDPOINTS
// ###################################################################
router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = servicioAuth.signToken(user);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/pass-recovery',
  validatorHandler(getUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await servicioAuth.sendRecoveryPassword(email);
      res.json({ result });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/pass-change',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const result = await servicioAuth.passChange(token, newPassword);
      res.json({ result });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
