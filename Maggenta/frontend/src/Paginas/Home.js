import { Fragment, useEffect, useState, useCallback } from "react";
import "./Home.css";
import { Link } from 'react-router-dom';
import { GetAll } from '../services/PublicacionesService';
import { GetPostByUserID } from "../services/PublicacionesService";
import useAuth from "../auth/useAuth";


function Home() {
    const { user } = useAuth();

    // aqui se guardan las publicaci
    const [publicaciones, setPublicaciones] = useState([]);

    const getPublicaciones = useCallback(async () => {
        const publicaciones = await GetAll();
        setPublicaciones(publicaciones);

    }, [])

    useEffect(() => {

        getPublicaciones();

    }, [getPublicaciones]);

    return (
        <Fragment>
            <div className="row">
                {/** <div className=" col dibujo1"> */}

                {publicaciones.map(tuPost => (
                    <Fragment>

                        <div className="card dibujin">
                            <Link to={`/Publicacion/${tuPost._id}`}>
                                <img src={tuPost.Imagen} className="card-img-top superfit" alt="ups no cargo" />
                            </Link>

                            <div className="card-body display-flex ">
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill " viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>
                                <b className="minipadding">
                                    90.2K   
                                </b>
                               
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-right-heart-fill" viewBox="0 0 16 16">
                                    <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2ZM8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                </svg>
                                <b className="minipadding">
                                10 K
                                </b>
                                
                            </div>
                        </div>
                        <br />
                    </Fragment>


                ))}
                {/** </div> */}



            </div>
        </Fragment>
    );
}

export default Home;
