//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Follow_controller = require('../controllers/FollowController');


router.post("/Seguir", Follow_controller.Follow_create); //Agregar
router.delete("/Seguir/:id", Follow_controller.Follow_delete); //Eliminar (recibe ID)
router.get("/Seguir/:id", Follow_controller.Follow_getByUser); //Buscar por ID

module.exports = router;