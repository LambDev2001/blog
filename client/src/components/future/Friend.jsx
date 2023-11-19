import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IoChatbubblesOutline } from "react-icons/io5";
import { getFriendPage } from "../../redux/actions/friendAction";

const Friend = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.accessToken);
  const friends = useSelector((state) => state.friendReducer.friend);
  const reqFriends = useSelector((state) => state.friendReducer.req);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendPage({ idUser: user._id, token }));
  }, [dispatch, token, user]);

  const handleMouseEnter = (key) => {
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div
      className={`${themeColor.sub} ${themeColor.border} ${themeColor.text} border-1 shadow-lg m-2 p-1 rounded-lg`}>
      <div
        className="text-xl font-semibold my-2 mx-3 cursor-pointer"
        onClick={() => history.push(`/friends/${user._id}`)}>
        <div className="relative inline-block">
          Friends
          {reqFriends.length > 0 && (
            <div className="absolute -top-1 -right-4 text-xs rounded-full bg-red-600 text-white w-[16px] h-[16px] text-center">
              {reqFriends.length <= 99 ? reqFriends.length : "99+"}
            </div>
          )}
        </div>
      </div>
      {user &&
        friends &&
        friends.map((friend, index) => (
          <div
            key={index}
            className={`${themeColor.sub} ${hoveredItem === 1 ? "hovered" : ""} ${
              themeColor.hover
            }  ${
              themeColor.border
            } border-1 shadow-md p-2 my-1 flex justify-between rounded-lg cursor-pointer`}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => history.push(`/profile/${friend._id}`)}>
            <div className="flex">
              <img src={friend.avatar} alt="" className="h-[28px] w-[28px] rounded-full" />
              <div className="mx-2">{friend.username}</div>
            </div>
            <div
              className={`transition-opacity ${
                hoveredItem === 1 ? "opacity-100" : "opacity-0 hidden"
              } ${themeColor.input} p-1 rounded-full`}
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/chat/${friend.room}`);
              }}>
              <IoChatbubblesOutline size={20} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Friend;
