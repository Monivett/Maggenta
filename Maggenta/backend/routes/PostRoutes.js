//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Post_controller = require('../controllers/PostController');

router.get("/Publicacion", Post_controller.Post_getall);//Mostrar
router.post("/Publicacion", Post_controller.Post_create); //Agregar
router.put("/Publicacion/:id", Post_controller.Post_update); //Modificar (recibe ID)
router.delete("/Publicacion/:id", Post_controller.Post_delete); //Eliminar (recibe ID)
router.get("/Publicacion/:id", Post_controller.Post_getById); //Buscar por ID

router.get("/Publicacion/usuario/:UserId", Post_controller.Post_getByUserId); //Buscar por ID

module.exports = router;