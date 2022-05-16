import { Fragment } from "react";

import "./Pago.css";
function Pago() {
    return (

        <Fragment>

            <div className="row m-5">
                <div className="col">
                    <div className="pago">
                        <form className="toditoPAGO">
                            <h2 id="yafalta" >Comisión: FullBOdy</h2>
                            <div className="form-group">
                                <label id="letrasTITULAR"  for="">Descripción de comisión: </label>
                                <textarea type="text" className="form-control" id="exampleInputName" placeholder="Describe que tipo de dibujo tienes en mente..." />
                            </div>
                            <div className="form-group">
                                <label id="letrasTITULAR"  for="">Numero de Tarjeta: </label>
                                <input type="text" className="form-control" id="exampleInputDate" placeholder="Numero de la tarjeta" />
                            </div>
                            <div className="form-group">
                                <label id="letrasTITULAR"  for="">Imagen de referencia: </label>
                                <input type="file" className="form-control" id="exampleInputDate" />
                            </div>
                            <label id="letrasTITULAR"  for="">Costo:  </label>
                            <br />
                            <label id="letrasTITULAR"  for="">Artista:  </label>
                            <br />
                            <button type="button" onclick="alert('Ya pagaste')" className="btn btn-light btnPAGAR">PAGAR</button>
                        </form>
                    </div>
                </div>
            </div>



        </Fragment >

    );
}

export default Pago;