import { useState } from "react";
import "./TeacherUser.css";
import { useNavigate } from "react-router-dom";
import { InputBox } from "../InputBox/InputBox";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import { TextField, Button } from "@mui/material";
const TeacherUser = () => {
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/teacher?teacherid=${teacherId}&password=${password}`
      );
      toast.success(response.data.message);
      navigate("/teacher/dashboard", {
        state: { data: response.data },
        replace: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("User not found");
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <div className="lower-box">
        <TextField
          label="Username"
          placeholder="Email"
          type="text"
          onChange={(e) => {
            setTeacherId(e.target.value);
          }}
          required={"required"}
        />

        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required={"required"}
        />

        <Button
          sx={{
            "&:hover": {
              bgcolor: "#253657",
            },
            bgcolor: "#19263f",
            color: "#f8f7f6",
            textAlign: "center",
            width: "100%",
            fontSize: "3vh",
            border: "1px solid gray",
            textDecoration: "none",
            transition: "all",
          }}
          type="submit"
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default TeacherUser;
