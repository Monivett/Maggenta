//PONEMOS LA FUNCIONALIDAD

const Comision = require("../models/ComisionSchemas");

//INSERTAR
exports.Comision_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newComision = new Comision(body);
    await newComision.save()
        .then((newObject) => console.log("Se ha comprado la comisión", newObject))
        .catch((err) => {
            console.log("Error: No se pudo comprar la comisión", err)
            res.send(err.errors)
        }
        );

    res.send(newComision);
};

//NO SE PUEDEN MODIFICAR LAS COMISIONES

//DELETE
exports.Comision_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Comisiondb = await Comision.findById(id);

        if (Comisiondb) { //Proceso de actualizar

            const data = await Comision.deleteOne({ _id: id });

            res.send({ message: "Pedido eliminado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "No se puede eliminar tu pedido" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR LAS COMISIONES QUE TE ENCARGARON
exports.Comision_getByUser = async (req, res) => {
    const {user} = req.params;

    const data = await Comision.find( {_Artist: user}).populate("_Artist").populate("_Type").populate("_User");

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Este pedido no existe"})
    }
}

//MOSTRAR SI TE ENCARGARON ESTA COMISION
exports.Comision_UserHasComision = async (req, res) => {
    const {user} = req.params;
    const {id} = req.params;
    const data = await Comision.find( {_Artist: user, _Type: id});

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "No te han encargado comisiones de este tipo"})
    }
}

//MOSTRAR LAS COMISIONES QUE TU HAZ PEDIDO
exports.Comision_getPedidoByUser = async (req, res) => {
    const {user} = req.params;

    const data = await Comision.find( {_User: user}).populate("_Artist").populate("_Type").populate("_User");

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Este pedido no existe"})
    }
}