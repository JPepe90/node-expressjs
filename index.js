const express = require('express');
const app =  express();
const port = 3000; // se sugiere crearlo del 3000 al 3005

app.get('/', (req, res) => {
  res.send('Hola, mi server en Express');
});

app.listen(port, () => {
  console.log('Escuchando en el puerto', port);
});
