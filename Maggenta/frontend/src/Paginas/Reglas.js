import { Fragment, useState } from "react";
import { axiosBase as axios } from "../services/Config";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./Pago.css";

function Reglas() {

    const { id } = useParams();
    const { user } = useAuth();

    const [error, setError] = useState('');

    const navigate = useNavigate();

    //Cuando oprimo el botón registrar
    function submitHandler(event) { // 1.

        event.preventDefault();

        if (event.target.si.value !== '' && event.target.no.value !== '') {
            setError('Registrando reglas...');
            Registrar(event);
        }
        else {
            setError('¡Hay campos vacíos!');
        }

    }

    //Registra los datos a MongoDB
    function Registrar(event) {  // 4. 

        axios.post('/Reglas', {
            _User: user.userData._id,
            SiDibujo: event.target.si.value,
            NoDibujo: event.target.no.value,
            Extra: event.target.extra.value
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    alert('Se han registrado tus reglas correctamente');
                    navigate(`/ComisionesHoja/${user.userData._id}`);
                }
                else {
                    setError('¡No se pudo crear las reglas!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Fragment>
            <div className="row m-5">
                <div className="col">
                    <div className="pago">
                        <form className="toditoPAGO" onSubmit={submitHandler}>
                            <h2 id="yafalta" >REGLAS</h2>
                            <div className="form-group">
                                <label id="letrasTITULAR" for="">Sí dibujo: </label>
                                <textarea type="text" className="form-control" id="exampleInputName" name='si' placeholder="Describe que tipo de dibujos realizarías..." />
                            </div>
                            <br />
                            <div className="form-group">
                                <label id="letrasTITULAR" for="">No dibujo: </label>
                                <textarea type="text" className="form-control" id="exampleInputName" name='no' placeholder="Describe que tipo de dibujos NO realizarías..." />
                            </div>
                            <br />
                            <div className="form-group">
                                <label id="letrasTITULAR" for="">Extra: </label>
                                <textarea type="text" className="form-control" id="exampleInputName" name='extra' placeholder="Algo que quieras agregar..." />
                            </div>
                            <br />
                            {error && <p className="errorwhite">{error}</p>}
                            <br></br>
                            <button type="submit" className="btn btn-light btnPAGAR">Publicar reglas</button>
                        </form>
                    </div>
                </div>
            </div>



        </Fragment >

    );
}

export default Reglas;