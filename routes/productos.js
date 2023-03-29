const express = require('express');
// const faker = require('faker');

// Servicios - logica de negocio
const ProductsService = require('../services/productos.service');
const validatorHandler = require('../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, } = require('../schemas/products.schema')

const router = express.Router();
const servicioProductos = new ProductsService();
servicioProductos.generate();

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

// -----
// Endpoint usando faker
router.get('/', async (req, res) => {
  // Llamo al servicio que tiene la logica de negocio
  const prod = await servicioProductos.search();
  res.json(prod);
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
    const ident = req.params.id;
    const prod = await servicioProductos.findOne(ident);
    res.status(200).json(prod);
  } catch (error) {
    // res.status(404).json({
    //   message: error.message
    // });
    next(error); // ejecucion del middleware de error
  }
});

// ***********************************************************
// -----------------------------------------------------------
// CREACION --------------------------------------------------
// Metodo: POST -----
router.post('/', async (req, res) => {
  const body = req.body;
  const create = await servicioProductos.create(body);
  if (create) {
    res.status(201).json({
      message: 'created',
      data: body
    });
  } else {
    res.status(409).json({
      message: 'Error en alguno de los parametros enviados o incompletos'
    });
  }
});


// -----------------------------------------------------------
// ACTUALIZACION ---------------------------------------------
// Metodo: PATCH -----
router.patch('/:id', async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;

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
});
// Metodo: PUT -----
router.put('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;

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
});


// -----------------------------------------------------------
// BORRADO ---------------------------------------------------
// Metodo: DELETE -----
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const respuesta = await servicioProductos.delete(id);
  if (respuesta) {
    res.json({
      message: 'deleted',
      id
    });
  } else {
    res.status(409).json({
      message: 'El producto indicado no fue encontrado'
    })
  }

});
// -----------------------------------------------------------
// ***********************************************************


module.exports = router;

