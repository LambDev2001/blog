import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LuMoreHorizontal } from "react-icons/lu";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import {unFriend} from "../redux/actions/userAction";

const ProfileFriend = ({ friends }) => {
  const [isMore, setIsMore] = useState(-1);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();

  const { slug } = useParams();
  const isOwner = slug === user._id ? true : false;

  const handleMore = (index) => {
    if (isMore === index) {
      setIsMore(-1);
    } else {
      setIsMore(index);
    }
  };

  const handleUnfriend = (idFriend) => {
    dispatch(unFriend(idFriend, token))
    setIsMore(-1);
  };

  return (
    <div className={`${themeColor.sub} mt-1 mx-1 p-2 rounded-lg shadow-lg`}>
      <div className="flex flex-wrap">
        {friends.length > 0 &&
          friends.map((friend, index) => (
            <div key={index} className="p-1 w-1/2 ">
              <div
                className={
                  themeColor.border + " border-1 m-1 flex justify-between rounded-xl shadow-md"
                }>
                {/* start */}
                <div className="flex">
                  <img
                    src={friend.avatar}
                    alt="avatar"
                    className="rounded-full w-[60px] h-[60px] m-2"
                  />
                  <div className=" mx-4 my-auto">
                    <div className="text-xl">{friend.username}</div>
                    <div className="text-md">{friend.account}</div>
                  </div>
                </div>

                {/* end */}
                <div className="relative my-auto mx-3">
                  {isOwner && (
                    <div
                      className={`${isMore === index && themeColor.input} ${
                        themeColor.hover
                      } my-auto rounded-full p-2 cursor-pointer`}
                      onClick={() => handleMore(index)}>
                      <LuMoreHorizontal size={20} />
                    </div>
                  )}

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
