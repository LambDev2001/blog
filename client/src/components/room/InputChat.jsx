import React, { useState } from "react";

import { BsImage, BsSend } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import { sendTextChat, sendImageChat } from "../../redux/actions/chatAction";

const InputChat = ({ themeColor, dispatch, idRoom, token }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...imageUrls]);
      setFileImage([...fileImage, ...files]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updateFiles = [...fileImage];
    updateFiles.splice(index, 1);
    setFileImage(updateFiles);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendClick =  async () => {
    if (inputText !== "") await dispatch(sendTextChat({ idRoom, message: inputText, token }));
    if (fileImage.length > 0) await dispatch(sendImageChat({ idRoom, message: fileImage, token }));

    setFileImage([]);
    setSelectedImages([]);
    setInputText("");
  };

  return (
    <div
      className={
        themeColor.sub +
        " " +
        themeColor.border +
        " relative flex mt-1 p-[12px] h-[60px] rounded-lg border-b"
      }>
      <input
        type="file"
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
        <div className={themeColor.input + " absolute p-1 flex top-[-120px] right-0"}>
          {selectedImages.map((imageUrl, index) => (
            <div key={index} className="m-1 relative">
              <img
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
              <div
                className={`${themeColor.input} ${themeColor.hoverBold} absolute p-1 top-0 right-0`}>
                <IoMdClose size={10} onClick={() => handleRemoveImage(index)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputChat;
