import toast from "react-hot-toast";
import { useState } from "react";
import DefaultProfile from "/DefaultProfile.jpg";
import axios from "axios";
import { server } from "../../main";
export const RenderImage = () => {
  const [selectedImage, setSelectedImage] = useState(DefaultProfile); // Initialize with the default image
  const [uploadStatus, setUploadStatus] = useState("");
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
  const imageHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    axios
      .get(`${server}/uploadImage`, {
        formData,
      })
      .then((res) => res.json())
      .then((res) => {
        // setUploadStatus(res.msg)
        toast.success("photo uploaded successfully.!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Please select a valid JPG or JPEG image file.");
      });
  };
  return (
    <form
      className="input-btn"
      action="/profile"
      method="post"
      encType="multipart/form-data"
    >
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple={false}
        onChange={imageHandler}
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
    </form>
  );
};
