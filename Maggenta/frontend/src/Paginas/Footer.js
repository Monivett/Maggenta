import { useState, useCallback, useEffect, Fragment } from "react";
import { Getall } from "../services//CategoryService";
import './Colores.css';

function Foot() {

    const [categorias, setCategorias] = useState([]);

    const getCategorias = useCallback(async () => {

        const categorias = await Getall();

        setCategorias(categorias);

    }, [])

    useEffect(() => {

        getCategorias();

    }, [getCategorias]);

    return (
        <Fragment>
            <footer className="bg3 text-white text-center " >
                <label htmlFor="inputAddress " className="m-5">Categorias:</label>
                <div className="container-fluid " >
                    <nav className="row ">
                        {categorias.map((category) => (

                            <ul className="col-4 mt-2 list-unstyled">
                                <button type="button" className="btn btn-dark mt-2 mb-2">{category.Category}</button><br />
                            </ul>

                        ))}
                    </nav>
                </div>
            </footer>
        </Fragment >
    );
}
export default Foot;
