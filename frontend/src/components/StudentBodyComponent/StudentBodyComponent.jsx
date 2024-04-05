import React, { useState } from "react";
import "./StudentBodyComponent.css";
import { Profile } from "../Profile/Profile";
import toast from "react-hot-toast";
import DefaultProfile from "/DefaultProfile.jpg";
import Cards from "../Cards/Cards";
const StudentBodyComponent = ({ dashboard, attendence, student }) => {
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

      {student && (
        <div className="attendence-Container">
          <div className="attendence">
            <div className="attendence">
              <div className="attend-heading">Subjects</div>
              <div className="attendsub-heading">Subjects</div>
              <Cards />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
function RenderImage() {
  const [selectedImage, setSelectedImage] = useState(DefaultProfile); // Initialize with the default image

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      // Process the selected image (e.g., display it, upload it, etc.)
      setSelectedImage(URL.createObjectURL(file));
      toast.success("photo uploaded successfully.!");
    } else {
      // Display an error message or handle invalid file types
      toast.error("Please select a valid JPG or JPEG image file.");
    }
  };

  return (
    <div className="input-btn">
      <input
        type="file"
        id="img"
        style={{ display: "none" }}
        accept=".jpg, .jpeg"
        onChange={handleImageChange}
      />

      {selectedImage && (
        <div className="s-dash-image">
          <img
            src={selectedImage}
            alt="Selected"
            style={{ Width: "100%" }}
            className="s-dash-uploadedimage"
          />
          <label htmlFor="img" className="s-dash-btn">
            Upload image
          </label>
        </div>
      )}
    </div>
  );
}

export default StudentBodyComponent;
