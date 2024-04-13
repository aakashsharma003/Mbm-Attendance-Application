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
  console.log(photo);
  let rollno = data.rollno;
  let teacherId = data.teacherId;
  const [selectedImage, setSelectedImage] = useState(DefaultProfile);
  useEffect(() => {
    const fetchProfile = () => {
      if (photo) {
        setSelectedImage(server + photo);
        toast.success("Profile fetched from database..!");
      } else toast.error("Pls update your Profile photo");
    };
    fetchProfile();
  }, []);

  // if (!photo) setSelectedImage(DefaultProfile);
  // const [flag, setFlag] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const filename = rollno ? rollno : teacherId;
    const formData = new FormData(event.target);
    formData.append("rollno", rollno);
    formData.append("teacherId", teacherId);
    try {
      const res = await axios.post(`${server}/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          filename: filename,
        },
      });
      const data = await res.data;
      // console.log();
      setSelectedImage(server + data.imagePath);
      toast.success(data.message);
    } catch (err) {
      console.error("Error occurred while uploading image:", err);
      toast.error(err.response.data.message);
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
          onChange={(e) => {
            if (e.target.value) {
              toast.success("Now upload ur selected image..!!");
            }
          }}
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
