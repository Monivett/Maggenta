//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Comment_controller = require('../controllers/CommentController');

router.post("/Publicacion/:id", Comment_controller.Comment_create); //Agregar
router.put("/Comentario/:id", Comment_controller.Comment_update); //Modificar (recibe ID)
router.delete("/Comentario/:id", Comment_controller.Comment_delete); //Eliminar (recibe ID)
router.get("/Comentario/:id", Comment_controller.Comment_getByPost); //Buscar por publicación


module.exports = router;