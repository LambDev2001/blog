import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { LuMoreHorizontal } from "react-icons/lu";

import { unFollowUser } from "../../redux/actions/userAction";

const ProfileFollowing = ({ follows }) => {
  const [isMore, setIsMore] = useState(-1);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.authReducer.user);
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

  const handleUnFollow = (idFollow) => {
    setIsMore(-1);
    dispatch(unFollowUser(idFollow, token));
  };

  return (
    <div className={`${themeColor.sub} mt-1 mx-1 p-2 rounded-lg shadow-lg`}>
      <div className="flex flex-wrap w-100">
        {follows.length > 0 &&
          follows.map((follow, index) => (
            <div key={index} className="p-1 w-1/2">
              <div
                className={
                  themeColor.border + " border-1 m-1 flex justify-between rounded-xl shadow-md"
                }>
                {/* start */}
                <div className="flex">
                  <img
                    src={follow.avatar}
                    alt="avatar"
                    className="rounded-full w-[60px] h-[60px] m-2"
                  />
                  <div className=" mx-4 my-auto">
                    <div className="text-xl">{follow.username}</div>
                    <div className="text-md">{follow.account}</div>
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
                      onClick={() => handleUnFollow(follow._id)}>
                      UnFollow
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

export default ProfileFollowing;
