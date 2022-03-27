//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const User_controller = require('../controllers/UserController');

router.get("/Usuario", User_controller.User_getall);//Mostrar
router.post("/Usuario", User_controller.User_create); //Agregar
router.put("/Usuario/:id", User_controller.User_update); //Modificar (recibe ID)
router.delete("/Usuario/:id", User_controller.User_delete); //Eliminar (recibe ID)
router.get("/Usuario/:id", User_controller.User_getById); //Buscar por ID

module.exports = router;