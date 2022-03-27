const mongoose = require('mongoose');

const ShareSchemas = new mongoose.Schema({

    _User: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    ],
    _Post: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Publicacion",
            required: true
        }
    ]
});

const Share = mongoose.model("Compartido", ShareSchemas);
module.exports = Share;