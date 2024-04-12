import { useEffect, useState } from "react";
import "./TeacherBodyComponent.css";
import Attendence from "../Attendence/Attendence.jsx";
import { InputBox } from "../InputBox/InputBox.jsx";
import { useLocation } from "react-router-dom";
import { Profile } from "../Profile/Profile.jsx";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import { RenderImage } from "../RenderImage/RenderImage.jsx";
import { ListBox } from "../ListBox/ListBox.jsx";
import ActionAreaCard from "../Card/Card.jsx";

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
  const [createsubjectform, setCreateSubjectForm] = useState(false);
  const [subjectname, setSubjectName] = useState("");
  const [subjectcode, setSubjectCode] = useState("");
  const [semester, setSemester] = useState("1st");
  const [branch, setBranch] = useState("CSE");
  const [degree, setDegree] = useState("B.E");
  const [semOptions, setSemOptions] = useState([]);
  const allotedTeacher = location.state.data.name;
  const date = new Date();
  const [innerText, setInnerText] = useState("create");
  const year = date.getFullYear();
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/teacher/createnewsubject`, {
        subjectname,
        subjectcode,
        semester,
        branch,
        degree,
        allotedTeacher,
        year,
      });
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    const filterSemesters = () => {
      switch (degree) {
        case "B.E":
          setSemOptions([
            "1st",
            "2nd",
            "3rd",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
          ]);
          break;
        case "M.C.A":
          setSemOptions(["1st", "2nd", "3rd", "4th", "5th", "6th"]);
          break;
        case "M.E":
          setSemOptions(["1st", "2nd", "3rd", "4th"]);
          break;
        default:
          setSemOptions([
            "1st",
            "2nd",
            "3rd",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
          ]);
      }
    };
    filterSemesters();
  }, [degree]);

  return (
    <form className="attendence" onSubmit={submithandler}>
      <div className="attend-heading">Subject</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div className="attendsub-heading">Subject</div>
        <div>
          <button
            style={{
              color: "white",
              background: "black",
              borderRadius: "12px",
              padding: "3%",
              width: "5dvw",
              height: "100%",
            }}
            onClick={() => {
              setCreateSubjectForm(!createsubjectform);
              innerText == "create"
                ? setInnerText("back")
                : setInnerText("create");
            }}
          >
            {innerText}
          </button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {createsubjectform && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
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
            <ListBox
              onChange={(e) => {
                console.log(e.target.value);
                setDegree(e.target.value);
              }}
              id={"Degree"}
              options={["B.E", "M.E", "M.C.A"]}
              bgcolor={"white"}
              color={"Black"}
              padding={"2dvh 2dvw"}
              selected={degree}
            />

            <ListBox
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              id={"Branch"}
              options={["CSE", "AI & DS", "IT"]}
              bgcolor={"white"}
              color={"black"}
              padding={"2dvh 2dvw"}
              selected={branch}
            />
            <ListBox
              onChange={(e) => {
                setSemester(e.target.value);
              }}
              id={"semester"}
              options={semOptions}
              bgcolor={"white"}
              color={"Black"}
              padding={"2dvh 2dvw"}
              selected={semester}
            />
            <button className="d-btn">Create Subject</button>
          </div>
        )}
        {!createsubjectform && (
          <div className="subject-list">
            <ActionAreaCard />
            <ActionAreaCard />
            <ActionAreaCard />
            <ActionAreaCard />
            <ActionAreaCard />
            <ActionAreaCard />
            <ActionAreaCard />
            <ActionAreaCard />
          </div>
        )}
      </div>
    </form>
  );
};
export default TeacherBodyComponent;
