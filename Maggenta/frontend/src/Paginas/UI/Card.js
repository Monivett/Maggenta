import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { Link } from "react-router-dom";
import { LikesNumber } from '../../services/LikeService';
import { GetComentario } from "../../services/PublicacionesService";

export default function Card(props) {

    const [Likes, setLikes] = useState(0);
    const [Comentarios, setComentarios] = useState(0);

    const getPublicacionesLikes = useCallback(async (id) => {

        const postLikes = await LikesNumber(id)
        setLikes(postLikes.length);
       
    }, [])

    const getPublicacionesComments = useCallback(async (id) => {

        const comments = await GetComentario(id)
        setComentarios(comments.length);
       
    }, [])


    useEffect(() => {

      getPublicacionesLikes(props.tuPost._id);
      getPublicacionesComments(props.tuPost._id);

    }, [getPublicacionesLikes,getPublicacionesComments]);

    return (
        < Fragment key={props.tuPost._id}>
            <div className="card dibujin">
                <Link to={`/Publicacion/${props.tuPost._id}`}>
                    <img src={props.tuPost.Imagen} className="card-img-top superfit" alt="ups no cargo" />
                </Link>
                <div className="card-body display-flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill " viewBox="0 0 16 16" style={{ color: '#f54a7e' }}>
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>

                    <b className="minipadding" style={{ color: '#f54a7e' }}>
                        {Likes}
                    </b>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-right-heart-fill" viewBox="0 0 16 16" style={{ color: '#f54a7e' }}>
                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2ZM8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                    </svg>
                    <b className="minipadding" style={{ color: '#f54a7e' }}>
                       {Comentarios}
                    </b>
                </div>
            </div>
            <br />
        </Fragment>
    )
}
