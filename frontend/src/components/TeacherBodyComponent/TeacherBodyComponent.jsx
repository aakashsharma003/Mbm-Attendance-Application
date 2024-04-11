import { useState } from "react";
import "./TeacherBodyComponent.css";
import Attendence from "../Attendence/Attendence.jsx";
import { InputBox } from "../InputBox/InputBox.jsx";
import { useLocation } from "react-router-dom";
import { Profile } from "../Profile/Profile.jsx";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import { RenderImage } from "../RenderImage/RenderImage.jsx";
const TeacherBodyComponent = ({ dashboard, attendence, subjects }) => {
  return (
    <div className="teacherbodycontainer">
      {dashboard && (
        <div className="dashboard">
          <div className="dash-heading">Dashboard</div>
          <div className="dashsub-heading">dashboard</div>
          <div className="content">
            <RenderImage />
            <Profile />
          </div>
        </div>
      )}
      {attendence && (
        <div className="attendence-Container">
          <Attendence />
        </div>
      )}
      {subjects && (
        <div className="attendence-Container">
          <Subject />
        </div>
      )}
    </div>
  );
};
const Subject = () => {
  const location = useLocation();
  const [subjectname, setSubjectName] = useState("");
  const [subjectcode, setSubjectCode] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [year, SetYear] = useState("");
  const allotedTeacher = location.state.data.name;
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/teacher/createnewsubject`, {
        subjectname,
        subjectcode,
        semester,
        branch,
        year,
        allotedTeacher,
      });
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <form className="attendence" onSubmit={submithandler}>
      <div className="attend-heading">Subject</div>
      <div className="attendsub-heading">Subject</div>
      <div className="flex" style={{ alignItems: "flex-start" }}>
        <div className="flex flex-col">
          <InputBox
            onChange={(e) => {
              setSubjectName(e.target.value);
            }}
            type={"text"}
            name={"subjectname"}
            id={"subjectname"}
            placeholder={"Subject Name"}
            required={"required"}
            bgcolor={"white"}
            margin={"2dvh 0"}
          />
          <InputBox
            onChange={(e) => {
              setSubjectCode(e.target.value);
            }}
            type={"text"}
            name={"subjectcode"}
            id={"subjectcode"}
            placeholder={"Subject Code"}
            required={"required"}
            bgcolor={"white"}
            margin={"2dvh 0"}
          />
          <InputBox
            onChange={(e) => {
              setSemester(e.target.value);
            }}
            type={"text"}
            name={"sem"}
            id={"semester"}
            placeholder={"Semester"}
            required={"required"}
            bgcolor={"white"}
            margin={"2dvh 0"}
          />
          <InputBox
            onChange={(e) => {
              setBranch(e.target.value);
            }}
            type={"text"}
            name={"branch"}
            id={"branch"}
            placeholder={"Branch"}
            required={"required"}
            bgcolor={"white"}
            margin={"2dvh 0"}
          />
        </div>
        <div className="flex flex-col" style={{ marginLeft: "5%" }}>
          <InputBox
            onChange={(e) => {
              SetYear(e.target.value);
            }}
            type={"text"}
            name={"year"}
            id={"year"}
            placeholder={"Year"}
            bgcolor={"white"}
            margin={"2dvh 0"}
          />
          {/* <InputBox
            type={"text"}
            name={"allotedteacher"}
            id={"allotedteacher"}
            placeholder={"allotedteacher"}
            defaultValue={allotedTeacher}
            disabled={"disabled"}
            bgcolor={"white"}
            color="black"
            margin={"2dvh 0"}
          /> */}
        </div>
      </div>

      <button
        className="btn"
        style={{
          background: "black",
          color: "white",
          display: "flex",
          padding: "2dvh 2dvw",
          width: "100%",
          fontWeight: "300",
          fontSize: "4vh",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        Create Subject
      </button>
    </form>
  );
};
export default TeacherBodyComponent;
