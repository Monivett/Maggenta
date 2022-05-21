import { Fragment, useState } from "react";
import useAuth from "../auth/useAuth";
import classes from "./InicioSes.css";

const userCredentials = {};

function Login() {

  const { login } = useAuth();
  const [error, setError] = useState('');

  function submitHandler(event) {

    event.preventDefault();
    if (event.target.Correo.value !== '' && event.target.Contraseña.value != '') {
      login(event.target.Correo.value, event.target.Contraseña.value);
    } else {
      setError('¡Hay campos vacíos!');
    }

  }
  return (
    <Fragment>

      <form onSubmit={submitHandler} method="POST" id="login">
        <div className="row m-2">
          <div className="col d-flex flex-column">
            <div className="logoFORMS">
              <img src={require('../imag/maggentaLOGO.png')} alt="" height="70" width="270" id="LogoLogin" />
            </div>
          </div>
        </div>
        <div id="form">
          <h1 id="letraTitulo" >INICIO DE SESIÓN</h1>
          <div className="grupo">
            <label id="letraCorreo" htmlFor="">Correo electronico:</label><br />
            <input type="email" className="form-control" name="Correo" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico..." />
          </div>
          <div className="grupo">
            <label id="letraContra" htmlFor="">Contraseña:</label><br />
            <input type="password" className="form-control" name="Contraseña" id="exampleInputPassword1" placeholder="Contraseña..." />
          </div>
          <br />
          {error && <p className="errorwhite">{error}</p>}
          <div className="btn_Registrar">
            <button type="submit" className="btn btn-light btn-lg" >Entrar</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default Login;