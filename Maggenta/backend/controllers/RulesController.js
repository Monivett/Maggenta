//PONEMOS LA FUNCIONALIDAD

const Rules = require("../models/ReglasSchemas");

exports.Rules_getall = async (req, res) => {
    const data = await Rules.find(); //Busca dentro de la base de datos
    res.send(data);
}

//INSERTAR
exports.Rules_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newRules = new Rules(body);
    await newRules.save()
        .then((newObject) => console.log("Se han creado las reglas", newObject))
        .catch((err) => {
            console.log("Error: No se pudo crear las reglas", err)
            res.send(err.errors)
        }
        );

    res.send(newRules);
};

//MODIFICAR
exports.Rules_update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const Rulesdb = await Rules.find({ _User: id });

        if (Rulesdb) { //Proceso de actualizar

            const data = await Rules.findOneAndUpdate(
                { _User: id }, //Criterio de busqueda (select * from where) 
                body,
                { returnOriginal: false }); //Configuraciones que no retorne el original

            res.send({ message: "Reglas actualizadas exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "No se pudo modificar las reglas" });
        }
    } catch (err) {
        res.send(err);
    }

};
//DELETE
exports.Rules_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Rulesdb = await Rules.find({ _User: id });

        if (Rulesdb) { //Proceso de actualizar

            const data = await Rules.deleteOne({ _User: id });

            res.send({ message: "Reglas eliminadas exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "Las reglas que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR USUARIO
exports.Rules_getByUser = async (req, res) => {
    const { id } = req.params;
    const data = await Rules.find({ _User: id });

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "Las reglas no existe" })
    }
}