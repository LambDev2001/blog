import React from "react";
import { useSelector } from "react-redux";

import Menu from "../components/user/basic/Menu";
import Header from "../components/user/basic/Header";
import Friend from "../components/user/basic/Friend";
import Group from "../components/user/basic/Group";

const Profile = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);

  const height = window.innerHeight - 60;
  return (
    <div className="flex flex-col text-white">
      <Header />

      {/* body */}
      <div className={`${themeColor.main} flex justify-between h-100`}>
        {/* menu */}
        <Menu />

        {/* social */}
        <div
          className={`${themeColor.border} w-1/5 border-l custom-scroll-container`}
          style={{ height: `${height}px` }}>
          <div className="custom-scroll-content h-100 overflow-auto">
            <Friend />
            <Group />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
