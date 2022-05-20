import {useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { Getall } from "../services//CategoryService";
import './Colores.css';

function Nav() {

  const userToken = JSON.parse(sessionStorage.getItem('user-token'));

  const { Islogin } = useAuth();

  const { user } = useAuth();
  const { logout } = useAuth();
  const [categorias, setCategorias] = useState([]);

  const getCategorias = useCallback(async () => {

    const categorias = await Getall();

    setCategorias(categorias);

  }, [])

  const BuscarPublicacion = (event) => {
    event.preventDefault();
    if (event.target.Buscar.value !== "") {
      window.location.href = `/Busqueda/${event.target.Buscar.value}`
    }
  }

  useEffect(() => {
    if (user === null) {
      if (userToken) {
        Islogin(userToken);
      }
    }

    getCategorias();

  }, [getCategorias]);


  return (

    <nav className="navbar-fluid sticky-top navbar-expand-md   ">
      <div className="container-fluid ">
        <div className="row bg2">
          <div className="col m-3 " >
            <a href="/">
              <img src={require("../IMG/Logo.png")}
                alt="" width="150" />
            </a>
          </div>
          <form onSubmit={BuscarPublicacion} className="col  mt-3 formulario">
            <div className="col  mt-3 ">
              <input type="text" className="form-control" name="Buscar" id="Buscador" placeholder="Buscar" />
            </div>
            <div className="col mt-3">
              <button className="btn btn-outline-info " type="submit">Buscar</button>
            </div>
          </form>

          <div className="col-4  mt-3 ">
            {!user && <Link to="/login">
              <button className="btn btn-outline-info m-1" type="submit">Iniciar Sesion</button>
            </Link>}
            {!user && <Link to="/Registro">
              <button className="btn btn-outline-info m-1" type="submit">Registrarse</button>
            </Link>}
            {user && <a href="/">
              <button onClick={logout} className="btn btn-outline-info m-1" type="submit">Cerrar Sesión</button>
            </a>}
            {user && <Link to="/SubirPub">
              < button className="btn btn-outline-info m-1" >
                < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush-fill" viewBox="0 0 16 16">
                  <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z" />
                </svg>
              </button>
            </Link>}
            {user && <Link to="/Chat">
              < button className="btn btn-outline-info m-1" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-fill" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                </svg>
              </button>
            </Link>}
          </div>
          <div className="col-auto m-2 " >
            {user && <a href={`/Perfil/${user.userData._id}`}>
              <img className="img-thumbnail" src={user.userData.Foto}
                alt="" width="50" />
            </a>}
          </div>
        </div>
        <div className="row bg8">
          <ul className="navbar-nav    bg  p-1 ">
            <li className="nav-item"><a className="nav-link text-white" href="/" >Inicio</a></li>
            {categorias.map((category, i) => (
              <li className="nav-item" key={i}><a className="nav-link text-white" href={`/${category._id}`}>{category.Category}</a></li>
            ))}
          </ul>


        </div>
      </div>
    </nav >


  );
}

export default Nav;
