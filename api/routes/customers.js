const express = require('express');

const CustomerService = require('../services/customers.service');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customers.schema');
const validatorHandler = require('../middleware/validator.handler');
const { CustomerSchema } = require('../../db/models/customers.model');
const router = express.Router();
const servicioCustomers = new CustomerService();

// ###################################################################
// ENDPOINTS
// ###################################################################
router.get('/', async (req, res) => {
  try {
    const datos = await servicioCustomers.getAll();
    res.status(200).json(datos);
  } catch (error) {
    res.status(409).json({
      message: error
    });
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const datos = await servicioCustomers.getOne(id);
      res.status(200).json(datos);
    } catch (error) {
      res.status(404).json({
        message: error
      });
      next(error);
    }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newCustomer = await servicioCustomers.create(data);
      res.status(201).json({
        message: 'Customer creado',
        data: data
      });
    } catch (error) {
      next(error);
    }
});

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await servicioCustomers.update(id, data);
      res.status(200).json({
        message: 'Usuario actualizado',
        data: data
      });
    } catch (error) {
      res.status(409).json({
        message: error
      });
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await servicioCustomers.delete(id);
      res.status(200).json({
        message: 'Usuario borrado'
      });
    } catch (error) {
      res.status(409).json({
        message: error
      });
      next(error);
    }
});

module.exports = router;
