import { Fragment } from "react";


function Publicacion() {
  return (

    <Fragment>

      <div className="container-fluid bg4 ">
        <div className="row">
          <div className="col m-2">

            <div className="row m-5">

              <img className=" img" src={require("../IMG/tbchoi.jpg")}
                alt="Card image cap " width="300" height="500" />

              <div className="card mt-5 " >
                <div className="row">

                  <div className="col">

                    <div className="card-body ">
                      <p className="card-text text-dark">Dibujo bonito y muy pro</p>
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

            <div className="card  m-2  " >
              <div className="row">
                <div className="col-md-3 m-2 ">
                  <img className=" img" src={require("../IMG/1.png")}
                    alt="Card image cap " width="60" height="60" />


                  <div className="card-body ">
                    <a href="#" className="text-decoration-none ">Andrew Drei</a>
                  </div>
                </div>
                <div className="col">

                  <div className="card-body">
                    <p className="card-text text-dark">Que chido dibujo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card  m-2  " >
              <div className="row">
                <div className="col-md-3 m-2 ">
                  <img className=" img " src={require("../IMG/2.png")}
                    alt="Card image cap " width="60" height="60" />


                  <div className="card-body ">
                    <a href="#" className="text-decoration-none">AntonioElPro</a>
                  </div>
                </div>
                <div className="col">

                  <div className="card-body">
                    <p className="card-text text-dark">Puede mejorar:v</p>
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
