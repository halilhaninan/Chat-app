import React, { useState } from "react";

const Login = ({ addNew, showChatPage, addNewUserAvatar }) => {
  const [newUser, setNewUser] = useState("");

  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <h1>Welcome to Chat app</h1>

          <form className="form">
            <input
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              type="text"
              placeholder="NickName"
            ></input>

            <button
              className="btn btn-primary btn-info"
              onClick={() => {
                addNew(newUser);
                addNewUserAvatar();
                showChatPage();
              }}
              type="submit"
              id="login-button"
            >
              Login
            </button>
          </form>
        </div>

        <ul className="bg-bubbles"></ul>
      </div>
    </div>
  );
};

export default Login;
