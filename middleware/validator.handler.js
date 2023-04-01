const boom = require('@hapi/boom');

// funcion que retorna otra funcion
function validationHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    // abortEarly hace que me devuelva todos los errores de validacion al mismo tiempo
    // si no falla el primero y corta la ejecucion
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validationHandler;
