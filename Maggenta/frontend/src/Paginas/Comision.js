import { Fragment } from "react";
import "./comision.css";
function Comision() {
    return (
      <Fragment>
        
        <div className="row todo">
        <div className="col d-flex flex-column">
            <div className="comision">
                <form action="" id="todo">
                    <h2 >AGREGA UN TIPO DE COMISIÓN:</h2><br/>
                    <div className="form-group">
                        <label for="formGroupExampleInput" id= "letraTIPO" >Tipo de comisión:</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Tipo..."/>
                    </div><br/>
                    <div className="form-group">
                        <label for="formGroupExampleInput" id= "letraPRECIO" >Costo:</label>
                        <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Costo..."/>
                    </div><br/>
                    <div className="form-group">
                        <label for="formGroupExampleInput" id= "letraEJEMPLO" >Ejemplo:</label><br/>
                        <input id="foto" name="image" className="input-file" type="file" required/>
                    </div><br/>
                    <button type="button" className="btn btn-light btn-lg" id="agregar">Agregar</button>
                </form>
            </div>
        </div>
    </div>
      
      </Fragment>
    );
  }
  
  export default Comision;