import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import {
  TbRectangleVerticalFilled,
  TbRectangleVertical,
  TbRectangleFilled,
  TbRectangle,
} from "react-icons/tb";

import Blog from "../components/blog/Blog";
import ModalLogin from "../components/modal/ModalLogin";

import { getFriendBlogs, getUnauthorizedBlogsUser } from "../redux/actions/blogAction";

const Friend = () => {
  const [typeBlog, setTypeBlog] = useState(1);
  const [modalType, setModalType] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [typeModal, setTypeModal] = useState("login");
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getFriendBlogs(token));
    } else {
      dispatch(getUnauthorizedBlogsUser());
    }
  }, [dispatch, token]);

  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };

  const handleLink = (link) => {
    if (token) {
      history.push(link);
    } else {
      handleOpenLogin();
    }
  };

  const setType = (type) => {
    setTypeBlog(type);
    setModalType(false);
  };

  return (
    <div className={themeColor.text}>
      {/* create blog */}
      <div className="flex justify-between m-4">
      <div
          onClick={() => handleLink("/create-blog")}
          className={`${themeColor.sub} ${themeColor.border} border-1 shadow-sm py-2 px-3 border rounded-full cursor-pointer`}>
          Create a post
        </div>

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
      <div
        onClick={() => {
          if (typeof token === "undefined") {
            handleOpenLogin();
          }
        }}>
        <Blog type={typeBlog} handleLink={handleLink} />
      </div>

      {openLogin && (
        <ModalLogin
          handleModalLogin={handleOpenLogin}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
        />
      )}
    </div>
  );
};

export default Friend;
