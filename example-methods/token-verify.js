const jwt = require('jsonwebtoken');

const secret = 'myCat'; // PONER COMO VARIABLE DE ENTORNO
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4MzA0NTQzOX0.QLa54XJu087iQLcLcqM6gw7F1OdftNW3Uryaec_uh5A';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
