import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DefaultProfile from "/DefaultProfile.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { server } from "../../main";

export const RenderImage = () => {
  const [selectedImage, setSelectedImage] = useState("");
  // const [flag, setFlag] = useState(false);
  const location = useLocation();
  const data = location.state.data;
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
          rollno: rollno,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    <form
      onSubmit={handleFormSubmit}
      className="input-btn"
      encType="multipart/form-data"
    >
      <input
        type="file"
        name="profileImage"
        accept="image/*"
        multiple={false}
      />
      {selectedImage && <img src={selectedImage} alt="img" />}
      <button type="submit" className="s-dash-btn">
        Upload Image
      </button>
    </form>
  );
};
