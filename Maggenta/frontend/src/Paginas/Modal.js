import { Fragment, useState } from "react";
import ReactDom from "react-dom";
import useAuth from "../auth/useAuth";
import { axiosBase as axios } from "../services/Config";
import { useNavigate } from "react-router-dom";
import './Modal_Followers.css';


function ModalPassword(props) {

    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { user } = useAuth();
    const { Islogin } = useAuth();

    function submitHandler(event) { // 1.

        event.preventDefault();

        if (event.target.Contraseña.value !== '') {

            if (password.length >= 8) {
                setError('');
                setError('Actualizando contraseña...');
                Modificar(event);
            } else {
                setError('Contraseña mínima 8 caracteres');
            }
        }
        else {
            setError('¡La contraseña está vacía!');
        }

    }

    //Modifica los datos en MongoDB
    function Modificar(event) {

        axios.put(`/Usuario/${user.userData._id}`, {
            Contraseña: event.target.Contraseña.value,
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data !== '') {
                    Islogin(user.userData._id);
                    alert('Se han modificado la contraseña correctamente');
                    navigate(`/Perfil/${user.userData._id}`);
                }
                else {
                    setError('¡No se pudo modificar la contraseña!');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (

        <Fragment>
            <div className="modalV" >
                <div className="contenedor" >
                    <header>Editar contraseña</header>
                    <label for="btn-modal" onClick={props.onClose}>X</label>
                    <div className="contenido" >
                        <form onSubmit={submitHandler} className="grupo">
                            <p>Nueva contraseña:</p>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña..." name="Contraseña" onChange={event => setPassword(event.target.value)} required />
                            <br></br>
                            {error && <p className="error">{error}</p>}
                            <button type="submit" className="btn btn-light btn-lg" id="registro" style={{ backgroundColor: '#f54a7e', color: "#ffff" }}>Editar contraseña</button>
                        </form>
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

            {ReactDom.createPortal(<ModalPassword onClose={props.onClose} info={props.info} tipo={props.tipo} />, portalElement)}

        </Fragment>
    );
}