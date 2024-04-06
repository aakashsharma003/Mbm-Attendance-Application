import toast from "react-hot-toast";
import { useState } from "react";
import DefaultProfile from "/DefaultProfile.jpg";
export const RenderImage = () => {
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
};
