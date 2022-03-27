//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Like_controller = require('../controllers/LikeController');

router.post("/Like", Like_controller.Like_create); //Agregar
router.delete("/Like/:id", Like_controller.Like_delete); //Eliminar (recibe ID)
router.get("/Like/:id", Like_controller.Like_getByPost); //Buscar por publicación

module.exports = router;