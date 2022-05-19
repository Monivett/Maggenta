import { Fragment, useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import './Colores.css';
import useAuth from "../auth/useAuth";
import { GetComisionByUserID } from "../services/ComisionesService";
import { GetRules } from "../services/RulesService";
import { GetUserId } from '../services/UserService';

function ComisionesHoja() {

    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const { user } = useAuth();
    // aqui se guardan las comisiones
    const [comisiones, setComisiones] = useState([]);
    const [rules, setRules] = useState([]);

    const getUser = useCallback(async (id) => {

        const usuario = await GetUserId(id);

        setUserData(usuario);

    }, [])

    const getComisiones = useCallback(async () => {
        const publicaciones = await GetComisionByUserID(id);
        setComisiones(publicaciones);
    }, [])

    const getRules = useCallback(async () => {
        const reglas = await GetRules(id);
        setRules(reglas);
    }, [])

    useEffect(() => {

        getUser(id);
        getComisiones();
        getRules();

    }, [getComisiones, getUser, getRules]);

    return (
        <Fragment>
            <div className="container-fluid bg4  p-5">
                <div className="row ">
                    <div className="col m-2">
                    </div>
                    <div className="col-10 bg2  align-items-center m-2 p-5">
                        <div className="Reglas">
                            {rules.length !== 0 ? <h1>REGLAS</h1> : <h1>No hay reglas</h1>}
                            {rules.map(Reglas => (
                                    <ul>
                                        <li>
                                            <h5>Dibujo: {Reglas.SiDibujo}</h5>
                                        </li>
                                        <li>
                                            <h5>NO dibujo: {Reglas.NoDibujo}</h5>
                                        </li>
                                        <li>
                                            <h5>Extra: {Reglas.Extra}</h5>
                                        </li>
                                    </ul>
                            ))}
                        </div>
                        {comisiones.length !== 0 ? comisiones.map(tusComisiones => (
                            <div className="card d-inline-flex CC m-4" >
                                <img className="" src={tusComisiones.Imagen} alt="caray! no se pudo cargar." width="300" height="300" />
                                <div className="card-body">
                                    <h5 className="card-title">{tusComisiones.Tipo} </h5>
                                    <p className="card-text">$ {tusComisiones.Precio} MXN</p>
                                    {user.userData._id === userData._id ?
                                        <Fragment>
                                            <button className="btn btn-outline-info m-1">Borrar</button>
                                            <Link to={`/EditarComision/${tusComisiones._id}`}>
                                                <button className="btn btn-outline-info m-1">Editar</button>
                                            </Link>
                                        </Fragment>
                                        :
                                        <Link to={`/Pago/${tusComisiones._id}`}>
                                            <button className="btn btn-outline-info m-1">Comisionar</button>
                                        </Link>
                                    }
                                </div>
                            </div>
                        )) :
                            <h5 className="card-title" >No hay hoja de comisiones </h5>
                        }





                    </div>
                    <div className="col  m-2">
                    </div>

                </div>

            </div>



        </Fragment >

        // Tiene que retornar una sola cosa uwu
        //Un Div Gigante o un Fragment.


    );
}

export default ComisionesHoja;
