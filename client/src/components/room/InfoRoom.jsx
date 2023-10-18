import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { BsCamera } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import { updateNameRoom, updateAvatarRoom, infoRoom } from "../../redux/actions/roomAction";
import ModalLibrary from "../modal/ModalLibrary";
import ModalDeleteRoom from "../modal/ModalDeleteRoom";

const InfoRoom = ({ room, themeColor, token }) => {
  const [nameRoom, setNameRoom] = useState(room.nameRoom);
  const [selectedImage, setSelectedImage] = useState(room.avatarRoom);
  const [isEditing, setIsEditing] = useState(false);
  const [informationRoom, setInformationRoom] = useState({});
  const [openLibrary, setOpenLibrary] = useState(false);
  const [openDissolution, setOpenDissolution] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    const getInfoRoom = async () => {
      setInformationRoom(await dispatch(infoRoom(slug, token)));
    };
    getInfoRoom();
  }, [dispatch, slug, token]);

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

  const handleLibrary = () => {
    setOpenLibrary(!openLibrary);
  };

  const handleOpenDissolution = () => {
    setOpenDissolution(!openDissolution);
  };

  return (
    <div className="">
      <div className=" my-1">
        <div className="relative">
          <img
            src={selectedImage}
            alt=""
            className={`${themeColor.border} border-1 w-[140px] h-[140px] rounded-full mx-auto`}
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
      {informationRoom.author && (
        <div className="flex flex-wrap">
          <div className="w-1/2 my-2">
            <div className="text-2xl">Author</div>
            <div className="flex">
              <div>
                <img
                  src={informationRoom.author.avatar}
                  alt=""
                  className="h-[36px] w-[36px] rounded-full"
                />
              </div>
              <div className="my-auto mx-2">{informationRoom.author.username}</div>
            </div>
          </div>

          <div className="w-1/2 my-2">
            <div className="text-2xl">Day create</div>
            <div>{informationRoom.createdAt}</div>
          </div>

          <div className="w-1/2 my-2">
            <div className="text-2xl">Member</div>
            <div>{informationRoom.member.length}</div>
          </div>

          {/* Image */}
          <div className="w-100">
            <div className="text-2xl">Image ({informationRoom.images.length})</div>
            <div className="flex my-1">
              {informationRoom.images.length > 0 &&
                informationRoom.images.map((image, index) => {
                  if (index < 3)
                    return (
                      <div key={index}>
                        <img
                          src={image}
                          alt=""
                          className="h-auto w-auto max-h-[120px] max-w-[150px] mx-2"
                        />
                      </div>
                    );
                  else return <div key={index}></div>;
                })}
              {informationRoom.images.length > 3 && (
                <div
                  className={`${themeColor.sub} w-[100px] h-[120px] flex justify-center items-center text-lg text-gray-500 font-medium cursor-pointer`}
                  onClick={handleLibrary}>
                  (+{informationRoom.images.length - 3})
                </div>
              )}
            </div>
          </div>

          <div className="w-100">
            {informationRoom.isAuthor && (
              <div
                className={`${themeColor.border} border-1 bg-red-500 my-1 mx-auto px-3 py-2 rounded-md text-center cursor-pointer`}
                onClick={handleOpenDissolution}>
                Dissolution Room
              </div>
            )}
          </div>
        </div>
      )}

      {/* Library */}
      {openLibrary && (
        <ModalLibrary
          themeColor={themeColor}
          images={informationRoom.images}
          handleLibrary={handleLibrary}
        />
      )}

      {openDissolution && (
        <ModalDeleteRoom
          room={room}
          themeColor={themeColor}
          token={token}
          dispatch={dispatch}
          handleOpen={setOpenDissolution}
        />
      )}
    </div>
  );
};

export default InfoRoom;
