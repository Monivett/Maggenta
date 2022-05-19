//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Rules_controller = require('../controllers/RulesController');

router.get("/Reglas", Rules_controller.Rules_getall);//Mostrar
router.post("/Reglas", Rules_controller.Rules_create); //Agregar
router.put("/Reglas/:id", Rules_controller.Rules_update); //Agregar
router.delete("/Reglas/:id", Rules_controller.Rules_delete); //Eliminar (recibe ID)
router.get("/Reglas/:id", Rules_controller.Rules_getByUser); //Buscar por usuario

module.exports = router;