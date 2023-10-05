import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LuMoreHorizontal } from "react-icons/lu";

const ProfileFriend = ({ friends }) => {
  const [isMore, setIsMore] = useState(-1);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch()

  const handleMore = (index) => {
    if (isMore === index) {
      setIsMore(-1);
    } else {
      setIsMore(index);
    }
  };

  const handleUnfriend = () => {
    setIsMore(-1);
    dispatch()

  }

  return (
    <div className={`${themeColor.sub} text-white mt-1 mx-1 p-2 rounded-lg`}>
      <div className="flex flex-wrap">
        {friends.length > 0 &&
          friends.map((friend, index) => (
            <div
              key={index}
              className={`${themeColor.border} border-1 flex justify-between w-full sm:w-1 md:w-1 lg:w-1/2 xl:w-1/2 rounded-xl`}>
              {/* start */}
              <div className="flex">
                <img
                  src={friend.avatar}
                  alt="avatar"
                  className="rounded-full w-[60px] h-[60px] m-2"
                />
                <div className="text-2xl mx-4 my-auto">{friend.username}</div>
              </div>

              {/* end */}
              <div className="relative my-auto mx-3">
                <div
                  className={`${isMore === index && themeColor.input} ${
                    themeColor.hover
                  } my-auto rounded-full p-2 cursor-pointer`}
                  onClick={() => handleMore(index)}>
                  <LuMoreHorizontal size={20} />
                </div>

                {
                  isMore === index &&
                  <div className={`${themeColor.input} absolute p-3 rounded-lg cursor-pointer`} onClick={handleUnfriend}>
                    Unfriend
                  </div>
                }
              </div>

            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileFriend;
