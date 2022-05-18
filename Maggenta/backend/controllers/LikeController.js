//PONEMOS LA FUNCIONALIDAD

const Like = require("../models/LikeSchemas");

//INSERTAR
exports.Like_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newLike = new Like(body);
    await newLike.save()
        .then((newObject) => console.log("Se ha insertado el Like", newObject))
        .catch((err) => {
            console.log("Error: No se pudo insertar el Like", err)
            res.send(err.errors)
        }
        );

    res.send(newLike);
};

//NO SE PUEDEN MODIFICAR LIKES

//DELETE
exports.Like_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Likedb = await Like.find({_User: id, _Post:post});
        
        if (Likedb) { //Proceso de actualizar

            const data = await Like.deleteOne({_id: id});
            
            res.send({ message: "Like eliminado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "El Like que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR PUBLICACIÓN
exports.Like_getByPost = async (req, res) => {
    const {id} = req.params;
    const data = await Like.find({_Post: id});

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Like no existe"})
    }
}

//MOSTRAR SI EL USUARIO DIO LIKE A ESTA PUBLICACIÓN
exports.Like_getByUser = async (req, res) => {
    const {id} = req.params;
    const {post} = req.params;
    const data = await Like.find({_User: id, _Post:post});

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Like no existe"})
    }
}