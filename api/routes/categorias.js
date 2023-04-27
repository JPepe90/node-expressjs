const express = require('express');

const CategoriesService = require('../services/categorias.service');
const validatorHandler = require('../middleware/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');
const { valid } = require('joi');

const router = express.Router()
const categoryService = new CategoriesService();

// ###################################################################
// ENDPOINTS
// ###################################################################
// Endpoint con varios parametros dinamicos
router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await categoryService.findOne(id);
    res.status(200).json(categories);
  } catch (error) {
    res.status(409).json({
      message: 'Error en el procesamiento de la solicitud'
    });
  }
});

router.get('/',
  async (req, res) => {
  try {
    const categories = await categoryService.search();
    res.status(200).json(categories);
  } catch (error) {
    res.status(409).json({
      message: 'Error en el procesamiento de la solicitud'
    });
  }
});

// Metodo: POST -----
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newCategory = await categoryService.create(data);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

// Metodo: PUT -----
router.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const updateCat = await categoryService.update(id, data);
      res.status(200).json({
        message: 'Categoria actualizada',
        data: updateCategorySchema
      });
    } catch (error) {
      // res.status(409).json({
      //   message: 'Error al actualizar la categoria',
      //   error: error
      // });
      next(error);
    }
  }
);

// Metodo: DELETE -----
router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    const id = req.params.id;
    try {
      const deleteCat = await categoryService.delete(id);
      res.status(200).json({
        message: 'Categoria borrada',
        data: deleteCat
      });
    } catch (error) {
      res.status(409).json({
        message: 'Falla en el borrado de la categoria',
        error: error
      });
    }
  }
);

module.exports = router;
