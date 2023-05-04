const jwt = require('jsonwebtoken');

const secret = 'myCat'; // PONER COMO VARIABLE DE ENTORNO
const payload = {
  sub: 1, // estandar minimo
  role: 'customer' // parametros agregados. Puedo poner los que quiera
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
