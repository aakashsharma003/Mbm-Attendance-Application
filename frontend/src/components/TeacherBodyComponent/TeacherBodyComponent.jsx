import { useEffect, useState } from "react";
import "./TeacherBodyComponent.css";
import Attendence from "../Attendence/Attendence.jsx";
import { InputBox } from "../InputBox/InputBox.jsx";
import { useLocation } from "react-router-dom";
import { Profile } from "../Profile/Profile.jsx";
import axios from "axios";
import Calender from "../Calender/Calender.jsx";
import { server } from "../../main";
import toast from "react-hot-toast";
import { RenderImage } from "../RenderImage/RenderImage.jsx";
import { ListBox } from "../ListBox/ListBox.jsx";
import { SubjectList } from "../SubjectList/SubjectList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CustomPaginationActionsTable from "../AttendanceList/AttendanceList.jsx";
const TeacherBodyComponent = ({
  setSubjects,
  setAttendence,
  dashboard,
  attendence,
  subjects,
  setSideNav,
  sidenav,
}) => {
  const [attendPage, setAttendPage] = useState(true);
  const [subjectid, setSubjectId] = useState("");
  const [viewAttendance, setViewAttendance] = useState(false);
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
          {attendPage && (
            <SubjectList
              editOrdelete={false}
              setSideNav={setSideNav}
              sidenav={sidenav}
              attendPage={attendPage}
              setAttendPage={setAttendPage}
              subjectid={subjectid}
              setSubjectId={setSubjectId}
              setViewAttendance={setViewAttendance}
              view={true}
            />
          )}
          {!attendPage && !viewAttendance && (
            <Attendence
              setSubjects={setSubjects}
              setAttendPage={setAttendPage}
              setSideNav={setSideNav}
              sidenav={sidenav}
              subjectid={subjectid}
              setAttendence={setAttendence}
            />
          )}
          {viewAttendance && <Calender subjectId={subjectid} />}
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
  const [updateForm, setUpdateForm] = useState(false);
  const [subjectname, setSubjectName] = useState("");
  const [subjectcode, setSubjectCode] = useState("");
  const [semester, setSemester] = useState("1st");
  const [branch, setBranch] = useState("CSE");
  const [degree, setDegree] = useState("B.E");
  const [semOptions, setSemOptions] = useState([]);
  const [subjectid, setSubjectId] = useState("");
  const allotedTeacher = location.state.data.teacherid;
  const [clicked, setClicked] = useState(true);
  const date = new Date();
  const [innerText, setInnerText] = useState("Create");
  const year = date.getFullYear();
  const navigate = useNavigate();
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
      setCreateSubjectForm(!createsubjectform);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const updatehandler = async () => {
    try {
      const data = {
        subjectid,
        subjectname,
        subjectcode,
        semester,
        branch,
        degree,
      };
      const res = await axios.post(`${server}/teacher/editSubject`, data);
      // const data = await res.data;
      toast.success(res.data.message);
      // navigate("teacher/dashboard");
      setUpdateForm(!updateForm);
      setClicked(!clicked);
    } catch (err) {
      toast.error(err);
    }
    // alert("hiiiiiiiiii......");
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
    <div className="attendence">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="attend-heading">Subject</div>
          <div className="attendsub-heading">Subject</div>
        </div>

        <button
          style={{
            color: "white",
            background: "black",
            borderRadius: "10px",
            height: "100%",
            fontSize: "2dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2%",
          }}
          onClick={() => {
            setCreateSubjectForm(!createsubjectform);
            innerText == "Create"
              ? setInnerText("Back")
              : setInnerText("Create");
            // setUpdateForm(!updateForm);
          }}
        >
          <div style={{ marginRight: "5px" }}>
            {innerText == "Create" && <FontAwesomeIcon icon={faPlus} />}
            {innerText == "Back" && <FontAwesomeIcon icon={faBackward} />}
          </div>
          <div>{innerText}</div>
        </button>
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
          <form
            onSubmit={submithandler}
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
          </form>
        )}
        {updateForm && (
          <form
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
            <button onClick={updatehandler} type="button" className="d-btn">
              Update Subject
            </button>
          </form>
        )}
        {!createsubjectform && (
          <div className="subject-list">
            <SubjectList
              setUpdateForm={setUpdateForm}
              setSubjectId={setSubjectId}
              clicked={clicked}
              setClicked={setClicked}
              setInnerText={setInnerText}
              editOrdelete={true}
              view={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default TeacherBodyComponent;
