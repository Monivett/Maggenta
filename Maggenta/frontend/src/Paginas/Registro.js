import { Fragment, useState } from "react";
import "./Registro.css";
import { axiosBase as axios } from "../services/Config";
import { storage } from "../Firebase";
import { useNavigate } from "react-router-dom";
function Registro() {

    const [image, setImage] = useState();
    const [imageurl, setImageurl] = useState();

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
                    setImageurl(url);
                    if(url!==undefined){
                          Registrar(event);
                    }
                  
                })
            }

        )
    }

    //Registra el usuario
    function submitHandler(event) {

        event.preventDefault();

        uploadToFirebase(event);

    }

 //Registra los datos a MongoDB
    function Registrar(event) {
       
        axios.post('/Usuario', {
            Nombre: event.target.Nombre.value,
            Apellidos: event.target.Apellidos.value,
            Usuario: event.target.Usuario.value,
            Correo: event.target.Correo.value,
            Contraseña: event.target.Contraseña.value,
            FechaNac: event.target.FechaNac.value,
            Foto: imageurl
        })
            .then(function (response) {
                console.log(response);
                alert('Te has registrado correctamente');
                
                navigate("/login");
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
                                <label htmlFor="">Contraseña:</label><br />
                                <input type="password" className="form-control" name="Contraseña" id="exampleInputPassword1" placeholder="Contraseña..." />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Fecha de Nacimiento:</label><br />
                                <input type="date" className="form-control" name="FechaNac" id="fechanacimiento" required />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Foto de perfil:</label><br />
                                <input id="foto" name="image" className="input-file" type="file" onChange={handleChange} required />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-light btn-lg" id="registro">Registrarme</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Registro;