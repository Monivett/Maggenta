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

//NO SE PUEDEN ELIMINAR LAS COMISIONES

//MOSTRAR POR ARTISTA
exports.Comision_getByUser = async (req, res) => {
    const {id} = req.params;
    const data = await Comision.findById(id).populate();

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Comisión no existe"})
    }
}