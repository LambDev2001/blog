import React from "react";

import { deleteRoom } from "../../redux/actions/roomAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ModalDeleteRoom = ({ room, themeColor, token, dispatch, handleOpen }) => {
  const history = useHistory();

  const handleDeleteRoom = () => {
    history.push("/");
    dispatch(deleteRoom({ room, token }));
    handleOpen();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center z-[99999]"
      style={{ backgroundColor: "rgba(179, 193, 159, 0.29)" }}>
      <div
        className={`${themeColor.main} ${themeColor.border} border-1 w-96 h-[260px] p-6 rounded-lg shadow-md`}>
        <p className="text-xl font-semibold mb-4">Confirm Deletion</p>
        <p>Are you sure you want to delete this item? This action cannot be undo.</p>

        {/* Room info */}
        <div className={`${themeColor.sub} flex my-2 rounded-md`}>
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

        {/* Button  */}
        <div className="flex justify-end pt-2">
          <button onClick={handleOpen} className={`bg-gray-600 mx-1 text-white px-3 py-2 rounded`}>
            Cancel
          </button>
          <button
            className="bg-red-500 mx-1 text-white px-3 py-2 rounded"
            onClick={handleDeleteRoom}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteRoom;
