import React, { useState } from "react";

import { BsImage } from "react-icons/bs";

const ModalCreateRoom = ({ themeColor, handleOpenModal }) => {
  const [room, setRoom] = useState({});
  const [selectedImages, setSelectedImages] = useState("");


  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "avatarRoom") {
      value = e.target.files[0];
      if (e && e.length > 0) {
        const imageUrls =  URL.createObjectURL(value);
        setSelectedImages(imageUrls);
      }
    }
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = (e) => {
    handleOpenModal();
    console.log(room);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <form
        className={`${themeColor.main} p-4 rounded-lg shadow-lg w-[500px]`}
        onSubmit={(e) => handleSubmit(e)}>
        <div className="text-2xl font-semibold">Create Group</div>

        {/* content report */}
        <div className={` my-2`}>
          <div className="mb-4">
            <label className="block text-md mb-1">Name Group</label>
            <input
              type="text"
              placeholder="Enter name group"
              name="nameRoom"
              value={room.nameRoom}
              onChange={(e) => handleChangeInput(e)}
              className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-md shadow focus:outline-none`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md mb-1">Choose Avatar For Group</label>
            <input
              type="file"
              accept="image/*"
              name="avatarRoom"
              onChange={(e) => handleChangeInput(e)}
              className="hidden"
              id="imageUpload"
              multiple
            />
            {selectedImages !== "" && (
              <div className={themeColor.input + " absolute p-1 flex top-[-120px] right-0"}>
                <div className="m-1 relative">
                  <img
                    src={selectedImages[0]}
                    alt=""
                    className="my-auto"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "100px",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            )}
            <label htmlFor="imageUpload" className="my-auto mx-2 cursor-pointer rounded-md">
              <BsImage size={24} />
            </label>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end">
          <button
            className="mx-2 py-2 px-3 text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={() => handleOpenModal()}>
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 py-2 px-3 text-white bg-green-500 hover:bg-green-600 rounded-lg">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCreateRoom;
