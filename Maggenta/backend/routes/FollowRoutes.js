//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Follow_controller = require('../controllers/FollowController');


router.post("/Seguir", Follow_controller.Follow_create); //Agregar
router.delete("/Seguir/:follow/:follower", Follow_controller.Follow_delete); //Eliminar seguir al artista
router.get("/Seguir/:follow/:follower", Follow_controller.Follow_getFollower); //Buscar si el usuario actual ha seguido al artista
router.get("/Seguir/:user", Follow_controller.Follow_getFollows); //Buscar por seguidos del usuario
router.get("/Usuario/seguidores/:user", Follow_controller.Follow_getByUser); //Buscar por seguidores del artista




module.exports = router;