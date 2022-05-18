import { useState, useCallback, useEffect, Fragment } from "react";
import { useParams } from 'react-router-dom';
import { getOnePublicacion, GetComentario } from "../services/PublicacionesService";
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

  const [coment, setComentario] = useState([]);

  const getPublicaciones = useCallback(async (id) => {

    const DatoPublicaciones = await getOnePublicacion(id);
    setPublicaciones(DatoPublicaciones);
    setUserImg(DatoPublicaciones._User[0].Foto);
    setUserName(DatoPublicaciones._User[0].Usuario);

    const comentario = await GetComentario(id);
    setComentario(comentario);

    

  }, [])
  /*
    const MuestraComentarios = useCallback(async (postId) => {
  
     
    //  console.log(Messages);
  
    }, [])*/

  useEffect(() => {

    getPublicaciones(id);

  }, [getPublicaciones]);




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

                  <div className="col">

                    <div className="card-body userInfoPub">
                      <div className="row contornos pt-2">

                        <div className="mini-inline">
                          <img src={userImg} width='50' alt="no se cargo" height='50'></img>
                        </div>
                        <div className="mini-inline">
                          <p className="card-text text-dark">{userName}</p>
                        </div>
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
          <div className="col">

            <div className=" m-2  " >
              <div className="">
                <button className="btn btn-outline-info m-2 " type="submit"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg></button>
              </div>
            </div>
            {/** FOR DE COMENTARIOS */}
           
            {coment.map(ElComentario => (
              <div className="card  m-2  " >
                <div className="row">
                  <div className="col-md-3 m-2 ">
                    <img className=" img" src={require("../IMG/1.png")}
                      alt="no se pudo cargar" width="60" height="60" />

{ /**console.log(ElComentario._User.Usuario)*/}
                    <div className="card-body ">
                      <a href="#" className="text-decoration-none ">Andrew Drei</a>
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

            {/** FORM */}
            <div className="col p-3 text-white  rounded shadow ">

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
            </div>

          </div>

        </div>

      </div>



    </Fragment >

  );
}

export default Publicacion;
