//PONEMOS LA FUNCIONALIDAD

const Share = require("../models/SharesSchemas");

//MUESTRA TODOS LOS DATOS
exports.Share_getall = async (req, res) => {
    const data = await Share.find(); //Busca dentro de la base de datos
    res.send(data);
}

//INSERTAR
exports.Share_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newShare = new Share(body);
    await newShare.save()
        .then((newObject) => console.log("Se ha compartido la publicación", newObject))
        .catch((err) => {
            console.log("Error: No se pudo compartir la publicación", err)
            res.send(err.errors)
        }
        );

    res.send(newShare);
};

//NO SE PUEDEN MODIFICAR LAS PUBLICACIONES COMPARTIDAS

//DELETE
exports.Share_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Sharedb = await Share.findById({id});
        
        if (Sharedb) { //Proceso de actualizar

            const data = await Share.deleteOne({_id: id});
            
            res.send({ message: "Compartido eliminado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "El compartido que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR USUARIO
exports.Share_getByUser = async (req, res) => {
    const {id} = req.params;
    const data = await Share.findById(id).populate();

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Share no existe"})
    }
}