//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Comision_controller = require('../controllers/ComisionController');


router.post("/Comision", Comision_controller.Comision_create); //Agregar
router.get("/Comision/:id", Comision_controller.Comision_getByUser); //Buscar por artista

module.exports = router;