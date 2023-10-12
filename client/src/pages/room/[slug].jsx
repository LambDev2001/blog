import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { LuMoreHorizontal } from "react-icons/lu";
import { BsImage, BsSend } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const ChatPage = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const { slug } = useParams();

  const [selectedImages, setSelectedImages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleImageChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...imageUrls]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1); 
    setSelectedImages(updatedImages);
  }
  

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick = () => {
    // Xử lý việc gửi dữ liệu, ví dụ: gửi inputText và selectedImages
    console.log("Text:", inputText);
    console.log("Selected Images:", selectedImages);
  };

  return (
    <div>
      {/* header */}
      <div
        className={
          themeColor.sub +
          " " +
          themeColor.border +
          " flex justify-between my-1 rounded-lg border-b h-[60px]"
        }>
        {/* Start */}
        <div className=" flex my-auto mx-2">
          <img
            src="https://imgs.search.brave.com/TJxaWdHqQ9mr_vhn5YBPHQ3FadqPPogYjwu0u0DQlWI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/NzY3MTgzL3Bob3Rv/L2JhY2stZG9vci5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZndqckE4RzBRVDlr/Qk55bjJBa1F6Si1T/R2NKNTdFODkwcWgx/dW11cnJuRT0"
            alt="avatar room"
            className="h-[40px] w-[40px] rounded-full"
          />
          <div className="my-auto mx-2">Name Room</div>
        </div>

        <div className={themeColor.input + " my-auto mx-2 p-1 rounded-full"}>
          <LuMoreHorizontal size={24} />
        </div>
      </div>

      {/* Chat */}
      <div
        className={
          themeColor.sub + " " + themeColor.border + " my-1 py-auto rounded-lg border-1 h-[50vh]"
        }>
        q
      </div>

      {/* input */}
      <div
        className={
          themeColor.sub +
          " " +
          themeColor.border +
          " relative flex mt-1 p-[12px] h-[60px] rounded-lg border-b"
        }>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageUpload"
          multiple
        />
        <label htmlFor="imageUpload" className="my-auto mx-2 cursor-pointer rounded-md">
          <BsImage size={24} />
        </label>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className={themeColor.input + " w-full rounded-full mx-2 focus:outline-none"}
        />
        <button onClick={handleSendClick} className="bg-blue-400 rounded-full py-2 px-3">
          <BsSend size={24} />
        </button>

        {/* Show image */}
        {selectedImages.length > 0 && (
          <div className="absolute flex top-[-120px] right-0">
            {selectedImages.map((imageUrl, index) => (
              <div className="m-1 relative">
                <img
                  key={index}
                  src={imageUrl}
                  alt=""
                  className="my-auto"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "100px",
                    width: "auto",
                    height: "auto",
                  }}
                />
                <div className={themeColor.input + " absolute p-1 top-0 right-0"}>
                  <IoMdClose size={10} onClick={()=>handleRemoveImage(index)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
