import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";

import {
  TbRectangleVerticalFilled,
  TbRectangleVertical,
  TbRectangleFilled,
  TbRectangle,
} from "react-icons/tb";

import Header from "../../components/user/basic/Header";
import Menu from "../../components/user/basic/Menu";
import Blog from "../../components/user/blog/Blog";
import Friend from "../../components/user/basic/Friend";
import Group from "../../components/user/basic/Group";

const Home = () => {
  const [typeBlog, setTypeBlog] = useState(1);
  const [modalType, setModalType] = useState(false);
  const themeColor = useSelector((state) => state.themeUserReducer);

  const height = window.innerHeight - 60;

  const setType = (type) => {
    setTypeBlog(type);
    setModalType(false);
  };

  return (
    <div className="flex flex-col text-white">
      <Header />

      {/* body */}
      <div className={`${themeColor.main} flex justify-between h-100`}>
        {/* menu */}
        <Menu />

        {/* blog */}
        <div className={`w-3/5 custom-scroll-container`} style={{ height: `${height}px` }}>
          <div className="custom-scroll-content h-100 overflow-auto">
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
                  <IoIosArrowDown className="ml-2" size={20} />
                </div>
                {modalType && (
                  <div
                    className={`${themeColor.input} absolute right-0 mt-2 flex flex-col w-[120px] rounded-md`}>
                    <div className={`p-2 m-auto border-b`}>View</div>
                    <div
                      className={`${themeColor.hoverBold} p-2 my-1 mx-3 rounded-md flex cursor-pointer`}
                      onClick={() => setType(1)}>
                      <TbRectangleVerticalFilled size={20} className="" />
                      <div className="ml-2">Card</div>
                    </div>
                    <div
                      className={`${themeColor.hoverBold} p-2 my-1 mx-3 rounded-md flex cursor-pointer`}
                      onClick={() => setType(2)}>
                      <TbRectangleFilled size={20} className="" />
                      <div className="ml-2">Classis</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Blog type={typeBlog} />
          </div>
        </div>

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

export default Home;
