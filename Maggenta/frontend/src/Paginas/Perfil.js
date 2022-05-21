import './Colores.css';
import { useState, useCallback, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from "../auth/useAuth";
import { GetUserId } from '../services/UserService';
import { IsFollow } from "../services/FollowService";
import { UserFollowers } from "../services/FollowService";
import { UserFollows } from "../services/FollowService";
import { axiosBase as axios } from "../services/Config";
import { GetPostByUserID } from "../services/PublicacionesService";
import { GetRules } from "../services/RulesService";
import Modal from './Modal_Followers';
import './Modal_Followers.css';
import './Perfil.css'
function Perfil() {

  const { id } = useParams();

  const [userData, setUserData] = useState([]);

  const [isFollowed, setIsFollowed] = useState(false);
  const [followersNumber, setFollowersNumber] = useState(0);
  const [followsNumber, setFollowsNumber] = useState(0);

  const { user } = useAuth();

  const [showFollowers, setShowFollowers] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState('');
  const [typeModalInfo, setTypeModalInfo] = useState('');

  const [rules, setRules] = useState([]);

  const handleClose = () => setShowFollowers(false);

  const handleShow = (data, tipo) => {
    setShowFollowers(true);
    setShowModalInfo(data);
    setTypeModalInfo(tipo);
  }

  // aqui se guardan las publicaciones
  const [publicaciones, setPublicaciones] = useState([]);

  const getPublicaciones = useCallback(async (id) => {
    const publicaciones = await GetPostByUserID(id);
    setPublicaciones(publicaciones);

  }, [])


  const getUser = useCallback(async (id) => {

    const usuario = await GetUserId(id);

    setUserData(usuario);
    userFollowers(id);
    userFollows(id);
    getPublicaciones(id)
    getRules(id);

  }, [])

  //Mostrar la cantidad de seguidores 
  const userFollowers = (userId) => {

    async function fetchData() {

      const isFollow = await UserFollowers(userId);

      setFollowersNumber(isFollow);
    }
    fetchData();
  }
  //Mostrar la cantidad de artistas que el usuario ha seguido
  const userFollows = (userId) => {

    async function fetchData() {

      const isFollow = await UserFollows(userId);

      setFollowsNumber(isFollow);
    }
    fetchData();
  }
  //Seguir al artista 
  const followUser = () => {
    axios.post('/Seguir', {
      _UserFollow: userData._id,
      _UserFollower: user.userData._id
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data !== '') {
          console.log('Se ha seguido a ' + userData.Usuario);
          setIsFollowed(true);
          userFollowers(userData._id);
        }
        else {
          alert('¡No se pudo seguir a este artista!');
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //Dejar de seguir al artista
  const unFollowUser = () => {
    axios.delete(`/Seguir/${userData._id}/${user.userData._id}`)
      .then(function (response) {
        console.log(response.data);
        if (response.data !== '') {
          console.log('Se ha dejado de seguir a ' + userData.Usuario);
          setIsFollowed(false);
          userFollowers(userData._id);
        }
        else {
          alert('¡No se puede dejar de seguir a este artista!');
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //¿Sigues a este artista?
  const isUserFollowed = useCallback(async (follow, follower) => {

    async function fetchData() {

      const isFollow = await IsFollow(follow, follower);

      if (isFollow.length === 0) {
        console.log('No lo has seguido');
        setIsFollowed(false);

      } else {
        console.log('Ya esta seguido')
        setIsFollowed(true);
      }
    }
    fetchData();

  }, [])

  //Checa si el usuario ya hizo reglas
  const getRules = useCallback(async () => {
    const reglas = await GetRules(id);
    setRules(reglas);
  }, [])

  useEffect(() => {
    getUser(id);
  }, [getUser]);

  useEffect(() => {
    if (user) {
      isUserFollowed(id, user.userData._id)
    }
  });

  return (
    <Fragment>
      {showFollowers && <Modal show={showFollowers} onClose={handleClose} info={showModalInfo} tipo={typeModalInfo}>
      </Modal>}
      <div className="container-fluid bg4 ">
        <div className="row align-items-stretch">
          <div className="col m-3 text-center ">
            <img className="img rounded-circle" alt="100x100" src={userData.Foto}
              width="150" height="150" />
            <h3 className="fw-bold text-center mt-3 TCR"> {userData.Nombre} {userData.Apellidos}</h3>
            <h5 className="fw-bold text-center mt-2 TCR"> @{userData.Usuario}</h5>
            <h5 className="fw-light text-center mt-2 TCR"> Fecha de Nacimiento: <br></br> {userData.FechaNac} </h5>
            <h5 className="fw-light text-center mt-2 TCR"> {userData.Correo} </h5>
          </div>
        </div>
        <div className="row align-items-stretch">
          <div className="col text-center   m-2 ">
            <div className="row align-items-stretch">
              <div className="col text-center  m-1 ">
                <h3 className="fw-bold text-center  TCR TCRH" onClick={(e) => handleShow(followersNumber, 'Seguidores')}> Seguidores </h3>
                <h3 className="fw-bold text-center  TCR"> {followersNumber.length} </h3>
              </div>
              <div className="col text-center   m-2 ">
                <h3 className="fw-bold text-center  TCR TCRH" onClick={(e) => handleShow(followsNumber, 'Seguidos')}> Seguidos </h3>
                <h3 className="fw-bold text-center TCR"> {followsNumber.length} </h3>
              </div>
            </div>
          </div>
        </div>



        {user && user.userData._id == userData._id ?  /*SI TU ERES EL DUEÑO DEL PERFIL*/
          <nav class="navbar navbar-expand-lg navbar-light NavPerfil ">
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
              <div className="navbar-nav">

                <Fragment>
                  <Link to="/EditarPerfil" className="nav-item nav-link">
                    Editar Perfil
                  </Link>
                  <br></br>
                  <br></br>
                  <Link to="/Comision" className="nav-item nav-link">
                    Agregar tipo de comisión
                  </Link>
                  <br></br>
                  <br></br>
                  {rules.length === 0 ? <Link to="/Reglas" className="nav-item nav-link">
                    Publicar Reglas
                  </Link> :
                    <Link to="/EditarReglas" className="nav-item nav-link">
                      Editar Reglas
                    </Link>
                  }
                  <br></br>
                  <br></br>
                  <Link to={`/Ordenes/${userData._id}`} className="nav-item nav-link">
                    Comisiones que te han ordenado
                  </Link>
                  <br></br>
                  <br></br>
                  <Link to={`/MisPedidos/${userData._id}`} className="nav-item nav-link">
                    Comisiones que tu has pedido
                  </Link>
                </Fragment>

              </div>
            </div>
          </nav>
          : isFollowed ?
            <div className='botonSeguir'>
              <button className="btn btn-outline-info-danger m-1 " type="submit" onClick={unFollowUser}>Dejar de seguir artista</button>
            </div>
            : <div className='botonSeguir'>
              <button className="btn btn-outline-info m-1" type="submit" onClick={followUser}>Seguir Artista</button>
            </div>
        }
        <div className='botonSeguir mt-2'>
          <Link to={`/ComisionesHoja/${userData._id}`}>
            <button className="btn btn-outline-info m-1" type="submit">Hoja de Comisiones</button>
          </Link>

        </div>

        <div className="row text-center    ">
          <div className="col text-center d-flex align-content-start flex-wrap m-2 ">
            {publicaciones && publicaciones.map(tuPost => (
              <Link to={`/Publicacion/${tuPost._id}`}>
                <div className="d-inline-flex m-3 " >
                  <img className="img" src={tuPost.Imagen}
                    alt="" width="470" height="470" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default Perfil;
