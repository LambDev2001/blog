import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { LuMoreHorizontal } from "react-icons/lu";

import Blog from "./BlogCard";
import Comment from "../comment/Comment";
import ModalReportBlog from "../modal/ModalReportBlog";

const ShowBlog = ({ blog, comments }) => {
  const [isMore, setIsMore] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const history = useHistory();

  const handleIsMore = () => {
    setIsMore(!isMore);
  };

  const handleIsReport = () => {
    setIsReport(!isReport);
    setIsMore(false);
  };

  return (
    <div className="mt-2">
      {/* Header */}
      <div className="flex justify-between">
        {/* Start */}
        <div className="flex">
          {/* Avatar */}
          <div className="mx-2">
            <img src={blog.author.avatar} alt="avatar" className="w-[50px] h-[50px] rounded-full" />
          </div>

          {/* Author */}
          <div>
            {/* Time */}
            <div className="text-gray-400 font-medium text-sm">{blog.timeAgo}</div>
            {/* Author */}
            <div className="font-semibold">{blog.author.username}</div>
          </div>
        </div>

        {/* End */}
        <div className="my-auto relative">
          <LuMoreHorizontal
            size={30}
            className={themeColor.input + " rounded-full"}
            onClick={handleIsMore}
          />
          {isMore && (
            <div className={themeColor.input + " absolute right-0 p-2 w-[100px] mt-1 rounded-md"}>
              <div
                className={themeColor.hoverBold + " p-2 rounded-md cursor-pointer"}
                onClick={() => history.push(`/edit-blog/${blog._id}`)}>
                Edit Blog
              </div>
              <div
                className={themeColor.hoverBold + " p-2 rounded-md cursor-pointer"}
                onClick={handleIsReport}>
                Report
              </div>
            </div>
          )}

          {isReport && <ModalReportBlog blog={blog} handleShowReport={handleIsReport} />}
        </div>
      </div>

      {/* Info */}
      <div className="my-2">
        <div className="font-semibold text-2xl">{blog.title}</div>
        <div className="mt-3">{blog.description}</div>
      </div>

      {/* thumbnail */}
      {/* <div>
      <img src={blog.thumbnail} alt="thumbnail" className="mx-auto max-h-[400px] rounded-md" />
    </div> */}

      {/* Content */}

      <Blog blog={blog} readOnly />

      {/* Comment */}
      <div id={blog._id} className="my-2">
        <Comment idBlog={blog._id} comments={comments} />
      </div>
    </div>
  );
};

export default ShowBlog;
