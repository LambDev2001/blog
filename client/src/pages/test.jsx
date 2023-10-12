import React, { useState } from "react";

const Test = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const imageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mq0jvhgj");
    formData.append("cloud_name", "dfuaq9ggj");

    const res = await fetch("https://api.cloudinary.com/v1_1/dfuaq9ggj/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (!file) {
      alert("Please select an image.");
      return;
    }

    try {
      const result = await imageUpload(file);
      setUploadedImage(result.url);
    } catch (error) {
      alert("Error uploading image.");
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={uploadedImage} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default Test;
