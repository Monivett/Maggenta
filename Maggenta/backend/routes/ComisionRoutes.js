//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Comision_controller = require('../controllers/ComisionController');


router.post("/Comision", Comision_controller.Comision_create); //Agregar
router.get("/Comision/:user", Comision_controller.Comision_getByUser); //Buscar por artista
router.get("/Comision/:user/:id", Comision_controller.Comision_UserHasComision); //Buscar si te han pedido comisiones de este tipo
router.get("/Price/pedido/:user", Comision_controller.Comision_getPedidoByUser); //Buscar por artista
router.delete("/Comision/:id", Comision_controller.Comision_delete); //Eliminar (recibe ID)
module.exports = router;