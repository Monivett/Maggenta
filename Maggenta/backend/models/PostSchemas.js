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
    ],
    _Comentarios:[ // los comentarios de esta publicacion
        {
            type: mongoose.Types.ObjectId,
            ref:"Comentario"
        }
    ]
});

const Post = mongoose.model("Publicacion", PostSchemas);
module.exports = Post;