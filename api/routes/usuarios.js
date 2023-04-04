const express = require('express');


// ###################################################################
// SERVICIOS - logica de negocio
// ###################################################################
const UsersService = require('../services/usuarios.service');
const validatorHandler = require('../middleware/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema');

const router = express.Router();
const servicioUsuarios = new UsersService();
servicioUsuarios.generate();

// ###################################################################
// ENDPOINTS
// ###################################################################
// Endpoint con query params enviados directamente en la URL (pueden o no estar)
router.get('/', (req, res) => {
  // const { limit, offset } = req.query;
  // if (limit && offset) {
  //   res.json({
  //     limit,
  //     offset
  //   });
  // } else {
  //   res.send('No hay parametros!');
  // }

  const datos = servicioUsuarios.getAll();
  if (datos) {
    res.status(200).json(datos);
  } else {
    res.status(409).json({
      message: 'Error durante el procesamiento de la solicitud'
    });
  }
});

router.get('/:uid',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
    try {
      const uid = req.params.uid;
      const usuario = servicioUsuarios.findOne({ uid: uid });
      res.status(200).json(usuario);
    } catch (error) {
      // res.status(404).json('Usuario no encontrado');
      next(error);
    }
  }
);

// -----
// POST
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  (req, res, next) => {
    try {
      const body = req.body;
      const newUser = servicioUsuarios.create(body);
      res.status(201).json({
        message: 'Usuario creado',
        data: newUser
      });
    } catch (error) {
      next(error);
    }
});
// -----

// -----
// PUT
router.put('/:uid',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res) => {
    try {
      const uid = req.params.uid;
      const body = req.body;
      const updateUser = servicioUsuarios.update(uid, body);
      res.status(200).json({
        message: 'Usuario Actualizado',
        data: updateUser
      });
    } catch (error) {
      next(error);
    }
  }
);
// -----

// -----
// DELETE
router.delete('/:uid',
  validatorHandler(getUserSchema, 'params'),
  (req, res) => {
    try {
      const uid = req.params.uid;
      const borrado = servicioUsuarios.delete(uid);
      res.status(200).json({
        message: 'Usuario borrado',
      });
    } catch (error) {
     next(error) ;
    }
  }
);
// -----

module.exports = router;
