import React from "react";
import "./TeacherBodyComponent.css";
import Attendence from "../Attendence/Attendence.jsx";
import DashBoard from "../DashBoard/DashBoard.jsx";

const TeacherBodyComponent = ({ dashboard, attendence }) => {
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
    </div>
  );
};

export default TeacherBodyComponent;
