import Perfil from "./Paginas/Perfil";
import './bootstrap.min.css';
import { Fragment } from "react";
import Nav from "./Paginas/Nav";
import { Routes, Route } from "react-router-dom";
import Chat from "./Paginas/Chat";
import Publicaion from "./Paginas/Publicacion";
import SubirPub from "./Paginas/SubirPub";
import Home from "./Paginas/Home";
import Login from "./Paginas/InicioSes";
import Registro from "./Paginas/Registro";
import Comision from "./Paginas/Comision";
import Foot from "./Paginas/Footer";
import ComisionesHoja from "./Paginas/ComisionesHoja";
import AuthProvider from "./auth/AuthProvider";
import EditarPerfil from "./Paginas/EditarPerfil";
import Pago from './Paginas/Pago';
import EditarComision from "./Paginas/EditarComision";
import Ordenes from "./Paginas/Ordenes";
import MisPedidos from './Paginas/MisPedidos';

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Perfil/:id" element={<Perfil />} />
          <Route path="Chat" element={<Chat />} />
          <Route path="SubirPub" element={<SubirPub />} />
          <Route path="Publicacion/:id" element={<Publicaion />} />
          <Route path="login" element={<Login />} />
          <Route path="Registro" element={<Registro />} />
          <Route path="Comision" element={<Comision />} />
          <Route path="EditarPerfil" element={<EditarPerfil />} />
          <Route path="ComisionesHoja/:id" element={<ComisionesHoja />} />
          <Route path="Ordenes/:id" element={<Ordenes />} />
          <Route path="Pago/:id" element={<Pago />} />
          <Route path="EditarComision/:id" element={<EditarComision />} />
          <Route path="MisPedidos/:id" element={<MisPedidos />} />
        </Routes>
        <Foot />
      </AuthProvider>

    </Fragment>

  );
}

export default App;
