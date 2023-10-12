import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { LuMoreHorizontal } from "react-icons/lu";
import ModalCreateRoom from "../components/modal/ModalCreateRoom";

const GroupChat = () => {
  const [openModal, setOpenModal] = useState(false);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const rooms = useSelector((state) => state.roomReducer);
  const history = useHistory();

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleAction = (index, e) => {
    e.stopPropagation();
  };

  return (
    <div>
      {/* Header */}
      <div className={themeColor.sub + " flex justify-between my-2 p-2 rounded-lg"}>
        <div className="text-xl font-semibold my-auto mx-2">Groups Chat</div>
        <div
          className={`${themeColor.input} ${themeColor.hoverBold} mx-3 p-2 rounded-full overflow-hidden`}
          onClick={() => handleOpenModal()}>
          <IoMdCreate size={20} />
        </div>
      </div>

      {/* Group Chat */}
      <div className={themeColor.sub + " p-2 rounded-lg"}>
        {rooms.length > 0 &&
          rooms.map((room, index) => (
            <div
              key={index}
              className={`${themeColor.main} p-2 my-1 flex justify-between rounded-lg cursor-pointer`}
              onClick={() => history.push(`/room/${room._id}`)}>
              {/* Start */}
              <div className="flex">
                <img
                  src={room.avatarRoom}
                  alt="avatar room"
                  className="h-[40px] w-[40px] rounded-md my-auto mx-2"
                />
                <div className="mx-2">
                  <div className="font-semibold text-lg">{room.nameRoom}</div>
                  <div className="text-md">Members: {room.member.length}</div>
                </div>
              </div>

              {/* End */}
              <div
                className={`${themeColor.input} ${themeColor.hoverBold} mx-2 my-auto p-2 rounded-full overflow-hidden`}
                onClick={(e) => handleAction(index, e)}>
                <LuMoreHorizontal size={20} />
              </div>
            </div>
          ))}
      </div>

      {openModal && <ModalCreateRoom themeColor={themeColor} handleOpenModal={handleOpenModal} />}
    </div>
  );
};

export default GroupChat;
