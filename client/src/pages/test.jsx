import React, { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const inputTextRef = useRef(null);

  const handleImageChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));

      setSelectedImages([...selectedImages, ...imageUrls]);
    }
  };

  const handleSendClick = () => {
    console.log("Text:", inputTextRef.current.value);
    console.log("Selected Images:", selectedImages);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="imageUpload"
        multiple
      />
      <label htmlFor="imageUpload" className="my-auto mx-2 cursor-pointer rounded-md">
        Upload Image
      </label>
      <input
        type="text"
        ref={inputTextRef}
        value={selectedImages.join(", ")}
        className="w-full rounded-full mx-2 p-2 border focus:outline-none text-black"
      />
      <button onClick={handleSendClick} className="bg-blue-400 rounded-full py-2 px-3">
        <BsSend size={24} />
      </button>
    </div>
  );
};

export default ImageUpload;
