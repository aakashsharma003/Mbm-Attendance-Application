import "./StudentBodyComponent.css";
import { Profile } from "../Profile/Profile";
import { RenderImage } from "../RenderImage/RenderImage";
import ActionAreaCard from "../Card/Card";
import { SubjectList } from "../SubjectList/SubjectList";
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
            <div className="attend-heading">Attendence</div>
            <div className="attendsub-heading">Attendence</div>
            <SubjectList editOrdelete={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentBodyComponent;
