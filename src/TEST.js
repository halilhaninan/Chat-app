import React, { useState } from "react";

import Login from "./compenent/Login";
import "src/App.css";

function App() {
  const INITAL_STATE = [
    { id: 1, nickName: "Halilhan", status: "online" },
    { id: 2, nickName: "ali", status: "offline" },
    { id: 3, nickName: "ayse", status: "online" },
    { id: 4, nickName: "veli", status: "offline" },
    { id: 5, nickName: "veli", status: "offline" },
  ];

  const INITIAL_AVATAR = [
    { id: 1, nickName: "https://bootdey.com/img/Content/avatar/avatar1.png" },
    { id: 2, nickName: "https://bootdey.com/img/Content/avatar/avatar2.png" },
    { id: 3, nickName: "https://bootdey.com/img/Content/avatar/avatar3.png" },
    { id: 4, nickName: "https://bootdey.com/img/Content/avatar/avatar4.png" },
  ];

  const [message, setMessage] = useState([
    { id: 1, nickName: "halilhan", message: "first messagge halilhan" },
    { id: 2, nickName: "ali", message: "second messagge ali" },
    { id: 3, nickName: "ayse", message: "third messagge ayse" },
  ]);

  const [userList, setUserList] = useState(INITAL_STATE);
  const [showChat, setShowChat] = useState(true);
  const [chattedUser, setChattedUser] = useState(userList[0].nickName);
  const [avatar, setAvatar] = useState(INITIAL_AVATAR);
  const [userMessage, setuserMessage] = useState("");

  const addNew = (newUser) => {
    setUserList([...userList, { id: 5, nickName: newUser, status: "online" }]);
  };
  const addNewUserAvatar = (newUser) => {
    setAvatar([
      ...avatar,
      { id: 5, nickName: "https://bootdey.com/img/Content/avatar/avatar5.png" },
    ]);
  };

  const sendMessage = () => {
    setMessage([...message, { id: Date.now(), message: userMessage }]);
  };

  const onKeyPress = (e) => {
    if (e.which === 13) sendMessage();
  };

  var dateWithouthSecond = new Date();

  const showChatPage = () => {
    return setShowChat(true);
  };

  return (
    <>
      {!showChat && (
        <Login
          addNew={addNew}
          showChatPage={showChatPage}
          addNewUserAvatar={addNewUserAvatar}
        />
      )}
      {showChat && (
        <div className="App">
          <div className="container">
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card chat-app">
                  <div
                    id="plist"
                    style={{ height: 520, overflowX: "scroll" }}
                    className="people-list"
                  >
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"></span>
                      </div>
                      <i className="fa fa-search"></i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                    </div>
                    {userList.map((item, index) => (
                      <div
                        key={index}
                        className="list-unstyled chat-list mt-2 mb-2 p-0"
                        style={{ backgroundColor: "white" }}
                      >
                        <li
                          onClick={() => {
                            setChattedUser(item.nickName);
                            setAvatar(item[0].nickName);
                          }}
                          className="clearfix"
                        >
                          <img
                            src={`https://bootdey.com/img/Content/avatar/avatar${
                              index + 1
                            }.png`}
                            alt="avatar"
                          />
                          <div className="about">
                            <div className="name ">{item.nickName}</div>
                            <div className="status">
                              {" "}
                              <p>
                                {item.status}
                                {""}
                              </p>{" "}
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </div>
                  <div className="chat">
                    <div className="chat-header clearfix">
                      <div className="row">
                        <div className="col-lg-6">
                          {userList.map((item, index) => (
                            <img
                              src={`https://bootdey.com/img/Content/avatar/avatar${
                                index + 1
                              }.png`}
                              alt="avatar"
                            />
                          ))}

                          <div className="chat-about">
                            <h6 className="m-b-0">
                              <div className="name">{chattedUser}</div>
                            </h6>
                            <small>online</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="chat-history">
                      <ul
                        style={{ height: 300, overflowY: "scroll" }}
                        className="m-b-0"
                      >
                        {message.map((item, index) => (
                          <li key={index} className="clearfix">
                            <div className="message-data text-left">
                              <img src={avatar} alt="avatar" />

                              <span
                                style={{ fontSize: 12 }}
                                className="message-data-time"
                              >
                                <span
                                  style={{ fontWeight: 900 }}
                                  className="mes"
                                >
                                  {item.nickName}
                                </span>
                                {dateWithouthSecond.toLocaleTimeString(
                                  navigator.language,
                                  { hour: "2-digit", minute: "2-digit" }
                                )}{" "}
                                AM
                              </span>
                            </div>

                            <div className="message other-message float-left">
                              {item.message}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="chat-message clearfix">
                      <div className="input-group mb-0">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-send"></i>
                          </span>
                        </div>
                        <input
                          onKeyPress={(e) => onKeyPress(e)}
                          onChange={(e) => setuserMessage(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Enter text here..."
                        />
                        <button
                          onClick={() => sendMessage()}
                          className="btn btn-primary btn-info"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
