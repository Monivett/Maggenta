import './Colores.css';
import { useState, useCallback, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from "../auth/useAuth";
import { GetUserId } from '../services/UserService';

function Perfil() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  const getUser = useCallback(async (id) => {

    const user = await GetUserId(id);

    setUserData(user);



  }, [])


  useEffect(() => {

    getUser(id);
  }, [getUser]);



  const { user } = useAuth();

  return (
    <div className="container-fluid bg4 ">
      <div className="row align-items-stretch">
        <div className="col m-3 text-center ">
          <img className="img rounded-circle" alt="100x100" src={userData.Foto}
            width="150" height="150" />
          <h3 className="fw-bold text-center mt-3 TCR"> {userData.Nombre} {userData.Apellidos}</h3>
          <h5 className="fw-bold text-center mt-3 TCR"> @{userData.Usuario}</h5>
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
        <div className="col-4 ">
          <div className="col p-3 text-white  m-5 rounded shadow " id="Margen">
            <h5 className="fw-light text-center mt-3"> Fecha de Nacimiento: <br></br> {user ? user.userData.FechaNac : '24-03-2000'} </h5>
            <h5 className="fw-light text-center mt-3"> {userData.Correo} </h5>
            {user.userData.id == userData._id ?
              <Fragment>
                <Link to="/EditarPerfil">
                  <button className="btn btn-outline-info m-3" type="submit">Editar Perfil</button>
                </Link>
                <Link to="/Comision">
                  <button className="btn btn-outline-info m-1" type="submit">Agregar Comisión</button>
                </Link>
              </Fragment>
              :

              <button className="btn btn-outline-info m-1" type="submit">Seguir Artista</button>
            }

          </div>
          <Link to="/ComisionesHoja">
            <button className="btn btn-outline-info m-1" type="submit">Hoja de Comisiones</button>
          </Link>

        </div>
        <div className="col-7 text-center   m-2 ">
          <Link to="/Publicacion">
            <div className="d-inline-flex m-3 " >
              <img className="img" src={require("../IMG/1.png")}
                alt="" width="300" height="300" />
            </div>
          </Link>
          <div className="d-inline-flex m-3 " >
            <img className="img" src={require("../IMG/4.png")}
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
