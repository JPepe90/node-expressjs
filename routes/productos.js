const express = require('express');
const faker = require('faker');
const router = express.Router();

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
// Endpoint usando faker
router.get('/', (req, res) => {
  // cantidad prod
  const articles = Number(req.query.articles) || 5;
  const prod = [];
  for (i = 0; i < articles; i++) {
    prod.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

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
router.get('/:id', (req, res) => {
  // determinacion del id
  const ident = Number(req.params.id);
  const prod = products.filter(item => item.id === ident);

  res.json(prod);
});


// -----------------------------------------------------------
// metodo: POST -----
router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
});

module.exports = router;
