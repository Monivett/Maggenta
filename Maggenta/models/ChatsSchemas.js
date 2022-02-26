const mongoose = require('mongoose');

const ChatSchemas = new mongoose.Schema({
    Mensaje: {
        type: String,
        required: true
    },
    _UserSender: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    ],
    _UserReceiver:[
        {
            type: mongoose.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    ]
});

const Chats = mongoose.model("Chat", ChatSchemas);
module.exports = Chats;