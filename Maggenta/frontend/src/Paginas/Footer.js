import { Fragment } from "react";
import './Colores.css';

function Foot() {
    return (
        <Fragment>
            <footer className="bg3 text-white text-center " >
                <label htmlFor="inputAddress " className="m-5">Categorias:</label>
                <div className="container-fluid " >
                    <nav className="row ">
                        <ul className="col-4 mt-2 list-unstyled">
                            <button type="button" className="btn btn-dark mt-2 mb-2">FanArts</button><br />
                            <button type="button" className="btn btn-dark mt-2 mb-2">Escenarios</button><br />
                        </ul>
                        <ul className="col-4 mt-2 list-unstyled">
                            <button type="button" className="btn btn-dark mt-2 mb-2">Sketch</button><br />
                            <button type="button" className="btn btn-dark mt-2 mb-2">Digital</button><br />
                        </ul>
                        <ul className="col-4 mt-2 list-unstyled">
                            <button type="button" className="btn btn-dark mt-2 mb-2">Tradicional</button><br />
                            <button type="button" className="btn btn-dark mt-2 mb-2">Inicio</button><br />
                        </ul>
                    </nav>
                </div>
            </footer>
        </Fragment >
    );
}
export default Foot;
