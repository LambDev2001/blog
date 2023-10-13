import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import {
  TbRectangleVerticalFilled,
  TbRectangleVertical,
  TbRectangleFilled,
  TbRectangle,
} from "react-icons/tb";

import Blog from "../components/blog/Blog";

import { getBlogsUser } from "../redux/actions/blogAction";
import { getRooms } from "../redux/actions/roomAction";

const Home = () => {
  const [typeBlog, setTypeBlog] = useState(1);
  const [modalType, setModalType] = useState(false);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogsUser(token));
    dispatch(getRooms(token));
  }, [dispatch, token]);

  const setType = (type) => {
    setTypeBlog(type);
    setModalType(false);
  };

  return (
    <div>
      {/* create blog */}
      <div className="flex justify-between m-4">
        <Link
          to={`/create-blog`}
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
  );
};

export default Home;