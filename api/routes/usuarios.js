const express = require('express');
const router = express.Router();
// -----
// Endpoint con query params enviados directamente en la URL (pueden o no estar)
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros!');
  }
});

module.exports = router;
