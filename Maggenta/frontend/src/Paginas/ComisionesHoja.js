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
                            <img className=" card-img-top" src={require("../IMG/3.png")} alt="Card image cap " />
                            <div className="card-body">
                                <h5 className="card-title">Comision 1 </h5>
                                <p className="card-text">250.00 MX</p>
                                <button className="btn btn-outline-info m-1">Comisionar</button>
                                <button className="btn btn-outline-info m-1">Borrar</button>
                              
                            </div>
                        </div>
                        <div class="card d-inline-flex CC m-4" >
                            <img className=" card-img-top" src={require("../IMG/4.png")} alt="Card image cap " />
                            <div className="card-body">
                                <h5 className="card-title">Comision 2 </h5>
                                <p className="card-text">350.00 MX</p>
                                <button className="btn btn-outline-info m-1">Comisionar</button>
                                <button className="btn btn-outline-info m-1">Borrar</button>
                              
                            </div>
                        </div>
                        <div class="card d-inline-flex CC m-4" >
                            <img className=" card-img-top" src={require("../IMG/2.png")} alt="Card image cap " />
                            <div className="card-body">
                                <h5 className="card-title">Comision 3 </h5>
                                <p className="card-text">150.00 MX</p>
                                <button className="btn btn-outline-info m-1">Comisionar</button>
                                <button className="btn btn-outline-info m-1">Borrar</button>
                              
                            </div>
                        </div>

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
