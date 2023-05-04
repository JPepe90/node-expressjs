const express = require('express');
const passport = require('passport');

const OrderService = require('../services/orders.service');
const servicioOrders = new OrderService();

const router = express.Router();

// ###################################################################
// ENDPOINTS
// ###################################################################
// Endpoint con varios parametros dinamicos
router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  // checkRoles('admin', 'seller', 'customer'),
  async (req, res, next) => {
  try {
    const user = req.user;
    const result = await servicioOrders.findByUser(user.sub);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
