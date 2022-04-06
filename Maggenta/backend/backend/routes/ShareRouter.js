//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Share_controller = require('../controllers/ShareController');

router.get("/Compartido", Share_controller.Share_getall);//Mostrar
router.post("/Compartido", Share_controller.Share_create); //Agregar
router.delete("/Compartido/:id", Share_controller.Share_delete); //Eliminar (recibe ID)
router.get("/Compartido/:id", Share_controller.Share_getByUser); //Buscar por usuario

module.exports = router;