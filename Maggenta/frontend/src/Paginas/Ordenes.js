import { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import './Colores.css';
import './Ordenes.css';
import useAuth from "../auth/useAuth";
import { GetPedidosByUserID } from "../services/ComisionesService";

function Ordenes() {

    const { user } = useAuth();
    // aqui se guardan las comisiones
    const [comisiones, setComisiones] = useState([]);
    console.log(comisiones);

    const getComisiones = useCallback(async () => {
        const pedidos = await GetPedidosByUserID(user.userData._id);
        setComisiones(pedidos);
        console.log(pedidos)
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
                        <h3 style={{ color: '#ffffff' }}>Comisiones ordenadas</h3>
                        {comisiones.length !== 0 ? comisiones.map(tusComisiones => (
                            <div className="card d-inline-flex CC m-4">
                                <img className="card-img" src={tusComisiones.Imagen} alt="caray! no se pudo cargar." width="300" height="300" />
                                <div className="card-body">
                                    <h5 className="card-text">Tipo: {tusComisiones._Type.Tipo}</h5>
                                    <p className="card-title" style={{ width: '300px' }}><b>Descripción: </b>{tusComisiones.Descripcion} </p>
                                    <Link to={`/Perfil/${tusComisiones._User[0]._id}`} style={{ textDecoration: 'none' }}>
                                        <div className="usuariNFO">
                                            <img className="FotoUsuer" src={tusComisiones._User[0].Foto}></img>
                                            <p className="card-title" style={{ width: '300px' }}><b>Usuario: </b>{tusComisiones._User[0].Usuario} </p>
                                        </div>
                                    </Link>
                                    <br></br>
                                </div>
                            </div>
                        )) :
                            <h5 className="card-title" >No te han encargado ninguna comisión </h5>
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

export default Ordenes;
