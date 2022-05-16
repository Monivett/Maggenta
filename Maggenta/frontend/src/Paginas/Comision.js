import { Fragment, useState } from "react";
import "./comision.css";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosBase as axios } from "../services/Config";
import { storage } from "../Firebase";

function Comision() {

    const [image, setImage] = useState();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //Cuando la foto cambia
    function handleChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    // 1. Cuando oprimo el botón crear
    const handleOnSubmitSchool = (event) => {
        event.preventDefault();
        /*
            console.log("tipo: ", event.target.tipo.value);
            console.log("costo: " , event.target.precio.value);
            console.log("imagen: ", event.target.imagen.value);
            console.log("IDusuario:", user.userData._id);*/
        //console.log("lenght descri:", event.target.tipo.value.length);
       // console.log("lenght descri:", event.target.precio.value.length);

        if (event.target.tipo.value !== '' && event.target.precio.value !== '' && event.target.imagen.value !== '') {
            setError('');
            //
            if (event.target.tipo.value.length >= 3 && event.target.tipo.value.length <= 40) {
                if (event.target.precio.value.length >= 1 && event.target.precio.value.length <= 10) {
                    setError('Creando comision ejemplo...');
                    uploadToFirebase(event);
                } else {
                    setError('Campo de costo mínimo 1 y máximo 10 caracteres');
                }
            } else {
                setError('Tipo de comisión mínimo 3 y máximo 40 caracteres');
            }
            //
            //
        }
        else {
            setError('¡Te falta completar campos!');
        }



    };

    // 2. Subir foto a Firebase
    const uploadToFirebase = (event) => {
        const uploadTask = storage.ref(`Comisiones/${image.name}`).put(image); // se sube
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage.ref('Comisiones').child(image.name).getDownloadURL().then(url => { // se descarga la URL
                    if (url !== undefined) { // si existe
                        Registrar(event, url);  // → 3. 
                    }

                })
            }

        )
    }

    // 3. Registra los datos a MongoDB
    function Registrar(event, url) {

        axios.post('/Precio', {
            Tipo: event.target.tipo.value,
            Precio: event.target.precio.value,
            Imagen: url,
            _User: user.userData._id
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    alert('Muy bien, se ha creado tu comision ejemplo.');
                    navigate(`/ComisionesHoja/${user.userData._id}`);
                }
                else {
                    setError('¡No se pudo crear tu comision!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }





    return (
        <Fragment>
            <div className="container  m-auto">
                <div className="row todo">
                    <div className="col d-flex flex-column">
                        <div className="comision">
                            <form id="todo" onSubmit={handleOnSubmitSchool}>
                                <h2 >AGREGA UN TIPO DE COMISIÓN:</h2><br />
                                <div className="form-group">
                                    <label for="formGroupExampleInput" id="letraTIPO" >Tipo de comisión:</label>
                                    <input type="text" name="tipo" className="form-control" id="formGroupExampleInput" placeholder="Tipo..."  />
                                </div><br />
                                <div className="form-group">
                                    <label for="formGroupExampleInput" id="letraPRECIO" >Costo:</label>
                                    <input type="number" name="precio" className="form-control" id="formGroupExampleInput" placeholder="Costo..."  />
                                </div><br />
                                <div className="form-group">
                                    <label for="formGroupExampleInput" id="letraEJEMPLO" >Ejemplo:</label><br />
                                    <input id="foto" name="imagen" className="input-file" type="file" onChange={handleChange}  />
                                </div><br />
                                <p className="errorwhite">{error}</p>
                                <button type="submit" className="btn btn-light btn-lg" id="agregar">Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>



            </div>


        </Fragment>
    );
}

export default Comision;