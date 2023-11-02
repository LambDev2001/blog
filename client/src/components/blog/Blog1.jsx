import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { BiLike, BiDislike, BiSolidLike, BiSolidDislike, BiCommentDetail } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { MdOutlineBugReport } from "react-icons/md";

import Comment from "../comment/Comment";
import ModalReportBlog from "../modal/ModalReportBlog";
import ModalDeleteBlog from "../modal/ModalDeleteBlog";
import { dislikeBlog, likeBlog, increaseShare, removeBlog } from "../../redux/actions/blogAction";
import { followUser } from "../../redux/actions/userAction";
import { getComments } from "../../redux/actions/commentAction";

const Blog1 = ({ handleLink = null, isOwner = false }) => {
  const [openComments, setOpenComments] = useState(-1);
  const [isReport, setIsReport] = useState(null);
  const [modalDeleteBlog, setModalDeleteBlog] = useState(-1);
  const themeColor = useSelector((state) => state.themeUserReducer);
  const blogs = useSelector((state) => state.blogReducer);
  const comments = useSelector((state) => state.commentReducer);
  const token = useSelector((state) => state.authReducer.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();
  if (!handleLink) {
    handleLink = (link) => {
      history.push(link);
    };
  }

  const handleLike = (id) => {
    if (!token) handleLink("");
    else dispatch(likeBlog(id, token));
  };

  const handleDislike = (id) => {
    if (!token) handleLink("");
    else dispatch(dislikeBlog(id, token));
  };

  const handleFollow = (idUser) => {
    if (!token) handleLink("");
    else dispatch(followUser(idUser, token));
  };

  const handleShare = (idBlog) => {
    if (!token) handleLink("");
    else dispatch(increaseShare(idBlog, token));
  };

  const handleComment = (index, idBlog) => {
    if (!token) handleLink("");
    else if (openComments !== index) {
      dispatch(getComments(idBlog));
      setOpenComments(index);
    } else {
      setOpenComments(-1);
    }
  };

  const handleShowReport = (idBlog) => {
    if (!token) handleLink("");
    else if (isReport === idBlog || idBlog === null) setIsReport(null);
    else setIsReport(idBlog);
  };

  const handleRemoveBlog = async (idBlog) => {
    if (!token) handleLink("");
    else dispatch(removeBlog(idBlog));
  };

  const handleDeleteBlog = (idBlog) => {
    idBlog === modalDeleteBlog ? setModalDeleteBlog(-1) : setModalDeleteBlog(idBlog);
  };

  return (
    <div>
      {blogs.length > 0 &&
        blogs.map((blog, index) => {
          if (blog.isRemove === true) return <div></div>;
          return (
            <div key={index}>
              {/* Blog */}
              <div className={`${themeColor.sub} mx-4 my-2 px-3 pt-3`}>
                {/* header */}
                <div className="flex justify-between">
                  {/* start */}
                  <div className="flex">
                    <div className="flex align-items-center">
                      <div
                        onClick={() => handleLink("/profile/" + blog.author._id)}
                        className="flex cursor-pointer">
                        <img
                          src={blog.author.avatar}
                          alt="thumbnail"
                          className="h-[28px] w-[28px] rounded-circle"
                        />
                        <div className="mx-1">{blog.author.username}</div>
                      </div>
                      <div className="mx-2">{blog.timeAgo}</div>
                    </div>

                    <div
                      className={`${themeColor.input} mx-2 px-3 py-2 rounded-full cursor-pointer`}>
                      {blog.category}
                    </div>
                  </div>

                  {/* end */}
                  <div className="flex align-items-center">
                    {!blog.isFollowing && (
                      <div
                        className="mx-4 border-1 border-red-600 text-red-600 py-1 px-2 rounded-md cursor-pointer"
                        onClick={() => handleFollow(blog.author._id)}>
                        Follow
                      </div>
                    )}
                    <div className="flex">
                      {isOwner && (
                        <div
                          className="mx-1 mb-auto rounded-md bg-red-500 text-white py-1 px-2 cursor-pointer"
                          onClick={() => handleDeleteBlog(blog._id)}>
                          Delete
                        </div>
                      )}

                      <MdOutlineBugReport
                        color="white"
                        size={24}
                        className="mx-1 my-auto cursor-pointer"
                        onClick={() => handleShowReport(blog._id)}
                      />
                      <IoMdClose
                        color="white"
                        size={24}
                        className="mx-1 my-auto cursor-pointer"
                        onClick={() => handleRemoveBlog(blog._id)}
                      />
                    </div>
                  </div>
                </div>

                {/* title */}
                <div className="my-1 text-lg font-bold">{blog.title}</div>

                {/* description */}
                <div className="my-1 text-md">{blog.description}</div>

                {/* thumbnail */}
                <div onClick={() => handleLink("/blog/" + blog._id)} className="cursor-pointer">
                  <img
                    src={blog.thumbnail}
                    alt="thumbnail"
                    className="w-100 max-h-[400px] h-auto w-auto m-auto object-cover cursor-pointer"
                  />
                </div>

                {/* interact */}
                <div className="flex p-2">
                  <div className={`${themeColor.input} flex py-2 px-3 m-2 rounded-full`}>
                    <div className="flex cursor-pointer mr-2">
                      {blog.isLike === true ? (
                        <BiSolidLike size={24} color="blue" />
                      ) : (
                        <BiLike size={24} onClick={() => handleLike(blog._id)} />
                      )}
                      <div className="ml-1">{blog.likes}</div>
                    </div>
                    <div className="flex cursor-pointer">
                      {blog.isLike === false ? (
                        <BiSolidDislike size={24} color="blue" />
                      ) : (
                        <BiDislike size={24} onClick={() => handleDislike(blog._id)} />
                      )}
                      <div className="ml-1">{blog.dislikes}</div>
                    </div>
                  </div>
                  <div
                    className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                    <FaRegEye size={24} />
                    <div className="ml-1">{blog.views}</div>
                  </div>
                  <div
                    className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                    <BiCommentDetail size={24} onClick={() => handleComment(index, blog._id)} />
                    <div className="ml-1">{blog.comments}</div>
                  </div>
                  <div
                    className={`${themeColor.input} flex cursor-pointer py-2 px-3 m-2 rounded-full`}>
                    <GoShare size={24} onClick={() => handleShare(blog._id)} />
                    <div className="ml-1">{blog.share}</div>
                  </div>
                </div>
              </div>

              {/* Comment */}
              {openComments === index && (
                <div id={blog._id} className="ml-2 mr-6 pl-4 mb-2">
                  <Comment idBlog={blog._id} comments={comments} />
                </div>
              )}

              {/* Report blog */}
              <div>
                {isReport === blog._id && (
                  <ModalReportBlog blog={blog} handleShowReport={handleShowReport} />
                )}

                {modalDeleteBlog !== -1 && (
                  <ModalDeleteBlog
                    themeColor={themeColor}
                    token={token}
                    dispatch={dispatch}
                    idBlog={modalDeleteBlog}
                    handleOpen={handleDeleteBlog}
                  />
                )}
              </div>

              <div className={`${themeColor.border} border-y w-[90%] mx-auto`}></div>
            </div>
          );
        })}
    </div>
  );
};

export default Blog1;
