import { Fragment, useState, useCallback, useEffect } from "react";
import "./comision.css";
import { useParams } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosBase as axios } from "../services/Config";
import { storage } from "../Firebase";
import { GetComisionId } from "../services/ComisionesService";

function EditarComision() {

    const { user } = useAuth();

    const { id } = useParams();

    const [image, setImage] = useState();
    const [error, setError] = useState('');
    const [comisiones, setComisiones] = useState([]);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [DisplayImage, setDisplayImage] = useState();

    const navigate = useNavigate();

    const getComision = useCallback(async () => {
        const publicaciones = await GetComisionId(id);
        setComisiones(publicaciones);
        console.log(publicaciones)
    }, [])

    useEffect(() => {

        getComision()

    }, [getComision]);

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

    // 1. Cuando oprimo el botón crear
    const handleSubmit = (event) => {
        event.preventDefault();

        if (event.target.tipo.value !== '' && event.target.precio.value !== '') {
            if (event.target.tipo.value.length >= 3 && event.target.tipo.value.length <= 40) {
                if (event.target.precio.value.length >= 1 && event.target.precio.value.length <= 10) {
                    setError('Creando Comision ejemplo...');
                    if (image !== undefined) {
                        uploadToFirebase(event);
                    }
                    Modificar(event);
                } else {
                    setError('campo de Costo mínima 1 y máxima 10 caracteres');
                }
            } else {
                setError('Tipo de comisión mínima 3 y máxima 40 caracteres');
            }

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
                        axios.put(`/Precio/${id}`, {
                            Imagen: url,
                          
                        })
                            .then(function (response) {
                                console.log(response.data);
                                if (response.data !== '') {
                                    
                                        alert('Se han modificado tu comisión correctamente');
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

                })
            }

        )
    }

    // 3. Registra los datos a MongoDB
    function Modificar(event) {

        axios.put(`/Precio/${id}`, {
            Tipo: event.target.tipo.value,
            Precio: event.target.precio.value,
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    if (imageUploaded === false) {
                        alert('Se han modificado tus datos correctamente');
                        navigate(`/ComisionesHoja/${user.userData._id}`);
                    } else {
                        console.log('Se ha modificado tu comision ejemplo.');
                    }
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
                            <form id="todo" onSubmit={handleSubmit}>
                                <h2 >EDITAR COMISION:</h2><br />
                                <div className="form-group">
                                    <label for="formGroupExampleInput" id="letraTIPO" >Tipo de comisión:</label>
                                    <input type="text" name="tipo" className="form-control" id="formGroupExampleInput" placeholder="Tipo..." required defaultValue={comisiones.Tipo} />
                                </div><br />
                                <div className="form-group">
                                    <label for="formGroupExampleInput" id="letraPRECIO" >Costo:</label>
                                    <input type="number" name="precio" className="form-control" id="formGroupExampleInput" placeholder="Costo..." required defaultValue={comisiones.Precio} />
                                </div><br />
                                {!imageUploaded? <img src={comisiones.Imagen} width='100' height='100'></img>:
                                <img src={DisplayImage} width='100' height='100'></img>}
                                <div className="form-group">
                                    <label for="formGroupExampleInput" id="letraEJEMPLO" >Ejemplo:</label><br />
                                    <input id="foto" name="imagen" className="input-file" type="file" accept="image/*" onChange={handleChange} />
                                </div><br />
                                <p className="errorwhite">{error}</p>
                                <button type="submit" className="btn btn-light btn-lg" id="agregar">Editar comisión</button>
                            </form>
                        </div>
                    </div>
                </div>



            </div>


        </Fragment>
    );
}

export default EditarComision;