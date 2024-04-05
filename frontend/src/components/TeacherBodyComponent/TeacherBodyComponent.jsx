import React, { useState } from "react";
import "./TeacherBodyComponent.css";
import Attendence from "../Attendence/Attendence.jsx";
import DashBoard from "../DashBoard/DashBoard.jsx";
import { InputBox } from "../InputBox/InputBox.jsx";

const TeacherBodyComponent = ({ dashboard, attendence, subjects }) => {
  const TeacherName = "Abhishek Gour";
  const [subjectName, setSubjectName] = useState("");
  const [subjectcode, setSubjectCode] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [year, SetYear] = useState("");
  return (
    <div className="teacherbodycontainer">
      {dashboard && (
        <div className="dashboard">
          <DashBoard />
        </div>
      )}
      {attendence && (
        <div className="attendence-Container">
          <Attendence />
        </div>
      )}
      {subjects && (
        <div className="attendence-Container">
          <div className="attendence">
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
                  type={"text"}
                  name={"year"}
                  id={"year"}
                  placeholder={"Year"}
                  bgcolor={"white"}
                  margin={"2dvh 0"}
                />
                <InputBox
                  type={"text"}
                  name={"allotedteacher"}
                  id={"allotedteacher"}
                  placeholder={"allotedteacher"}
                  defaultValue={TeacherName}
                  disabled={"disabled"}
                  bgcolor={"white"}
                  color="black"
                  margin={"2dvh 0"}
                />
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherBodyComponent;
