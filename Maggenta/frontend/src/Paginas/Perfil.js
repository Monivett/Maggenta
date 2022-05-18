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
import './Modal_Followers.css';
import Modal from './Modal_Followers';

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


  useEffect(() => {

    getUser(id);
 

  }, [getUser]);

  useEffect(() => {
    if (user) {
      isUserFollowed(id, user.userData._id)
    }
  },);

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
            <h5 className="fw-bold text-center mt-3 TCR"> @{userData.Usuario}</h5>
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
        <div className="row text-center  bg5   ">
          <div className="col-4 ">
            <div className="col p-3 text-white  m-5 rounded shadow " id="Margen">
              <h5 className="fw-light text-center mt-3"> Fecha de Nacimiento: <br></br> {userData.FechaNac} </h5>
              <h5 className="fw-light text-center mt-3"> {userData.Correo} </h5>
              {user && user.userData._id == userData._id ?
                <Fragment>
                  <Link to="/EditarPerfil">
                    <button className="btn btn-outline-info m-3" type="submit">Editar Perfil</button>
                  </Link>
                  <br></br>
                  <br></br>
                  <Link to="/Comision">
                    <button className="btn btn-outline-info m-1" type="submit">Agregar tipo de comisión</button>
                  </Link>
                  <br></br>
                  <br></br>
                  <Link to={`/Ordenes/${userData._id}`}>
                    <button className="btn btn-outline-info m-1" type="submit">Comisiones ordenadas</button>
                  </Link>
                  <br></br>
                  <br></br>
                  <Link to={`/MisPedidos/${userData._id}`}>
                    <button className="btn btn-outline-info m-1" type="submit">Comisiones pedidas</button>
                  </Link>
                </Fragment>
                :
                isFollowed ? <button className="btn btn-outline-info-danger m-1" type="submit" onClick={unFollowUser}>Dejar de seguir artista</button>
                  : <button className="btn btn-outline-info m-1" type="submit" onClick={followUser}>Seguir Artista</button>
              }
            </div>
            <Link to={`/ComisionesHoja/${userData._id}`}>
              <button className="btn btn-outline-info m-1" type="submit">Hoja de Comisiones</button>
            </Link>
          </div>
          <div className="col-7 text-center   m-2 ">
            {publicaciones && publicaciones.map(tuPost => (
              <Link to={`/Publicacion/${tuPost._id}`}>
                <div className="d-inline-flex m-3 " >
                  <img className="img" src={tuPost.Imagen}
                    alt="" width="300" height="300" />
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
