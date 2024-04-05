import React from "react";
import SideNav from "../SideNav/SideNav";
import StudentBodyComponent from "../StudentBodyComponent/StudentBodyComponent";
import { useState } from "react";
import "./StudentDashboard.css";
const StudentDashBoard = () => {
  const [dashboard, setDashboard] = useState(true);
  const [attendence, setAttendence] = useState(false);
  const [subjects, setSubjects] = useState(false);
  return (
    <div className="studentdashboard">
      <SideNav
        setAttendence={setAttendence}
        setDashboard={setDashboard}
        setSubjects={setSubjects}
      />
      <StudentBodyComponent
        dashboard={dashboard}
        attendence={attendence}
        subjects={subjects}
      />
    </div>
  );
};

export default StudentDashBoard;
