const express = require('express');

// ###################################################################
// SERVICIOS - logica de negocio
// ###################################################################
const ProductsService = require('../services/productos.service');
const validatorHandler = require('../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, } = require('../schemas/products.schema')

const router = express.Router();
const servicioProductos = new ProductsService();

const products = [{
  id: 1,
  name: 'Bicicleta',
  price: 1000
},
{
  id: 2,
  name: 'Tostadora',
  price: 800
},
{
  id: 3,
  name: 'Mouse',
  price: 350
},
{
  id: 4,
  name: 'Auriculares BT',
  price: 600
}];

// ###################################################################
// ENDPOINTS
// ###################################################################
router.get('/', async (req, res, next) => {
  // Llamo al servicio que tiene la logica de negocio
  try {
    const prod = await servicioProductos.search();
    res.status(200).json(prod);
  } catch (error) {
    next(error);
  }
});

// -----
// Los Endpoints específicos deben estar codificados antes que los endpoints dinamicos
// por ejemplo, /filter debe estar antes que /:id
router.get('/filter', (req, res) => {
  // determinacion del id
  res.send('Soy un endpoint con la misma ruta y filter!');
});

// -----
// Endpoint por un solo parametro dinamico (ID)
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  // determinacion del id
    try {
      const id = req.params.id;
      const prod = await servicioProductos.findOne(id);
      res.status(200).json(prod);
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
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await servicioProductos.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

// -----------------------------------------------------------
// ACTUALIZACION ---------------------------------------------
// Metodo: PATCH -----
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'), // validaque el elemento exista
  validatorHandler(updateProductSchema, 'body'), // hace las verificaciones de los parametros del body
  async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    try {
      const respuesta = await servicioProductos.update(id, body);
      res.status(200).json({
        message: 'parcial update',
        success: respuesta,
        data: body,
        id
      });
    } catch (error) {
      next(error);
    }
  }
);
// Metodo: PUT -----
router.put('/:id',
  validatorHandler(getProductSchema, 'params'), // validaque el elemento exista
  validatorHandler(updateProductSchema, 'body'), // hace las verificaciones de los parametros del body
  async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    try {
      const respuesta = await servicioProductos.update(id, body);
      res.status(200).json({
        message: 'parcial update',
        success: respuesta,
        data: body,
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
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  const id = req.params.id;
  try {
    const respuesta = await servicioProductos.delete(id);
    res.status(200).json({
      message: 'deleted',
      id
    });
  } catch (error) {
    next(error);
  }
});
// -----------------------------------------------------------
// ***********************************************************

module.exports = router;

