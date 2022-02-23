const mongoose = require('mongoose');

const PriceSchemas = new mongoose.Schema({
    Tipo:
    {
        type: String,
        required: true
    },
    Precio:
    {
        type: String,
        required: true
    },
    _User: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    ]
});

const Price = mongoose.model("Precio", PriceSchemas);
module.exports = Price;