import { Fragment, useEffect, useState, useCallback } from "react";
import "./Home.css";
import { Link, useParams } from "react-router-dom";
import { GetAll } from '../services/PublicacionesService';
import { GetPostByDescripcion } from "../services/PublicacionesService";
import useAuth from "../auth/useAuth";
import Card from "./UI/Card";


function Buscar() {

    const { Contenido } = useParams();
    const { user } = useAuth();

    // aqui se guardan las publicaci
    const [publicaciones, setPublicaciones] = useState([]);

    const getPublicaciones = useCallback(async () => {
        const publicaciones = await GetAll();
        setPublicaciones(publicaciones);

    }, [])

    const getPublicacionesContenido = useCallback(async (id) => {
        const publicaciones = await GetPostByDescripcion(id);
        setPublicaciones(publicaciones);

    }, [])

    useEffect(() => {
      
        getPublicacionesContenido(Contenido);
    


    }, [getPublicaciones]);

    return (
        <Fragment>
            <div className="row homePage">
                {publicaciones.length !==0 ? publicaciones.map(tuPost => (
                  <Card tuPost={tuPost}></Card>
                )):
                <p className="errorwhite" style={{marginTop: '10px'}}>No se encontraron resultados de: " {Contenido} "</p>}
            </div>
        </Fragment>
    );
}

export default Buscar;
