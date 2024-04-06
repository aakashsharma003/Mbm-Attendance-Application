import { useNavigate } from "react-router-dom";
import "./StudentUser.css";
import { InputBox } from "../InputBox/InputBox";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
const StudentUser = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/student?rollno=${rollno}&password=${password}`
      );
      toast.success(response.data.message);
      navigate("/student/dashboard", {
        state: { data: response.data },
        replace: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("User not found");
    }
  };

  return (
    <form style={{ width: "100%" }} method="post" onSubmit={handleSubmit}>
      <div className="lower-box">
        <InputBox
          label="studentId"
          placeholder="Roll No."
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          required
        />

        <InputBox
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-btn btn">Login</button>
      </div>
    </form>
  );
};

export default StudentUser;
