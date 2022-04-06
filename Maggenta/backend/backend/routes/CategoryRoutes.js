//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Category_controller = require('../controllers/CategoryController');

router.get("/Categoria", Category_controller.Category_getall);//Mostrar
router.post("/Categoria", Category_controller.Category_create); //Agregar
router.put("/Categoria/:id", Category_controller.Category_update); //Modificar (recibe ID)
router.delete("/Categoria/:id", Category_controller.Category_delete); //Eliminar (recibe ID)
router.get("/Categoria/:id", Category_controller.Category_getById); //Buscar por ID

module.exports = router;