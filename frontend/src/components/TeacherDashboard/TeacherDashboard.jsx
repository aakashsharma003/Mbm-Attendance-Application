import React from "react";
import SideNav from "../SideNav/SideNav";
import TeacherBodycomponent from "../TeacherBodyComponent/TeacherBodyComponent";
import "./TeacherDashboard.css";
import { useState } from "react";
const TeacherDashboard = () => {
  const [attendence, setAttendence] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  return (
    <div className="teacherdashboard">
      <SideNav setAttendence={setAttendence} setDashboard={setDashboard} />
      <TeacherBodycomponent dashboard={dashboard} attendence={attendence} />
    </div>
  );
};

export default TeacherDashboard;
