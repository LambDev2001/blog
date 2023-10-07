import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/";

import Menu from "../../../components/user/basic/Menu";
import Header from "../../../components/user/basic/Header";
import Friend from "../../../components/user/basic/Friend";
import Group from "../../../components/user/basic/Group";
import EditBlog from "../../../components/user/blog/EditBlog";
import { getBlog } from "../../../redux/actions/blogAction";

const EditDataBlog = () => {
  const themeColor = useSelector((state) => state.themeUserReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(slug, token));
  }, [dispatch, slug, token]);

  const height = window.innerHeight - 60;

  return (
    <div className="flex flex-col text-white">
      <Header />

      {/* body */}
      <div className={`${themeColor.main} flex justify-between h-100`}>
        {/* menu */}
        <Menu />

        {/* Blog */}
        <div className={`w-3/5 custom-scroll-container`} style={{ height: `${height}px` }}>
          <div className="custom-scroll-content h-100 overflow-auto px-4">
             <EditBlog />
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

export default EditDataBlog;
