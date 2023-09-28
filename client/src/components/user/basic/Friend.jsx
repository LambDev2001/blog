import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IoChatbubblesOutline } from "react-icons/io5";

const Friend = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const history = useHistory();

  const handleMouseEnter = (key) => {
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className={`${themeColor.sub} m-2 p-1 rounded-lg`}>
      <div className="text-xl font-semibold my-2 mx-3">Friends</div>

      {/* 1 */}
      <div
        key={1}
        className={`${themeColor.main} ${
          hoveredItem === 1 ? "hovered" : ""
        } p-2 my-1 flex justify-between rounded-lg cursor-pointer`}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={handleMouseLeave}
        onClick={() => history.push("/user/profile/{friend._id}")}>
        <div className="flex">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="h-[28px] w-[28px]"
          />
          <div className="mx-2">A long name</div>
        </div>
        <div
          className={`transition-opacity ${
            hoveredItem === 1 ? "opacity-100" : "opacity-0 hidden"
          } ${themeColor.input} p-1 rounded-full`}
          onClick={(e) => {
            e.stopPropagation();
            history.push("/user/chat/{friend._id}");
          }}>
          <IoChatbubblesOutline size={20} />
        </div>
      </div>

      {/* 2 */}
      <div
        key={2}
        className={`${themeColor.main} ${
          hoveredItem === 2 ? "hovered" : ""
        } p-2 my-1 flex justify-between rounded-lg cursor-pointer`}
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={handleMouseLeave}
        onClick={() => history.push("/user/profile/{friend._id}")}>
        <div className="flex">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="h-[28px] w-[28px]"
          />
          <div className="mx-2">A long name</div>
        </div>
        <div
          className={`transition-opacity ${
            hoveredItem === 2 ? "opacity-100" : "opacity-0 hidden"
          } ${themeColor.input} p-1 rounded-full`}
          onClick={(e) => {
            e.stopPropagation();
            history.push("/user/chat/{friend._id}");
          }}>
          <IoChatbubblesOutline size={20} />
        </div>
      </div>
    </div>
  );
};

export default Friend;
