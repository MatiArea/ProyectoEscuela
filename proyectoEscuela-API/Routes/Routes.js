var express = require('express');
var router = express.Router();

var notificacionController = require('./../controllers/Notificacion-Controller.js');
var welcomerController= require('./../controllers/Welcomer-Controller.js');

router.get('/login' , notificacionController.pruebaPrincipal);
router.get('/river', notificacionController.riverPlate);
router.get('/', welcomerController.bienvenido);

module.exports = router

