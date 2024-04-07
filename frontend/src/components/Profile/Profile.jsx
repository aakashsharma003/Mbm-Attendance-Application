import { useLocation } from "react-router-dom";
import "./Profile.css";
export const Profile = () => {
  const location = useLocation();
  const data = location.state.data;
  return (
    <div className="profile-box">
      <div className="profile-headings">
        <div className="flex" style={{ fontSize: "5vh" }}>
          My Profile
        </div>
      </div>

      <div className="profile-headings">
        <div className="p-heading">Name:-</div>
        <div className="p-heading val">
          {data.name.charAt(0) + data.name.slice(1).toLowerCase()}
        </div>
      </div>
      {data.rollno && (
        <div className="profile-headings">
          <div className="p-heading">Rollno:-</div>
          <div className="p-heading val">{data.rollno}</div>
        </div>
      )}
      {data.teacherid && (
        <div className="profile-headings">
          <div className="p-heading">TeacherId:</div>
          <div className="p-heading val">{data.teacherid}</div>
        </div>
      )}
      {data.branch && (
        <div className="profile-headings">
          <div className="p-heading">Branch:-</div>
          <div className="p-heading val">
            {data.branch.charAt(0) + data.branch.slice(1).toLowerCase()}
          </div>
        </div>
      )}
      {data.semester && (
        <div className="profile-headings">
          <div className="p-heading">Semester:-</div>
          <div className="p-heading val">{data.semester}</div>
        </div>
      )}
      {data.year && (
        <div className="profile-headings">
          <div className="p-heading">Year:-</div>
          <div className="p-heading val">{data.year}</div>
        </div>
      )}
      {data.department && (
        <div className="profile-headings">
          <div className="p-heading">Department:-</div>
          <div className="p-heading val">{data.department}</div>
        </div>
      )}
    </div>
  );
};
