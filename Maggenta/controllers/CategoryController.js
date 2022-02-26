//PONEMOS LA FUNCIONALIDAD

const Category = require("../models/CategorySchemas");

//MUESTRA TODOS LOS DATOS
exports.Category_getall = async (req, res) => {
    const data = await Category.find(); //Busca dentro de la base de datos
    res.send(data);
}

//INSERTAR
exports.Category_create = async (req, res) => {
    const { body } = req;

    //Validación de  información
    let newCategory = new Category(body);
    await newCategory.save()
        .then((newObject) => console.log("Se ha insertado la categoría", newObject))
        .catch((err) => {
            console.log("Error: No se pudo insertar la categoría", err)
            res.send(err.errors)
        }
        );

    res.send(newCategory);
};

//MODIFICAR
exports.Category_update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const Categorydb = await Category.findById(id);

        if (Categorydb) { //Proceso de actualizar

            const data = await Category.findOneAndUpdate(
                { _id: id }, //Criterio de busqueda (select * from where) 
                body,
                { returnOriginal: false }); //Configuraciones que no retorne el original

            res.send({ message: "Categoría actualizada exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "No se pudo modificar la categoría" });
        }
    } catch (err) {
        res.send(err);
    }

};

//DELETE
exports.Category_delete = async (req, res) => {
    const { id } = req.params;
    try {
        const Categorydb = await Category.findById({id});
        
        if (Categorydb) { //Proceso de actualizar

            const data = await Category.deleteOne({_id: id});
            
            res.send({ message: "Categría eliminada exitosamente", data })
        } else { //Mensaje de error
            res.send({ message: "La Categoría que intentas eliminar no existe" });
        }
    } catch (err) {
        res.send(err);
    }

};

//MOSTRAR POR ID
exports.Category_getById = async (req, res) => {
    const {id} = req.params;
    const data = await Category.findById(id).populate();

    if(data){ //Si existe
        res.send(data);
    }else{
        res.send({message: "Categoría no existe"})
    }
}