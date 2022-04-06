import { Fragment } from "react";
import "./Registro.css";

function EditarPerfil() {
    return (
        <Fragment>
            <div className="row">
                <div className="col hola">
                    <div className="align-self-center">
                        <div className="mt-auto" id="usuarioFoto">
                            <img src={require('../imag/imagPRUEBA.png')} alt="" height="720" width="590" />
                        </div>
                    </div>
                </div>
                <div className="col bg text-center">
                    <form action="" method="POST" id="form" className="registrarse">
                        <h1 id="letraTitulo">Editar perfil</h1>
                        <div className="row m-2">
                            <div className="col d-flex flex-column">
                                <div className="">
                                    <img src={require('../imag/maggentaLOGO.png')} alt="" height="70" width="270" />
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <div className="grupo">
                                <label htmlFor="">Nombre(s):</label><br />
                                <input className="form-control" type="text" placeholder="Nombre..." />
                            </div>
                            <div className="grupo">
                                <label htmlFor="">Apellidos:</label><br />
                                <input className="form-control" type="text" placeholder="Apellidos..." />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Usuario:</label><br />
                                <input className="form-control" type="text" placeholder="Usuario..." />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Correo electronico:</label><br />
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico..." />

                            </div>
                            <div className="grupo">
                                <label htmlFor="">Contraseña:</label><br />
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña..." />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Fecha de Nacimiento:</label><br />
                                <input type="date" className="form-control" name="FechaNac" id="fechanacimiento" required />
                            </div>

                            <div className="grupo">
                                <label htmlFor="">Foto de perfil:</label><br />
                                <input id="foto" name="image" className="input-file" type="file" required />
                            </div>
                            <br />
                            <button type="button" className="btn btn-light btn-lg" id="registro">Editar perfil</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default EditarPerfil;