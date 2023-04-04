const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');
const { logErrors, errorHandler, boomHandler } = require('./middleware/error.handler')

const app =  express();
const port = process.env.PORT || 3000; // se sugiere crearlo del 3000 al 3005
app.use(express.json()); // middleware para recibir informacion en json enviada por post


// ----------------------------------------------
// Dominios a los que quiero darle acceso de CORS
const whiteList = ['http://localhost:3000'];
whiteList.push('http://localhost:8080');
whiteList.push('http://myapp.com');

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido desde', origin));
    }
  }
};

// NO FUNCIONA!
// app.use(cors(corsOptions)); // para usar cross origin resource sharing
// ----------------------------------------------

// -----
app.get('/api', (req, res) => {
  res.send('Hola, mi server en Express');
});

// -------------------------------------------------------
// Diferentes Endpoints o Rutas
app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// // -----
// // Endpoint usando faker
// app.get('/productos', (req, res) => {
//   // cantidad prod
//   const articles = Number(req.query.articles) || 5;
//   const prod = [];
//   for (i = 0; i < articles; i++) {
//     prod.push({
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price(), 10),
//       image: faker.image.imageUrl(),
//     });
//   }

//   res.json(prod);
// });

// // -----
// // Los Endpoints específicos deben estar codificados antes que los endpoints dinamicos
// // por ejemplo, /filter debe estar antes que /:id
// app.get('/productos/filter', (req, res) => {
//   // determinacion del id
//   res.send('Soy un endpoint con la misma ruta y filter!');
// });

// // -----
// // Endpoint por un solo parametro dinamico (ID)
// app.get('/productos/:id', (req, res) => {
//   // determinacion del id
//   const ident = Number(req.params.id);
//   const prod = products.filter(item => item.id === ident);

//   res.json(prod);
// });

// -----
// Endpoint con varios parametros dinamicos
// app.get('/categorias/:categoryId/productos/:productId', (req, res) => {
//   // determinacion del id
//   const { categoryId, productId} = req.params;
//   const prod = products.filter(item => item.id === Number(productId));

//   res.json({ categoryId,...prod });
//   // res.json(prod);
// });

// -----
// Endpoint con query params enviados directamente en la URL (pueden o no estar)
// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   } else {
//     res.send('No hay parametros!');
//   }
// });

// -------------------------------------------------------
// Puerto a escuchar

routerApi(app);

// -------------------------------------------------------
// Middlewares de tipo error. Van despues del routing
app.use(logErrors);
app.use(boomHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Escuchando en el puerto', port);
});
