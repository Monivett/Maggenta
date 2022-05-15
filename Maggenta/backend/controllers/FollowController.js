//PONEMOS LA FUNCIONALIDAD

const Follow = require("../models/FollowSchemas");

//INSERTAR
exports.Follow_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newFollow = new Follow(body);
    await newFollow.save()
        .then((newObject) => console.log("Has seguido al artista", newObject))
        .catch((err) => {
            console.log("Error: No se pudo seguir al artista", err)
            res.send(err.errors)
        }
        );

    res.send(newFollow);
};

//NO SE PUEDEN MODIFICAR LOS SEGUIDOS

//MOSTRAR SI EL USUARIO LOGEADO HA SEGUIDO AL ARTISTA INGRESADO
exports.Follow_getFollower = async (req, res) => {
    const { follow } = req.params;
    const { follower } = req.params;
    const data = await Follow.find({ _UserFollow: follow, _UserFollower: follower });

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "No has seguido a este usuario" })
    }
}
//DELETE
exports.Follow_delete = async (req, res) => {
    const { follow } = req.params;
    const { follower } = req.params;

    try {
        const Followdb = await Follow.find({ _UserFollow: follow, _UserFollower: follower });

        if (Followdb) { //Proceso de actualizar

            const data = await Follow.deleteOne({ _UserFollow: follow, _UserFollower: follower });

            res.send({ message: "Seguido eliminado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "El usuario que intentas dejar de seguir no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR SEGUIDORES DEL ARTISTA
exports.Follow_getByUser = async (req, res) => {
    const { user } = req.params;
    const data = await Follow.find( {_UserFollower: user}).populate("_UserFollow");

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "No te sigue nadie" })
    }
}

//MOSTRAR POR SEGUIDORES DEL ARTISTA
exports.Follow_getFollows = async (req, res) => {
    const { user } = req.params;
    const data = await Follow.find( {_UserFollow: user}).populate("_UserFollower");

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "No sigues a nadie" })
    }
}