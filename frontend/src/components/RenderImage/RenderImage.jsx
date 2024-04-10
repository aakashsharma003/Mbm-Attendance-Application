import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DefaultProfile from "/DefaultProfile.jpg";
import axios from "axios";
import "./RenderImage.css";
import { useLocation } from "react-router-dom";
import { server } from "../../main";

export const RenderImage = () => {
  const location = useLocation();
  const data = location.state.data;
  let photo = data.photo;

  if (photo) photo = server + photo;
  const [selectedImage, setSelectedImage] = useState(photo);
  if (!photo) setSelectedImage(DefaultProfile);
  // const [flag, setFlag] = useState(false);
  let rollno = data.rollno;
  let tid = data.teacherid;
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("rollno", rollno);
    try {
      const res = await axios.post(
        "http://localhost:4000/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      // console.log();
      setSelectedImage(server + res.data.imagePath);
    } catch (error) {
      console.error("Error occurred while uploading image:", error);
    }
  };
  return (
    <div className="p-image">
      <form
        onSubmit={handleFormSubmit}
        style={{ width: "100%", height: "100%" }}
        encType="multipart/form-data"
      >
        <input
          type="file"
          id="choose"
          name="profileImage"
          accept="image/*"
          multiple={false}
          style={{ display: "none" }}
        />
        <div
          className="renderProfile"
          style={{
            background: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            alignItems: "center",
            borderRadius: "7px",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="img"
              style={{ borderRadius: "50%" }}
            />
          )}
          <div style={{ display: "flex", width: "100%" }}>
            <label
              htmlFor="choose"
              className="s-dash-btn"
              style={{ border: "2px solid gray" }}
            >
              Select Image
            </label>
            <button
              style={{ border: "2px solid gray" }}
              type="submit"
              className="s-dash-btn"
            >
              Upload Image
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
