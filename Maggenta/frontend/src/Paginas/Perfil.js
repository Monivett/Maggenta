import './Colores.css';
import { Link } from 'react-router-dom';
import useAuth from "../auth/useAuth";

function Perfil() {

  const { user } = useAuth();

  return (
      <div className="container-fluid bg4 ">
        <div className="row align-items-stretch">
          <div className="col m-3 text-center ">
            <img className="img rounded-circle" alt="100x100" src={ user? user.userData.Foto: require("../IMG/Perfil2.png")}
              width="150" height="150" />
            <h3 className="fw-bold text-center mt-3 TCR"> Monica Chappa</h3>
            <h5 className="fw-bold text-center mt-3 TCR"> @Monivette</h5>
          </div>
        </div>
        <div className="row align-items-stretch">
          <div className="col text-center   m-2 ">
            <div className="row align-items-stretch">
              <div className="col text-center  m-1 ">
                <h3 className="fw-bold text-center  TCR"> Seguidores </h3>
                <h3 className="fw-bold text-center  TCR"> 500K </h3>
              </div>
              <div className="col text-center   m-2 ">
                <h3 className="fw-bold text-center  TCR"> Seguidos </h3>
                <h3 className="fw-bold text-center TCR"> 400K </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center  bg5   ">
          <div className="col-3 ">
            <div className="col p-3 text-white  m-5 rounded shadow " id="Margen">
              <h3 className="fw-bold text-center mt-3"> Frase de presentacionacion </h3>
              <h3 className="fw-bold text-center mt-3"> Nombre de Usuario </h3>
              <h3 className="fw-bold text-center mt-3"> Fecha de Nacimiento </h3>
              <h3 className="fw-bold text-center mt-3"> Correo </h3>
              <Link to="/EditarPerfil">
                <button className="btn btn-outline-info m-3" type="submit">Editar Perfil</button>
              </Link>
              <Link to="/ComisionesHoja">
                <button className="btn btn-outline-info m-1" type="submit">Hoja de Comisiones</button>
              </Link>
            </div>
            <button className="btn btn-outline-info m-1" type="submit">Seguir Artista</button>
            <button className="btn btn-outline-info m-1" type="submit">Comisionar Artista</button>
          </div>
          <div className="col-8 text-center   m-2 ">
            <Link to="/Publicacion">
              <div className="d-inline-flex m-3 " >
                <img className="img" src={require("../IMG/9.png")}
                  alt="" width="300" height="300" />
              </div>
            </Link>
            <div className="d-inline-flex m-3 " >
              <img className="img" src={require("../IMG/2.png")}
                alt="" width="300" height="300" />
            </div>
            <div className="d-inline-flex m-3 " >
              <img className="img" src={require("../IMG/2.png")}
                alt="" width="300" height="300" />
            </div>
            <div className="d-inline-flex m-3 " >
              <img className="img" src={require("../IMG/9.png")}
                alt="" width="300" height="300" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Perfil;
