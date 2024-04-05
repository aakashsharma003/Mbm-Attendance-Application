import { useLocation } from "react-router-dom";
import "./Profile.css";
export const Profile = () => {
  const location = useLocation();
  const data = location.state.data;
  return (
    <div className="profile-box">
      <div className="profile-headings">
        <h1 className="flex">My Profile</h1>
      </div>

      <div className="profile-headings">
        <div className="p-heading">Name</div>
        <div className="p-heading val">
          {data.name.charAt(0) + data.name.slice(1).toLowerCase()}
        </div>
      </div>
      <div className="profile-headings">
        <div className="p-heading">Branch</div>
        <div className="p-heading val">
          {data.branch.charAt(0) + data.branch.slice(1).toLowerCase()}
        </div>
      </div>
      <div className="profile-headings">
        <div className="p-heading">semester</div>
        <div className="p-heading val">{data.semester}</div>
      </div>
      <div className="profile-headings">
        <div className="p-heading">Year</div>
        <div className="p-heading val">{data.year}</div>
      </div>
    </div>
  );
};
