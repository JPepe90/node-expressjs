const express = require('express');
const router = express.Router()

const CategoriesService = require('../services/categorias.service');
const categoryService = new CategoriesService();

const products = [{
  id: 1,
  name: 'Bicicleta',
  price: 1000
},
{
  id: 2,
  name: 'Totadora',
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
// Endpoint con varios parametros dinamicos
router.get('/:categoryId/productos/:productId', (req, res) => {
  // determinacion del id por categoria
  const { categoryId, productId } = req.params;
  const respuesta = categoryService.findOne(categoryId, productId);

  res.json({ productId,categoryId,...respuesta });
});

router.get('/:categoryId/productos', (req, res) => {
  // determinacion del id por categoria
  const categoryId = req.params.categoryId;
  const respuesta = categoryService.search(categoryId);

  res.json({ categoryId,...respuesta });
});

module.exports = router;
