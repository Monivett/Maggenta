import { Fragment } from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (

        <ul class="nav justify-content-center">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="Perfil" >Perfil</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">BEBE</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">BOBO</a>
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
  