import { Fragment } from "react";

import "./Pago.css";
function Pago() {
    return (

        <Fragment>

            <div className="row m-5">
                <div className="col">
                    <div className="pago">
                        <form className="toditoPAGO">
                            <h2 id="yafalta" >¡YA FALTA POCO!</h2>
                            <div className="form-group">
                                <label id="letrasTITULAR"  for="">Nombre del titular: </label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Nombre del titular" />
                            </div>
                            <div className="form-group">
                                <label id="letrasTITULAR"  for="">Numero de Tarjeta: </label>
                                <input type="text" className="form-control" id="exampleInputDate" placeholder="Numero de la tarjeta" />
                            </div>
                            <div className="form-group">
                                <label id="letrasTITULAR"  for="">Fecha de Vencimiento: </label>
                                <select name="select">
                                    <option value="value1">01</option>
                                    <option value="value2">02</option>
                                    <option value="value3">03</option>
                                    <option value="value4">05</option>
                                    <option value="value4">06</option>
                                    <option value="value4">07</option>
                                    <option value="value4">08</option>
                                    <option value="value4">09</option>
                                    <option value="value4">10</option>
                                    <option value="value4">11</option>
                                    <option value="value4">12</option>
                                </select>
                                <select name="select">
                                    <option value="value1">22</option>
                                    <option value="value2">23</option>
                                    <option value="value3">24</option>
                                    <option value="value4">25</option>
                                    <option value="value4">26</option>
                                    <option value="value4">27</option>
                                    <option value="value4">28</option>
                                    <option value="value4">29</option>
                                    <option value="value4">30</option>
                                    <option value="value4">31</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label id="letrasTITULAR"  for="">CVC: </label>
                                <input type="text" className="form-control" id="exampleInputNumber" placeholder="CVC" />
                            </div><br />
                            <button type="button" onclick="alert('Ya pagaste')" className="btn btn-light btnPAGAR">PAGAR</button>
                        </form>
                    </div>
                </div>
            </div>



        </Fragment >

    );
}

export default Pago;