const mongoose = require('mongoose');

const RulesSchemas = new mongoose.Schema({

    _User:
    {
        type: mongoose.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    SiDibujo:
    {
        type: String,
        required: true
    },
    NoDibujo:
    {
        type: String,
        required: true
    },
    Extra:
    {
        type: String,
        required: false
    }

});

const Rules = mongoose.model("Reglas", RulesSchemas);
module.exports = Rules;