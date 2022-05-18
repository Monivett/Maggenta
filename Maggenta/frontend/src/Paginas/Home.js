import { Fragment, useEffect, useState, useCallback } from "react";
import "./Home.css";
import { Link, useParams } from "react-router-dom";
import { GetAll } from '../services/PublicacionesService';
import { GetPostByCategory } from "../services/PublicacionesService";
import useAuth from "../auth/useAuth";
import Card from "./UI/Card";


function Home() {

    const { idCategory } = useParams();

    // Aqui se guardan las publicacioes
    const [publicaciones, setPublicaciones] = useState([]);

    const getPublicaciones = useCallback(async () => {

        const publicaciones = await GetAll();
        setPublicaciones(publicaciones);
       
    }, [])

    const getPublicacionesCategory = useCallback(async (id) => {
        const publicaciones = await GetPostByCategory(id);
        setPublicaciones(publicaciones);

    }, [])

    useEffect(() => {
        if (idCategory === undefined) {
            getPublicaciones();
        } else {
            getPublicacionesCategory(idCategory);
        }
    }, [getPublicaciones, idCategory]);

    return (
        <Fragment>
            <div className="row homePage">
                {publicaciones && publicaciones.map((tuPost, i) => (
                 <Card tuPost={tuPost}></Card>
                ))
                }
            </div >
        </Fragment >
    );
}

export default Home;
