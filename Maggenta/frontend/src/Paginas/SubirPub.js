import { Fragment, useState, useCallback, useEffect } from "react";
import { Getall } from "../services//CategoryService";
import useAuth from "../auth/useAuth";
import { storage } from "../Firebase";
import { axiosBase as axios } from "../services/Config";
import { useNavigate } from "react-router-dom";

function SubirPub() {

  const [categorias, setCategorias] = useState([]);
  const [image, setImage] = useState();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getCategorias = useCallback(async () => {
    const categorias = await Getall(); // te traes todas las categorias (?)
    setCategorias(categorias);
  }, [])

  useEffect(() => {
    getCategorias();
  }, [getCategorias]);


  //Cuando la foto cambia
  function handleChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])

    }
  }


  // 1. Cuando oprimo el botón crear
  const handleOnSubmitSchool = (event) => {
    event.preventDefault();
    /*
        console.log("descripcion: ", event.target.descripcion.value);
        console.log("IDcategoria: " , event.target.categoria.value);
        console.log("imagen: ", event.target.image.value);
        console.log("IDusuario:", user.userData._id);*/
    //  console.log("lenght descri:", event.target.descripcion.value.length);

    if (event.target.image.value !== '' && event.target.descripcion.value !== '' && event.target.categoria.value !== '') {
      setError('');

      if (event.target.descripcion.value.length >= 8 && event.target.descripcion.value.length <= 280) {
        setError('Creando Publicacion...');
        uploadToFirebase(event);
      } else {
        setError('Descripcion mínima 8 y máxima 280 caracteres');
      }


    }
    else {
      setError('¡te falta completar campos!');
    }

    

  };

  // 2. Subir foto a Firebase
  const uploadToFirebase = (event) => {
    const uploadTask = storage.ref(`PostsImages/${image.name}`).put(image); // se sube
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage.ref('PostsImages').child(image.name).getDownloadURL().then(url => { // se descarga la URL
          if (url !== undefined) { // si existe
            Registrar(event, url);  // → 3. 
          }

        })
      }

    )
  }

  // 3. Registra los datos a MongoDB
  function Registrar(event, url) {

    axios.post('/Publicacion', {
      Contenido: event.target.descripcion.value,
      Imagen: url,
      _User: user.userData._id,
      _Category: event.target.categoria.value
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data !== '') {
          alert('Muy bien, se ha creado tu post.');
          navigate("/0");
        }
        else {
          setError('¡No se pudo crear tu post!');
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }












  return (

    <Fragment>
      <div className="container-fluid bg4 ">

        {/** aqui el Form */}
        <form onSubmit={handleOnSubmitSchool}>
          <div className="row">
            <div className="col m-2">
              <div className="row">

                <img className="reg-publ"
                  src={require("../IMG/tbchoi2.jpg")}
                  alt="no se pudo cargar :("
                  width="300" height="500"
                />

                { /**    Imagen     */}

                <div className="form-group m-5 text-center">
                  <label htmlFor="exampleFormControlFile1">Abrir Imagen</label>

                  <input
                    type="file"
                    className="form-control-file p-3"
                    id="exampleFormControlFile1"
                    name="image"
                    onChange={handleChange}
                    required
                  />
                </div>



              </div>
            </div>
            <div className="col bg2 m-2">
              <div className="col p-5 text-white  rounded shadow  mt-5 " id="Margen">




                <div className="col p-3 text-white  m-1 rounded shadow " id="Margen">
                  <h5 className="card-text text-white fw-bold text-center mt-5"> Descripcion de la Imagen</h5>

                  { /* Descripcion */}
                  <div className="form-group m-1">
                    <textarea className="form-control mt-2" rows="7" name="descripcion" required ></textarea>
                  </div>

                  { /* Categoria*/}
                  <div className="text-center m-3 " name="categoria">
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="categoria" required  >
                      {categorias.map(category => (
                        <option value={category._id} selected>{category.Category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="text-center mb-5 ">
                    <p className="error">{error}</p>
                    <button className="btn btn-outline-info m-2 " type="submit">Crear Publicacion</button>
                  </div>
                </div>







              </div>

            </div>






          </div>

        </form>
        {/** fin del Form */}
      </div>


    </Fragment>

  );
}

export default SubirPub;
