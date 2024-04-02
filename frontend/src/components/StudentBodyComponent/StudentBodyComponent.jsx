import React, { useState } from "react";
import "./StudentBodyComponent.css";

const StudentBodyComponent = ({ dashboard, attendence }) => {
  return (
    <div className="studentbodycontainer">
      {dashboard && (
        <div className="dashboard">
          <div className="dashboard">
            <div className="dash-heading">Dashboard</div>
            <div className="dashsub-heading">dashboard</div>
            <RenderImage />
          </div>
        </div>
      )}
      {attendence && (
        <div className="attendence-Container">
          <div className="attendence">
            <div className="attendence">
              <div className="attend-heading">Attendence</div>
              <div className="attendsub-heading">Attendence</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function RenderImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      // Process the selected image (e.g., display it, upload it, etc.)
      setSelectedImage(URL.createObjectURL(file));
    } else {
      // Display an error message or handle invalid file types
      alert("Please select a valid JPG or JPEG image file.");
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
      <label for="img" className="s-dash-btn">
        Upload image
      </label>
      {selectedImage && (
        <div className="s-dash-image">
          <p className="s-dash-para">Image uploaded Successfully.</p>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ Width: "100%", height: "100%" }}
            className="s-dash-uploadedimage"
          />
        </div>
      )}
    </div>
  );
}

export default StudentBodyComponent;
