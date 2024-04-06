import "./StudentBodyComponent.css";
import { Profile } from "../Profile/Profile";
import Cards from "../Cards/Cards";
import { RenderImage } from "../RenderImage/RenderImage";
const StudentBodyComponent = ({ dashboard, attendence }) => {
  return (
    <div className="studentbodycontainer">
      {dashboard && (
        <div className="dashboard">
          <div className="dash-heading">Dashboard</div>
          <div className="dashsub-heading">dashboard</div>
          <div className="content">
            <RenderImage />
            <Profile />
          </div>
        </div>
      )}
      {attendence && (
        <div className="attendence-Container">
          <div className="attendence">
            <div className="attendence">
              <div className="attend-heading">Attendence</div>
              <div className="attendsub-heading">Attendence</div>
              <Cards />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentBodyComponent;
