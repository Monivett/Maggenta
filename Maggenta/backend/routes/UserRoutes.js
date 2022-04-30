//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const User_controller = require('../controllers/UserController');

router.get("/Usuario", User_controller.User_getall);//Mostrar
router.post("/Usuario", User_controller.User_create); //Agregar
router.get("/Usuario/login/:correo/:password", User_controller.User_login); //Login
router.get("/Usuario/correo/:correo", User_controller.User_email); //Buscar por Correo
router.get("/Usuario/username/:username", User_controller.User_email); //Buscar por Correo
router.get("/Usuario/id/:id", User_controller.User_getById); //Buscar por ID
router.put("/Usuario/:id", User_controller.User_update); //Modificar (recibe ID)
router.delete("/Usuario/:id", User_controller.User_delete); //Eliminar (recibe ID)


module.exports = router;