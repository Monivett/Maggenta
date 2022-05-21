import { Fragment, useEffect, useCallback, useState } from "react";
import { axiosBase as axios } from "../services/Config";
import { storage } from "../Firebase";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { GetComisionId } from '../services/PagoService';
import "./Pago.css";

function Pago() {

    const { id } = useParams();
    const { user } = useAuth();

    const [comisionData, setComisionData] = useState([]);
    const [image, setImage] = useState();
    const [error, setError] = useState('');

    const [tarjeta, setTarjeta] = useState('');

    const navigate = useNavigate();

    const getComision = useCallback(async (id) => {

        const comision = await GetComisionId(id);

        setComisionData(comision);
        console.log(comision)

    }, [])

    //Cuando la foto cambia
    function handleChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    //Subir foto a Firebase
    const uploadToFirebase = (event) => {  // 3.
        const uploadTask = storage.ref(`ImagenReferencia/${image.name}`).put(image); // se sube
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage.ref('ImagenReferencia').child(image.name).getDownloadURL().then(url => { // se descarga la URL
                    if (url !== undefined) { // si existe
                        Registrar(event, url);  // → 4. 
                    }

                })
            }

        )
    }

    //Cuando oprimo el botón pagar
    function submitHandler(event) { // 1.

        event.preventDefault();

        if (event.target.descripcion.value !== '' && event.target.numTarjeta.value !== '' && event.target.image.value !== '') {

            if (tarjeta.length >= 16) {
                setError('Pagando comisión...');
                uploadToFirebase(event);
            } else {
                setError('¡Tarjeta mínimo de 16 dígitos');
            }
        }
        else {
            setError('¡Hay campos vacíos!');
        }

    }

    //Registra los datos a MongoDB
    function Registrar(event, url) {  // 4. 

        axios.post('/Comision', {
            Descripcion: event.target.descripcion.value,
            Imagen: url,
            _Type: comisionData._id,
            _Artist: comisionData._User[0]._id,
            _User: user.userData._id,
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    alert('Se ha pagado tu comisión correctamente');
                    navigate(`/MisPedidos/${user.userData._id}`);
                }
                else {
                    setError('¡No se pudo pagar esta comisión!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {

        getComision(id);

    }, [getComision]);

    return (

        <Fragment>

            <div className="row m-5">
                <div className="col">
                    <div className="pago">
                        <form className="toditoPAGO" onSubmit={submitHandler}>
                            <h2 id="yafalta" >Comisión: {comisionData.Tipo}</h2>
                            <div className="form-group">
                                <label id="letrasTITULAR" for="">Descripción de comisión: </label>
                                <textarea type="text" className="form-control" id="exampleInputName" name='descripcion' placeholder="Describe que tipo de dibujo tienes en mente..." />
                            </div>
                            <br />
                            <div className="form-group">
                                <label id="letrasTITULAR" for="">Imagen de referencia: </label>
                                <input type="file" name='image' accept="image/*" className="form-control" id="exampleInputDate" onChange={handleChange} />
                            </div>
                            <br />
                            <div className="form-group">
                                <label id="letrasTITULAR" for="">Numero de Tarjeta: </label>
                                <input type="number" className="form-control" id="exampleInputDate" name='numTarjeta' placeholder="Numero de la tarjeta"  onChange={event => setTarjeta(event.target.value)}/>
                            </div>
                            <label id="letrasTITULAR" for="">Costo: ${comisionData.Precio} MXN  </label>
                            <br />
                            {comisionData._User && <label id="letrasTITULAR" for="">Artista: {comisionData._User[0].Usuario}  </label>}
                            <br />
                            <br />
                            {error && <p className="errorwhite">{error}</p>}
                            <br></br>
                            <button type="submit" className="btn btn-light btnPAGAR">PAGAR</button>
                        </form>
                    </div>
                </div>
            </div>



        </Fragment >

    );
}

export default Pago;