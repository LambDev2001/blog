import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { LuMoreHorizontal } from "react-icons/lu";
import ModalCreateRoom from "../components/modal/ModalCreateRoom";
import ModalDeleteRoom from "../components/modal/ModalDeleteRoom";

const GroupChat = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAction, setOpenAction] = useState(-1);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [roomDelete, setRoomDelete] = useState({});
  const themeColor = useSelector((state) => state.themeUserReducer);
  const rooms = useSelector((state) => state.roomReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenModalDelete = () => {
    setOpenAction(-1);
    setOpenModalDelete(!openModalDelete);
  };

  const handleAction = (index, room, e) => {
    e.stopPropagation();
    if (index === openAction) {
      setOpenAction(-1);
    } else {
      setOpenAction(index);
      setRoomDelete(room);
    }
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
              className={`${themeColor.main} p-2 my-1 flex justify-between rounded-lg`}>
              {/* Start */}
              <div
                className="flex cursor-pointer"
                onClick={() => history.push(`/room/${room._id}`)}>
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
              <div className="relative mx-2 my-auto">
                <div
                  className={`${themeColor.input} ${themeColor.hoverBold} p-2 rounded-full overflow-hidden`}
                  onClick={(e) => handleAction(index, room, e)}>
                  <LuMoreHorizontal size={20} />
                </div>
                {openAction === index && (
                  <div
                    className={`${themeColor.main} ${themeColor.border} absolute right-0 border-1 flex rounded-md z-[60]`}
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                    <div
                      className={`${themeColor.hoverBold} flex py-2 px-3 cursor-pointer mx-auto`}
                      onClick={handleOpenModalDelete}>
                      Delete Room
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {openModal && (
        <ModalCreateRoom
          themeColor={themeColor}
          dispatch={dispatch}
          token={token}
          handleOpenModal={handleOpenModal}
        />
      )}

      {openModalDelete && (
        <ModalDeleteRoom
          room={roomDelete}
          themeColor={themeColor}
          token={token}
          dispatch={dispatch}
          handleOpen={handleOpenModalDelete}
        />
      )}
    </div>
  );
};

export default GroupChat;
