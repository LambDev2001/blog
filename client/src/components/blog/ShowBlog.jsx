import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { LuMoreHorizontal } from "react-icons/lu";

import Blog from "./BlogCard";
import Comment from "../comment/Comment";
import ModalReportBlog from "../modal/ModalReportBlog";
import { increaseShare } from "../../redux/actions/blogAction";

const ShowBlog = ({ blog, comments }) => {
  const [isMore, setIsMore] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isCopyLink, setIsCopyLink] = useState(false);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const user = useSelector((state) => state.authReducer.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const isOwner = user._id === blog.author._id;

  const handleIsMore = () => {
    setIsMore(!isMore);
  };

  const handleIsReport = () => {
    setIsReport(!isReport);
    setIsMore(false);
  };

  const handleShareBlog = () => {
    navigator.clipboard.writeText(`http://localhost:3000/blog/${blog._id}`);
    dispatch(increaseShare(blog._id));
    setIsMore(false);
    setIsCopyLink(true);
  };

  useEffect(() => {
    let timeout;
    if (isCopyLink) {
      timeout = setTimeout(() => {
        setIsCopyLink(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopyLink]);

  return (
    <div className="mt-2">
      {/* Header */}
      <div className={`${themeColor.sub} flex justify-between shadow-md my-2 p-1 rounded-md`}>
        {/* Start */}
        <div className="flex">
          {/* Avatar */}
          <div>
            <img
              src={blog.author.avatar}
              alt="avatar"
              className="w-[44px] h-[44px] rounded-full mr-2"
            />
          </div>

          {/* Author */}
          <div>
            {/* Author */}
            <div className="font-semibold">{blog.author.username}</div>
            {/* Time */}
            <div className="text-gray-400 font-medium text-sm">{blog.timeAgo}</div>
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
            <div
              className={`${themeColor.input} ${themeColor.border} border-1 absolute right-0 p-2 w-[100px] mt-1 rounded-md shadow-md`}>
              {isOwner && (
                <div
                  className={`${themeColor.hover} ${themeColor.border} border-1 p-2 rounded-md cursor-pointer shadow-lg`}
                  onClick={() => history.push(`/edit-blog/${blog._id}`)}>
                  Edit Blog
                </div>
              )}
              <div
                className={themeColor.hoverBold + " p-2 rounded-md cursor-pointer"}
                onClick={handleIsReport}>
                Report
              </div>

              <div
                className={themeColor.hoverBold + " p-2 rounded-md cursor-pointer"}
                onClick={handleShareBlog}>
                Share
              </div>
            </div>
          )}

          {isCopyLink && (
            <div className={`${themeColor.border} border-1 absolute right-0 p-2 w-[100px] mt-1 rounded-md text-sm bg-white text-black`}>
              Copied Link
            </div>
          )}

          {isReport && <ModalReportBlog blog={blog} handleShowReport={handleIsReport} />}
        </div>
      </div>

      {/* Info */}
      <div className={`${themeColor.sub} rounded-md shadow-md my-2 p-1`}>
        <div className="font-semibold text-2xl text-center">{blog.title}</div>
        <div className="mt-3">{blog.description}</div>
      </div>

      {/* thumbnail */}
      <div>
      <img src={blog.thumbnail} alt="thumbnail" className="bg-gray-300 my-1 mx-auto max-h-[400px] h-auto w-auto rounded-md" />
    </div>

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
