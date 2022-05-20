import { Fragment, useState, useEffect, useCallback } from "react";
import { Link, useParams } from 'react-router-dom';
import { axiosBase as axios } from "../services/Config";
import './Colores.css';
import './Ordenes.css';
import useAuth from "../auth/useAuth";
import { GetMisPedidosByUserID } from "../services/ComisionesService";

function MisPedidos() {

    const { user } = useAuth();
    const { id } = useParams();
    // aqui se guardan las comisiones
    const [comisiones, setComisiones] = useState([]);

    const getComisiones = useCallback(async () => {
        const pedidos = await GetMisPedidosByUserID(id);
        setComisiones(pedidos);
        console.log(pedidos)
    }, [])

    //Marcar como completa la comisión
    const MarcarCompleta = (idC) => {
        axios.delete(`/Comision/${idC}`)
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    alert('Se ha marcado tu pedido como terminado')
                    window.location.href = `/MisPedidos/${id}`;
                }
                else {
                    alert('¡No se puede marcar como terminada!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                        <h3 style={{ color: '#ffffff' }}>Mis pedidos</h3>
                        {comisiones.length !== 0 ? comisiones.map((tusComisiones)=> (
                            <div className="card d-inline-flex CC m-4">
                                <img className="card-img" src={tusComisiones.Imagen} alt="caray! no se pudo cargar." width="300" height="300" />
                                <div className="card-body">
                                    <h5 className="card-text">Tipo: {tusComisiones._Type.Tipo}</h5>
                                    <p className="card-title" style={{ width: '300px' }}><b>Descripción: </b>{tusComisiones.Descripcion} </p>
                                    {tusComisiones._Artist[0] && <Link to={`/Perfil/${tusComisiones._Artist[0]._id}`} style={{ textDecoration: 'none' }}>
                                        <div className="usuariNFO">
                                            <img className="FotoUsuer" src={tusComisiones._Artist[0].Foto}></img>
                                            <p className="card-title" style={{ width: '300px' }}><b>Usuario: </b>{tusComisiones._Artist[0].Usuario} </p>
                                        </div>
                                    </Link>}
                                    <br></br>
                                    <button className="btn btn-outline-info m-1" onClick={e => MarcarCompleta(tusComisiones._id)}>Marcar como completa</button>
                                </div>
                            </div>
                        )) :
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
