import React from "react";

import { IoMdClose } from "react-icons/io";

const ModalLibrary = ({ themeColor, images, handleLibrary }) => {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "rar":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764038/blog/rar-icon_trdqon.jpg";
      case "js":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764067/blog/js-icon_w5hshg.png";
      case "tsx":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764067/blog/js-icon_w5hshg.png";
      case "ps":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764383/blog/Photoshop_CC_icon_hiubej.webp";
      case "css":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764617/blog/css-icon_pw3acs.png";
      case "html":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764688/blog/html-icon_pyi4rj.png";
      case "exe":
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764738/blog/exe-icon_uvj470.png";
      default:
        return "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698764738/blog/exe-icon_uvj470.png";
    }
  };

  const getFileType = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    return extension;
  };

  const isImage = (fileType) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    return imageExtensions.includes(fileType);
  };

  const renderFile = (file) => {
    const fileType = getFileType(file);

    if (isImage(fileType)) {
      return (
        <div key={file} className="relative h-auto w-auto max-h-[100px] max-w-[100px] m-1">
          <a href={file} rel="noreferrer" target="_blank">
            <img key={file} src={file} alt="" />

            <div
              className={`bg-[rgba(59,58,60,0.5)] text-[#ffff] backdrop-opacity-10 backdrop-invert absolute top-0 right-2 cursor-pointer p-1 text-xs rounded-full`}>
              Image
            </div>
          </a>
        </div>
      );
    } else {
      return (
        <div key={file} className="m-1">
          <a href={file} rel="noreferrer" target="_blank" className="relative">
            <img
              src={getFileIcon(fileType)}
              alt=""
              className={`h-auto w-auto max-h-[100px] max-w-[100px] mx-1`}
            />
            <div
              className={` bg-[rgba(59,58,60,0.5)] text-[#ffff] backdrop-opacity-10 backdrop-invert absolute top-0 right-2 cursor-pointer p-1 text-xs rounded-full`}>
              {fileType}
            </div>
          </a>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className={`${themeColor.main} relative w-[500px] flex flex-wrap p-2`}>
        {images.map((file) => renderFile(file))}

        <div className="absolute top-[-2px] right-0 cursor-pointer" onClick={handleLibrary}>
          <IoMdClose size={30} />
        </div>
      </div>
    </div>
  );
};

export default ModalLibrary;
