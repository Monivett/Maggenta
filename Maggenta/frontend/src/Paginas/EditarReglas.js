import { Fragment, useEffect, useState, useCallback } from "react";
import { axiosBase as axios } from "../services/Config";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { GetRules } from "../services/RulesService";
import "./Pago.css";

function EditarReglas() {

    const { id } = useParams();
    const { user } = useAuth();

    const [error, setError] = useState('');
    const [rules, setRules] = useState();

    const navigate = useNavigate();

    const getRules = useCallback(async () => {
        const reglas = await GetRules(user.userData._id);
        setRules(reglas);
    }, [])

    useEffect(() => {

        if (user) {
            getRules();
        }

    }, [user]);

    //Cuando oprimo el botón registrar
    function submitHandler(event) { // 1.

        event.preventDefault();

        if (event.target.si.value !== '' && event.target.no.value !== '') {
            setError('Editando reglas...');
            Editar(event);
        }
        else {
            setError('¡Hay campos vacíos!');
        }

    }

    //Registra los datos a MongoDB
    function Editar(event) {  // 4. 

        axios.put(`/Reglas/${user.userData._id}`, {
            SiDibujo: event.target.si.value,
            NoDibujo: event.target.no.value,
            Extra: event.target.extra.value
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    alert('Se han editado tus reglas correctamente');
                    navigate(`/ComisionesHoja/${user.userData._id}`);
                }
                else {
                    setError('¡No se pudo editar las reglas!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function BorrarReglas(){

        axios.delete(`/Reglas/${user.userData._id}`)
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    alert('Se han borrado tus reglas correctamente');
                    navigate(`/ComisionesHoja/${user.userData._id}`);
                }
                else {
                    setError('¡No se pudo borrar las reglas!');
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
                            {rules && rules.map(reglas => (
                                <Fragment>
                                    <div className="form-group">
                                        <label id="letrasTITULAR" for="">Sí dibujo: </label>
                                        <textarea type="text" className="form-control" id="exampleInputName" name='si' placeholder="Describe que tipo de dibujos realizarías..." defaultValue={reglas.SiDibujo} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label id="letrasTITULAR" for="">No dibujo: </label>
                                        <textarea type="text" className="form-control" id="exampleInputName" name='no' placeholder="Describe que tipo de dibujos NO realizarías..." defaultValue={reglas.NoDibujo} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label id="letrasTITULAR" for="">Extra: </label>
                                        <textarea type="text" className="form-control" id="exampleInputName" name='extra' placeholder="Algo que quieras agregar..." defaultValue={reglas.Extra} />
                                    </div>
                                    <br />
                                </Fragment>
                            ))}
                            {error && <p className="errorwhite">{error}</p>}
                            <br></br>
                            <button type="submit" className="btn btn-light btnPAGAR">Editar reglas</button>
                        </form>
                        <button type="button" className="btn btn-danger btnBorrar" onClick={BorrarReglas}>Borrar reglas</button>
                    </div>
                </div>
            </div>



        </Fragment >

    );
}

export default EditarReglas;