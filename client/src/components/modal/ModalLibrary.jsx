import React from "react";

import { IoMdClose } from "react-icons/io";

const ModalLibrary = ({ themeColor, images, handleLibrary }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className={`${themeColor.main} relative w-[500px] flex flex-wrap p-2`}>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            className={`${themeColor.border} border-1 h-auto w-auto max-h-[120px] max-w-[150px] m-2`}
          />
        ))}

        <div className="absolute top-[-2px] right-0 cursor-pointer" onClick={handleLibrary}>
          <IoMdClose size={30} />
        </div>
      </div>
    </div>
  );
};

export default ModalLibrary;
