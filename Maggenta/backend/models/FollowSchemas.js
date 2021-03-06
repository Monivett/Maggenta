const mongoose = require('mongoose');

const FollowSchemas = new mongoose.Schema({

    _UserFollow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
    ,
    _UserFollower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }

});

const Follow = mongoose.model("Seguir", FollowSchemas);
module.exports = Follow;