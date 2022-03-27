const mongoose = require('mongoose');

const CommentSchemas = new mongoose.Schema({
    Contenido: {
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
    _Post: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Publicacion",
            required: true
        }
    ]
});

const Comment = mongoose.model("Comentario", CommentSchemas);
module.exports = Comment;