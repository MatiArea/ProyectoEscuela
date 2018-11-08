var express = require('express');
var router = express.Router();

var notificacionController = require('./../controllers/Notificacion-Controller.js');

router.get('/login' , notificacionController.pruebaPrincipal);
router.get('/', function(req, res) {
    console.log('Bienvenido a app.js')
  });

module.exports = router

