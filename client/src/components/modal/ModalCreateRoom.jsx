import React, { useState } from "react";

import { BsImage } from "react-icons/bs";

import { createRoom } from "../../redux/actions/roomAction";
import validate from "../../utils/validate";

const ModalCreateRoom = ({ themeColor, dispatch, token, handleOpenModal }) => {
  const [room, setRoom] = useState({
    nameRoom: "",
    avatarRoom: "",
  });
  const [errors, setErrors] = useState({
    nameRoom: "",
    avatarRoom: "",
  });
  const [tempImage, setTempImage] = useState({});

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
    setRoom({ ...room, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setRoom({ ...room, avatarRoom: file });
    const imageUrl = URL.createObjectURL(file);
    setTempImage(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let temptErr = {};
    for (const [name, value] of Object.entries(room)) {
      const error = validate(name, value);
      temptErr = { ...temptErr, [name]: error };
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    if (Object.values(temptErr).every((error) => error === "")) {
      dispatch(createRoom(room, token));
      handleOpenModal();
    }
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
            <div className="text-red-500 text-md">{errors.nameRoom}</div>
          </div>

          <div className="mb-4">
            <label className="block text-md mb-1">Choose Avatar For Group</label>

            {tempImage && (
              <div className={" z-50"}>
                <div className="m-1 relative">
                  <img
                    src={tempImage}
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
            <div className="text-red-500 text-md">{errors.avatarRoom}</div>
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
