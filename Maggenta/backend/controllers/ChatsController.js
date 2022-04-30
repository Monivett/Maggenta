//PONEMOS LA FUNCIONALIDAD

const Chats = require("../models/ChatsSchemas");

//INSERTAR
exports.Chats_create = async (req, res) => {
    const { body } = req;

    //Validaciónde  información
    let newChats = new Chats(body);
    await newChats.save()
        .then((newObject) => console.log("Se ha insertado el mensaje", newObject))
        .catch((err) => {
            console.log("Error: No se pudo insertar el mensaje", err)
            res.send(err.errors)
        }
        );

    res.send(newChats);
};

//NO SE PUEDEN MODIFICAR LOS MENSAJES

//NO SE PUEDEN ELIMINAR LOS MENSAJES

//MOSTRAR POR USUARIO
exports.Chats_getByUser = async (req, res) => {

    const { receiver } = req.params;
    const { sender } = req.params;

    const data = await Chats.find({$or:[ {_UserReceiver: receiver, _UserSender: sender } , { _UserReceiver: sender, _UserSender: receiver }]});


    if (data) { //Si existe
        res.send(data);
    } else {
        res.send({ message: "Mensaje no existe" })
    }
}