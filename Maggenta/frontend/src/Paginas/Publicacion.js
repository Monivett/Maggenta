import { useState, useCallback, useEffect, Fragment } from "react";
import { Link, useParams } from 'react-router-dom';
import { getOnePublicacion, GetComentario } from "../services/PublicacionesService";
import { IsLiked } from "../services/LikeService";
import { axiosBase as axios } from "../services/Config";
import useAuth from "../auth/useAuth";
import './Publicacion.css'

function Publicacion() {
  const { id } = useParams();
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Aquí se guardan las publicaciones
  const [publicaciones, setPublicaciones] = useState([]);
  //Imagen del usuario que la publicó
  const [userImg, setUserImg] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userId, setUserId] = useState([]);

  const [coment, setComentario] = useState([]);

  //Si el usuario dio Like
  const [isLiked, setIsLiked] = useState(false);

  const getPublicaciones = useCallback(async (id) => {

    const DatoPublicaciones = await getOnePublicacion(id);
    setPublicaciones(DatoPublicaciones);
    setUserImg(DatoPublicaciones._User[0].Foto);
    setUserName(DatoPublicaciones._User[0].Usuario);
    setUserId(DatoPublicaciones._User[0]._id)
    const comentario = await GetComentario(id);
    setComentario(comentario);

  }, [])

  //¿Le diste like a la publicación?
  const isUserLiked = useCallback(async (user, post) => {

    async function fetchData() {

      const isLiked = await IsLiked(user, post);

      if (isLiked.length === 0) {
        console.log('No le has dado like');
        setIsLiked(false);

      } else {
        console.log('Ya le diste like')
        setIsLiked(true);
      }
    }
    fetchData();

  }, [])

  useEffect(() => {

    getPublicaciones(id);


  }, [getPublicaciones]);

  useEffect(() => {
    if (user) {
      isUserLiked(user.userData._id, id)
    }
  }, [user]);

  //Al dar click al botón enviar
  function submitHandler(event) {

    event.preventDefault();

    if (event.target.message.value !== '') {
      setError('');
      axios.post('/Publicacion/:id', {
        Contenido: event.target.message.value,
        _User: user.userData._id,
        _Post: publicaciones._id
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data !== '') {
            event.target.message.value = '';
            getPublicaciones(publicaciones._id)
          }
          else {
            setError('¡No se pudo enviar el mensaje!');
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      setError('¡No escribiste ningun mensaje!');
    }
  }

  //Al dar click al botón de Like
  function Like(user, post) {

    axios.post('/Like', {
      _User: user,
      _Post: post
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data !== '') {
          console.log('Has dado Like');
          setIsLiked(true);
        }
        else {
          setError('¡No se pudo dar Like!');
        }

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  //Al dar click al botón de unLike
  function UnLike(user, post) {
    axios.delete(`/Like/${user}/${post}`)
      .then(function (response) {
        console.log(response.data);
        if (response.data !== '') {
          console.log('Has dado UnLike');
          setIsLiked(false);
        }
        else {
          setError('¡No se pudo dar UnLike!');
        }

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (

    <Fragment>
      <div className="container-fluid bg4 ">
        <div className="row">
          <div className="col m-2">
            <div className="row m-5">
              <img className=" reg-publ" src={publicaciones.Imagen}
                alt="No se pudo cargar..." width="300" height="500" />
              <div className="card mt-5 " >
                <div className="row">
                  <div className="col" >
                    <div className="card-body userInfoPub">
                      <div className="row contornos pt-2">
                        <Link  to={`/Perfil/${userId}`}>
                          <div className="mini-inline">
                            <img src={userImg} width='50' alt="no se cargo" height='50'></img>
                          </div>
                          <div className="mini-inline">
                            <p className="card-text text-dark">{userName}</p>
                          </div>
                        </Link>

                      </div>
                      <div className="mini-block ">
                        <p className="card-text text-dark">{publicaciones.Contenido}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4"  >

            {user &&
              <div className=" m-2  " >
                <div className="">
                  {isLiked ? <button className="btn btn-outline-info-danger m-2" type="button" onClick={e => UnLike(user.userData._id, publicaciones._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z" />
                    </svg>
                  </button>
                    : <button className="btn btn-outline-info m-2 " type="button" onClick={e => Like(user.userData._id, publicaciones._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                      </svg>
                    </button>}
                </div>
              </div>
            }


            <div className=" m-2  " id="scroll3">
              {/** FOR DE COMENTARIOS */}
              {coment.map(ElComentario => (
                <div className="card  m-2  comentarios " >
                  <div className="row">
                    <div className="col-md-3 m-2 infoUserComentario">
                      <img className=" img" src={ElComentario._User[0].Foto}
                        alt="no se pudo cargar" width="60" height="60" />
                      <div className="card-body ">
                        <Link to={`/Perfil/${ElComentario._User[0]._id}`} className="text-decoration-none">{ElComentario._User[0].Usuario}</Link>
                      </div>
                    </div>
                    <div className="col">

                      <div className="card-body">
                        <p className="card-text text-dark">{ElComentario.Contenido}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/** FORM */}
            {user && <div className="col p-3 text-white  rounded shadow ">
              <div className="col p-3 text-white  m-1 rounded shadow " id="Margen">
                <h5 className="card-text text-white fw-bold text-center "> Comentar </h5>
                <form onSubmit={submitHandler}>
                  <div className="form-group m-1">
                    <textarea className="form-control mt-2" rows="7" name="message" ></textarea>
                  </div>
                  <div className="text-center ">
                    <button className="btn btn-outline-info m-2 " type="submit">Publicar Comentario</button>
                  </div>
                </form>
              </div>
            </div>}

          </div>

        </div>

      </div>



    </Fragment >

  );
}

export default Publicacion;
