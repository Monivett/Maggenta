import { Fragment } from "react";
import useAuth from "../auth/useAuth";
import classes from "./InicioSes.css";

const userCredentials = {};

function Login() {
  
const {login} = useAuth();

  function submitHandler(event) {

    event.preventDefault();

    login(event.target.Correo.value,event.target.Contraseña.value);
 
}
  return (
    <Fragment>

      <form onSubmit={submitHandler} method="POST" id="login">

        <div className="row m-2">
          <div className="col d-flex flex-column">
            <div className="logoFORMS">
              <img src={require('../imag/maggentaLOGO.png')} alt="" height="70" width="270" />
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
            <input type="password" className="form-control"  name="Contraseña"  id="exampleInputPassword1" placeholder="Contraseña..." />
          </div>
          <br />
          <button type="submit"  className="btn btn-light btn-lg" id="entrar">Entrar</button>
        </div>
      </form>
    </Fragment>
  );
}

export default Login;