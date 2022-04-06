//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Price_controller = require('../controllers/PriceController');

router.post("/Precio", Price_controller.Price_create); //Agregar
router.put("/Precio/:id", Price_controller.Price_update); //Modificar (recibe ID)
router.delete("/Precio/:id", Price_controller.Price_delete); //Eliminar (recibe ID)
router.get("/Precio/:id", Price_controller.Price_getByUser); //Buscar por ID

module.exports = router;