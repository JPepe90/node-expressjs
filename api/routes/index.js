const productsRouter = require('./productos');
const categoriesRouter = require('./categorias');
const usersRouter = require('./usuarios');
const customersRouter = require('./customers');
const ordersRouter = require('./orders');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const express = require('express');

function routerApi(app) {
  // solucion directa subrutas /api/vi
  // app.use('/api/v1/productos', productsRouter);
  // app.use('/api/v1/categorias', categoriesRouter);
  // app.use('/api/v1/usuarios', usersRouter);

  // solucion modular express para suburas
  const router = express.Router();
  app.use('/api/v1', router); // path global para los rutas debajo
  router.use('/productos', productsRouter);
  router.use('/categorias', categoriesRouter);
  router.use('/usuarios', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
