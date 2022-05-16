import { Fragment, useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import './Colores.css';
import useAuth from "../auth/useAuth";
import { GetComisionByUserID } from "../services/ComisionesService";
import { GetUserId } from '../services/UserService';

function MisPedidos() {

    

    const { user } = useAuth();
    // aqui se guardan las comisiones
    const [comisiones, setComisiones] = useState([]);
    console.log(comisiones);

    const getComisiones = useCallback(async () => {
        const publicaciones = await GetComisionByUserID(user.userData._id);
        setComisiones(publicaciones);
    }, [])

    useEffect(() => {
        getComisiones();

    }, [getComisiones]);


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
                                    <button className="btn btn-outline-info m-1">Marcar como completada</button>
                                </div>
                            </div>
                        )):
                        <h5 className="card-title" >No tienes ningun pedido </h5>
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

export default MisPedidos;
