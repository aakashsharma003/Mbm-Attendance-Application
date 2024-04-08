import React from "react";
import Logo_icon from "../../assets/logo.png";
import "./SideBar.css";

const SideBar = () => {
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo">
          <img className="sidebar-logo-icon" src={Logo_icon} alt="" />
        </div>
        <div className="heading">
          <div className="first-heading" style={{ letterSpacing: "3px" }}>
            <pre style={{ fontWeight: "bold", fontSize: "90%" }}>
              <span style={{ color: "#cc0c1e", letterSpacing: "5px" }}>
                MBM
              </span>{" "}
              UNIVERSITY
            </pre>
          </div>
          <div className="second-heading">
            State University Govt. of Rajasthan
          </div>
        </div>
        <div className="para">
          A Real-time interactive attendance web-application.
        </div>
      </div>
    </>
  );
};

export default SideBar;
