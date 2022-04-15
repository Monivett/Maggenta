import { Fragment, useState, useRef } from "react";
import "./Registro.css";
import { axiosBase as axios } from "../services/Config";
import { storage } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { GetEmail } from "../services/UserService";
function Registro() {

    const [image, setImage] = useState();

    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    //Cuando la foto cambia
    function handleChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    //Subir foto a Firebase
    const uploadToFirebase = (event) => {
        const uploadTask = storage.ref(`Userimages/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage.ref('Userimages').child(image.name).getDownloadURL().then(url => {
                    if (url !== undefined) {
                        Registrar(event, url);
                    }

                })
            }

        )
    }

    //Cuando oprimo el botón registrar
    function submitHandler(event) {

        event.preventDefault();

        if (event.target.Nombre.value !== '' && event.target.Apellidos.value !== '' && event.target.Usuario.value !== '' && event.target.Correo.value !== '' && event.target.Contraseña.value !== '' && event.target.FechaNac.value && event.target.image.value !== '') {
            setError('');
            if (password.length >= 8) {
                BuscarCorreoValido(event.target.Correo.value, event);
            } else {
                setError('Contraseña mínima 8 caracteres');
            }
        }
        else {
            setError('¡Hay campos vacíos!');
        }

    }

    function BuscarCorreoValido(pMail, event) {
        async function fetchData() {
            const Emails = await GetEmail(pMail);
            if (Emails.length === 0) { //Si el email es único
                setError('Registrando...');
                uploadToFirebase(event);
            } else {
                setError('¡El correo debe de ser único!');
            }
        }
        fetchData();
    }

    //Registra los datos a MongoDB
    function Registrar(event, url) {

        axios.post('/Usuario', {
            Nombre: event.target.Nombre.value,
            Apellidos: event.target.Apellidos.value,
            Usuario: event.target.Usuario.value,
            Correo: event.target.Correo.value,
            Contraseña: event.target.Contraseña.value,
            FechaNac: event.target.FechaNac.value,
            Foto: url
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    alert('Te has registrado correctamente');
                    navigate("/login");
                }
                else {
                    setError('¡No se pudo registrar el usuario!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Fragment>
            <div className="row" id="registroForm">
                <div className="col hola">
                    <div className="align-self-center">
                        <div className="mt-auto" id="usuarioFoto">
                            <img src={require('../imag/imagPRUEBA.png')} alt="" height="720" width="590" />
                        </div>
                    </div>
                </div>
                <div className="col bg text-center">
                    <form onSubmit={submitHandler} method="POST" id="form" className="registrarse">
                        <h1 id="letraTitulo">REGISTRO</h1>
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
                                <input className="form-control" name="Nombre" type="text" placeholder="Nombre..." />
                            </div>
                            <div className="grupo">
                                <label htmlFor="">Apellidos:</label><br />
                                <input className="form-control" name="Apellidos" type="text" placeholder="Apellidos..." />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Usuario:</label><br />
                                <input className="form-control" name="Usuario" type="text" placeholder="Usuario..." />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Correo electrónico:</label><br />
                                <input type="email" className="form-control" name="Correo" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico..." />

                            </div>
                            <div className="grupo">
                                <label htmlFor="">Contraseña: </label><br />
                                <input type="password" className="form-control" name="Contraseña" id="exampleInputPassword1" placeholder="Contraseña..." onChange={event => setPassword(event.target.value)} />

                            </div>

                            <div className="grupo">
                                <label htmlFor="">Fecha de Nacimiento:</label><br />
                                <input type="date" className="form-control" name="FechaNac" id="fechanacimiento" />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Foto de perfil:</label><br />
                                <input id="foto" name="image" className="input-file" type="file" onChange={handleChange} />
                            </div>

                            <br />
                            <p className="error">{error}</p>
                            <button type="submit" className="btn btn-light btn-lg" id="registro">Registrarme</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Registro;