//PONEMOS LA FUNCIONALIDAD

const Post = require("../models/PostSchemas");

//MUESTRA TODOS LOS DATOS
exports.Post_getall = async (req, res) => {
    const data = await Post.find(); //Busca dentro de la base de datos
    res.send(data);
}

//INSERTAR
exports.Post_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newPost = new Post(body);
    await newPost.save()
        .then((newObject) => console.log("Se ha insertado la publicación", newObject))
        .catch((err) => {
            console.log("Error: No se pudo insertar la publicación", err)
            res.send(err.errors)
        }
        );

    res.send(newPost);
};

//MODIFICAR
exports.Post_update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const Postdb = await Post.findById(id);

        if (Postdb) { //Proceso de actualizar

            const data = await Post.findOneAndUpdate(
                { _id: id }, //Criterio de busqueda (select * from where) 
                body,
                { returnOriginal: false }); //Configuraciones que no retorne el original

            res.send({ message: "Publicación actualizada exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "No se pudo modificar la publicación" });
        }
    } catch (err) {
        res.send(err);
    }

};

//DELETE
exports.Post_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Postdb = await Post.findById({ id });

        if (Postdb) { //Proceso de actualizar

            const data = await Post.deleteOne({ _id: id });

            res.send({ message: "Publicación eliminada exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "La publicación que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR ID
exports.Post_getById = async (req, res) => {
    const { id } = req.params;
    const data = await Post.findById(id).populate("_User");

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "Publicación no existe" })
    }
}

// Post_getByUserID

exports.Post_getByUserId = async (req, res) => {
    try {
        const { UserId } = req.params;
        const data = await Post.find({_User: UserId});
        //res.send({ mensaje: req.params.UserId })


        
        if (data) { //Si existe
            res.send(data);
        } else {
            res.send({ message: "Publicaciones de usuario no existen" });
        }
    }
    catch (err) {
        res.send({ message: "error" });
    }



}
exports.Post_getOne= async (req, res) => {
    try {
        const { id } = req.params;
       // const data = await Post.find({_id: PostId});
        const data = await Post.findById(id).populate("_User");
        //res.send({ mensaje: req.params.UserId })


        
        if (data) { //Si existe
            res.send(data);
        } else {
            res.send({ message: "Publicacion no existe." });
        }
    }
    catch (err) {
        res.send({ message: "error" });
    }



}