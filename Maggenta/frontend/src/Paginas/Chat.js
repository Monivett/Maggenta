import { Fragment, useState, useEffect, useCallback } from "react";
import useAuth from "../auth/useAuth";
import { Getall } from '../services/UserService';
import { GetUsername } from '../services/UserService';
import { GetChats } from '../services/ChatService';
import { axiosBase as axios } from "../services/Config";
import { Link } from "react-router-dom";

function Chat() {

  const [Users, setUsers] = useState([]);
  const [Messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [currentChat, SetCurrentChat] = useState([]);
  const [error, setError] = useState('');

  //Muestra los datos de todos los usuarios
  const fetchData = useCallback(async () => {

    const usuarios = await Getall();

    setUsers(usuarios);

  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //Muestra los mensajes
  const showMessages = useCallback(async (reciever, sender) => {

    const mensajes = await GetChats(reciever, sender);

    setMessages(mensajes);

    console.log(Messages);

  }, [])

  //Cambia el chat al dar click a un usuario
  const changeCurrentChat = (id, foto, username) => {
    SetCurrentChat([id, foto, username]);

    showMessages(id, user.userData._id)

  }

  const searchUsername = async (username) => {

    if (username != '') {
      const usuarios = await GetUsername(username);
      setUsers(usuarios)
    }else{
      fetchData();
    }
  }
  //Al dar click al botón enviar
  function submitHandler(event) {

    event.preventDefault();

    if (event.target.message.value !== '') {
      setError('');
      axios.post('/Chat', {
        Mensaje: event.target.message.value,
        _UserSender: user.userData._id,
        _UserReceiver: currentChat[0]
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data !== '') {
            event.target.message.value = '';
            showMessages(currentChat[0], user.userData._id)
          }
          else {
            setError('¡No se pudo enviar el mensaje!');
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      setError('¡No escribiste ningun mensaje!');
    }

  }
  return (
    <Fragment>
      <div className="container-fluid mt-5 mb-5 " >
        <div className="row clearfix"  >
          <div className="col-lg-12" >
            <div className="card chat-app " id="Tchat2" >
              <div id="plist" className="people-list">
                <div className="input-group mt-3" >
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </span>
                  </div>
                  <input type="text" className="form-control" placeholder="Buscar..." onChange={event => searchUsername(event.target.value)} />
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0" id="scroll2">
                  {/*Muestra todos los usuarios disponibles: */}
                  {Users.filter(data => data._id !== user.userData._id).map(data => (
                    <li className="clearfix" onClick={() => changeCurrentChat(data._id, data.Foto, data.Usuario)}>
                      <img className=" img" src={data.Foto} alt="avatar " />
                      <div className="about">
                        <div className="name">{data.Usuario}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat" >
                <div className="chat-header clearfix" >
                  <div className="row" >
                    {/*Si eligio a un usuario para chatear, muestra: */}
                    {currentChat.length != 0 &&
                      <div className="col-lg-6" >
                        <Link to={`/Perfil/${currentChat[0]}`} data-toggle="modal" data-target="#view_info">
                          <img className=" img" src={currentChat[1]} alt="avatar "  height="50" width="50" />
                        </Link>
                        <div className="chat-about">
                          <h6 className="m-b-0">{currentChat[2]}</h6>
                        </div>
                      </div>
                    }

                  </div>
                </div>
                <div className="chat-history"  id="Tchat">
                  {currentChat.length != 0 ?
                    <ul className="m-b-0 m-5">
                      {/*Si hay mensajes muestra: */}
                      {Messages.length != 0 && Messages.map(message => (
                        /*Si yo mande el mensaje: */
                        message._UserSender[0] === user.userData._id ?
                          <li className="clearfix">
                            <div className="message my-message">{message.Mensaje}</div>
                          </li>
                          :
                          <li className="clearfix ">
                            <div className="message other-message float-right">{message.Mensaje}</div>
                          </li>
                      )
                      )}

                    </ul>
                    /*Si no hay mensajes muestra: */
                    :
                    <ul className="m-b-0 m-5">
                      <li className="clearfix ">

                        <div className="mainchat"> Maggenta chat </div>
                      </li>

                    </ul>}

                </div>

                <div className="chat-message clearfix">
                  {currentChat.length != 0 &&
                    <form onSubmit={submitHandler}>
                      <div className="input-group mb-0">
                        <button className="input-group-prepend">
                          <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                          </span>
                        </button>
                        <input type="text" className="form-control" placeholder="Enter text here..." name="message" />
                      </div>
                      {error && <p className="mt-2">{error}</p>}
                    </form>

                  }

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>


  );
}

export default Chat;
