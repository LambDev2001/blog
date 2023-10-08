import React, { useState } from "react";
import { useSelector } from "react-redux";

import { LuMoreHorizontal } from "react-icons/lu";

const ProfileFriend = ({ friends }) => {
  const [isMore, setIsMore] = useState(-1);
  const themeColor = useSelector((state) => state.themeUserReducer);
  // const token = useSelector((state) => state.authReducer.accessToken);
  // const dispatch = useDispatch();

  const handleMore = (index) => {
    if (isMore === index) {
      setIsMore(-1);
    } else {
      setIsMore(index);
    }
  };

  const handleUnfriend = (idFriend) => {
    setIsMore(-1);
    console.log(idFriend);
  };

  return (
    <div className={`${themeColor.sub} text-white mt-1 mx-1 p-2 rounded-lg`}>
      <div className="flex flex-wrap">
        {friends.length > 0 &&
          friends.map((friend, index) => (
            <div key={index} className="p-1 w-1/2">
              <div className={themeColor.border + " border-1 m-1 flex justify-between rounded-xl"}>
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

                  {isMore === index && (
                    <div
                      className={
                        themeColor.sub +
                        " " +
                        themeColor.hover +
                        " " +
                        themeColor.border +
                        " " +
                        (index % 2 !== 0 && "right-0 ") +
                        " border-1 absolute px-3 py-2 rounded-lg cursor-pointer my-1"
                      }
                      onClick={() => handleUnfriend(friend._id)}>
                      Unfriend
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileFriend;
