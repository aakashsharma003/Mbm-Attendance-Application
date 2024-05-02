import SideNav from "../SideNav/SideNav";
import TeacherBodycomponent from "../TeacherBodyComponent/TeacherBodyComponent";
import "./TeacherDashboard.css";
import { useState } from "react";
const TeacherDashboard = () => {
  const [attendence, setAttendence] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [subjects, setSubjects] = useState(false);
  const [sidenav, setSideNav] = useState(true);

  const teacher = true;
  return (
    <div className="teacherdashboard">
      {sidenav && (
        <SideNav
          setAttendence={setAttendence}
          setDashboard={setDashboard}
          setSubjects={setSubjects}
          teacher={teacher}
        />
      )}
      <TeacherBodycomponent
        setSubjects={setSubjects}
        setAttendence={setAttendence}
        dashboard={dashboard}
        attendence={attendence}
        subjects={subjects}
        setSideNav={setSideNav}
        sidenav={sidenav}
      />
    </div>
  );
};

export default TeacherDashboard;
