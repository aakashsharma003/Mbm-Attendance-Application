import React from "react";
import { images } from "../../Constants";
import "./DashBoard.css";
import { Profile } from "../Profile/Profile";
const DashBoard = () => {
  return <div className="dashboard"></div>;
};

function Box(props) {
  return (
    <div className="dashbox">
      <div className="dashbox-image">
        <img src={props.img} alt="" />
      </div>
      <div className="dashbox-headings">
        <div className="dashbox-first-heading">{props.number}</div>
        <div className="dashbox-second-heading">{props.heading}</div>
      </div>
    </div>
  );
}

export default DashBoard;
