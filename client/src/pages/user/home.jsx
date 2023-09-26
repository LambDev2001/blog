import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { BiHomeAlt2, BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { GoShare, GoSearch } from "react-icons/go";
import { LiaExclamationCircleSolid, LiaQuestionCircleSolid } from "react-icons/lia";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import { MdOutlineBugReport } from "react-icons/md";
import {
  TbRectangleVerticalFilled,
  TbRectangleVertical,
  TbRectangleFilled,
  TbRectangle,
} from "react-icons/tb";

const Home = () => {
  const [typeBlog, setTypeBlog] = useState(1);
  const [modalType, setModalType] = useState(false);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const user = useSelector((state) => state.authReducer.user);
  const history = useHistory();

  const themeColor = {
    main: "bg-[rgb(24,25,26)]",
    sub: `bg-[rgb(36,36,39)]`,
    input: `bg-[rgb(59,58,60)]`,
    border: `border-[rgb(57,59,58)]`,
    hover: `hover:bg-[rgb(59,58,60)]`,
    hoverBold: `hover:bg-[rgb(40,40,40)]`,
  };

  const height = window.innerHeight - 60;

  const setType = (type) => {
    setTypeBlog(type);
    setModalType(false);
  };

  return (
    <div className="flex flex-col text-white">
      {/* header */}
      <div
        className={`${themeColor.sub} ${themeColor.border} flex justify-between h-[60px] border-b`}>
        {/* logo */}
        <div className="flex mx-2 my-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="logo"
            className="w-[32px] h-[32px] m-1"
          />
          <div className="text-lg font-semibold m-1">Reddit</div>
        </div>

        {/* search */}
        <div className={`${themeColor.sub} my-auto w-50 relative`}>
          <input
            type="text"
            className={`${themeColor.input}  text-white w-100 py-2 px-3 rounded-full shadow appearance-none leading-tight focus:outline-none`}
            placeholder="Search Blogs ..."
          />
          <GoSearch className="absolute top-1 right-3" color="white" size={28} />
        </div>

        {/* login */}
        <div className="my-auto mx-2">
          {user.username ? (
            <div>
              <img src={user.avatar} alt="avatar" className="rounded-full w-[40px] h-[40px]" />
            </div>
          ) : (
            <div className={`${color.active} py-2 px-3 rounded-full`}>
              <Link to={`/user/login`}>Login</Link>
            </div>
          )}
        </div>
      </div>

      {/* body */}
      <div className={`${themeColor.main} flex justify-between h-100`}>
        {/* menu */}
        <div className={`${themeColor.border} w-1/5 border-r`} style={{ height: `${height}px` }}>
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
        </div>

        {/* blog */}
        <div className={` w-3/5`}>
          <div className="flex justify-between m-4">
            <Link
              to={`/user/create`}
              className="py-2 px-3 border rounded-full cursor-pointer text-white">
              Create a post
            </Link>

            {/* type blog show */}
            <div className="relative">
              <div
                className={`${themeColor.input} py-2 px-3 rounded-md flex`}
                onClick={() => setModalType(!modalType)}>
                {typeBlog === 1 ? <TbRectangleVertical size={20} /> : <TbRectangle size={20} />}
                <IoIosArrowDown className="ml-2" size={20}/>
              </div>
              {modalType && (
                <div
                  className={`${themeColor.input} absolute right-0 mt-2 flex flex-col w-[120px] rounded-md`}>
                  <div className={`p-2 m-auto border-b`}>View</div>
                  <div className={`${themeColor.hoverBold} p-2 my-1 mx-3 rounded-md flex cursor-pointer`} onClick={() => setType(1)}>
                    <TbRectangleVerticalFilled size={20} className="" />
                    <div className="ml-2">Card</div>
                  </div>
                  <div className={`${themeColor.hoverBold} p-2 my-1 mx-3 rounded-md flex cursor-pointer`} onClick={() => setType(2)}>
                    <TbRectangleFilled size={20} className="" />
                    <div className="ml-2">Classis</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`${themeColor.sub} mx-4 rounded-lg p-3`}>
            {/* header */}
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src="https://imgs.search.brave.com/N1nj9QYN-j2SKJNz9Q6qTxDw-zFieCBL6AZaGyozGjU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1Xzdy/NGp2cC9zdHlsZXMv/Y29tbXVuaXR5SWNv/bl8xZHhlanQ1Y3Ux/c2ExLnBuZw"
                  alt="thumbnail"
                  className="h-[28px] w-[28px] rounded-circle"
                />
                <div className="mx-3">Name</div>
                <div>Time</div>
              </div>
              <div className="flex">
                <MdOutlineBugReport color="white" size={24} className="mx-1" />
                <IoMdClose color="white" size={24} className="mx-1" />
              </div>
            </div>

            {/* description */}
            <div className="my-3 text-xl font-bold">
              Bukit Panjang woman who poured pee in neighbour's shoes now allegedly sprays soy sauce
              on laundry
            </div>

            {/* thumbnail */}
            <div>
              <img
                src="https://imgs.search.brave.com/0O8pH-KjwLpF9VDJyN2ckjGvwH2gNY0z_-yOu0QLye4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly96YmFz/ZS1nbG9iYWwuemlu/Z2Zyb250LmNvbS9z/YWFzYm94L3Jlc291/cmNlcy9qcGVnL2Fu/aW1lLWFpLWFydC1n/ZW5lcmF0b3I5LWZv/dG9yLTIwMjMwODE4/OTUxMi0xX180MzVi/MzhiNWEwOGYxY2E4/MTZlZDA0YTVmYWE4/NWVmMy5qcGVn"
                alt="thumbnail"
                className="w-100 rounded-md"
              />
            </div>

            {/* interact */}
            <div className="flex">
              <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
                <div className="flex mr-2">
                  <BiLike size={24} />
                  <div className="ml-1">210</div>
                </div>
                <div className="flex">
                  <BiDislike size={24} />
                  <div className="ml-1">50</div>
                </div>
              </div>
              <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
                <FaRegEye size={24} />
                <div className="ml-1">1707</div>
              </div>
              <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
                <BiCommentDetail size={24} />
                <div className="ml-1">70</div>
              </div>
              <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
                <GoShare size={24} />
                <div className="ml-1">10</div>
              </div>
            </div>
          </div>
        </div>

        {/* social */}
        <div className={`${themeColor.border} w-1/5 border-l`} style={{ height: `${height}px` }}>
          <div>Friend</div>
          <div>Group</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
