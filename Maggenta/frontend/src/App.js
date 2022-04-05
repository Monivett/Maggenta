import Perfil from "./Paginas/Perfil";
import './bootstrap.min.css';
import { Fragment } from "react";
import Nav from "./Paginas/Nav";
import { Routes, Route, Link } from "react-router-dom";
import Chat from "./Paginas/Chat";
import Publicaion from "./Paginas/Publicacion";
import SubirPub from "./Paginas/SubirPub";
import Home from "./Paginas/Home";
import Login from "./Paginas/InicioSes";
import Registro from "./Paginas/Registro";
import Comision from "./Paginas/Comision";

function App() {
  return (
    <Fragment>
      <Nav>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Perfil" element={<Perfil />} />
        <Route path="Chat" element={<Chat />} />
        <Route path="SubirPub" element={<SubirPub />} />
        <Route path="Publicacion" element={<Publicaion />} />
        <Route path="login" element={<Login />} />
        <Route path="Registro" element={<Registro />} />
        <Route path="Comision" element={<Comision />} />

      </Routes>

    </Fragment>

  );
}

export default App;
