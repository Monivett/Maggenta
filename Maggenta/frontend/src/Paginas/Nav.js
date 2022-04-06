import { Fragment } from "react";
import { Link } from "react-router-dom";

function Nav() {
<<<<<<< Updated upstream
    return (

        <ul class="nav justify-content-center">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="Perfil" >Perfil</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">BEBE</a>
        </li>
        <li class="nav-item">
        <Link class="nav-link active" aria-current="page" to="login" >Login</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link active" aria-current="page" to="Registro" >Registro</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link active" aria-current="page" to="Comision" >Comision</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">BUBU</a>
        </li>
      </ul>

      // Tiene que retornar una sola cosa uwu
      //Un Div Gigante o un Fragment.
      

    );
  }
  
  export default Nav;
  
=======

  return (
    <Fragment>
      <nav className="navbar-fluid sticky-top navbar-expand-md   ">
        <div className="container-fluid ">
          <div className="row bg2">
            <div className="col m-3 " >
              <Link to="/">
                <img className="" src={require("../IMG/Logo.png")}
                  alt="" width="150" />
              </Link>
            </div>
            <div className="col  mt-3 ">
              <input type="password" className="form-control" id="Buscador" placeholder="Buscar" />
            </div>
            <div className="col mt-3">
              <button className="btn btn-outline-info " type="submit">Buscar</button>
            </div>

            <div className="col  mt-3 ">

              <Link to="/login">
                <button className="btn btn-outline-info m-1" type="submit">Iniciar Sesion</button>
              </Link>

              <Link to="/Registro">
                <button className="btn btn-outline-info m-1" type="submit">Registrarse</button>
              </Link>

              <Link to="/SubirPub">
                < button className="btn btn-outline-info m-1" > < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush-fill" viewBox="0 0 16 16">
                  <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z" />
                </svg> </button>
              </Link>

              <Link to="/Chat">
                < button className="btn btn-outline-info m-1" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  </svg>
                </button>
              </Link>

            </div>

            <div className="col-auto m-2 " >
              <Link to="/Perfil">
                <img className="img-thumbnail" src={require("../IMG/Perfil2.png")}
                  alt="" width="50" />
              </Link>
            </div>
          </div>
          <div className="row bg2">
            <ul className="navbar-nav bg p-1 ">
              <li className="nav-item"><Link className="nav-link text-white" to="/">Inicio</Link></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">FanArts</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Escenarios</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Sketch</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Digital</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Tradicional</a></li>
            </ul>
          </div>
        </div>
      </nav >
    </Fragment >
  );
}

export default Nav;
>>>>>>> Stashed changes
