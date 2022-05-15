import { Fragment } from "react";
import ReactDom from "react-dom";
import './Modal_Followers.css';

function FollowModal(props) {

    console.log(props)
    return (

        <Fragment>
            <div className="modalV" >
                <div className="contenedor" >
                    <header>Seguidores</header>
                    <label for="btn-modal" onClick={props.onClose}>X</label>
                    <div className="contenido" id="scroll">
                        {props.info.map(user => (
                            user._UserFollow.Foto !== undefined ?
                                <div className="usuarioInfo">
                                    <img src={user._UserFollow.Foto} alt="" height="50px" width="50px" />
                                    <p>{user._UserFollow.Usuario}</p>
                                    <br />
                                    </div>:
                                 <div className="usuarioInfo">
                                    <img src={user._UserFollower.Foto} alt="" height="50px" width="50px" />
                                    <p>{user._UserFollower.Usuario}</p>
                                    <br />
                                    </div>
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

            {ReactDom.createPortal(<FollowModal onClose={props.onClose} info={props.info} />, portalElement)}

        </Fragment>
    );
}