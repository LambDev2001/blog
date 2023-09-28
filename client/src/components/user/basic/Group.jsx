import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Group = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const rooms = useSelector((state) => state.roomReducer);
  const history = useHistory();

  return (
    <div className={`${themeColor.sub} m-2 p-1 rounded-lg`}>
      <div className="text-xl font-semibold my-2 mx-3">Groups Chat</div>
      {rooms.length > 0 &&
        rooms.map((room, index) => (
          <div
            key={index}
            className={`${themeColor.main} p-2 my-1 flex justify-between rounded-lg cursor-pointer`}
            onClick={() => history.push(`/user/room/${room._id}`)}>
            <div className="flex">
              <img
                src={room.avatarRoom}
                alt="avatar room"
                className="h-[28px] w-[28px]"
              />
              <div className="mx-2">{room.nameRoom}</div>
            </div>

            <div>{room.member.length}</div>
          </div>
        ))}
    </div>
  );
};

export default Group;
