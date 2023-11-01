import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [filePath, setFilePath] = useState();
  const [previewURL, setPreviewURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const extension = file.name.split(".").pop();
      const icon = getFileIcon(extension);
      setPreviewURL(icon);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/upload", formData);
      setFilePath(response.data.filePath);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const path = encodeURIComponent(filePath);
    try {
      const response = await axios.delete(`/upload/${path}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const path = encodeURIComponent(filePath); // The 'filePath' variable should hold the path to the file to be updated.

    const formData = new FormData();
    formData.append("file", selectedFile); // 'selectedFile' should contain the updated file data.

    try {
      const response = await axios.put(`/upload/${path}`, formData); // Sending a PUT request to the server for updating the file.
      console.log(response.data);
      setFilePath(response.data.filePath); // Assuming 'setFilePath' updates the file path after a successful update.
    } catch (error) {
      console.error(error);
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "rar":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764038/blog/rar-icon_trdqon.jpg";
      case "js":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764067/blog/js-icon_w5hshg.png";
      case "ps":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764383/blog/Photoshop_CC_icon_hiubej.webp";
        case "css":
          return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764617/blog/css-icon_pw3acs.png"

        case "html":
          return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764688/blog/html-icon_pyi4rj.png"
        case "exe":
          return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764738/blog/exe-icon_uvj470.png"
      default:
        return "";
    }
  };

  return (
    <div className="inline">
      <input type="file" onChange={handleFileChange} />
      {previewURL && <img src={previewURL} alt="File Icon" style={{ maxWidth: "50px" }} />}
      <div>
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default Test;
