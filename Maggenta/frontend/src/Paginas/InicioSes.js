import { Fragment } from "react";
import "./InicioSes.css";
function Login() {
    return (
      <Fragment>
        
        <form action="Login" method="POST" id="login">  
        
        <div className="row m-2">
            <div className="col d-flex flex-column">
                <div className="logoFORMS">
                  <img src={require('../imag/maggentaLOGO.png')} alt="" height="70" width="270" />
                </div>
            </div>
        </div>

        <div className="form">
              
            <h1 id="letraTitulo" >INICIO DE SESIÓN</h1>
            <div className="grupo">
                <label id="letraCorreo"  for="">Correo electronico:</label><br/>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico..."/>
                
            </div>
            <div className="grupo">
                <label id="letraContra"  for="">Contraseña:</label><br/>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña..."/>
                
            </div>
                <br/>
                <button type="button" className="btn btn-light btn-lg" id="entrar">Entrar</button>
                
           
        </div> 
          
      </form>
      
      </Fragment>
    );
}
  
  export default Login;