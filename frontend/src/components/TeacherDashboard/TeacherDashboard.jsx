import SideNav from "../SideNav/SideNav";
import TeacherBodycomponent from "../TeacherBodyComponent/TeacherBodyComponent";
import "./TeacherDashboard.css";
import { useState } from "react";
const TeacherDashboard = () => {
  const [attendence, setAttendence] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [subjects, setSubjects] = useState(false);
  const teacher = true;
  return (
    <div className="teacherdashboard">
      <SideNav
        setAttendence={setAttendence}
        setDashboard={setDashboard}
        setSubjects={setSubjects}
        teacher={teacher}
      />
      <TeacherBodycomponent
        dashboard={dashboard}
        attendence={attendence}
        subjects={subjects}
      />
    </div>
  );
};

export default TeacherDashboard;
