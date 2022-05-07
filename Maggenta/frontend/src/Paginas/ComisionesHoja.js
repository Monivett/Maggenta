import { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import './Colores.css';
import { GetComisionByUserID } from "../services/ComisionesService";

function ComisionesHoja() {
    // aqui se guardan las comisiones
    const [comisiones, setComisiones] = useState([]);


    const getComisiones = useCallback(async () => {
        const publicaciones = await GetComisionByUserID();
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

                        {comisiones.map(tusComisiones => (


                            <div className="card d-inline-flex CC m-4" >
                                <img className="" src={tusComisiones.Imagen} alt="caray! no se pudo cargar." width="300" height="300" />
                                <div className="card-body">
                                    <h5 className="card-title">{tusComisiones.Tipo} </h5>
                                    <p className="card-text">{tusComisiones.Precio} MX</p>
                                    <Link to="/Pago">
                                        <button className="btn btn-outline-info m-1">Comisionar</button>
                                    </Link>

                                    <button className="btn btn-outline-info m-1">Borrar</button>

                                </div>
                            </div>
                        ))}

                       



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
