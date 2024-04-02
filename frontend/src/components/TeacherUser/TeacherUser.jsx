import React from "react";
import "./TeacherUser.css";
import { NavLink } from "react-router-dom";
const TeacherUser = (props) => {
  return (
    <>
      <div className="lower-box">
        <div className="inputs">
          <div className="input">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="input">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>

        <NavLink to="/teacher/dashboard" className="login-btn btn">
          Login
        </NavLink>
      </div>
    </>
  );
};

export default TeacherUser;
