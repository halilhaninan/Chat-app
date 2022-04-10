import React, { useEffect, useRef, useState } from "react";
import Login from "./compenent/Login";
import "./App.css";

function App() {
  const INITAL_STATE = [
    { id: 1, nickName: "halilhan", status: "online" },
    { id: 2, nickName: "ali", status: "offline" },
    { id: 3, nickName: "ayse", status: "online" },
    { id: 4, nickName: "veli", status: "offline" },
  ];

  const INITIAL_AVATAR = [
    { id: 1, nickName: "https://bootdey.com/img/Content/avatar/avatar1.png" },
    { id: 2, nickName: "https://bootdey.com/img/Content/avatar/avatar2.png" },
    { id: 3, nickName: "https://bootdey.com/img/Content/avatar/avatar3.png" },
    { id: 4, nickName: "https://bootdey.com/img/Content/avatar/avatar4.png" },
    { id: 5, nickName: "https://bootdey.com/img/Content/avatar/avatar5.png" },
  ];

  const INITIAL_MESSAGES = [
    {
      id: 1,
      nickName: "halilhan",
      message: "first messagge halilhan",
      date: new Date(),
    },
    {
      id: 2,
      nickName: "ali",
      message: "second message ali",
      date: new Date(),
    },
    {
      id: 3,
      nickName: "ayse",
      message: "third message ayse",
      date: new Date(),
    },
  ];

  const [message, setMessage] = useState(
    JSON.parse(localStorage.getItem("messages")) || INITIAL_MESSAGES
  );

  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList")) || INITAL_STATE
  );
  const [showChat, setShowChat] = useState(false);
  const [chattedUser, setChattedUser] = useState(userList[0].nickName);
  const [avatar, setAvatar] = useState(
    JSON.parse(localStorage.getItem("avatar")) || INITIAL_AVATAR
  );

  const [userMessage, setUserMessage] = useState("");

  const addNew = (newUser) => {
    setUserList([...userList, { id: 5, nickName: newUser, status: "online" }]);
    localStorage.setItem(
      "userList",
      JSON.stringify([
        ...userList,
        { id: 5, nickName: newUser, status: "online" },
      ])
    );
  };
  const addNewUserAvatar = () => {
    setAvatar([
      ...avatar,

      {
        id: avatar.length + 1,
        nickName: `https://bootdey.com/img/Content/avatar/avatar${
          avatar.length - 1
        }.png `,
      },
    ]);
    localStorage.setItem(
      "avatar",
      JSON.stringify([
        ...avatar,

        {
          id: avatar.length + 1,
          nickName: `https://bootdey.com/img/Content/avatar/avatar${
            avatar.length - 1
          }.png `,
        },
      ])
    );
  };

  const sendMessage = () => {
    setMessage([
      ...message,
      {
        id: Date.now(),
        nickName: userList[userList.length - 1].nickName,
        message: userMessage,
        date: new Date(),
      },
    ]);
    localStorage.setItem(
      "messages",
      JSON.stringify([
        ...message,
        {
          id: Date.now(),
          nickName: userList[userList.length - 1].nickName,
          message: userMessage,
          date: new Date(),
        },
      ])
    );
    setUserMessage("");
  };

  const onKeyPress = (e) => {
    if (e.which === 13) sendMessage();
  };

  const showChatPage = () => {
    setShowChat(true);
  };

  setTimeout(() => {
    const newMessages = JSON.parse(localStorage.getItem("messages"));
    Boolean(newMessages) && setMessage(newMessages);
  }, 1000);

  const chatParent = useRef(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });
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
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
          className="App"
        >
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
                        style={{
                          backgroundColor:
                            "./image/In celebration of WhatsApp’s dark mode!.jpeg",
                        }}
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
                            <div
                              style={{
                                color:
                                  item.status === "online" ? "green" : "red",
                              }}
                              className="status"
                            >
                              <p>{item.status}</p>
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
                          {userList.map((_, index) => (
                            <img
                              src={`https://bootdey.com/img/Content/avatar/avatar${
                                index + 1
                              }.png`}
                              alt="avatar"
                            />
                          ))}

                          <div className="chat-about">
                            <h6 className="m-b-0">
                              <div className="name" sty>
                                Chat Room
                              </div>
                            </h6>
                            <small>online</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="chat-history">
                      <ul
                        ref={chatParent}
                        style={{ height: 300, overflowY: "scroll" }}
                        className="m-b-0"
                      >
                        {message.map((item, index) => (
                          <li key={index} className="clearfix">
                            <div className="message-data text-left">
                              {item.nickName}

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
                                {new Date(item.date).toLocaleTimeString(
                                  navigator.language,
                                  { hour: "2-digit", minute: "2-digit" }
                                )}{" "}
                                AM
                              </span>
                            </div>

                            <div
                              style={{ background: "#015C4B" }}
                              className="message other-message float-left text-white"
                            >
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
                          value={userMessage}
                          onKeyPress={(e) => onKeyPress(e)}
                          onChange={(e) => setUserMessage(e.target.value)}
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
