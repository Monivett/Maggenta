import { Fragment, useState, useCallback, useEffect } from "react";
import { Getall } from "../services//CategoryService";

function SubirPub() {

  const [categorias, setCategorias] = useState([]);

  const getCategorias = useCallback(async () => {

    const categorias = await Getall();

    setCategorias(categorias);

  }, [])

  useEffect(() => {

    getCategorias();

  }, [getCategorias]);




  const handleOnSubmitSchool = (event) => {
    event.preventDefault();
    console.log("le dió click enviar")

    /*  guardar los datos en la BD */
  };














  return (

    <Fragment>
      <div className="container-fluid bg4 ">
        <div className="row">
          <div className="col m-2">
            <div className="row">
              <img className="img" src={require("../IMG/tbchoi2.jpg")}
                alt="Card image cap " width="300" height="500" />
              <form>
                <div className="form-group m-5 text-center">
                  <label htmlFor="exampleFormControlFile1">Abrir Imagen</label>
                  <input type="file" className="form-control-file p-3" id="exampleFormControlFile1" />
                </div>
              </form>
            </div>
          </div>
          <div className="col bg2 m-2">
            <div className="col p-5 text-white  rounded shadow  mt-5 " id="Margen">

              <form onSubmit={handleOnSubmitSchool}>


                <div className="col p-3 text-white  m-1 rounded shadow " id="Margen">
                  <h5 className="card-text text-white fw-bold text-center mt-5"> Descripcion de la Imagen</h5>
                  <div className="form-group m-1">
                    <textarea className="form-control mt-2" rows="7"></textarea>
                  </div>
                  <div className="text-center m-3 ">
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                      {categorias.map(category => (
                        <option value={category._id} selected>{category.Category}</option>
                      ))}

                    </select>

                  </div>
                  <div className="text-center mb-5 ">
                    <button className="btn btn-outline-info m-2 " type="submit">Crear Publicacion</button>
                  </div>
                </div>



              </form>



            </div>

          </div>

        </div>

      </div>


    </Fragment>

  );
}

export default SubirPub;
