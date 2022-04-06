import { Fragment } from "react";


function Publicacion() {
  return (

    <Fragment>

      <div className="container-fluid bg4 ">
        <div className="row">
          <div className="col m-2">

            <div className="row">

              <img className=" img" src={require("../IMG/1.png")}
                alt="Card image cap " width="300" height="800" />

              <div className="card  m-2  " >
                <div className="row">
                  
                  <div className="col">

                    <div className="card-body">
                      <p className="card-text text-dark">Descripcion</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>



          </div>
          <div className="col">


            <div className="card  m-2  " >
              <div className="row">
                <div className="col-md-2 m-2 ">
                  <img className=" img " src={require("../IMG/1.png")}
                    alt="Card image cap " width="60" height="60" />


                  <div className="card-body ">
                    <a href="#" className="text-decoration-none">Usuario</a>
                  </div>
                </div>
                <div className="col">

                  <div className="card-body">
                    <p className="card-text text-dark">Comentario</p>
                  </div>
                </div>
              </div>
            </div>



            <div className="card  m-2  " >
              <div className="row">
                <div className="col-md-2 m-2 ">
                  <img className=" img " src={require("../IMG/1.png")}
                    alt="Card image cap " width="60" height="60" />


                  <div className="card-body ">
                    <a href="#" className="text-decoration-none">Usuario</a>
                  </div>
                </div>
                <div className="col">

                  <div className="card-body">
                    <p className="card-text text-dark">Comentario</p>
                  </div>
                </div>
              </div>
            </div>




            <div className="col p-3 text-white  rounded shadow ">

              <div className="col p-3 text-white  m-1 rounded shadow " id="Margen">
                <h5 className="card-text text-white fw-bold text-center "> Comentar </h5>

                <div className="form-group m-1">

                  <textarea className="form-control mt-2" rows="7"></textarea>
                </div>

                <div className="text-center ">
                  <button className="btn btn-outline-info m-2 " type="submit">Publicar Comentario</button>

                </div>


              </div>
            </div>

          </div>

        </div>

      </div>



    </Fragment >

  );
}

export default Publicacion;
