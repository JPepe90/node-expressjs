const boom = require('@hapi/boom');

// funcion que retorna otra funcion
function validationHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);

    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validationHandler;
