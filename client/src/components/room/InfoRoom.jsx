import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { BsCamera } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import { updateNameRoom, updateAvatarRoom } from "../../redux/actions/roomAction";

const InfoRoom = ({ room, themeColor, token }) => {
  const [nameRoom, setNameRoom] = useState(room.nameRoom);
  const [selectedImage, setSelectedImage] = useState(room.avatarRoom);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrls = URL.createObjectURL(file);
    setSelectedImage(imageUrls);
    dispatch(updateAvatarRoom({ slug, file, token }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    dispatch(updateNameRoom({ slug, nameRoom, token }));
  };

  return (
    <div className="">
      <div className=" my-1">
        <div className="relative">
          <img
            src={selectedImage}
            alt=""
            className={`${themeColor.border} border-1 w-[160px] h-[160px] rounded-full mx-auto`}
          />
          <label
            htmlFor="imageUpload"
            className={`${themeColor.sub} ${themeColor.border} absolute left-1/2 translate-x-[50%] bottom-0 border-1 rounded-full`}>
            <BsCamera size={24} className="mx-2 my-2" />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
            multiple
          />
        </div>
        <div className="flex justify-center ">
          <div className="relative my-3 font-semibold text-3xl">
            {isEditing ? (
              <div className="flex">
                <div className={`px-3 mx-3 my-auto`}>
                  <input
                    type="text"
                    className={`${themeColor.main} focus:outline-none`}
                    style={{ width: `${nameRoom.length}ch` }}
                    value={nameRoom}
                    onChange={(e) => setNameRoom(e.target.value)}
                  />
                </div>
                <button
                  className="bg-blue-400 rounded-full py-1 px-2 text-lg"
                  onClick={handleSaveClick}>
                  Save
                </button>
              </div>
            ) : (
              nameRoom
            )}
            <div className="">
              {!isEditing && (
                <div className="absolute bottom-[5px] right-[-32px]">
                  <BiEditAlt size={24} onClick={handleEditClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>Author</div>
      <div>Day Create</div>
    </div>
  );
};

export default InfoRoom;
