//PONEMOS LA FUNCIONALIDAD

const User = require("../models/UserSchemas");

//MUESTRA TODOS LOS DATOS
exports.User_getall = async (req, res) => {
    const data = await User.find(); //Busca dentro de la base de datos
    res.send(data);
}

//INSERTAR
exports.User_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newUser = new User(body);
    await newUser.save()
        .then((newObject) => console.log("Se ha insertado el usuario", newObject))
        .catch((err) => {
            console.log("Error: No se pudo insertar el usuario", err)
            res.send(err.errors)
        }
        );

    res.send(newUser);
};

//MODIFICAR
exports.User_update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const Userdb = await User.findById(id);

        if (Userdb) { //Proceso de actualizar

            const data = await User.findOneAndUpdate(
                { _id: id }, //Criterio de busqueda (select * from where) 
                body,
                { returnOriginal: false }); //Configuraciones que no retorne el original

            res.send({ message: "Usuario actualizado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "No se pudo modificar el usuario" });
        }
    } catch (err) {
        res.send(err);
    }

};

//DELETE
exports.User_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Userdb = await User.findById(id);

        if (Userdb) { //Proceso de actualizar

            const data = await User.deleteOne({ _id: id });

            res.send({ message: "Usuario eliminado exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "El usuario que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR ID
exports.User_getById = async (req, res) => {
    const { id } = req.params;
    const data = await User.findById(id).populate();

    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "Usuario no existe" })
    }
}