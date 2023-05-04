const express = require('express');
const passport = require('passport');
const OrderService = require('../services/orders.service');
const validatorHandler = require('../middleware/validator.handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/orders.schema');
// const { createServer } = require('mysql2');
const { checkRoles } = require('../middleware/auth.handler');
const router = express.Router();
const servicioOrders = new OrderService();

// ###################################################################
// ENDPOINTS
// ###################################################################
router.get('/',
  async (req, res, next) => {
  // Llamo al servicio que tiene la logica de negocio
  try {
    const result = await servicioOrders.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// -----
// Endpoint por un solo parametro dinamico (ID)
router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await servicioOrders.findOne(id);
      res.status(200).json(result);
    } catch (error) {
      next(error); // ejecucion del middleware de error
    }
  }
);

// ***********************************************************
// -----------------------------------------------------------
// CREACION --------------------------------------------------
// Metodo: POST -----
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin','customer','seller'),
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log(user);
      const userInfo = await servicioOrders.findByUser(user.sub);
      const newOrder = await servicioOrders.create({ cid: userInfo[0].cid });
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newItem = await servicioOrders.addItem(data);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

// -----------------------------------------------------------
// ACTUALIZACION ---------------------------------------------
// Metodo: PATCH -----
router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'), // validaque el elemento exista
  validatorHandler(updateOrderSchema, 'body'), // hace las verificaciones de los parametros del body
  async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    try {
      const result = await servicioOrders.update(id, data);
      res.status(200).json({
        message: 'parcial update',
        success: result,
        data: data,
        id
      });
    } catch (error) {
      next(error);
    }
  }
);
// Metodo: PUT -----
router.put('/:id',
  validatorHandler(getOrderSchema, 'params'), // validaque el elemento exista
  validatorHandler(updateOrderSchema, 'body'), // hace las verificaciones de los parametros del body
  async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    try {
      const result = await servicioOrders.update(id, data);
      res.status(200).json({
        message: 'parcial update',
        success: result,
        data: data,
        id
      });
    } catch (error) {
      next(error);
    }
  }
);

// -----------------------------------------------------------
// BORRADO ---------------------------------------------------
// Metodo: DELETE -----
router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await servicioOrders.delete(id);
    res.status(200).json({
      message: 'deleted',
      data: result,
      id
    });
  } catch (error) {
    next(error);
  }
});
// -----------------------------------------------------------
// ***********************************************************

module.exports = router;


