const mongoose = require('mongoose');

const LikeSchemas = new mongoose.Schema({
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

const Likes = mongoose.model("Like", LikeSchemas);
module.exports = Likes;