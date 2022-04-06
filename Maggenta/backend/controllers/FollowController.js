//PONEMOS LA FUNCIONALIDAD

const Follow = require("../models/FollowSchemas");

//INSERTAR
exports.Follow_create = async (req, res) => {
    const { body } = req;

    //Validaciónde  infoarmción
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

//DELETE
exports.Follow_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Followdb = await Follow.findById({id});
        
        if (Followdb) { //Proceso de actualizar

            const data = await Follow.deleteOne({_id: id});
            
            res.send({ message: "Seguido eliminado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "El usuario que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR USUARIO
exports.Follow_getByUser = async (req, res) => {
    const {id} = req.params;
    const data = await Follow.findById(id).populate();

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "El seguido no existe"})
    }
}