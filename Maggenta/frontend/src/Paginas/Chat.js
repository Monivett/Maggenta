import { Fragment, useState, useEffect, useCallback } from "react";
import useAuth from "../auth/useAuth";
import { Getall } from '../services/UserService';

function Chat() {

  const [Users, setUsers] = useState([]);
  const { user } = useAuth();
  const fetchData = useCallback(async () => {
    const usuarios = await Getall();

    setUsers(usuarios);
  },[])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

return (
  <Fragment>
    <div className="container-fluid mt-5 mb-5 ">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg></span>
                </div>

                <input type="text" className="form-control" placeholder="Search..." />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {Users.map((data) => (
                  <li className="clearfix">
                    <img className=" img" src={data.Foto} alt="avatar " />
                    <div className="about">
                      <div className="name">{data.Usuario}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                      <img className=" img" src={require("../IMG/2.png")} alt="avatar " />

                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>

                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0 m-5">
                  <li className="clearfix ">

                    <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">Are we meeting today?</div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:15 AM, Today</span>
                    </div>
                    <div className="message my-message">Project has been already finished and I have results to show you.</div>
                  </li>
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Enter text here..." />
                </div>
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
