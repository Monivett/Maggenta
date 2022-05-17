import { Fragment, useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import './Colores.css';
import useAuth from "../auth/useAuth";
import { GetComisionByUserID } from "../services/ComisionesService";
import { GetUserId } from '../services/UserService';

function ComisionesHoja() {

    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const { user } = useAuth();
    // aqui se guardan las comisiones
    const [comisiones, setComisiones] = useState([]);
    console.log(comisiones);

    const getUser = useCallback(async (id) => {

        const usuario = await GetUserId(id);

        setUserData(usuario);

    }, [])

    const getComisiones = useCallback(async () => {
        const publicaciones = await GetComisionByUserID(id);
        setComisiones(publicaciones);
    }, [])

    useEffect(() => {

        getUser(id);
        getComisiones();

    }, [getComisiones, getUser]);


    return (
        <Fragment>
            <div className="container-fluid bg4  p-5">
                <div className="row ">
                    <div className="col m-2">
                    </div>
                    <div className="col-10 bg2  align-items-center m-2 p-5">

                        {comisiones.length!==0 ? comisiones.map(tusComisiones => (
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
                        )):
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
