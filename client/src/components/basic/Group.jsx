import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getRooms } from "../../redux/actions/roomAction";

const Group = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const rooms = useSelector((state) => state.roomReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(token));
  }, [dispatch, token]);

  return (
    <div
      className={`${themeColor.sub} ${themeColor.text} ${themeColor.border} border-1 shadow-lg m-2 p-1 rounded-lg`}>
      <div
        className="text-xl font-semibold my-2 mx-3 cursor-pointer"
        onClick={() => history.push("/group-chat")}>
        Groups Chat
      </div>
      {rooms.length > 0 &&
        rooms.map((room, index) => (
          <div
            key={index}
            className={`${themeColor.sub} ${themeColor.hover} ${themeColor.border} border-1 shadow-md p-2 my-1 flex justify-between rounded-lg cursor-pointer`}
            onClick={() => history.push(`/room/${room._id}`)}>
            <div className="flex">
              <img
                src={room.avatarRoom}
                alt="avatar room"
                className="h-[28px] w-[28px] rounded-md"
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
