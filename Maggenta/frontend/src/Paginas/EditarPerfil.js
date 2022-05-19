import { Fragment, useState, useEffect } from "react";
import "./Registro.css";
import useAuth from "../auth/useAuth";
import Modal from "./Modal";
import { storage } from "../Firebase";
import { axiosBase as axios } from "../services/Config";

function EditarPerfil() {

    //DATOS DEL USUARIO
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);

    //USUARIO AUTENTICADO
    const { user } = useAuth();

    //VENTANA MODAL
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const [DisplayImage, setDisplayImage] = useState();
    const [image, setImage] = useState();
    const [error, setError] = useState('');

    //MUESTRA LOS DATOS DEL USUARIO LOGEADO
    function getData() {
        if (user) {
            setName(user.userData.Nombre);
            setLastName(user.userData.Apellidos);
            setUsername(user.userData.Usuario);
            setBirthday(user.userData.FechaNac);
        }
    }
    //Cuando la foto cambia
    function handleChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setImageUploaded(true);
            setDisplayImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setImageUploaded(false);
        }
    }

    //Subir foto a Firebase
    const uploadToFirebase = (event) => {  // 3.
        const uploadTask = storage.ref(`Userimages/${image.name}`).put(image); // se sube
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage.ref('Userimages').child(image.name).getDownloadURL().then(url => { // se descarga la URL
                    if (url !== undefined) { // si existe
                        ModificarFoto(event, url);  // → 4. 
                    }

                })
            }

        )
    }

    //Cuando oprimo el botón modificar
    function submitHandler(event) { // 1.

        event.preventDefault();

        if (event.target.Nombre.value !== '' && event.target.Apellidos.value !== '' && event.target.Usuario.value !== '' && event.target.FechaNac.value) {
            setError('');
            setError('Actualizando datos...');
            if (image !== undefined) {
                uploadToFirebase(event);
            }
            Modificar(event);
        }
        else {
            setError('¡Hay campos vacíos!');
        }

    }
    //Modifica los datos en MongoDB
    function Modificar(event) {

        axios.put(`/Usuario/${user.userData._id}`, {
            Nombre: event.target.Nombre.value,
            Apellidos: event.target.Apellidos.value,
            Usuario: event.target.Usuario.value,
            FechaNac: event.target.FechaNac.value,
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    console.log('Se han modificado tus datos correctamente');
                    if (imageUploaded === false) {
                        alert('Se han modificado tus datos correctamente');
                        window.location.href = `Perfil/${user.userData._id}`;
                    }
                }
                else {
                    setError('¡No se pudo modificar tus datos!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //Modifica la foto del usuario en MongoDB
    function ModificarFoto(event, url) {

        axios.put(`/Usuario/${user.userData._id}`, {
            Foto: url
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    console.log('Se ha modificado la foto correctamente');
                    alert('Se han modificado tus datos correctamente');
                    window.location.href = `Perfil/${user.userData._id}`;
                }
                else {
                    setError('¡No se pudo modificar tus datos!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {

        getData();

    }, [getData]);

    return (
        <Fragment>
            {showModal && <Modal show={showModal} onClose={handleClose} />}
            <div className="row">
                <div className="col hola">
                    <div className="align-self-center">
                        <div className="mt-auto" id="usuarioFoto">
                            {!image ?
                                <img src={user && user.userData.Foto} alt="" height="720" width="590" /> :
                                <img src={DisplayImage} alt="" height="720" width="590" />
                            }
                        </div>
                    </div>
                </div>
                <div className="col bg text-center">
                    <form onSubmit={submitHandler} method="POST" id="form" className="registrarse">
                        <h1 id="letraTitulo">Editar perfil</h1>
                        <div className="row m-2">
                            <div className="col d-flex flex-column">
                                <div className="">
                                    <img src={require('../imag/maggentaLOGO.png')} alt="" height="70" width="270" />
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <div className="grupo">
                                <label htmlFor="">Nombre(s):</label><br />
                                <input className="form-control" type="text" name="Nombre" placeholder="Nombre..." defaultValue={Name} />
                            </div>
                            <div className="grupo">
                                <label htmlFor="">Apellidos:</label><br />
                                <input className="form-control" type="text" name="Apellidos" placeholder="Apellidos..." defaultValue={LastName} />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Usuario:</label><br />
                                <input className="form-control" type="text" name="Usuario" placeholder="Usuario..." defaultValue={username} />
                            </div>
                            <div className="grupo">
                                <label htmlFor="">Fecha de Nacimiento:</label><br />
                                <input type="date" className="form-control" name="FechaNac" id="fechanacimiento" defaultValue={birthday} />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Foto de perfil:</label><br />
                                <input id="foto" name="image" className="input-file" type="file" accept="image/*" onChange={handleChange} />
                            </div>
                            <br />
                            <p className="error">{error}</p>
                            <button type="button" className="btn btn-light btn-lg" id="registro" onClick={(e) => setShowModal(true)}>Editar contraseña</button>
                            <br />
                            <br />
                            <button type="submit" className="btn btn-light btn-lg" id="registro">Editar perfil</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default EditarPerfil;