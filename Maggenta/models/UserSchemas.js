const mongoose = require('mongoose');

const UserSchemas = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    Usuario: {
        type: String,
        required: true
    },
    Correo:
    {
        type: String,
        required: true,
        unique: true
    },
    Contraseña:
    {
        type: String,
        required: true,
        minlength: 8,
    },
    FechaNac:
    {
        type: String,
        required: true
    },
    Foto:
    {
        type: String,
        required: true
    }
});

const User = mongoose.model("Usuario", UserSchemas);
module.exports = User;