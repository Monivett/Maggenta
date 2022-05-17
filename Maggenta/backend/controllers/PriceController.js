//PONEMOS LA FUNCIONALIDAD

const Price = require("../models/PriceSchemas");

exports.Price_getall = async (req, res) => {
    const data = await Price.find(); //Busca dentro de la base de datos
    res.send(data);
}


//INSERTAR
exports.Price_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newPrice = new Price(body);
    await newPrice.save()
        .then((newObject) => console.log("Se ha insertado el tipo de comisión", newObject))
        .catch((err) => {
            console.log("Error: No se pudo insertar el tipo de comisión", err)
            res.send(err.errors)
        }
        );

    res.send(newPrice);
};

//MODIFICAR
exports.Price_update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const Pricedb = await Price.findById(id);

        if (Pricedb) { //Proceso de actualizar

            const data = await Category.findOneAndUpdate(
                { _id: id }, //Criterio de busqueda (select * from where) 
                body,
                { returnOriginal: false }); //Configuraciones que no retorne el original

            res.send({ message: "Tipo de comisión actualizada exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "No se pudo modificar el tipo de comisión" });
        }
    } catch (err) {
        res.send(err);
    }

};

//DELETE
exports.Price_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Pricedb = await Price.findById({ id });

        if (Pricedb) { //Proceso de actualizar

            const data = await Price.deleteOne({ _id: id });

            res.send({ message: "Tipo de comisión eliminada exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "El tipo de comisión que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR USUARIO
exports.Price_getByUser = async (req, res) => {

    const { username } = req.params;
    const data = await Price.find({ _User: username });

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "Este usuario no tiene ejemplos de comisión" })
    }
}

//MOSTRAR POR USUARIO
exports.Price_getById = async (req, res) => {

    const { id } = req.params;
    const data = await Price.findById(id).populate('_User');

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "Este usuario no tiene ejemplos de comisión" })
    }
}

