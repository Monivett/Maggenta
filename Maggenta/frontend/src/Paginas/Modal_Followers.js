import { Fragment } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import './Modal_Followers.css';

function FollowModal(props) {

    return (

        <Fragment>
            <div className="modalV" >
                <div className="contenedor" >
                    <header>{props.tipo}</header>
                    <label for="btn-modal" onClick={props.onClose}>X</label>
                    <div className="contenido" id="scroll">
                        {props.info.map(user => (
                            user._UserFollow.Foto !== undefined ?
                                <a href={`/Perfil/${user._UserFollow._id}`} style={{ textDecoration: 'none' }}>
                                    <div className="usuarioInfo">
                                        <img src={user._UserFollow.Foto} alt="" height="50px" width="50px" />
                                        <p>{user._UserFollow.Usuario}</p>
                                    </div>
                                    
                                </a>
                                : <a href={`/Perfil/${user._UserFollower._id}`} style={{ textDecoration: 'none' }}>
                                    <div className="usuarioInfo">
                                        <img src={user._UserFollower.Foto} alt="" height="50px" width="50px" />
                                        <p>{user._UserFollower.Usuario}</p>
                                    </div>
                                </a>
                        ))}
                    </div>
                </div>
            </div >
        </Fragment >
    );

}

const portalElement = document.getElementById('overlay');

export default function Modal(props) {

    return (
        <Fragment>

            {ReactDom.createPortal(<FollowModal onClose={props.onClose} info={props.info} tipo = {props.tipo} />, portalElement)}

        </Fragment>
    );
}