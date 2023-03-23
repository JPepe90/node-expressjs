const express = require('express');
const router = express.Router()

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
  // determinacion del id
  const { categoryId, productId} = req.params;
  const prod = products.filter(item => item.id === Number(productId));

  res.json({ categoryId,...prod });
  // res.json(prod);
});

module.exports = router;
