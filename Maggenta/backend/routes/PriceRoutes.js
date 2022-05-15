//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Price_controller = require('../controllers/PriceController');

router.get("/Precio", Price_controller.Price_getall);//
router.post("/Precio", Price_controller.Price_create); //Agregar
router.put("/Precio/:id", Price_controller.Price_update); //Modificar (recibe ID)
router.delete("/Precio/:id", Price_controller.Price_delete); //Eliminar (recibe ID)
router.get("/Precio/:username", Price_controller.Price_getByUser); //Buscar por username

module.exports = router;