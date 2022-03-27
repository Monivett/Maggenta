const mongoose = require('mongoose');

const PostSchemas = new mongoose.Schema({
    Contenido: {
        type: String
    },
    Imagen: {
        type: String,
        required: true
    },
    _User: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Usuario",
            required: true
        }
    ],
    _Category: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Categoria"
        }
    ]
});

const Post = mongoose.model("Publicacion", PostSchemas);
module.exports = Post;