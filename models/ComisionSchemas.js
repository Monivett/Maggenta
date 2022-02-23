const mongoose = require('mongoose');

const ComisionSchemas = new mongoose.Schema({
    _Type: {
        type: String,
        ref: "Precio",
        required: true
    },
    _Artist: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    ],
    _User:[
        {
            type: mongoose.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    ]
});

const Comision = mongoose.model("Comision", ComisionSchemas);
module.exports = Comision;