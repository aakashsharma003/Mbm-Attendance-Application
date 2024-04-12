import SideNav from "../SideNav/SideNav";
import StudentBodyComponent from "../StudentBodyComponent/StudentBodyComponent";
import { useState } from "react";
import "./StudentDashboard.css";
const StudentDashBoard = () => {
  const [dashboard, setDashboard] = useState(true);
  const [attendence, setAttendence] = useState(false);
  return (
    <div className="studentdashboard">
      <SideNav setAttendence={setAttendence} setDashboard={setDashboard} />
      <StudentBodyComponent dashboard={dashboard} attendence={attendence} />
    </div>
  );
};

export default StudentDashBoard;
