import Perfil from "./Paginas/Perfil";
import './bootstrap.min.css';
import { Fragment } from "react";
import Nav from "./Paginas/Nav";
import { Routes, Route, Link } from "react-router-dom";
import Chat from "./Paginas/Chat";
import Publicaion from "./Paginas/Publicacion";
import SubirPub from "./Paginas/SubirPub";
import Home from "./Paginas/Home";
import Foot from "./Paginas/Footer";

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

      </Routes>
      <Foot>

      </Foot>

    </Fragment>

  );
}

export default App;
