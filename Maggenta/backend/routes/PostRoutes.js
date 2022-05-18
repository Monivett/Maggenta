//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Post_controller = require('../controllers/PostController');

router.get("/Publicacion", Post_controller.Post_getall);//Mostrar
router.post("/Publicacion", Post_controller.Post_create); //Agregar
router.put("/Publicacion/:id", Post_controller.Post_update); //Modificar (recibe ID)
router.delete("/Publicacion/:id", Post_controller.Post_delete); //Eliminar (recibe ID)
router.get("/Publicacion/usuario/:UserId", Post_controller.Post_getByUserId); //Buscar por ID del usuario
router.get("/Publicacion/:id", Post_controller.Post_getOne);// Mostrar un solo post por IdPost
router.get("/Publicacion/category/:id", Post_controller.Post_getByCategory);// Mostrar publicaciones por categorías
router.get("/Publicacion/publicacion/:id", Post_controller.Post_getByDescription);// Mostrar publicaciones por categorías
module.exports = router;