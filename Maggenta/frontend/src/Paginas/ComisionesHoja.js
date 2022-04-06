import { Fragment } from "react";
import { Link } from "react-router-dom";
import './Colores.css';

function ComisionesHoja() {
    return (
        <Fragment>


            <div className="container-fluid bg4  p-5">
                <div className="row ">
                    <div className="col m-2">





                    </div>
                    <div className="col-10 bg2  align-items-center m-2 p-5">


                        <div class="card d-inline-flex CC m-4" >
                            <img className=" card-img-top" src={require("../IMG/1.png")} alt="Card image cap " />
                            <div class="card-body">
                                <h5 class="card-title">Precio </h5>
                                <p class="card-text">Descripcion de tipo de comision.</p>

                            </div>
                        </div>


                        <div class="card d-inline-flex CC m-4" >
                            <img className=" card-img-top" src={require("../IMG/1.png")} alt="Card image cap " />
                            <div class="card-body">
                                <h5 class="card-title">Precio </h5>
                                <p class="card-text">Descripcion de tipo de comision.</p>

                            </div>
                        </div>
                        <div class="card d-inline-flex CC m-4" >
                            <img className=" card-img-top" src={require("../IMG/1.png")} alt="Card image cap " />
                            <div class="card-body">
                                <h5 class="card-title">Precio </h5>
                                <p class="card-text">Descripcion de tipo de comision.</p>

                            </div>
                        </div>
                        <div class="card d-inline-flex CC m-4" >
                            <img className=" card-img-top" src={require("../IMG/1.png")} alt="Card image cap " />
                            <div class="card-body">
                                <h5 class="card-title">Precio </h5>
                                <p class="card-text">Descripcion de tipo de comision.</p>

                            </div>
                        </div>



                        <Link to="/Chat">
                            <button className="btn btn-outline-info m-1" type="submit">Comisionar Artista</button>
                        </Link>


                    </div>
                    <div className="col  m-2">






                    </div>

                </div>

            </div>



        </Fragment >

        // Tiene que retornar una sola cosa uwu
        //Un Div Gigante o un Fragment.


    );
}

export default ComisionesHoja;
