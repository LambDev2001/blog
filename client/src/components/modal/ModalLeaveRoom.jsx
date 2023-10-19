import React from "react";
import { useHistory } from "react-router-dom";

import { leaveRoom } from "../../redux/actions/memberAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ModalLeaveRoom = ({ themeColor, token, handleLeaveRoom }) => {
  const { slug } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLeaveRoomAction = () => {
    dispatch(leaveRoom(slug, token));
    history.push("/");
  };

  return (
    <div
      className="fixed inset-0 flex justify-center z-[99999]"
      style={{ backgroundColor: "rgba(179, 193, 159, 0.29)" }}>
      <div
        className={`${themeColor.main} ${themeColor.border} border-1 w-96 h-[220px] p-6 rounded-lg shadow-md`}>
        <p className="text-xl font-semibold mb-4">Leave Room</p>
        <p>Are you sure you want to leave room? This action cannot be undo.</p>

        {/* Room info */}
        <div className={`${themeColor.sub} flex my-2 rounded-md`}></div>

        {/* Button  */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleLeaveRoom}
            className={`bg-gray-600 mx-1 text-white px-3 py-2 rounded`}>
            Cancel
          </button>
          <button
            className="bg-red-500 mx-1 text-white px-3 py-2 rounded"
            onClick={handleLeaveRoomAction}>
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLeaveRoom;
