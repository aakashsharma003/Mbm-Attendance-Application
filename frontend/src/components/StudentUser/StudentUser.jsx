import { useNavigate } from "react-router-dom";
import "./StudentUser.css";
const StudentUser = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="lower-box">
        <div className="inputs">
          <div className="input">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Roll No."
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

        <div
          onClick={() => {
            navigate("/student/dashboard");
          }}
          className="login-btn btn"
        >
          Login
        </div>
      </div>
    </>
  );
};

export default StudentUser;
