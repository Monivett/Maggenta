//DEFINIMOS SI VA A SER GET O POST Y LO CONECTAMOS AL CONTROLLER

const express = require('express');
const router = express.Router();

const Chats_controller = require('../controllers/ChatsController');

router.post("/Chat", Chats_controller.Chats_create); //Agregar
router.get("/Chat/:receiver/:sender", Chats_controller.Chats_getByUser); //Login


module.exports = router;