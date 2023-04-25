const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) { // debe tener los 4 parametros aunque no se usen para detectar que es un middleware de tipo de error
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomHandler(err, req, res, next) {
  console.log('boomHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      error: err.errors
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomHandler, ormErrorHandler }
