//PONEMOS LA FUNCIONALIDAD

const Comment = require("../models/CommentSchemas");

//INSERTAR
exports.Comment_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newComment = new Comment(body);
    await newComment.save()
        .then((newObject) => console.log("Se ha insertado el comentario", newObject))
        .catch((err) => {
            console.log("Error: No se pudo insertar el comentario", err)
            res.send(err.errors)
        }
        );

    res.send(newComment);
};

//MODIFICAR
exports.Comment_update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const Commentdb = await Comment.findById(id);

        if (Commentdb) { //Proceso de actualizar

            const data = await Comment.findOneAndUpdate(
                { _id: id }, //Criterio de busqueda (select * from where) 
                body,
                { returnOriginal: false }); //Configuraciones que no retorne el original

            res.send({ message: "Comentario actualizado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "No se pudo modificar el comentario" });
        }
    } catch (err) {
        res.send(err);
    }

};

//DELETE
exports.Comment_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Commentdb = await Comment.findById({id});
        
        if (Commentdb) { //Proceso de actualizar

            const data = await Comment.deleteOne({_id: id});
            
            res.send({ message: "Comentario eliminado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "El comentario que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR PUBLICACIÓN
exports.Comment_getByPost = async (req, res) => {
    const {id} = req.params;
    const data = await Comment.find({_Post: id}).populate("_User");

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Comentario no existe"})
    }
}