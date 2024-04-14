import Dashboard_logo from "../../assets/dashboard-logo.png";
import Attendence_logo from "../../assets/attendence-logo.png";
import log_out from "../../assets/logout.png";
import { NavLink } from "react-router-dom";
import subjectslogo from "/subjecticon.png";
import "./SideNav.css";
const SideNav = ({
  setAttendence,
  setDashboard,
  setSubjects,
  teacher,
  setSideNav,
}) => {
  return (
    <>
      <div className="sideNav">
        <ul className="sidelist">
          <div
            className="sideNav-items"
            onClick={() => {
              setDashboard(true);
              setAttendence(false);
              setSubjects(false);
            }}
          >
            <img
              src={Dashboard_logo}
              alt="dashb-icon"
              className="sidenav-logo"
            />
            <li className="navheading text-decoration-none">DashBoard</li>
          </div>
          <div
            className="sideNav-items"
            onClick={() => {
              setSideNav(false);
              setAttendence(true);
              setDashboard(false);
              setSubjects(false);
            }}
          >
            <img
              src={Attendence_logo}
              alt="attendencelogo"
              className="sidenav-logo"
            />
            <li className="navheading text-decoration-none">Attendence</li>
          </div>
          {teacher && (
            <div
              className="sideNav-items"
              onClick={() => {
                setAttendence(false);
                setDashboard(false);
                setSubjects(true);
              }}
            >
              <img
                src={subjectslogo}
                alt="subjectslogo"
                className="sidenav-logo"
              />
              <li className="navheading text-decoration-none">Subject</li>
            </div>
          )}

          <NavLink to="/login" className="sideNav-items">
            <img
              src={log_out}
              alt="logout-logo"
              className="sidenav-logo"
              style={{ marginRight: 0 }}
            />
            <div
              className="navheading text-decoration-none"
              style={{
                padding: "1vh 1vw",
                textDecoration: "none",
                color: "black",
              }}
            >
              Logout
            </div>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default SideNav;
