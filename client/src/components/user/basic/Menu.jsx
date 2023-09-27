import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {BiHomeAlt2} from "react-icons/bi"
import { LiaExclamationCircleSolid, LiaQuestionCircleSolid } from "react-icons/lia";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";

const Menu = () => {
  const user = useSelector((state) => state.authReducer.user);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const history = useHistory()

  const height = window.innerHeight - 60;

  return <div className={`${themeColor.border} w-1/5 border-r`} style={{ height: `${height}px` }}>
    <div className="ml-3 mt-2">
      <div
        className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
        onClick={() => history.push("/user/home")}>
        <BiHomeAlt2 size={26} className="ml-2 mr-4" />
        <div className="my-auto">Home</div>
      </div>
      <div
        className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
        onClick={() => history.push("/user/popular")}>
        <BsArrowUpRightCircle size={26} className="ml-2 mr-4" />
        <div className="my-auto">Popular</div>
      </div>

      <div
        className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
        onClick={() => history.push(`/user/friends/${user._id}`)}>
        <SlPeople size={26} className="ml-2 mr-4" />
        <div className="my-auto">Friend</div>
      </div>

      {/* resource */}
      <div className="text-lg">Resources</div>
      <div
        className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
        onClick={() => history.push("/user/about")}>
        <LiaExclamationCircleSolid size={26} className="ml-2 mr-4" />
        <div className="my-auto">About</div>
      </div>
      <div
        className={`${themeColor.hover} flex p-2 my-1 mx-2 rounded-md cursor-pointer`}
        onClick={() => history.push("/user/help")}>
        <LiaQuestionCircleSolid size={26} className="ml-2 mr-4" />
        <div className="my-auto">Help</div>
      </div>
    </div>
  </div>;
};

export default Menu;
